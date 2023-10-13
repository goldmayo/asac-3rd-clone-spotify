import getAuthSession from '../auth/getAuthSession'

const getFollowedArtists = async (limit: number): Promise<any> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_SPOTIFY_WEB_API_URL
  const session = await getAuthSession()
  if (session) {
    const url = `${baseUrl}/me/following?type=artist&limit=${limit}`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
    if (!res.ok) {
      throw new Error(`Fail to fetch data during ${getFollowedArtists.name} status code: ${res.status}`)
    }
    const data = res.json()
    return data
  }
}

export default getFollowedArtists
