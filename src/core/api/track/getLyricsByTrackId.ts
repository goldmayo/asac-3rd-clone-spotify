const getLyricsByTrackId = async (id: string): Promise<any> => {
  const baseUrl = process.env.NEXT_PUBLIC_MUSICMATCH_LYRICS_URL

  const url = `${baseUrl}/?trackid=${id}`
  const res = await fetch(url, {
    method: 'GET',
  })
  // if (!res.ok) {
  //   throw new Error(`Fail to fetch data during ${getLyricsByTrackId.name} status code: ${res.status}`)
  // }
  if (res.status === 404) {
    const data = res.json()
    return data
  }
  const data = res.json()
  return data
}

export default getLyricsByTrackId
