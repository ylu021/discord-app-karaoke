import { useState } from 'react'
import { Player } from './Player'
import LandingForm, { FormInput } from './LandingForm'

export const URL = 'https://www.youtube.com/watch?v=jWQx2f-CErU'

export const Activity = () => {
	const [showPlayer, setShowPlayer] = useState(false)
	const [songInfo, setSongInfo] = useState({
		title: '',
		artist: ''
	})

	const updateSongInfo = (songInfo: FormInput) => {
		setSongInfo(songInfo)
	}

	return (
		<div>
			<div>
				{!songInfo.title ? (
					<h1 className="">Karaoke Room</h1>
				) : (
					<div>
						<div className="fixed top-1 left-1 flex items-center">
							<img src="/rocket.png" className="logo" alt="Discord" />
							<h4>{`Karaoke Room: ${songInfo.title} - ${songInfo.artist}`}</h4>
						</div>
					</div>
				)}
			</div>
			{showPlayer ? (
				<Player url={URL} songInfo={songInfo} />
			) : (
				<LandingForm setShowPlayer={setShowPlayer} updateSongInfo={updateSongInfo} />
			)}
		</div>
	)
}
