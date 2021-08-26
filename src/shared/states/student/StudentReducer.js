import {
  SAVE_SUCCESS,
  SAVE_FAILED,
  READ_SUCCESS,
  READ_FAILED,
  AUTH_FAILED,
} from "./StudentType"

function StudentReducer(state, action) {
  switch (action.type) {
    case SAVE_SUCCESS:
      return {
        success: true,
        data: action.payload.data,
        message: action.payload.message
      }
    case SAVE_FAILED:
      return {
        success: false,
        message: action.payload.message,
        error: action.payload.error
      }
    case READ_SUCCESS:
      return {
        data: action.payload.data
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
export default StudentReducer
