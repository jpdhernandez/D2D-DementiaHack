'use strict';

import angular from 'angular';
import SettingsController from './settings.controller';

export default angular.module('d2dApp.settings', [])
  .controller('SettingsController', SettingsController)
  .name;
