import {
  READ_SUCCESS,
  READ_FAILED,
} from "./AreaType"

function AreaReducer(state, action) {
  switch (action.type) {
    case READ_SUCCESS:
      return {
        loading: false,
        data: action.payload.data
      }
    case READ_FAILED:
      return {
        loading: false,
        data: [],
        error: action.error
      }
    default:
      return state
  }
}
export default AreaReducer
