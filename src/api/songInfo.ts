import ytdl from '@distube/ytdl-core'
import type { RoboRequest } from '@robojs/server'

interface RequestBody {
	url: string
}

export default async (req: RoboRequest) => {
	const { url } = (await req.json()) as RequestBody
	const videoId = await ytdl.getURLVideoID(url)
	const response = await ytdl.getInfo(videoId)
	return { title: response.videoDetails.title }
}
