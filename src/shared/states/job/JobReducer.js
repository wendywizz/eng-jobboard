import {
  ADD_SUCCESS,
  ADD_FAILED,
  SAVE_SUCCESS,
  SAVE_FAILED,
  READ_SUCCESS,
  READ_FAILED,
  AUTH_FAILED
} from "./JobType"

function JobReducer(state, action) {
  switch (action.type) {
    case ADD_SUCCESS: 
      return {
        success: true,
        data: action.payload.data,
        message: action.payload.message
      }
    case ADD_FAILED:
      return {
        success: false,
        data: null,
        message: action.payload.message,
        error: action.payload.error
      }
    case SAVE_SUCCESS:
      return {
        success: true,
        data: action.payload.data,
        message: action.payload.message,
      }
    case SAVE_FAILED:
      return {
        success: false,
        message: action.payload.message,
        error: action.payload.error
      }
    case READ_SUCCESS:
      return {
        data: action.payload.data,
        itemCount: action.payload.itemCount
      }
    case READ_FAILED:
      return {
        data: null,
        error: action.payload.error
      }
    case AUTH_FAILED:
      return {
        error: {
          code: 401,
          message: "Unauthorized"
        }
      }
    default:
      return state
  }
}
export default JobReducer
