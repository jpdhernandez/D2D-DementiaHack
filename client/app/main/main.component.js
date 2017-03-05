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

    console.log('jnflsf', this.showAllResidents)

  }



  residentClick() {
    this.showAllResidents = false;
  console.log('click!', this.showAllResidents);


  }


  test() {
    this.flag = true;
    this.x = 'cat';
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
