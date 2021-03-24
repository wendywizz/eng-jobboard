import {
  ADD_SUCCESS,
  ADD_FAILED,
  SAVE_SUCCESS,
  SAVE_FAILED,
  READ_SUCCESS,
  READ_FAILED,
  AUTH_FAILED,
  RE_FETCH
} from "./JobType"

function JobReducer(state, action) {
  switch (action.type) {
    case ADD_SUCCESS: 
      return {
        loading: false,
        status: true,
        result: action.payload.result,
        message: action.payload.message
      }
    case ADD_FAILED:
      return {
        loading: false,
        status: false,
        result: null,
        message: action.payload.message
      }
    case SAVE_SUCCESS:
      return {
        loading: false,
        status: true,
        message: action.payload.message
      }
    case SAVE_FAILED:
      return {
        loading: false,
        status: false,
        message: action.payload.message
      }
    case READ_SUCCESS:
      return {
        loading: false,
        itemsCount: action.payload.itemsCount,
        data: action.payload.data
      }
    case READ_FAILED:
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
    case RE_FETCH:
      return {
        loading: true
      }
    default:
      return state
  }
}
export default JobReducer
