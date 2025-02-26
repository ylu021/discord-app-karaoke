import { useContext, useEffect, useState } from 'react'
import { Player } from './Player'
import LandingForm, { FormInput } from './LandingForm'
import QueueContext, { Song } from '../context/queueContext'
import SongList from './SongList'
import Modal from './Modal'

export const Activity = () => {
	const [showPlayer, setShowPlayer] = useState(false)

	const { queue, addSong, currentSong, setCurrentSong } = useContext(QueueContext)
	const [open, setOpen] = useState(false)
	const [debugM, setDebugM] = useState('')

	// useEffect(() => {
	// 	// add two song for testing
	// 	addSong({
	// 		title: 'Whipsplash',
	// 		artist: 'Aespa',
	// 		url: 'https://www.youtube.com/watch?v=jWQx2f-CErU'
	// 	})
	// 	addSong({
	// 		title: '青花瓷',
	// 		artist: '周杰伦',
	// 		url: 'https://www.youtube.com/watch?v=bz4Wkyo-q4o'
	// 	})
	// 	setCurrentSong(queue[0])
	// }, [])

	const updateSongInfo = (songInfo: Song) => {
		// add to queue if not exist
		addSong(songInfo)
		// set current song if no song is playing
		if (!currentSong) {
			setCurrentSong(songInfo)
		}
	}

	useEffect(() => {
		if (showPlayer && queue.length === 0) {
			setShowPlayer(false)
			// show form instead
		}
	}, [queue.length])

	return (
		<div>
			<div>
				<Modal open={open} setOpen={setOpen} />
				{!currentSong ? (
					<h1 className="">Karaoke Room</h1>
				) : (
					<div>
						<div className="fixed top-1 left-1 flex items-center">
							<img src="/rocket.png" className="logo" alt="Discord" />
							<h4>{`Karaoke Room: ${currentSong.title} - ${currentSong.artist}`}</h4>
						</div>
					</div>
				)}
			</div>
			{showPlayer && (
				<div className="fixed bottom-4 left-4">
					<SongList
						openModal={() => {
							setOpen(true)
						}}
					/>
				</div>
			)}

			{/* {showPlayer && <SongList openModal={() => setOpen(true)} />} */}
			{showPlayer ? (
				<Player />
			) : (
				// <div>FakePlayer</div>
				<LandingForm setShowPlayer={setShowPlayer} updateSongInfo={updateSongInfo} />
			)}
		</div>
	)
}
