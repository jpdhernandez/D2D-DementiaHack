'use strict';

import angular from 'angular';

export default angular.module('d2DDementiaHackApp.constants', [])
  .constant('appConfig', require('../../server/config/environment/shared'))
  .name;
