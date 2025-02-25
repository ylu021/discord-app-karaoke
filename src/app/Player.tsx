import { useState, useRef, useEffect, useMemo } from 'react'
import { URL as testURL } from './Activity'

interface PlayerProps {
	url: string
}

export const Player = (props: PlayerProps) => {
	const { url } = props
	const audioRef = useRef<HTMLAudioElement>(null)
	const [audioInfo, setAudioInfo] = useState<any>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [isLoading, setLoading] = useState(false)

	const fetchAudio = async () => {
		setLoading(true)
		const info = await fetchAudioInfo()
		setAudioInfo(info)

		const response = await fetch(url)
		setLoading(false)
		if (audioRef.current) {
			const blob = await response.blob()
			const objectURL = URL.createObjectURL(blob)
			audioRef.current.src = objectURL // Set the source
			togglePlayPause()
		}
	}
	const fetchAudioInfo = async () => {
		const response = await fetch('/api/songInfo', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url: testURL })
		})
		const data = await response.json()
		return data
	}

	useEffect(() => {
		fetchAudioInfo()
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
			{isLoading ? (
				<span>Loading...</span>
			) : (
				<>
					<div>
						{audioInfo && <div>{`Playing ${audioInfo.title}`}</div>}
						<audio ref={audioRef} preload="auto" />
						{audioRef?.current?.src ? (
							<button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
						) : (
							<span>Loading Player...</span>
						)}
					</div>
				</>
			)}
		</>
	)
}
