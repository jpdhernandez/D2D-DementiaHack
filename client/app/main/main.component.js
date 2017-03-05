import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {

  awesomeThings = [];
  newThing = '';

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.meow = "meow 1 2 3";
    this.showAllResidents = true;

    this.identityFlag = true;
    this.autonomyFlag = false;
    this.connectednessFlag = false;
    this.growthFlag = false;
    this.securityFlag = false;
    this.meaningFlag = false;
    this.joyFlag = false;
  }



  residentClick() {
    this.showAllResidents = false;
  }


  identityClick() {
    this.categoriesToFalse();
    this.identityFlag = true;
  }  

  autonomyClick() {
    this.categoriesToFalse();
    this.autonomyFlag = true;
  }

  connectednessClick() {
    this.categoriesToFalse();
    this.connectednessFlag = true;
  }  

  growthClick() {
    this.categoriesToFalse();
    this.growthFlag = true;
  }

  securityClick() {
    this.categoriesToFalse();
    this.securityFlag = true;
  }

  meaningClick() {
    this.categoriesToFalse();
    this.meaningFlag = true;
  }

  joyClick() {
    this.categoriesToFalse();
    this.joyFlag = true;
  }

  categoriesToFalse() {
    this.identityFlag = false;
    this.autonomyFlag = false;
    this.connectednessFlag = false;
    this.growthFlag = false;
    this.securityFlag = false;
    this.meaningFlag = false;
    this.joyFlag = false;    
  }




  $onInit() {
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
      });
  }

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }
}



export default angular.module('d2DDementiaHackApp.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
