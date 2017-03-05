'use strict';

import mongoose from 'mongoose';
import {
  registerEvents
} from './resident-form.events';

var categoryEnum = {
  SUMMARY: 'summary',
  IDENTITY: 'identity'
};

function createQuestionItem(question, category) {
  return {
    name: question,
    value: null,
    category
  };
}

var ResidentFormSchema = new mongoose.Schema({
  questions: [{
    name: String,
    value: String,
    category: String
  }],
  completedOn: Date,
  user: {type: mongoose.Schema.ObjectId, ref: 'user'},
});

ResidentFormSchema.pre('save', function(next) {
  this.questions = [
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
    createQuestionItem('Do you like to be around others? (when and how?)', categoryEnum.IDENTITY)
  ];

  next();
});

registerEvents(ResidentFormSchema);
export default mongoose.model('ResidentForm', ResidentFormSchema);
