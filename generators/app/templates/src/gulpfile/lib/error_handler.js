/**
 * Error Handler
 */

import notify from 'gulp-notify';

export default function (errorObject, callback) {
  notify.onError(errorObject.toString().split(': ').join(':\n')).apply(this, arguments)
  // prevent hanging on the task
  if (typeof this.emit === 'function') this.emit('end')
}