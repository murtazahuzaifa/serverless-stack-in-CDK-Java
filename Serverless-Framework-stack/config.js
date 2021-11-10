const vpc_stack_name = "vpc-dev";
const main_stack_name = "main-serverless-dev";
const region = "us-east-1";
const mount_dir = "/myDir";
const stage = `dev`;

const config = {
    vpc_stack_name,
    main_stack_name,
    region,
    vpc_zones: [`${region}a`, `${region}b`],
    mount_dir,
    stage,
}

module.exports = async () => {
    return config
}