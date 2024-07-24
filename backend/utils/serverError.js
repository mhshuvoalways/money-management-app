const serverError = (res) => {
  return res.status(500).json({
    message: "Server error occurred! Try again",
  });
};

module.exports = serverError;
