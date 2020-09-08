## Doors Web Application
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Cloud Setup/Configuration

**AWS Amplify/Authentication Setup**

Note you will need to create a user and/or accesskey and secret key in order for the CLI tool to execute.  If you already have an amplify user, you can just add a new access key and use that.  Follow directions here: https://blog.logrocket.com/authentication-react-apps-aws-amplify-cognito/  

  1. Install node if not already installed.
  2. npm install -g @aws-amplify/cli - installs the amplify cli so it can be used via the command line 
  3. amplify init (select no when prompted if you would like to use an AWS Profile, then enter the accesskey and secret key) - create and setup the amplify project
  4. amplify add auth - adds authentication to amplify project
  5. amplify push - pushes the project to the cloud

**AWS Lambda Function Installation**
    
  1. Add the AWS Lambda Execute or Full Control permissions to the Unauth role created by the Amplify/Authentication Setup.
  2. In the cloud_functions/xxxxxx directory, run npm install to generate the node_modules directory.
  3. Zip contents of the cloud_functions/xxxxxx folder and upload to AWS lambda console.
  4. Expose the lambda function via the desired endpoint (http) so the client app can access it.

**Dynamo DB**
  
  1. Add the AWS Dynamo DB permissions to the Unauth role created by the Amplify/Authentication Setup.
  2. In the Dynamo DB web console create the applications table

