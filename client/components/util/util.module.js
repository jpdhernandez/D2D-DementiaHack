'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';

export default angular.module('d2DDementiaHackApp.util', [])
  .factory('Util', UtilService)
  .name;
