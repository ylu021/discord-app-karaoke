import { useState } from 'react'
import { Player } from './Player'
import LandingForm, { FormInput } from './LandingForm'
import Lyrics from './Lyrics'

export const URL = 'https://www.youtube.com/watch?v=jWQx2f-CErU'

export const Activity = () => {
	const [showPlayer, setShowPlayer] = useState(false)
	const [songInfo, setSongInfo] = useState({
		title: 'Whipsplash',
		artist: 'Aespa'
	})

	const updateSongInfo = (songInfo: FormInput) => {
		setSongInfo(songInfo)
	}

	return (
		<div>
			<img src="/rocket.png" className="logo" alt="Discord" />
			<h1>Karaoke Room</h1>
			{showPlayer ? (
				<Player url={URL} songInfo={songInfo} />
			) : (
				<LandingForm setShowPlayer={setShowPlayer} updateSongInfo={updateSongInfo} />
			)}
		</div>
	)
}
