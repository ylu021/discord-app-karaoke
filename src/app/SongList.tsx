import { useContext } from 'react'
import QueueContext, { MAX_QUEUE_SIZE, Song } from '../context/queueContext'

export default function SongList({ openModal }: { openModal: () => void }) {
	const { queue: songList, currentSong } = useContext(QueueContext)
	return (
		<div className="fixed bottom-4 left-4">
			<div className="text-left flex flex-col justify-between h-50">
				<div>
					<p className="mb-4 font-semibold">Now Playing & Next Up 🎤 </p>
					<div className="overflow-auto h-30">
						{songList.map((song: Song) => (
							<SongListItem key={song.title} song={song} currentSong={currentSong} />
						))}
					</div>
				</div>
				{songList.length < MAX_QUEUE_SIZE && (
					<div className="z-1 cursor-pointer rounded-full border-solid border-white p-0" onClick={openModal}>
						<span className="text-sm">+ Add New</span>
					</div>
				)}
			</div>
		</div>
	)
}

interface SongListItemProps {
	song: Song
	currentSong: Song | undefined
}

const SongListItem = ({ song, currentSong }: SongListItemProps) => {
	const highlightCurrent = (song: Song) => {
		return currentSong?.title === song.title && currentSong.artist === song.artist
	}
	return <div className={`${highlightCurrent(song) ? 'text-blue-500 font-semibold' : null}`}>{song.title}</div>
}
