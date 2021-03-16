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
    .then(res => res.json())
    .then(data => {
      return data
    })
    .catch(error => {
      console.error(error.message)
    })
}
async function sendGet(uri, queryParams) {
  return await fetch(uri + querystring.stringify(queryParams), {
    method: "GET",
    headers: HEADERS
  })
    .then(res => res.json())
    .then(data => {
      return data
    })
    .catch(error => {
      console.error(error.message)
    })
}
export {
  sendGet,
  sendPost
}