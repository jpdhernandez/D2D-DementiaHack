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
    res.status(statusCode).send(err);
  };
}

var categoryEnum = {
  SUMMARY: "summary",
  IDENTITY: "identity",
  AUTONOMY: "autonomy",
  GROWTH: "growth"
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
          createQuestionItem('Things you might like to teach or share?', categoryEnum.GROWTH)
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
  return ResidentForm.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single ResidentForm from the DB
export function show(req, res) {
  return ResidentForm.findOne({user: req.params.userId}).exec()
    .then(createWhenEntityNotFound(res, req.params.id))
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
  return ResidentForm.findOneAndUpdate({
    user: req.params.userId
  }, req.body, {
    runValidators: true
  }).exec()
  .then(respondWithResult(res))
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
