# AWS Cognito Web Application

This is a simple web application that demonstrates user signup and login functionality using AWS Cognito.

## Prerequisites

Before running this application, ensure you have the following:

- Node.js installed on your machine
- AWS account with Cognito set up
- AWS CLI configured with appropriate permissions

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/wojciechtusz/cognito-playground
cd https://github.com/wojciechtusz/cognito-playground
```

2. Install dependencies:

```
npm install
```

3. Set up AWS Cognito:

- Create a user pool
- Create an app client and note down the client ID

4. Update configuration:

- Replace `region` in app.js with your actual AWS region.
- Replace `ClientId` in app.js with your actual Cognito client ID.

## Usage

Start the server:

```
node app.js
```

Access the application in your browser at `http://localhost:3000`
