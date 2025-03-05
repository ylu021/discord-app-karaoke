import { createContext } from 'react'
import AudioElement from '../types/AudioElementType'

interface KaraokeStatus {
	audioRef?: React.RefObject<HTMLAudioElement>
	loading: boolean
	setLoading: (loading: boolean) => void
	audioInfo: { title: string }
	setAudioInfo: ({ title }: { title: string }) => void
	isPlaying: boolean
	setIsPlaying: (isPlaying: boolean) => void
	audioElement?: AudioElement
	setAudioElement: (el: AudioElement | undefined) => void
}

const KaraokeStatusContext = createContext<KaraokeStatus>({
	loading: false,
	setLoading: () => {},
	audioInfo: {
		title: ''
	},
	setAudioInfo: () => {},
	isPlaying: false,
	setIsPlaying: () => {},
	audioElement: undefined,
	setAudioElement: () => {},
	audioRef: undefined
})

export default KaraokeStatusContext
