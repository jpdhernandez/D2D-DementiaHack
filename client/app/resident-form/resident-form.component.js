'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');

import residentForm from "./resident-form.service";
import routes from './resident-form.routes';

export class ResidentFormComponent {

  constructor(residentForm, $routeParams) {
    "ngInject";
    this.$routeParams = $routeParams;
    this.message = 'Hello';
    this.residentForm = residentForm;
    this.props = residentForm.props;

    this.summaryQuestions = [];
    this.identityQuestions = [];
    this.tabIdx = 0;
    this.lastIdx = 8;
  }

  lastTab() {
    this.tabIdx--;
  }

  nextTab() {
    // max tab is 8
    this.tabIdx < 8 ? this.tabIdx++ : this.lastIdx;
  }

  submit(data) {
    residentForm.submit(this.$routeParams.userId, data);
  } 
}

export default angular.module('d2DDementiaHackApp.resident-form', [ngRoute])
  .config(routes)
  .factory("residentForm", residentForm)
  .component('residentForm', {
    template: require('./resident-form.html'),
    controller: ResidentFormComponent
  })
  .name;