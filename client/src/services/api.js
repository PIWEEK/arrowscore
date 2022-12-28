import { navigate } from "svelte-navigator"
import { localStorage } from "../services/storages"

const base = import.meta.env.VITE_API_URL

if (!base) {
  console.error("Please, define VITE_API_URL in `.env.local`")
}

const baseHeaders = {
  "content-type": "application/json",
  "Accept": "application/json"
}

/**
 * @param {string} method ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
 * @param {string} resource
 * @param {Record<string, unknown>} [data]
 */
export const apiClient = (method, resource, data) => {
  const authToken = localStorage.get("token")
  const authHeaders = authToken ? {"Authorization": `Bearer ${authToken}`} : {}

  const content = {
		method,
    headers: {...baseHeaders, ...authHeaders},
  }
  if (data) {
    content.body = data && JSON.stringify(data)
  }

	return fetch(`${base}/${resource}`, content)
    .then(response => response.json()) //review how data is sent back
    .catch(console.error)
}

export const logout = () => {
  //localStorage.clear()
  localStorage.remove("token")
  localStorage.remove("user")
  localStorage.remove("scoreSystems")
  localStorage.remove("sessions")
  localStorage.remove("tournaments")

  navigate("/auth")
}
