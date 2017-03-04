'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './resident-form.events';

var ResidentFormSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(ResidentFormSchema);
export default mongoose.model('ResidentForm', ResidentFormSchema);
