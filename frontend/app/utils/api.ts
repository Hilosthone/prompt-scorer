const BASE_URL = 'http://44.222.98.52:8000'

export const scorePrompt = async (promptText: string) => {
  const response = await fetch(`${BASE_URL}/score`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ prompt: promptText.trim() }),
  })

  const data = await response.json()

  if (!response.ok) {
    console.error('Backend error:', data)
    throw new Error(data?.detail || 'Neural Engine response was not OK')
  }

  return data
}