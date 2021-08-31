import {
  READ_SUCCESS,
  READ_FAILED,
  AUTH_FAILED
} from "./ResumeType"

function ResumeReducer(state, action) {
  switch (action.type) {
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
export default ResumeReducer
