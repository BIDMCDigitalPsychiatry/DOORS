import { identityPoolIdUnauth, region } from '../../package.json';

export const AWS = require('aws-sdk'); // Load the AWS SDK for Node.js

// Initialize the Amazon Cognito credentials provider
AWS.config.region = region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: identityPoolIdUnauth
});

export const dynamo = new AWS.DynamoDB.DocumentClient();

export type TableName = 'doors-users' | 'doors-instructors' | 'doors-students' | 'doors-settings';

export const tables = {
  users: 'doors-users' as TableName,
  instructors: 'doors-instructors' as TableName,
  students: 'doors-students' as TableName,
  settings: 'doors-settings' as TableName
};
