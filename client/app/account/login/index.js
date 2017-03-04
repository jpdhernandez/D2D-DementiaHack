'use strict';

import angular from 'angular';
import LoginController from './login.controller';

export default angular.module('d2d2App.login', [])
  .controller('LoginController', LoginController)
  .name;
