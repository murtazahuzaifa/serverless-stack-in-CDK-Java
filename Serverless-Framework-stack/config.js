const stack_name = "serverless-app-stack";
const region = "us-east-1";
const mount_dir = "/myDir";

const config = {
    stack_name,
    region,
    vpc_zones: [`${region}a`, `${region}b`],
    mount_dir,
}

module.exports = async () => {
    return config
}