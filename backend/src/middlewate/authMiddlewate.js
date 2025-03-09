const { CognitoIdentityProviderClient, GetUserCommand } = require("@aws-sdk/client-cognito-identity-provider");

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION
});

// トークンの検証
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "トークンが必要です" });
  }

  try {
    const getUserCommand = new GetUserCommand({
      AccessToken: token
    });

    await cognitoClient.send(getUserCommand);
    

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ error: "トークンが無効です" });
  }
};

module.exports = verifyToken;