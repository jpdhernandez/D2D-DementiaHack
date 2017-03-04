'use strict';

import angular from 'angular';

/**
 * Removes server error when user updates input
 */
angular.module('d2dApp')
  .directive('mongooseError', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link(scope, element, attrs, ngModel) {
        element.on('keydown', () => ngModel.$setValidity('mongoose', true));
      }
    };
  });
