'use strict';

import angular from 'angular';
import routes from './admin.routes';
import AdminController from './admin.controller';

export default angular.module('d2d2App.admin', ['d2d2App.auth', 'ngRoute'])
  .config(routes)
  .controller('AdminController', AdminController)
  .name;
