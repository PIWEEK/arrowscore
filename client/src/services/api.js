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

	return fetch(`${base}/${resource}`, {
		method,
    headers: {...baseHeaders, ...authHeaders},
		body: data && JSON.stringify(data)
  })
    .then(response => response.json()) //review how data is sent back
    .catch(console.error)
}
