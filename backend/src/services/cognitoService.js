const { CognitoIdentityProviderClient, SignUpCommand, AdminConfirmSignUpCommand, InitiateAuthCommand, ForgotPasswordCommand, ConfirmForgotPasswordCommand, AdminUpdateUserAttributesCommand } = require("@aws-sdk/client-cognito-identity-provider");
const crypto = require("crypto");

const getSecretHash = (username) => {
  const clientId = process.env.COGNITO_CLIENT_ID;
  const clientSecret = process.env.COGNITO_CLIENT_SECRET;
  const hmac = crypto.createHmac("sha256", clientSecret);
  hmac.update(username + clientId);
  return hmac.digest("base64");
};

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION
});

exports.signUpUser = async (email, name, password) => {
  try {
    const secretHash = getSecretHash(name);

    // ユーザーのサインアップ
    const signUpCommand = new SignUpCommand({
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: name,
    Password: password,
    UserAttributes: [
        { Name: "email", Value: email }
    ],
    SecretHash: secretHash
    });
  
    const signUpResponse = await cognitoClient.send(signUpCommand);

    // 管理者によるサインアップの確認
    const adminConfirmCommand = new AdminConfirmSignUpCommand({
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    Username: name
    });

    await cognitoClient.send(adminConfirmCommand);

    // メールアドレスを確認済みに設定
    const updateAttributesCommand = new AdminUpdateUserAttributesCommand({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        Username: name,
        UserAttributes: [
          { Name: "email_verified", Value: "true" }
        ]
      });
  
      await cognitoClient.send(updateAttributesCommand);

    return signUpResponse;
  } catch (error) {
      console.error("Error signing up user:", error);
      throw error;
  }
};

exports.signInUser = async (name, password) => {
  try {
    // ユーザーのサインイン
    const signInCommand = new InitiateAuthCommand({
        ClientId: process.env.COGNITO_CLIENT_ID,
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: {
            USERNAME: name,
            PASSWORD: password,
            SECRET_HASH: getSecretHash(name)
        }
    });
  
    const signInResponse = await cognitoClient.send(signInCommand);

    // アクセストークンを取得
    const accessToken = signInResponse.AuthenticationResult.AccessToken;
  
    return {accessToken: accessToken};
  } catch (error) {
      console.error("Error signing in user:", error);
      throw error;
  }
};

exports.sendVerification = async (name) => {
    try {
      const command = new ForgotPasswordCommand({
        ClientId: process.env.COGNITO_CLIENT_ID,
        Username: name,
        SecretHash: getSecretHash(name)
      });
    
      const response = await cognitoClient.send(command);
    
      return {response: response};
    } catch (error) {
        console.error("Error send verification:", error);
        throw error;
    }
};

exports.passwordChange = async (name, newPassword, verifyCode) => {
    try {
      const command = new ConfirmForgotPasswordCommand({
        ClientId: process.env.COGNITO_CLIENT_ID,
        Username: name,
        Password: newPassword,
        SecretHash: getSecretHash(name),
        ConfirmationCode: verifyCode
      })
    
      const response = await cognitoClient.send(command);
      console.log(response);
    
      return {response: response};
    } catch (error) {
        console.error("Error send verification:", error);
        throw error;
    }
};
