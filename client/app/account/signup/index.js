'use strict';

import angular from 'angular';
import SignupController from './signup.controller';

export default angular.module('d2d2App.signup', [])
  .controller('SignupController', SignupController)
  .name;
