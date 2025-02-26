import { RefObject, useContext, useEffect, useRef, useState } from 'react'
import QueueContext from '../context/queueContext'

export default function useAudio() {
	const { currentSong } = useContext(QueueContext)
	const [loading, setLoading] = useState(false)
	const [audioInfo, setAudioInfo] = useState<any>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [debugM, setDebugM] = useState('')
	const audioRef = useRef<HTMLAudioElement>(null)


	useEffect(() => {
		if (!loading && audioRef.current) {
			fetchAudio()
		}
	}, [currentSong]) // url changed i refetch


	const fetchAudio = async () => {
		setDebugM(`${currentSong?.title}, ${audioRef.current}`)
		if (!currentSong) return
		const streamAPI = `/api/stream?url=${currentSong.url}`
		setLoading(true)
		const info = await fetchAudioInfo()
		setAudioInfo(info)

		const response = await fetch(streamAPI)
		setLoading(false)
		const blob = await response.blob()
		const objectURL = URL.createObjectURL(blob)
		if (audioRef.current) {
			audioRef.current.src = objectURL // Set the source
			audioRef.current.load()
			togglePlayPause()
		}
	}

	const fetchAudioInfo = async () => {
		if (!currentSong) return
		const response = await fetch('/api/songInfo', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url: currentSong.url })
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

	const toggleReset = () => {
		if (!audioRef?.current?.src) return
		const audio = audioRef.current
		if (audio && isPlaying) {
			audio.pause()
		}
		audioRef.current.currentTime = 0
		audioRef.current.play()
		setIsPlaying(!isPlaying)
	}

	return {
		audioInfo,
		isPlaying,
		setIsPlaying,
		isLoading: loading,
		togglePlayPause,
		toggleReset,
		debugM,
		audioRef
	}
}
