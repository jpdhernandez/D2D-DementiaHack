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

    this.popups = [{opened: false},{opened: false},{opened: false}];

    this.submit = () => {
      residentForm.props.submit(this.$routeParams.userId, this.props.allQuestions);
    }

    // date stuff
    this.today = () => {
      this.dt = new Date();
    };
    this.today();

    this.clear = () => {
      this.dt = null;
    };

    this.inlineOptions = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
    };

    this.dateOptions = {
      dateDisabled: disabled,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
      var date = data.date,
        mode = data.mode;
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    this.toggleMin = () => {
      this.inlineOptions.minDate = this.inlineOptions.minDate ? null : new Date();
      this.dateOptions.minDate = this.inlineOptions.minDate;
    };

    this.toggleMin();

    this.open1 = () => {
      this.popup1.opened = true;
    };

    this.open2 = () => {
      this.popup2.opened = true;
    };

    this.setDate = (year, month, day) => {
      this.dt = new Date(year, month, day);
    };

    this.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    this.format = this.formats[0];
    this.altInputFormats = ['M!/d!/yyyy'];

    this.popup1 = {
      opened: false
    };

    this.popup2 = {
      opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    this.events = [{
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

        for (var i = 0; i < this.events.length; i++) {
          var currentDay = new Date(this.events[i].date).setHours(0, 0, 0, 0);

          if (dayToCheck === currentDay) {
            return this.events[i].status;
          }
        }
      }

      return '';
    }
    //date end

  }

  lastTab() {
    this.tabIdx--;
  }

  nextTab() {
    // max tab is 8
    this.tabIdx < 8 ? this.tabIdx++ : this.lastIdx;
  }

  isDate(question) {
    return question.type === "date";
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
