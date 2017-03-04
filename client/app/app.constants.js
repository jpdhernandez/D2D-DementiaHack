'use strict';

import angular from 'angular';

export default angular.module('d2d2App.constants', [])
  .constant('appConfig', require('../../server/config/environment/shared'))
  .name;
