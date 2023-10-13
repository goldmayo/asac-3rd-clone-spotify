import getAuthSession from '../auth/getAuthSession'

const getCategories = async (limit: number): Promise<any> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_SPOTIFY_WEB_API_URL
  const session = await getAuthSession()
  if (session) {
    const url = `${baseUrl}/browse/categories?country=KR&limit=${limit}&locale=ko_KR`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
    if (!res.ok) {
      throw new Error(`Fail to fetch during ${getCategories.name} status code: ${res.status}`)
    }
    const data = res.json()
    return data
  }
}

export default getCategories
