import { rest } from "msw"

import { MOCK_API_URL } from "@/lib/constant/path"
import { RECENTLY_PLAYED_TRACK_DATA, TOP_TRACKS_DATA, TRACK_DATA } from "@/mock/api/data/tracks-data"

const TracksHandler = [
  rest.get(`${MOCK_API_URL}/home/top-track`, (_, res, ctx) => res(ctx.json(TOP_TRACKS_DATA))),
  rest.get(`${MOCK_API_URL}/home/track`, (_, res, ctx) => res(ctx.json(TRACK_DATA))),
  rest.get(`${MOCK_API_URL}/home/recently-played-track`, (_, res, ctx) => res(ctx.json(RECENTLY_PLAYED_TRACK_DATA)))
]
export default TracksHandler