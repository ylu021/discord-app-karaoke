import React, { useContext } from 'react'
import QueueContext from '../../context/queueContext'

export default function Header() {
	const { currentSong } = useContext(QueueContext)
	if (!currentSong) return

	return (
		<div className="fixed top-1 left-1 flex items-center">
			<img src="/rocket.png" className="logo" alt="Discord" />
			<h4>{`Karaoke Room: ${currentSong.title} - ${currentSong.artist}`}</h4>
		</div>
	)
}
