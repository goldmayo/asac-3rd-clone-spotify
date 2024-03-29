import getAuthSession from '../auth/getAuthSession'

const getArtist = async (id: string): Promise<any> => {
  const baseUrl = 'https://api.spotify.com/v1'
  const session = await getAuthSession()
  if (session) {
    const url = `${baseUrl}/artists/${id}`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
    if (!res.ok) {
      throw new Error(`Fail to fetch data during ${getArtist.name}`)
    }
    const data = res.json()
    return data
  }
}

export default getArtist
