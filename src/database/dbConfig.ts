import { identityPoolIdUnauth, region } from '../../package.json';

export const AWS = require('aws-sdk'); // Load the AWS SDK for Node.js

// Initialize the Amazon Cognito credentials provider
AWS.config.region = region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: identityPoolIdUnauth
});

export const dynamo = new AWS.DynamoDB.DocumentClient();

export type TableName =  
  | 'doors-classes-admin'
  | 'doors-classes-instructor'
  | 'doors-users'
  | 'doors-instructors'
  | 'doors-students'
  | 'doors-attendance'
  | 'doors-groups'
  | 'doors-profiles';

export const tables = {
  users: 'doors-users' as TableName,
  instructors: 'doors-instructors' as TableName,
  students: 'doors-students' as TableName,
  attendance: 'doors-attendance' as TableName,
  groups: 'doors-groups' as TableName,
  profiles: 'doors-profiles' as TableName,  
  classesAdmin: 'doors-classes-admin' as TableName,
  classesInstructor: 'doors-classes-instructor' as TableName
};
