export function convertMilliSecondsToMinutesAndSeconds(millis?: number) {
  if (!millis) return '0:00'
  var minutes = Math.floor(millis / 60000)
  var seconds = Number(((millis % 60000) / 1000).toFixed(0))
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}

export const convertWidthToBoundary = (value: number, min: number, max: number) => {
  if (value < min) return min
  if (value > max) return max
  return value
}

export const convertUriToDomainTypeId = (uri: string) => {
  const [domain, type, id] = uri.split(':')
  return { domain, type, id }
}
