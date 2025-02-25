import ytdl, { videoFormat } from '@distube/ytdl-core'
import { RoboRequest, RoboResponse } from '@robojs/server'

interface RequestBody {
	url: string
	format: videoFormat
}

export default async (req: RoboRequest) => {
	// const { url } = (await req.json()) as RequestBody
	const url = req.query.url as string

	if (!ytdl.validateURL(url)) {
		return new Response(JSON.stringify({ error: 'Invalid YouTube URL' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		})
	}

	const stream = await ytdl(url, {
		filter: 'audioonly'
	})

	return new RoboResponse(stream as any, {
		headers: {
			'Content-Type': 'audio/mp3'
		}
	})
}
