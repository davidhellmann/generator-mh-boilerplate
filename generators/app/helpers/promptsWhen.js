// when helper function to stop repeat myself

const when = (type) => {
  // return actual when function provided by inquirer
  return (promptAnswers) => {
    return promptAnswers.projectUsage === type ? true : false
  }
}

module.exports = when;
