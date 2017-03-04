'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';

export default angular.module('d2dApp.util', [])
  .factory('Util', UtilService)
  .name;
