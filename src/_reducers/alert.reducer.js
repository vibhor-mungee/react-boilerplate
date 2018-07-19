import { alertConstants } from '../_constants';

export function alert(state = {type: 'error'}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'success',
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: 'error',
        message: action.message
      };
    case alertConstants.INFO:
      return {
        type: 'info',
        message: action.message
    };
    case alertConstants.WARNING:
      return {
        type: 'warning',
        message: action.message
    };
    case alertConstants.CLEAR:
      return {type: 'error'};
    default:
      return state
  }
}