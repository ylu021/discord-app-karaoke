import { createContext } from 'react'

export interface Song {
	title: string
	artist: string
	url: string
}

interface Queue {
	queue: Song[]
	currentSong: Song | null
	addSong: (song: Song) => void
	removeSong: (song?: Song) => void
	setCurrentSong: (song: Song | null) => void
}

export const MAX_QUEUE_SIZE = 5

const QueueContext = createContext<Queue>({
	queue: [],
	addSong: () => {},
	removeSong: () => {},
	currentSong: null,
	setCurrentSong: () => {}
})

export default QueueContext
