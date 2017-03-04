'use strict';

import angular from 'angular';
import SettingsController from './settings.controller';

export default angular.module('d2d2App.settings', [])
  .controller('SettingsController', SettingsController)
  .name;
