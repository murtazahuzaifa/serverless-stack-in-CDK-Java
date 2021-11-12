# Developer Guide

### Installation
- Java
- [Maven](https://maven.apache.org/download.cgi)
- [Nodejs](https://nodejs.org/en/)
- [AWS CLI](https://docs.aws.amazon.com/cli/v1/userguide/install-windows.html)
- [Serverless Framework CLI](https://www.serverless.com/framework/docs/getting-started)


## Main Files
### Stack Files
In the root directory, there is a main stack file `main.yml` where all the resources are defined.

#### Resourece Used
- VPC.
- EFS.
- SQS.
- Lambda Functions.
- API Gateway.

### config.js
In the config file these are variables that are used in the stack files.
```javascript
// config.js
const stack_name = "serverless-app-stack";
const region = "us-east-1";
const mount_dir = "/myDir";
```
- `stack_name` is used in reference the stack name.
- `region` represents that where the stack should deploy.
- `mount_dir` represents that where lambda function can write files. For example in our case `/mnt/myDir`, where `/mnt` is the default directory in the lambda's file system where `mount_dir` will be created.


### package.json
This is a Nodejs file where some of the deployment related plugins are present 

<b>Note:</b> The Lambda functions used in this project is based on JavaScript which can be found in the lambdas directory. Follow this [project](https://github.com/serverless/examples/tree/master/aws-java-simple-http-endpoint) for code references.

<br>

### Stack Deployment Command
Run the following command to deploy the stack.
1) `npm i` this will install all the required plugins used in the stack files.
2) `serverless deploy --config main.yml`. 

<br>

### Stack Delete Command
- `serverless remove  --config main.yml`


<br>

## Architecture Diagram
![](../docs/app-architecture.JPG)
