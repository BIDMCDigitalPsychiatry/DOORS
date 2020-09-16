import { identityPoolIdUnauth, region } from '../../package.json';
const AWS = require('aws-sdk'); // Load the AWS SDK for Node.js

// Initialize the Amazon Cognito credentials provider
export function configDatabase() {
  console.log('Initializing Database');
  AWS.config.region = region;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolIdUnauth
  });
  return new AWS.DynamoDB.DocumentClient();
}

export type TableName = 'doors-users' | 'doors-instructors' | 'doors-students' | 'doors-settings';

export const tables = {
  users: 'doors-users' as TableName,
  instructors: 'doors-instructors' as TableName,
  students: 'doors-students' as TableName,
  settings: 'doors-settings' as TableName
};
