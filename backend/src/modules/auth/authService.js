const bcrypt = require("bcryptjs");
const HttpError = require("../../utils/httpError");
const { signToken } = require("../../utils/jwt");
const userRepository = require("../users/userRepository");

async function login(email, password) {
  if (!email || !password) {
    throw new HttpError(400, "Email and password are required");
  }

  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new HttpError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw new HttpError(401, "Invalid email or password");
  }

  const token = signToken({
    userId: user.id,
    role: user.role
  });

  return {
    token,
    user: {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      role: user.role
    }
  };
}

module.exports = {
  login
};
