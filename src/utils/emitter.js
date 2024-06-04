import EventEmitter from "events";

const _emitter = new EventEmitter();
_emitter.setMaxListeners(0); // Set max listeners to unlimited

export const emitter = _emitter;
