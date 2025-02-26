import { useState, useRef, useEffect, useMemo } from 'react'
import { URL as testURL } from './Activity'
import useAudio from '../hooks/useAudio'

interface PlayerProps {
	url: string
}

export const Player = (props: PlayerProps) => {
	const { url } = props
	const audioRef = useRef<HTMLAudioElement>(null)
	// const [audioInfo, setAudioInfo] = useState<any>(null)
	// const [isPlaying, setIsPlaying] = useState(false)
	// const [isLoading, setLoading] = useState(false)

	// const fetchAudio = async () => {
	// 	setLoading(true)
	// 	const info = await fetchAudioInfo()
	// 	setAudioInfo(info)
	// 	const streamAPI = `/api/stream?url=${url}`
	// 	const response = await fetch(streamAPI)
	// 	setLoading(false)
	// 	if (audioRef.current) {
	// 		const blob = await response.blob()
	// 		const objectURL = URL.createObjectURL(blob)
	// 		audioRef.current.src = objectURL // Set the source
	// 		togglePlayPause()
	// 	}
	// }
	// const fetchAudioInfo = async () => {
	// 	const response = await fetch('/api/songInfo', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify({ url })
	// 	})
	// 	const data = await response.json()
	// 	return data
	// }

	// useEffect(() => {
	// 	fetchAudioInfo()
	// 	fetchAudio()
	// }, [])

	// const togglePlayPause = () => {
	// 	const audio = audioRef.current

	// 	if (audio && isPlaying) {
	// 		audio.pause()
	// 	} else if (audio && !isPlaying) {
	// 		audio.play()
	// 	}

	// 	setIsPlaying(!isPlaying)
	// }

	const { audioInfo, isPlaying, isLoading, togglePlayPause } = useAudio(audioRef, url)
	console.log('audioRef', audioRef.current)
	return (
		<>
			{isLoading ? (
				<span>Loading...</span>
			) : (
				<>
					<div className="flex flex-col items-center gap-8">
						{audioInfo && <div>{`${!isPlaying ? 'Starting' : ''} ${audioInfo.title}`}</div>}
						<audio ref={audioRef} preload="auto" />
						{audioRef?.current?.src ? (
							<button className="mt-6" onClick={togglePlayPause}>
								{isPlaying ? 'Pause' : 'Play'}
							</button>
						) : (
							<span>Loading Player...</span>
						)}
					</div>
				</>
			)}
		</>
	)
}
