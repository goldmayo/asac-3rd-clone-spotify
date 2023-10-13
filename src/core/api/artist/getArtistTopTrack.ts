import getAuthSession from '../auth/getAuthSession'

const getArtistTopsTrack = async (id: string): Promise<any> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_SPOTIFY_WEB_API_URL
  const session = await getAuthSession()
  if (session) {
    const url = `${baseUrl}/artists/${id}/top-tracks?market=KR`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
    if (!res.ok) {
      throw new Error(`Fail to fetch data during ${getArtistTopsTrack.name} status code: ${res.status}`)
    }
    const data = res.json()
    return data
  }
}

export default getArtistTopsTrack
