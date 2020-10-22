import { region, identityPoolIdUnauth, adminUsers, sourceEmailAddress } from '../../../../../package.json';
export const AWS = require('aws-sdk'); // Load the AWS SDK for Node.js

// Initialize the Amazon Cognito credentials provider
AWS.config.region = region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: identityPoolIdUnauth
});

export const sendHelpEmail = ({ name, email, message, onSuccess = undefined, onError = undefined }) => {
  const body = `Help Request - DOORS Web Application:
    <p>Name: ${name}</p>  
    <p>User Email: ${email}</p>  
    <p>Message: ${message}</p>
    `;

  // Create sendEmail params
  var params = {
    Destination: {
      /* required */ CcAddresses: [],
      ToAddresses: adminUsers.split(',')
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
        Data: `Help Request - DOORS Web Application`
      }
    },
    Source: sourceEmailAddress,
    ReplyToAddresses: [email]
  };

  // Create the promise and SES service object
  var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

  // Handle promise's fulfilled/rejected states
  sendPromise
    .then(function (data) {
      onSuccess && onSuccess(data);
    })
    .catch(function (err) {
      console.error(err, err.stack);
      onError && onError(err);
    });
};
