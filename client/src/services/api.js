import { localStorage } from "../services/storages"

const base = "http://10.10.105.95:1337/api"

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
    .then(response => response.json())
    .catch(console.error)
}
