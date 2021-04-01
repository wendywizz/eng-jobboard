import {
  ADD_JOB_SUCCESS,
  ADD_JOB_FAILED,
  SAVE_JOB_SUCCESS,
  SAVE_JOB_FAILED,
  READ_JOB_SUCCESS,
  READ_JOB_FAILED,
  SEND_REQUEST,
  STOP_REQUEST,
  AUTH_FAILED
} from "./JobType"

function JobReducer(state, action) {
  switch (action.type) {
    case ADD_JOB_SUCCESS: 
      return {
        loading: false,
        status: true,
        data: action.payload.data,
        message: action.payload.message
      }
    case ADD_JOB_FAILED:
      return {
        loading: false,
        status: false,
        data: null,
        message: action.payload.message,
        error: action.payload.error
      }
    case SAVE_JOB_SUCCESS:
      return {
        loading: false,
        status: true,
        data: action.payload.data,
        message: action.payload.message
      }
    case SAVE_JOB_FAILED:
      return {
        loading: false,
        status: false,
        message: action.payload.message,
        error: action.payload.error
      }
    case READ_JOB_SUCCESS:
      return {
        loading: false,
        data: action.payload.data
      }
    case READ_JOB_FAILED:
      return {
        loading: false,
        data: null,
        error: action.payload.error
      }
    case SEND_REQUEST:
      return {
        loading: true
      }
    case STOP_REQUEST:
      return {
        loading: false
      }
    case AUTH_FAILED:
      return {
        loading: false,
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
