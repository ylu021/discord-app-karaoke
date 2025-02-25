import ytdl from '@distube/ytdl-core'
import { RoboRequest, RoboResponse } from '@robojs/server'

export default async (req: RoboRequest) => {
	const { searchParams } = new URL(req.url)
	const url = searchParams.get('url')

	if (!url || !ytdl.validateURL(url)) {
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
