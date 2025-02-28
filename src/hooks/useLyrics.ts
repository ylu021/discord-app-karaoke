import { useEffect, useState } from 'react'
import { parseLRC } from '../utils/parseLRC'

export default function useLyrics(title?: string, artist?: string) {
	const [error, setError] = useState<string | null>(null)
	const [lyrics, setLyrics] = useState<{ time: number; text: string }[] | undefined | null>([])
	const [startIndex, setStartIndex] = useState<number>(0)
	const [metadata, setMetadata] = useState<{ [key: string]: string } | null | undefined>(null)

	useEffect(() => {
		async function fetchLyrics() {
			try {
				const response = await fetch(`/api/lyrics?title=${title}&artist=${artist}`)
				if (!response.ok) {
					console.error('Lyrics not found')
				}
				const text = await response.text()
				const processed = processLyrics(text)
				setLyrics(processed?.lyrics)
				setMetadata(processed?.metadata)
				const indexOfFirstLine = processed?.lyrics?.findIndex((line) => isFirstLine(line.text)) ?? 0
				setStartIndex(Math.max(0, indexOfFirstLine))
			} catch (e) {
				setError(e as string)
				console.error(e)
			}
		}
		fetchLyrics()
	}, [title, artist])

	return {
		startIndex,
		lyrics,
		metadata,
		error
	}
}

function isFirstLine(line: string) {
	return !['Lyricist', 'Arranger', 'Composer'].some((keyword) => line.includes(keyword))
}

function processLyrics(lrcText: string) {
	const parser = new DOMParser()
	const doc = parser.parseFromString(lrcText, 'text/html')
	const lyrics = doc?.documentElement?.textContent

	if (lyrics) {
		return parseLRC(lyrics)
	}
	return null
}
