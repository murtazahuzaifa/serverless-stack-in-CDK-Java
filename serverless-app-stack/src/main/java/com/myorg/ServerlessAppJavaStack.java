package com.myorg;

import software.constructs.Construct;

import java.util.ArrayList;
import java.util.List;

import software.amazon.awscdk.Duration;
import software.amazon.awscdk.RemovalPolicy;
import software.amazon.awscdk.Stack;
import software.amazon.awscdk.StackProps;
import software.amazon.awscdk.services.ec2.SubnetConfiguration;
import software.amazon.awscdk.services.ec2.Vpc;
import software.amazon.awscdk.services.apigateway.Cors;
import software.amazon.awscdk.services.apigateway.CorsOptions;
import software.amazon.awscdk.services.apigateway.LambdaIntegration;
import software.amazon.awscdk.services.apigateway.LambdaRestApi;
import software.amazon.awscdk.services.apigateway.Resource;
import software.amazon.awscdk.services.ec2.Port;
import software.amazon.awscdk.services.ec2.SecurityGroup;
import software.amazon.awscdk.services.efs.AccessPoint;
import software.amazon.awscdk.services.efs.AccessPointOptions;
import software.amazon.awscdk.services.efs.Acl;
import software.amazon.awscdk.services.efs.FileSystem;
import software.amazon.awscdk.services.efs.PosixUser;
import software.amazon.awscdk.services.lambda.Code;
import software.amazon.awscdk.services.lambda.Function;
import software.amazon.awscdk.services.lambda.Runtime;
import software.amazon.awscdk.services.lambda.eventsources.SqsEventSource;
import software.amazon.awscdk.services.sqs.Queue;

public class ServerlessAppJavaStack extends Stack {
        public ServerlessAppJavaStack(final Construct parent, final String id) {
                this(parent, id, null);
        }

        public ServerlessAppJavaStack(final Construct parent, final String id, final StackProps props) {
                super(parent, id, props);

                /* creating subnets group for vpc */
                final SubnetConfiguration subnetConfiguration1 = SubnetConfiguration.builder().name("Engress")
                                .subnetType(software.amazon.awscdk.services.ec2.SubnetType.PRIVATE).cidrMask(24)
                                .build();
                final SubnetConfiguration subnetConfiguration2 = SubnetConfiguration.builder().name("ingress")
                                .subnetType(software.amazon.awscdk.services.ec2.SubnetType.PUBLIC).cidrMask(24).build();
                final List<SubnetConfiguration> subnetList = new ArrayList<SubnetConfiguration>();

                subnetList.add(subnetConfiguration1);
                subnetList.add(subnetConfiguration2);

                /* creating vpc */
                final Vpc vpc = Vpc.Builder.create(this, id + "vpc").maxAzs(2).subnetConfiguration(subnetList).build();

                /* creating Security Group */
                final SecurityGroup sg1 = SecurityGroup.Builder.create(this, "sg-01").vpc(vpc).allowAllOutbound(true)
                                .description("serverless app security group").build();
                sg1.addIngressRule(sg1, Port.allTraffic());

                /* creating EFS File system */
                final FileSystem fileSystem = FileSystem.Builder.create(this, "EfsFileSystem").vpc(vpc)
                                .securityGroup(sg1).removalPolicy(RemovalPolicy.DESTROY).build();

                /* creating EFS access point */
                String efsMountDirPath = "/myDir";
                final AccessPoint accessPoint = fileSystem.addAccessPoint("AccessPoint", AccessPointOptions.builder()
                                .createAcl(Acl.builder().ownerGid("1001").ownerUid("1001").permissions("777").build())
                                .path(efsMountDirPath).posixUser(PosixUser.builder().gid("1001").uid("1001").build())
                                .build());

                List<SecurityGroup> securityGroupsList = new ArrayList<SecurityGroup>();
                securityGroupsList.add(sg1);

                /* creating lambda adding data in SQS queue */
                final Function sqsWriterLambda = Function.Builder.create(this, "sqsWriterLambda")
                                .runtime(Runtime.NODEJS_12_X).code(Code.fromAsset("lambdas"))
                                .handler("sqsWriter.handler").timeout(Duration.seconds(15))
                                .securityGroups(securityGroupsList).build();

                /* creating lambda file System access point */
                final software.amazon.awscdk.services.lambda.FileSystem lambdaFileSystemAccessPoint = software.amazon.awscdk.services.lambda.FileSystem
                                .fromEfsAccessPoint(accessPoint, "/mnt" + efsMountDirPath);

                /* creating lambda file System access point */
                Duration timeout = Duration.seconds(300);
                final Function sqsListnerLambda = Function.Builder.create(this, "sqsListnerLambda")
                                .runtime(Runtime.NODEJS_12_X).code(Code.fromAsset("lambdas"))
                                .handler("sqsListner.handler").timeout(timeout).securityGroups(securityGroupsList)
                                .vpc(vpc).reservedConcurrentExecutions(5).filesystem(lambdaFileSystemAccessPoint)
                                .build();

                /* creating SQS queue */
                final Queue queue = Queue.Builder.create(this, "dataQueue").visibilityTimeout(timeout)
                                .receiveMessageWaitTime(Duration.seconds(20)).build();

                /* allowing sqsWriterLambda to add data in SQS queue */
                queue.grantSendMessages(sqsWriterLambda);

                /* adding SQS queue endpoint as an environment variable */
                sqsWriterLambda.addEnvironment("QUEUE_URL", queue.getQueueUrl());

                /* adding event source to trigger sqsListnerLambda on receiving data in SQS */
                sqsListnerLambda.addEventSource(SqsEventSource.Builder.create(queue).batchSize(10).build());

                /* creating rest API to invoke sqsWriterLambda with path /write-to-sqs and method Post */
                String apiPath = "write-to-sqs";
                LambdaRestApi restApi = LambdaRestApi.Builder.create(this, "serverlessRestApi").handler(sqsWriterLambda)
                                .proxy(false).defaultCorsPreflightOptions(CorsOptions.builder()
                                                .allowOrigins(Cors.ALL_ORIGINS).allowMethods(Cors.ALL_METHODS).build())
                                .build();

                LambdaIntegration sqsWriterLambdaIntegration = new LambdaIntegration(sqsWriterLambda);
                Resource restApiResource = restApi.getRoot().addResource(apiPath);
                restApiResource.addMethod("POST", sqsWriterLambdaIntegration);

        }
}
