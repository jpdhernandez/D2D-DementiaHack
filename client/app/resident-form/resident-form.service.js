'use strict';
const angular = require('angular');
const _ = require('lodash');

/*@ngInject*/

export default function residentFormService($http) {
  // Service logic
  // ...

  const props = {
    allQuestions: [],
    users: [],
    submit: {}
  };

  $http.get("/api/resident-forms").then((res) => {
    _.each(res.data, (data) => {
      props.allQuestions = _.groupBy(data.questions, "category");
      props.users = data.users;
    });
  });

  props.submit = (userId, data) => {
    return $http.put(`/api/resident-forms/${userId}`, {data})
    .then((res) => res.data)
  }
  
  // Public API here
  return {
    props
  };
}
