'use strict';

import angular from 'angular';
import LoginController from './login.controller';

export default angular.module('d2DDementiaHackApp.login', [])
  .controller('LoginController', LoginController)
  .name;
