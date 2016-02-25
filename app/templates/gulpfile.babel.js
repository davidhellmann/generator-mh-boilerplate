'use strict';

import requireDir from 'require-dir'

global.changedOverride = false;

requireDir('./gulpfile/tasks', { recurse: true });