const baseURL = "http://dev.teamortix.com:4000"
// const baseURL = "http://localhost:4000"

const loggedInKey = "appeals:logged_in"
const tokenKey = "appeals:token"

export const loggedIn = () => {
  const b = window.localStorage.getItem(loggedInKey)
  return b === "y"
}

export const clearToken = () => {
  window.localStorage.removeItem(loggedInKey)
  window.localStorage.removeItem(tokenKey)
}

export const token = () => {
  return window.localStorage.getItem(tokenKey)
}

export const oauthLink = async () => {
  const res = await query("/oauth", "GET", null).catch((e) => ({
    reason: e.message || "Something went wrong.",
  }))

  if ("reason" in res) {
    throw new Error(res.reason)
  }

  return res.data.redirectURL
}

export const authorize = async (code: string, state: string) => {
  const res = await query("/authorize", "POST", { code, state }).catch((e) => ({
    reason: e.message || "Something went wrong",
  }))

  if ("reason" in res) {
    throw new Error(res.reason)
  }

  window.localStorage.setItem(loggedInKey, "y")
  window.localStorage.setItem(tokenKey, res.data.token)
}

let infocache: Promise<{ reason: string } | { data: any }> | undefined

export const info = async (token: string) => {
  if (infocache === undefined) {
    infocache = query("/info", "POST", { token })
  }

  const res = await infocache.catch((e) => ({
    reason: e.message || "Something went wrong",
  }))

  if ("reason" in res) {
    throw new Error(res.reason)
  }

  return res.data
}

export const status = async (token: string) => {
  const res = await query("/status", "POST", { token }).catch((e) => ({
    reason: e.message || "Something went wrong",
  }))

  if ("reason" in res) {
    throw new Error(res.reason)
  }

  return res.data
}

export const submit = async (token: string, data: any): Promise<any> => {
  const res = await query("/submit", "POST", {
    token,
    ...data,
  }).catch((e) => ({ reason: e.message || "Something wrong wrong" }))

  if ("reason" in res) {
    throw new Error(res.reason)
  }

  return res.data
}

export async function query(
  path: string,
  method: string,
  data: any
): Promise<{ data: any } | { reason: string }> {
  console.debug("FETCH: " + baseURL + path + " - " + JSON.stringify(data))

  let body: string | undefined = JSON.stringify(data)
  if (method !== "POST") {
    body = undefined
  }

  const response = await fetch(baseURL + path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body,
  })

  const json = await response.json()
  console.debug("RESPONSE: ", response.status, JSON.stringify(json))

  if (response.status !== 200) {
    return { reason: json.reason }
  }

  return { data: json.data }
}
