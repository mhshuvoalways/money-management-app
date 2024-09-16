const goalValidation = (value) => {
  const error = {};
  if (!value.goalName) {
    error.goalName = "Provide goal name";
  }

  if (!value.targetAmount) {
    error.targetAmount = "Provide target amount";
  }

  if (!value.saved) {
    error.saved = "Provide the amount that you have saved so far";
  }

  if (!value.contribution) {
    error.contribution = "Provide your contribution so far";
  }

  let isValid = Object.keys(error).length === 0;
  return {
    error,
    isValid,
  };
};

const contributionValidation = (value) => {
  const error = {};
  if (!value.contribution) {
    error.contribution = "Provide your contribution";
  }

  let isValid = Object.keys(error).length === 0;
  return {
    error,
    isValid,
  };
};

module.exports = {
  goalValidation,
  contributionValidation,
};
