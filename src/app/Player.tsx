import { useState, useRef, useEffect, useMemo } from 'react'

interface PlayerProps {
	url: string
}

export const Player = (props: PlayerProps) => {
	const { url } = props
	const audioRef = useRef<HTMLAudioElement>(null)
	const [isPlaying, setIsPlaying] = useState(false)

	const fetchAudio = async () => {
		const response = await fetch(url)
		console.log(url, response)
		new Audio(url).play()
		// const blob = await response.blob()
		// const objectURL = URL.createObjectURL(blob);
	}

	useEffect(() => {
		fetchAudio()
	}, [])

	const togglePlayPause = () => {
		const audio = audioRef.current

		if (audio && isPlaying) {
			audio.pause()
		} else if (audio && !isPlaying) {
			audio.play()
		}

		setIsPlaying(!isPlaying)
	}

	return (
		<>
			<audio ref={audioRef} src={url} preload="auto" />
			<button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
		</>
	)
}
