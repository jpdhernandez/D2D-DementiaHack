/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import config from './environment/';
import ResidentForm from '../api/resident-form/resident-form.model.js';

var categoryEnum = {
  SUMMARY: "summary",
  IDENTITY: "identity"
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
  if(config.seedDB) {
    Thing.find({}).remove()
      .then(() => {
        Thing.create({
          name: 'Development Tools',
          info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
                + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
                + 'Stylus, Sass, and Less.'
        }, {
          name: 'Server and Client integration',
          info: 'Built with a powerful and fun stack: MongoDB, Express, '
                + 'AngularJS, and Node.'
        }, {
          name: 'Smart Build System',
          info: 'Build system ignores `spec` files, allowing you to keep '
                + 'tests alongside code. Automatic injection of scripts and '
                + 'styles into your index.html'
        }, {
          name: 'Modular Structure',
          info: 'Best practice client and server structures allow for more '
                + 'code reusability and maximum scalability'
        }, {
          name: 'Optimized Build',
          info: 'Build process packs up your templates as a single JavaScript '
                + 'payload, minifies your scripts/css/images, and rewrites asset '
                + 'names for caching.'
        }, {
          name: 'Deployment Ready',
          info: 'Easily deploy your app to Heroku or Openshift with the heroku '
                + 'and openshift subgenerators'
        });
      })
    .then(() => console.log('finished populating things'))
    .catch(err => console.log('error populating things', err));

    User.find({}).remove()
      .then(() => {
        User.create({
          provider: 'local',
          name: 'Test User',
          email: 'test@example.com',
          password: 'test'
        }, {
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          email: 'admin@example.com',
          password: 'admin'
        })
        .then(() => console.log('finished populating users'))
        .catch(err => console.log('error populating users', err));
      });

      ResidentForm.find({}).remove()
  .then(() => {
    ResidentForm.create({
      questions: [
        createQuestionItem("Resident Name" , categoryEnum.SUMMARY),
        createQuestionItem("Date of Birth",categoryEnum.SUMMARY),
        createQuestionItem("Suite #", categoryEnum.SUMMARY),
        createQuestionItem("Form Completed By (Resident or Name of Other):", categoryEnum.SUMMARY),
        createQuestionItem("Date Form Completed:", categoryEnum.SUMMARY),
        createQuestionItem("Move In Date:", categoryEnum.SUMMARY),
        createQuestionItem("Where did you grow up?", categoryEnum.IDENTITY),
        createQuestionItem("Did you go to school – if so, where?", categoryEnum.IDENTITY),
        createQuestionItem("Tell me about the work you were involved in. Did you enjoy it? Do you miss it?", categoryEnum.IDENTITY),
        createQuestionItem("If you married, tell me about your spouse and about who makes up your family. (specic names and relationships are helpful details!)", categoryEnum.IDENTITY),
        createQuestionItem("Was belonging to a faith group important to you? Is it now? Is there a denomination you wish to continue to be connected with?", categoryEnum.IDENTITY),
        createQuestionItem("Things people say I am good at, or talented at", categoryEnum.IDENTITY),
        createQuestionItem("Do you need alone time? What does that look like?", categoryEnum.IDENTITY),
        createQuestionItem("Do you like to be around others? (when and how?)", categoryEnum.IDENTITY)
      ],
      completedOn: Date.now(),
      user: "58bb4689d64ecfc43a76ec88"
    }, {
      questions: [
        createQuestionItem("Resident Name", categoryEnum.SUMMARY),
        createQuestionItem("Date of Birth", categoryEnum.SUMMARY),
        createQuestionItem("Suite #", categoryEnum.SUMMARY),
        createQuestionItem("Form Completed By (Resident or Name of Other):", categoryEnum.SUMMARY),
        createQuestionItem("Date Form Completed:", categoryEnum.SUMMARY),
        createQuestionItem("Move In Date:", categoryEnum.SUMMARY),
        createQuestionItem("Where did you grow up?", categoryEnum.IDENTITY),
        createQuestionItem("Did you go to school – if so, where?", categoryEnum.IDENTITY),
        createQuestionItem("Tell me about the work you were involved in. Did you enjoy it? Do you miss it?", categoryEnum.IDENTITY),
        createQuestionItem("If you married, tell me about your spouse and about who makes up your family. (specic names and relationships are helpful details!)", categoryEnum.IDENTITY),
        createQuestionItem("Was belonging to a faith group important to you? Is it now? Is there a denomination you wish to continue to be connected with?", categoryEnum.IDENTITY),
        createQuestionItem("Things people say I am good at, or talented at", categoryEnum.IDENTITY),
        createQuestionItem("Do you need alone time? What does that look like?", categoryEnum.IDENTITY),
        createQuestionItem("Do you like to be around others? (when and how?)", categoryEnum.IDENTITY)
      ],
      completedOn: Date.now(),
      user: "58bb4689d64ecfc43a76ec88"
    })
  });
  }
}
