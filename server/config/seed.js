/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import config from './environment/';
import ResidentForm from '../api/resident-form/resident-form.model.js';
import Promise from 'bluebird';
import _ from 'lodash';

const totalItems = 100;

var categoryEnum = {
  SUMMARY: "summary",
  IDENTITY: "identity",
  AUTONOMY: "autonomy",
  GROWTH: "growth",
  CONNECTEDNESS: "connectedness",
  SECURITY: "security",
  MEANING: "meaning",
  JOY: "joy"
}


function generateRandomUserRole(){
  var roles = ["admin","staff","resident"];
  return getRandomOfItems(roles);
}


function getRandomOfItems(items){
  return items[Math.floor((Math.random() * items.length))];
}

function createQuestionItem(question, category) {
  return {
    name: question,
    value: null,
    category: category,
  }
}

function createQuestionItem(question, answer, category) {
  return {
    name: question,
    value: answer,
    category: category,
  }
}

export default function seedDatabaseIfNeeded() {
  if (config.seedDB) {
    return ResidentForm.find({}).remove()
    .then(() => {
      User.find({}).remove()
        .then(() => {
          return User.create({
            provider: 'local',
            name: 'Test User',
            email: 'test@example.com',
            password: 'test'
          }, {
            provider: 'local',
            role: 'admin',
            name: 'Julian Hernandez',
            email: 'jpdhernandez@gmail.com',
            password: 'admin'
          })
          .then(() => {
            return Promise.map(_.range(totalItems), (idx) => {
              return User.create({
                provider: 'local',
                role: generateRandomUserRole(),
                name: `Test${idx} User${idx}`,
                email: `test${idx}@example.com`,
                password: 'test'
              });
            });
          });
        });
      });
  }
}
