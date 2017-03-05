'use strict';
const angular = require('angular');
const _ = require('lodash');

/*@ngInject*/

export default function residentFormService($http) {
  // Service logic
  // ...

  let originalQuestions = [];
  const props = {
    allQuestions: [],
    users: [],
    submit: {}
  };

  props.getById = (userId) => {
    return $http.get("/api/resident-forms/" + userId).then((res) => {
      const data = res.data;

      originalQuestions = data.questions;
      props.allQuestions = _.groupBy(data.questions, "category");
      props.user = data.user;
    });
  };

  props.submit = (userId, updatedGroup) => {
    const flattened = _.flatten(_.values(updatedGroup));
    const data = _.map(originalQuestions, (question) => {
      question.value = _.find(flattened, (updatedQuestion) => updatedQuestion.name === question.name).value;

      return question;
    });

    return $http.put(`/api/resident-forms/${userId}`, {data})
    .then((res) => res.data);
  }

  // Public API here
  return {
    props
  };
}
