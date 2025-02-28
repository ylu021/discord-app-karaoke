import { useState } from 'react'
import { DiscordContextProvider } from '../hooks/useDiscordSdk'
import { Activity } from './Activity'
import './App.css'
import QueueContext, { MAX_QUEUE_SIZE, Song } from '../context/queueContext'

/**
 * 🔒 Set `authenticate` to true to enable Discord authentication
 * You can also set the `scope` prop to request additional permissions
 *
 * Example:
 * ```tsx
 * <DiscordContextProvider authenticate scope={['identify', 'guilds']}>
 * ```
 */
export default function App() {
	return (
		<DiscordContextProvider>
			<QueueProvider>
				<Activity />
			</QueueProvider>
		</DiscordContextProvider>
	)
}

const QueueProvider = ({ children }: { children: React.ReactNode }) => {
	const [queue, setQueue] = useState<Song[]>([])
	const [currentSong, setCurrentSong] = useState<Song>()
	const addSong = (song: Song) => {
		const updatedQueue = [...queue]
		if (queue.length === MAX_QUEUE_SIZE) {
			// not able to add
			return { message: `Max ${MAX_QUEUE_SIZE} songs` }
		}

		const alreadyExist = updatedQueue.filter(
			(existingSong) => existingSong.artist === song.artist && existingSong.title === song.title
		)
		if (alreadyExist.length > 0) {
			return { message: 'The song already exists in the list' }
		}

		setQueue((prevQueue) => [...prevQueue, song])
	}

	const removeSong = (song?: Song) => {
		if (!song) {
			// set current song to next song
			setQueue((prevQueue) => prevQueue.slice(1))
			const newQueue = [...queue]
			const nextSong = newQueue.slice(1)?.[0]
			if (nextSong) {
				setCurrentSong(nextSong)
			} else {
				setCurrentSong(undefined)
			}
		} else {
			setQueue((prevQueue) => [...prevQueue.filter((existSong) => existSong !== song)])
		}
	}

	return (
		<QueueContext.Provider value={{ queue, addSong, removeSong, currentSong, setCurrentSong }}>
			{children}
		</QueueContext.Provider>
	)
}
