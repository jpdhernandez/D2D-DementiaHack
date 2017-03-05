'use strict';

export default class AdminController {
  /*@ngInject*/
  constructor($http) {
    $http.get('/api/resident-forms')
    .then((res) => {
      this.forms = res.data;
    });
  }
}
