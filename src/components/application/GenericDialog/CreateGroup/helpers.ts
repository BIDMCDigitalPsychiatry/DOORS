import { region, identityPoolIdUnauth, sourceEmailAddress } from '../../../../../package.json';
import { hostAddress, publicUrl } from '../../../../helpers';
export const AWS = require('aws-sdk'); // Load the AWS SDK for Node.js

// Initialize the Amazon Cognito credentials provider
AWS.config.region = region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: identityPoolIdUnauth
});

export const sendStudentInvite = ({
  email,
  role = 'Student',
  id,
  name = 'Unknown Group Name',
  type = 'Unknown Group Type',
  location = 'Unknown Location',
  onSuccess = undefined,
  onError = undefined
}) => {
  const body = `You have been invited to the Doors Web Application:
    <p>User Email: ${email}</p>  
    <p>Role: ${role}</p>
    <p>Group Name: ${name}</p>
    <p>Group Type: ${type}</p>    
    <p>Group Location: ${location}</p>    
    
    <h2><a href='${hostAddress(publicUrl(`/?i=${id}`))}'>Click here to accept the invite<a/></h2>
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
        Data: `${role} Invitation to Doors Web Application!`
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
      onSuccess && onSuccess(data);
    })
    .catch(function (err) {
      console.error(err, err.stack);
      onError && onError(err);
    });
};
