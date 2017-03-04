'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './resident-form.events';

var ResidentFormSchema = new mongoose.Schema({
  Name: String,
  "Date of birth": String,
  "Suite #": String,
  "Date Form Completed": String,
  "Form Completed By (Resident of Name of Other)": String,
  "Move In Date": String,
  Identity : {
    "Where did you grow up" : String,
    "Did you belong to any groups or clubs? (volunteering, service clubs, sports leagues, etc)" : String,
    "My favourite things include" : String
  },
  Autonomy : {
    "What time do you prefer to get up?": String,
    "When do you like to go to bed?  What do your night-time rituals or routines include?": String
  },
  completed: { type: Boolean, default: false } //flag : is the form completed starts with false
});


registerEvents(ResidentFormSchema);
export default mongoose.model('ResidentForm', ResidentFormSchema);
