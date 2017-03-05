'use strict';

import mongoose from 'mongoose';
import {
  registerEvents
} from './resident-form.events';

var ResidentFormSchema = new mongoose.Schema({
    questions: [{
        name: String,
        value: String,
        category: String
    }],
    completedOn: String,
    user: {type: mongoose.Schema.ObjectId, ref: 'user'},
});


registerEvents(ResidentFormSchema);
export default mongoose.model('ResidentForm', ResidentFormSchema);
