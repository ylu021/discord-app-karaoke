import { useContext, useState } from 'react'
import QueueContext from '../context/QueueContext'
import LandingForm from './LandingForm'
import Modal from './Modal'
import { Player } from './Player'
import Header from './Player/Header'
import SongList from './SongList'
import { Song } from '../types/songType'

export const Activity = () => {
	const { addSong, currentSong, setCurrentSong } = useContext(QueueContext)
	const [open, setOpen] = useState(false)

	const updateSongInfo = async (songInfo: Song) => {
		addSong(songInfo)

		// // // set current song if no song is playing
		if (!currentSong) {
			setCurrentSong(songInfo)
		}
	}

	if (!currentSong) {
		return (
			<div>
				<h1>Karaoke Room</h1>
				<LandingForm updateSongInfo={updateSongInfo} />
			</div>
		)
	}

	return (
		<div>
			<Modal open={open} setOpen={setOpen} />
			<Header />
			<SongList
				openModal={() => {
					setOpen(true)
				}}
			/>
			<Player />
		</div>
	)
}
