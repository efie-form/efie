export const MESSAGE_TYPE = {
  INIT: 'init',
  SET_DATA: 'set-data',
  GET_DATA: 'get-data',
  RESET_DATA: 'reset-data',
  SET_HEIGHT: 'set-height',
  LOADED: 'loaded',
  SET_FORM_INPUTS: 'set-form-inputs',
  INIT_DATA: 'init-data',
} as const;

export const EXTERNAL_MESSAGE_TYPE = {
  RESET_DATA: 'reset-data',
  INIT_DATA: 'init-data',
  SET_HEIGHT: 'set-height',
  SET_FORM_INPUTS: 'set-form-inputs',
} as const;

export const INTERNAL_MESSAGE_TYPE = {
  LOADED: 'loaded',
  SET_DATA: 'set-data',
} as const;
