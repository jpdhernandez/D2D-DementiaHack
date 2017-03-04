'use strict';

import angular from 'angular';
import SignupController from './signup.controller';

export default angular.module('d2dApp.signup', [])
  .controller('SignupController', SignupController)
  .name;
