import fetch from "isomorphic-fetch"

export async function getConfirmation() {
  const data = await fetch("/.netlify/functions/transaction-complete")
    .then(res => {
      if (res.status !== 200) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(data => console.log("data", data))
    .catch(err => console.error("Error: ", err))
  return data
}
