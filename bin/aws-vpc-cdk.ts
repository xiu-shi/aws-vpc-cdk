#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AwsVpcCdkStack } from '../lib/aws-vpc-cdk-stack';
import { Ec2Stack } from '../lib/ec2-stack';

const app = new cdk.App();
const vpcStack = new AwsVpcCdkStack(app, 'AwsVpcCdkStack', {

});

new Ec2Stack(app, 'MyEC2Stack', {
  vpc: vpcStack.vpc
});

app.synth();