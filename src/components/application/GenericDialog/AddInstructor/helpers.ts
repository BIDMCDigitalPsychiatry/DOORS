import { region, identityPoolIdEmail, sourceEmailAddress } from '../../../../../package.json';
import { hostAddress } from '../../../../helpers';
import { v4 as uuidv4 } from 'uuid';
export const AWS = require('aws-sdk'); // Load the AWS SDK for Node.js

// Initialize the Amazon Cognito credentials provider
AWS.config.region = region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: identityPoolIdEmail
});

export const sendInstructorInvite = ({ email, role = 'Instructor', onSuccess = undefined, onError = undefined }) => {
  const uuid = uuidv4();

  const body = `You have been invited to the Doors Web Application:
    <p>User Email: ${email}</p>  
    <p>Role: ${role}</p>
    <a href='${hostAddress(`/?i=${uuid}`)}'>Click here to accept the invite<a/>    
    `;

  // Create sendEmail params
  var params = {
    Destination: {
      /* required */ CcAddresses: [],
      ToAddresses: [email]
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: 'UTF-8',
          Data: body
        },
        Text: {
          Charset: 'UTF-8',
          Data: body
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Invitation to the Doors Web Application! ${role}`
      }
    },
    Source: sourceEmailAddress /* required */,
    ReplyToAddresses: [sourceEmailAddress]
  };

  // Create the promise and SES service object
  var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

  // Handle promise's fulfilled/rejected states
  sendPromise
    .then(function (data) {
      console.log(data.MessageId);
      onSuccess && onSuccess(data);
    })
    .catch(function (err) {
      console.error(err, err.stack);
      onError && onError(err);
    });
};
