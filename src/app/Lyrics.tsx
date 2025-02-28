import { useSyncState } from '@robojs/sync'
import React, { useEffect } from 'react'
import { useDiscordSdk } from '../hooks/useDiscordSdk'

export default function Lyrics({
	startIndex,
	audio,
	lyrics
}: {
	startIndex: number
	audio: HTMLAudioElement | null
	lyrics: { time: number; text: string }[]
}) {
	const { discordSdk } = useDiscordSdk()
	const lyricsRef = React.useRef<HTMLDivElement>(null)
	const [currentLine, setCurrentLine] = useSyncState('', [discordSdk.instanceId, 'currentLine'])
	const [calledOnce, setCalledOnce] = React.useState(false)

	const scrollLyrics = () => {
		const currentTime = audio?.currentTime
		const lyric = lyrics.slice(startIndex).find((line) => line.time === Math.floor(currentTime ?? 0))
		if (lyric && lyric.text !== currentLine) {
			setCurrentLine(lyric.text)
		}
		const activeLyric = document.querySelector('.active')
		if (activeLyric) {
			activeLyric.scrollIntoView({ behavior: 'smooth', block: 'center' })
		}
	}

	useEffect(() => {
		if (!audio) return
		let interval: NodeJS.Timeout | null = null

		const syncLyrics = () => {
			scrollLyrics()

			interval = setInterval(() => {
				scrollLyrics()
			}, 500)
		}

		if (!calledOnce) {
			setCalledOnce(true)
			syncLyrics()
		}
	}, [audio, lyrics])

	const getActiveLyric = (audioTime: number) => {
		const sliced = lyrics.slice(startIndex)
		return lyrics.slice(startIndex).reduce(
			(prev, curr) => (curr.time <= Math.floor(audioTime ?? 0) && curr.time > prev.time ? curr : prev),
			sliced[0] // Start with the first lyric
		)
	}

	const isActive = (line: { time: number; text: string }, audio: HTMLAudioElement | null) => {
		if (!audio) return false
		const activeLyric = getActiveLyric(audio.currentTime)
		return activeLyric.text === line.text
	}

	return (
		<div ref={lyricsRef}>
			{lyrics.map((line, index) => (
				<p key={index} className={isActive(line, audio) ? 'active text-pink-500' : ''}>
					{`${Math.floor(audio?.currentTime ?? 0)} : ${line.time} - ${line.text}`}
				</p>
			))}
		</div>
	)
}
