import getAuthSession from '../auth/getAuthSession'

const getUsersTopItems = async (
  limit: number,
  type: 'artist' | 'track',
  range: 'long' | 'medium' | 'short' = 'medium',
): Promise<any> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_SPOTIFY_WEB_API_URL
  const session = await getAuthSession()
  if (session) {
    const url = `${baseUrl}/me/top/${type}s?time_range=${range}_term&limit=${limit}`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
    if (!res.ok) {
      throw new Error(`Fail to fetch data during ${getUsersTopItems.name} status code: ${res.status}`)
    }
    const data = res.json()
    return data
  }
}

export default getUsersTopItems
