/**
 * ResidentForm model events
 */

'use strict';

import {EventEmitter} from 'events';
var ResidentFormEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ResidentFormEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(ResidentForm) {
  for(var e in events) {
    let event = events[e];
    ResidentForm.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    ResidentFormEvents.emit(event + ':' + doc._id, doc);
    ResidentFormEvents.emit(event, doc);
  };
}

export {registerEvents};
export default ResidentFormEvents;
