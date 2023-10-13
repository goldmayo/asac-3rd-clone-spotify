export interface Lyrics {
  error: boolean
  syncType: string
  lines: Line[]
}

export interface Line {
  startTimeMs: string
  words: string
  syllables: any[]
  endTimeMs: string
}
