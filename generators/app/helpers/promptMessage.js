/**
 * Consistent style for prompt Messages
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

const chalk = require('chalk');

const message = ({headline = 'Headline', description = 'description', defaultValue = 'Default:'}) => {
  return `${chalk.green.underline.bold(`${headline}`)}
  ${description}${defaultValue ? `\n  ${chalk.underline.yellow.dim(defaultValue)}` : ''}`;
};

module.exports = message;
