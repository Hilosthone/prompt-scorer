const BASE_URL = 'https://prompt-scorer-backend.onrender.com'

export const scorePrompt = async (promptText: string) => {
  const response = await fetch(`${BASE_URL}/score`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: promptText }), 
  })

  if (!response.ok) throw new Error('Neural Engine response was not OK')
  return await response.json()
}
