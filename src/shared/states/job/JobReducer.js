import {
  ADD_JOB_SUCCESS,
  ADD_JOB_FAILED,
  SAVE_JOB_SUCCESS,
  SAVE_JOB_FAILED,
  READ_JOB_SUCCESS,
  READ_JOB_FAILED,
  AUTH_FAILED
} from "./JobType"

function JobReducer(state, action) {
  switch (action.type) {
    case ADD_JOB_SUCCESS: 
      return {
        loading: false,
        status: true,
        result: action.payload.result,
        message: action.payload.message
      }
    case ADD_JOB_FAILED:
      return {
        loading: false,
        status: false,
        result: null,
        message: action.payload.message
      }
    case SAVE_JOB_SUCCESS:
      return {
        loading: false,
        status: true,
        message: action.payload.message
      }
    case SAVE_JOB_FAILED:
      return {
        loading: false,
        status: false,
        message: action.payload.message
      }
    case READ_JOB_SUCCESS:
      return {
        loading: false,
        itemsCount: action.payload.itemCount,
        data: action.payload.data,
        error: null
      }
    case READ_JOB_FAILED:
      return {
        loading: false,
        itemsCount: 0,
        data: null,
        error: action.error
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
