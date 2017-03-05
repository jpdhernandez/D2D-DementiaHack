'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/resident-form/:userId', {
      template: '<resident-form></resident-form>'
    });
}