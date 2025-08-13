import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

// Props
interface Ec2StackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
}
export class Ec2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Ec2StackProps) {
    super(scope, id, props);

    // EC2 Instance
    const instance = new ec2.Instance(this, "MyPrivateEC2", {
        vpc: props.vpc,
        vpcSubnets: {
            subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
        machineImage: new ec2.AmazonLinuxImage({
            generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
        }),
        instanceType: ec2.InstanceType.of(
            ec2.InstanceClass.T3,
            ec2.InstanceSize.MICRO
        ),
    });
         cdk.Tags.of(instance).add("Name", "MyPrivateEC2");

    // EC2 Instance for Database
    const dbInstance = new ec2.Instance(this, "MyDatabaseEC2", {
        vpc: props.vpc,
        vpcSubnets: {
            subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
        machineImage: new ec2.AmazonLinuxImage({
            generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
        }),
        instanceType: ec2.InstanceType.of(
            ec2.InstanceClass.T3,
            ec2.InstanceSize.MICRO
        ),
    });
    cdk.Tags.of(dbInstance).add("Name", "MyDatabaseEC2");       
  }
}