import React, { useEffect } from 'react'

export default function Lyrics({
	audio,
	lyrics,
	isPlaying,
	setIsPlaying
}: {
	audio: HTMLAudioElement | null
	lyrics: { time: number; text: string }[]
	isPlaying: boolean
	setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const lyricsRef = React.useRef<HTMLDivElement>(null)
	const [currentLine, setCurrentLine] = React.useState('')
	// for debug
	const [debugTime, setDebugTime] = React.useState(audio?.currentTime ?? 0)
	const [calledHandle, setCalledHandle] = React.useState(false)

	useEffect(() => {
		if (!audio) return
		const interval = setInterval(() => {
			setDebugTime(audio?.currentTime)
		}, 500)
		return () => clearInterval(interval)
	}, [audio])

	const scrollLyrics = () => {
		const currentTime = audio?.currentTime
		const lyric = lyrics.find((line) => Math.floor(line.time) === Math.floor(currentTime ?? 0))
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

		if (!calledHandle) {
			setCalledHandle(true)
			syncLyrics()
		}
	}, [audio, lyrics])

	const getActiveLyric = (audioTime: number) => {
		return lyrics.reduce(
			(prev, curr) => (curr.time <= audioTime && curr.time > prev.time ? curr : prev),
			lyrics[0] // Start with the first lyric
		)
	}

	const isActive = (line: { time: number; text: string }, audio: HTMLAudioElement | null) => {
		if (!audio) return false
		const activeLyric = getActiveLyric(audio.currentTime)
		return activeLyric.text === line.text
	}

	return (
		<div ref={lyricsRef}>
			{/* {calledHandle && <p>Called handle</p>} */}
			{lyrics.map((line, index) => (
				<p key={index} className={isActive(line, audio) ? 'active text-pink-500' : ''}>
					{/* {`${Math.floor(debugTime)} - ${Math.floor(line.time)} : ${line.text}`} */}
					{`${line.text}`}
				</p>
			))}
		</div>
	)
}
