const { signUpUser, signInUser, passwordChange } = require('../services/cognitoService');

exports.signUp = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const result = await signUpUser(email, name, password);
    res.status(200).json({ message: 'ok'});
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { name, password } = req.body;
    const result = await signInUser(name, password);
    res.status(200).json({ message: 'ok', accessToken: result.accessToken});
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { name, newPassword, verifyCode } = req.body;
    const result = await passwordChange(name, newPassword, verifyCode);
    res.status(200).json({ message: 'ok'});
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};
