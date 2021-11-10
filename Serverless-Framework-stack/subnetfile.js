
const SSM = require('aws-sdk/clients/ssm')
const config = require("./config");
// const { service: { provider } } = require("./.serverless/serverless-state.json");
// https://www.serverless.com/framework/docs/providers/aws/guide/variables/#reference-variables-in-javascript-files
module.exports = async () => {
  // So that we can run it locally too!
  const { region, vpc_stack_name, stage } = await config();
  // const {stage} = provider;

  const ssm = new SSM({ region })

  const subnet = await ssm
    .getParameter({
      Name: `/SLS/${vpc_stack_name}-${stage}/AppSubnets`,
      WithDecryption: true,
    })
    .promise()

  return subnet.Parameter.Value.split(",")
}
