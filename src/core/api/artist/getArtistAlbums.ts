import getAuthSession from '../auth/getAuthSession'

//  album - single - appears_on - compilation
const getArtistAlbums = async (id: string, limit: number): Promise<any> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_SPOTIFY_WEB_API_URL
  const session = await getAuthSession()
  if (session) {
    const url = `${baseUrl}/artists/${id}/albums?include_groups=single%2Cappears_on%2Calbum%2Ccompilation&market=KR&limit=${limit}`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
    if (!res.ok) {
      throw new Error(`Fail to fetch data during ${getArtistAlbums.name} status code: ${res.status}`)
    }
    const data = res.json()
    return data
  }
}

export default getArtistAlbums
