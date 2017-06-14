/**
 * Adding a Comment Log Style function
 *
 * @package  generator-mh-boilerplate
 * @author   Martin Herweg <info@martinherweg.de>
 */

const chalk = require('chalk');

function logComment({message = 'Logging', color = 'cyan', short = true} = {}) {
  if (process.env.NODE_ENV === 'test') {
    return;
  }
  let consoleMessage = '';

  if (short) {
    consoleMessage = `\n${chalk[color].bold(`[--- ${message} ---]`)}\n`;
  } else {
    consoleMessage = `\n\n  ${chalk[color].bold(message)}\n  ${chalk[color].bold('-----------------------------------------------------------------------------------------------')}\n`;
  }
  if (this.log) {
    return this.log(consoleMessage);
  }
  console.log(consoleMessage);
}

module.exports = logComment;
