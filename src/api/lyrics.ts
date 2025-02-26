import { RoboRequest, RoboResponse } from '@robojs/server'

export default async (req: RoboRequest) => {
	const { searchParams } = new URL(req.url)
	const title = searchParams.get('title')
	const artist = searchParams.get('artist')
	const response = await fetch(`${process.env.LYRICS_API_URL}?title=${title}&artist=${artist}`)
	if (!response.ok) {
		throw new Error('Lyrics not found')
	}

	const text = await response.text()
	return new RoboResponse(text, {
		headers: {
			'Content-Type': 'text/html'
		}
	})
}
