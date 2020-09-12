import * as React from 'react';
import { region, identityPoolId } from '../../../../../package.json';
import { useTableFilter } from '../helpers';
import useProcessData from '../../../../database/useProcessData';
//import { tables } from '../../../../database/dbConfig';

export const AWS = require('aws-sdk'); // Load the AWS SDK for Node.js

// Initialize the Amazon Cognito credentials provider
AWS.config.region = region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: identityPoolId
});

export const dynamo = new AWS.DynamoDB.DocumentClient();

export const useDeleteInstructors = ({ instructors, onSuccess: OnSuccess = undefined }) => {
  const processData = useProcessData();

  return React.useCallback(
    event => {
      event.stopPropagation();
      processData({
        Action: 'd',
        Data: {
          Instructors: instructors
        },
        onSuccess: r => OnSuccess && OnSuccess(r)
      });
    },
    [instructors, OnSuccess, processData]
  );
};

export const useInstructors = (table, tab) => {
  /*
  const [state, setState] = React.useState({});

  
  // Load data from the database
  React.useEffect(() => {
    const getItems = async () => {
      let scanResults = [];
      let items;
      var params = {
        TableName: tables.users,
        ExclusiveStartKey: undefined
      };
      do {
        items = await dynamo.scan(params).promise();
        items.Items.forEach(i => scanResults.push(i));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
      } while (typeof items.LastEvaluatedKey != 'undefined');
      setState(
        scanResults.reduce((f, c: any) => {
          f[c._id] = c;
          return f;
        }, {})
      );
    };
    getItems();
  }, [setState]);

  console.log({ state });
  */

  const instructors = [
    { id: '1', Name: 'Test Instructor 1', Title: 'Test Title 1', Institution: 'Test Institution 1' },
    { id: '2', Name: 'Test Instructor 2', Title: 'Test Title 2', Institution: 'Test Institution 2' },
    { id: '3', Name: 'Test Instructor 3', Title: 'Test Title 3', Institution: 'Test Institution 3' }
  ];

  return useTableFilter(
    instructors.map(i => ({
      ...i,
      getValues: () => i
    })),
    table
  );
};
