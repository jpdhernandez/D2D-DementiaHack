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
    summaryQuestions: [],
    identityQuestions: []
  };

  $http.get("/api/resident-forms").then((res) => {
    _.each(res.data, (data) => {
      props.allQuestions = _.groupBy(data.questions, "category");
      props.users = data.users;

      // props.summaryQuestions = _.filter(props.allQuestions, ["category", "summary"]);
      // props.identityQuestions = _.filter(props.allQuestions, ["category", "identity"]);
      // props.autonomyQuestions = _.filter(props.allQuestions, ["category", "autonomy"]);
    });
  });

  function submit(userId, data) {
    return $http.put(`/api/resident-forms/${userId}`, {data})
    .then((res) => res.data)
  }
  
  // Public API here
  return {
    props
  };
}
