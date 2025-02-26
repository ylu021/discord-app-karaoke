export function parseLRC(lrcText: string | null) {
	if (!lrcText) return
	const lines = lrcText.split('\n')
	const metadata: { [key: string]: string } = {}
	const lyrics: { time: number; text: string }[] = []

	lines.forEach((line) => {
		const metaMatch = line.match(/\[(ti|ar|al|by|offset):(.+)]/)
		if (metaMatch) {
			metadata[metaMatch[1]] = metaMatch[2].trim()
			return
		}

		const lyricsMatch = line.match(/\[(\d+):(\d+\.\d+)](.+)/)
		if (lyricsMatch) {
			const [, minutes, seconds, text] = lyricsMatch
			const formattedText = text.trim()
			const time = parseInt(minutes) * 60 + parseFloat(seconds)
			lyrics.push({ time, text: formattedText })
		}
	})

	return { metadata, lyrics }
}
