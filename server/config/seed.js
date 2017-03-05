/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import config from './environment/';
import ResidentForm from '../api/resident-form/resident-form.model.js';

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
    Thing.find({}).remove()
      .then(() => {
        Thing.create({
          name: 'Development Tools',
          info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, ' +
            'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, ' +
            'Stylus, Sass, and Less.'
        }, {
          name: 'Server and Client integration',
          info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
            'AngularJS, and Node.'
        }, {
          name: 'Smart Build System',
          info: 'Build system ignores `spec` files, allowing you to keep ' +
            'tests alongside code. Automatic injection of scripts and ' +
            'styles into your index.html'
        }, {
          name: 'Modular Structure',
          info: 'Best practice client and server structures allow for more ' +
            'code reusability and maximum scalability'
        }, {
          name: 'Optimized Build',
          info: 'Build process packs up your templates as a single JavaScript ' +
            'payload, minifies your scripts/css/images, and rewrites asset ' +
            'names for caching.'
        }, {
          name: 'Deployment Ready',
          info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
            'and openshift subgenerators'
        });
      })
      .then(() => console.log('finished populating things'))
      .catch(err => console.log('error populating things', err));

    User.find({}).remove()
      .then(() => {
        for (var i = 0 ; i < totalItems; i++){
          User.create({
              provider: 'local',
              role: generateRandomUserRole(),
              name: 'Test User',
              email: 'test@example.com',
              password: 'test'
            }, function(err,instance){
              ResidentForm.create({
                questions: [
                  createQuestionItem('Resident Name', categoryEnum.SUMMARY),
                  createQuestionItem('Date of Birth', categoryEnum.SUMMARY),
                  createQuestionItem('Suite #', categoryEnum.SUMMARY),
                  createQuestionItem('Form Completed By (Resident or Name of Other):', categoryEnum.SUMMARY),
                  createQuestionItem('Date Form Completed:', categoryEnum.SUMMARY),
                  createQuestionItem('Move In Date:', categoryEnum.SUMMARY),
                  createQuestionItem('Where did you grow up?', categoryEnum.IDENTITY),
                  createQuestionItem('Did you go to school – if so, where?', categoryEnum.IDENTITY),
                  createQuestionItem('Tell me about the work you were involved in. Did you enjoy it? Do you miss it?', categoryEnum.IDENTITY),
                  createQuestionItem('If you married, tell me about your spouse and about who makes up your family. (specic names and relationships are helpful details!)', categoryEnum.IDENTITY),
                  createQuestionItem('Was belonging to a faith group important to you? Is it now? Is there a denomination you wish to continue to be connected with?', categoryEnum.IDENTITY),
                  createQuestionItem('Things people say I am good at, or talented at', categoryEnum.IDENTITY),
                  createQuestionItem('Do you need alone time? What does that look like?', categoryEnum.IDENTITY),
                  createQuestionItem('Do you like to be around others? (when and how?)', categoryEnum.IDENTITY),
                  createQuestionItem('What time do you prefer to get up?', categoryEnum.AUTONOMY),
                  createQuestionItem('What does your typical morning look '+
                   'like? (example: get up slowly, early riser, have a shower, have a coee before I get dressed,'+
                   ' what kind of breakfast you like, a walk, chores? etc.)',categoryEnum.AUTONOMY),
                  createQuestionItem('What does lunchtime look like for you?  What does a typical afternoon look like for you after lunch?   Do you have any routines you would like to keep?',categoryEnum.AUTONOMY),
                  createQuestionItem('What time do you usually have supper?  Do you enjoy a specic drink/beverage with dinner?',categoryEnum.AUTONOMY),
                  createQuestionItem('How do you like to spend your evening?  Do you have any routines or rituals you would like to keep?', categoryEnum.AUTONOMY),
                  createQuestionItem('When do you like to go to bed?  What do your night-time rituals or routines include?', categoryEnum.AUTONOMY),
                  createQuestionItem('Do you usually like to have a bath or a shower?  How often?', categoryEnum.AUTONOMY),
                  createQuestionItem('Is keeping in shape important to you?  Do you like to take a walk?  Attend a class (ie. Yoga, Cardio)?'+
                  ' Cycle, Swim, or Golf?', categoryEnum.AUTONOMY),
                  createQuestionItem('Are there things you want to learn about', categoryEnum.GROWTH),
                  createQuestionItem('New things you want to try?', categoryEnum.GROWTH),
                  createQuestionItem('Things you might like to teach or share?', categoryEnum.GROWTH),
                  createQuestionItem('Tell us about the ways tha you would like to be involved with others, within and outside the Village.',categoryEnum.CONNECTEDNESS),
                  createQuestionItem('What helps you to feel safe?',categoryEnum.SECURITY),
                  createQuestionItem('Do you appreciate routines so you know what to expect?', categoryEnum.SECURITY),
                  createQuestionItem('How can we respect your privacy?', categoryEnum.SECURITY),
                  createQuestionItem('Tell us how you may want to contribute and be involved in activities within and outside the Village that will make you feel helpful or needed.',
                  categoryEnum.MEANING),
                  createQuestionItem('Tell us about those things that bring you pleasure.',categoryEnum.JOY),
                  createQuestionItem('Are there things you really enjoy doing ?', categoryEnum.JOY),
                  createQuestionItem('Tell us about the ways that you would like to be involved with others, within and outside the Village?',
                  categoryEnum.CONNECTEDNESS)
                ],
                completedOn: Date.now(),
                user: instance._id
              })
              .then(() => {
                console.log("created resident-form for user " + instance._id);
              })
              .catch(err => console.log('error populating resident-forms',err));
            })
        }


                });

  }
}
