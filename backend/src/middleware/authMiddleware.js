const jwt = require("jsonwebtoken");
const env = require("../config/env");
const asyncHandler = require("../utils/asyncHandler");
const HttpError = require("../utils/httpError");
const userRepository = require("../modules/users/userRepository");

const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new HttpError(401, "Authorization token is required");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await userRepository.findById(payload.userId);

    if (!user) {
      throw new HttpError(401, "User not found for the provided token");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }

    throw new HttpError(401, "Invalid or expired token");
  }
});

module.exports = {
  authenticate
};
