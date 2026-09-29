const configuredCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const safeCodespaceName = /^[a-z0-9-]+$/i.test(configuredCodespaceName || '')
  ? configuredCodespaceName
  : ''

export const API_BASE_URL = safeCodespaceName
  ? `https://${safeCodespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export const API_TARGET = safeCodespaceName ? 'Codespaces' : 'localhost'

export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) return payload

  for (const key of ['results', 'items', 'data']) {
    if (Array.isArray(payload?.[key])) return payload[key]
  }

  throw new Error('The API returned an unsupported collection response.')
}

export async function fetchCollection(component, signal) {
  const response = await fetch(`${API_BASE_URL}/${component}/`, { signal })

  if (!response.ok) {
    throw new Error(`Could not load ${component} (HTTP ${response.status}).`)
  }

  return normalizeCollectionResponse(await response.json())
}