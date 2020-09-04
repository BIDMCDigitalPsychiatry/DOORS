
import { identityPoolId, region } from '../../package.json';
export const AWS = require('aws-sdk'); // Load the AWS SDK for Node.js

// Initialize the Amazon Cognito credentials provider
AWS.config.region = region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: identityPoolId
});

export const dynamo = new AWS.DynamoDB.DocumentClient();

export type TableName = 'users' | 'settings';

export const tables = {
  users: 'users' as TableName,
  settings: 'settings' as TableName
};

