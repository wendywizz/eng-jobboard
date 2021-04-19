import querystring from "querystring"

const HEADERS = {
  "Content-Type": "application/json",
  "Authorization": 'Bearer ' + process.env.AUTHORIZE_TOKEN,
  "mode": "cors",
}
async function sendPost(uri, bodyData, headers) {
  return await fetch(uri, {
    method: "POST",
    body: JSON.stringify(bodyData),
    headers: headers ? headers : HEADERS
  })
}
async function sendGet(uri, queryParams, headers) {
  return await fetch(uri + "?" + querystring.stringify(queryParams), {
    method: "GET",
    headers: headers ? headers : HEADERS
  })
}
async function formPost(uri, formData) {
  return await fetch(uri, {
    method: "POST",
    body: formData,
    headers: { mode: "cors" }
  })
}
export {
  sendGet,
  sendPost,
  formPost
}