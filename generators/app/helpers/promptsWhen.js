/**
 * When Helper Function for Prompts
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 *
 * When helper function to stop repeat myself
 * Wrapping When Function to pass the prompt Type
 * {
    when: when('craft'),
    }
 *
 * @param type (String)
 * @param question (String)
 * @param condition (String)
 * @returns {function(*)}
 */
const when = ({type, question, condition = '='}) => {
  // Return actual when function provided by inquirer
  return promptAnswers => {
    if (condition === '=') {
      return promptAnswers[question] === type;
    } else if (condition === '!=') {
      return promptAnswers[question] !== type;
    }
  };
};

module.exports = when;
