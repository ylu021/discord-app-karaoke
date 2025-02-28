import { useContext, useRef, useState } from 'react'
import useAudio from '../hooks/useAudio'
import { FormInput } from './LandingForm'
import useLyrics from '../hooks/useLyrics'
import Lyrics from './Lyrics'
import QueueContext from '../context/queueContext'
import { disabledStyle } from './consts/disabledClass'
import SongList from './SongList'

interface PlayerProps {
	url: string
	songInfo: FormInput
}

// const lyrics = [
// 	{ time: 0.76, text: 'Whiplash - aespa (에스파)' },
// 	{ time: 1.75, text: '词：Leslie (XYXX)' },
// 	{ time: 2.65, text: "曲：Marcus 'MarcLo' Lomax/Neil Ormandy/..." },
// 	{ time: 5.59, text: '编曲：Lewis Jankel/Neil Ormandy' },
// 	{ time: 7.79, text: "One look give 'em Whiplash" },
// 	{ time: 9.59, text: 'Beat drop with a big flash' },
// 	{ time: 11.53, text: '집중해 좀 더' },
// 	{ time: 12.34, text: 'Think fast' }
// ]

export const URL = 'https://www.youtube.com/watch?v=jWQx2f-CErU'

export const Player = () => {
	const { queue, removeSong, currentSong } = useContext(QueueContext)
	const { audioRef, audioInfo, isPlaying, setIsPlaying, isLoading, togglePlayPause, toggleReset } = useAudio()
	const { lyrics, startIndex } = useLyrics(currentSong?.title, currentSong?.artist)

	const skipSong = () => {
		// const isConfirmed = window.confirm('Are you sure you want to skip to the next song?')
		// if (isConfirmed) {
		// stop the player
		// togglePlayPause()
		// remove the song from queue and use the next song
		removeSong()
		setIsPlaying(false)
	}

	const hasNext = () => {
		return queue.length > 1 // if only one that means there is no song
	}

	return (
		<div>
			{isLoading ? (
				<span>Loading song...</span>
			) : (
				<div className="overflow-hidden mt-10">
					<div className="fixed bottom-4 right-4">
						{!isLoading ? (
							<div className="flex flex-row justify-center items-center gap-4">
								<button onClick={toggleReset}>↻</button>
								<button onClick={togglePlayPause}>{isPlaying ? '⏸' : '▶'}</button>
								<button onClick={skipSong} disabled={!hasNext()} className={disabledStyle}>
									⏭
								</button>
							</div>
						) : (
							<span>Loading Player...</span>
						)}
					</div>
					<div className="flex flex-col items-center gap-8">
						{audioInfo && <div>{audioInfo.title}</div>}
						<audio ref={audioRef} preload="auto" onEnded={skipSong} />
					</div>
					<div id="lyrics">
						{(lyrics?.length ?? 0 > 0) ? (
							<Lyrics startIndex={startIndex} lyrics={lyrics ?? []} audio={audioRef.current} />
						) : (
							'No lyrics available'
						)}
					</div>
				</div>
			)}
		</div>
	)
}
