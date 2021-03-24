import querystring from "querystring"

const HEADERS = {
  "Content-Type": "application/json",
  "Authorization": 'Bearer ' + process.env.AUTHORIZE_TOKEN,
  "mode": "cors",
}
async function sendPost(uri, bodyData) {
  return await fetch(uri, {
    method: "POST",
    body: JSON.stringify(bodyData),
    headers: HEADERS
  })
}
async function sendGet(uri, queryParams) {
  return await fetch(uri + querystring.stringify(queryParams), {
    method: "GET",
    headers: HEADERS
  })
}
export {
  sendGet,
  sendPost
}