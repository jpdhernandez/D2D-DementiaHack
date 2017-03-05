/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/resident-forms              ->  index
 * POST    /api/resident-forms              ->  create
 * GET     /api/resident-forms/:id          ->  show
 * PUT     /api/resident-forms/:id          ->  upsert
 * PATCH   /api/resident-forms/:id          ->  patch
 * DELETE  /api/resident-forms/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import ResidentForm from './resident-form.model';
import _ from 'lodash';
import nodemailer from 'nodemailer';
import User from '../user/user.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch (err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}


function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.error(err.stack);
    res.status(statusCode).send(err);
  };
}

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

function createWhenEntityNotFound(res,id) {
  return function(entity) {
    if (!entity) {
      res.status(200).send(JSON.stringify(createD2DQuestionsTemplate(id)));
      return null;
    }
    return entity;
  };
}

function createD2DQuestionsTemplate(userObjectId) {
      return {
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
        user: userObjectId
      }
}


function createQuestionItem(question, category) {
  return {
    name: question,
    value: null,
    category: category
  };
}

// Gets a list of ResidentForms
export function index(req, res) {
  return ResidentForm.find()
  .populate({ path: 'user', select: 'name email' })
  .exec()
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Gets a single ResidentForm from the DB
export function show(req, res) {
  return ResidentForm.findOne({user: req.params.userId}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new ResidentForm in the DB
export function create(req, res) {
  return ResidentForm.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates the given ResidentForm in the DB at the specified ID
export function update(req, res) {
  const updatedForm = req.body.data;

  return Promise.all([
    ResidentForm.findOne({ user: req.params.userId }),
    User.findById(req.params.userId),
    User.findOne({ email: "jpdhernandez@gmail.com" }),
  ])
  .then(([form, user, admin]) => {
    if (!form) {
      return res.send(404);
    }

    const updates = [];

    _.each(form.questions, (question, idx) => {
      const updated = updatedForm[idx];

      if (!_.isEqual(question.value, updated.value)) {
        updates.push({ oldValue: question, newValue: updated });
      }
    });

    if (updates.length) {
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'dementiahackd2d@gmail.com',
              pass: 'qt8xrW8T9ISy0gii'
          }
      });


      const questions = _.map(updates, ({ oldValue, newValue }) => {
        return `
          Question: ${oldValue.name},
          Old Answer: ${oldValue.value || "N/A"},
          New Answer: ${newValue.value || "N/A"}
        `;
      });

      let mailOptions = {
          from: '"Visual ME 👻" <dementiahackd2d@gmail.com>', // sender address
          to: `${admin.name} <${admin.email}>`, // list of receivers
          subject: 'Some changes were made by a family member', // plain text body
          html: `
            <b>Hi ${admin.name},</b>

            <p>A change was made for ${user.name}:</p>

            <p>
              ${questions}
            </p>
          ` // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
      });
    }


    return ResidentForm.findOneAndUpdate(
      { user: req.params.userId }, {
        $set: {
          questions: updatedForm
        }
      }, {
        runValidators: true
      }
    )
    .exec();
  })
  .then(() => res.send({ message: 'Successfully updated the form! We\'ll work on on making integrating these changes so that we can provide the best care for you and your family.' }))
  .catch(handleError(res));
}

// Updates an existing ResidentForm in the DB
export function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return ResidentForm.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a ResidentForm from the DB
export function destroy(req, res) {
  return ResidentForm.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
