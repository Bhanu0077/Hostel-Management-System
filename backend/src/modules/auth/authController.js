const asyncHandler = require("../../utils/asyncHandler");
const authService = require("./authService");

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body.email, req.body.password);

  res.json(result);
});

module.exports = {
  login
};
