import { RefObject, useEffect, useRef, useState } from 'react'

export default function useAudio(audioRef: RefObject<HTMLAudioElement>, url: string) {
	const streamAPI = `/api/stream?url=${url}`
	const [loading, setLoading] = useState(false)
	const [audioInfo, setAudioInfo] = useState<any>(null)
	const [isPlaying, setIsPlaying] = useState(false)

	useEffect(() => {
		if (!audioRef?.current?.src) {
			fetchAudioInfo()
			fetchAudio()
		}
	}, [audioRef?.current?.src])

	const fetchAudio = async () => {
		setLoading(true)
		const info = await fetchAudioInfo()
		setAudioInfo(info)

		const response = await fetch(streamAPI)
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
			body: JSON.stringify({ url })
		})
		const data = await response.json()
		return data
	}

	const togglePlayPause = () => {
		const audio = audioRef.current

		if (audio && isPlaying) {
			audio.pause()
		} else if (audio && !isPlaying) {
			audio.play()
		}

		setIsPlaying(!isPlaying)
	}

	return {
		audioInfo,
		isPlaying,
		isLoading: loading,
		togglePlayPause
	}
}
