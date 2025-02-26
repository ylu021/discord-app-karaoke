import { useRef } from 'react'
import useAudio from '../hooks/useAudio'
import { FormInput } from './LandingForm'
import useLyrics from '../hooks/useLyrics'
import Lyrics from './Lyrics'

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

export const Player = (props: PlayerProps) => {
	const { url: testUrl, songInfo } = props
	const audioRef = useRef<HTMLAudioElement>(null)

	const { audioInfo, isPlaying, setIsPlaying, isLoading, togglePlayPause, toggleReset } = useAudio(
		audioRef,
		songInfo.url ?? testUrl
	)
	const { lyrics } = useLyrics(songInfo.title, songInfo.artist)

	return (
		<div className="mt-15 max-w-96">
			{isLoading ? (
				<span>Loading song...</span>
			) : (
				<>
					<div className="flex flex-col items-center gap-8">
						{audioInfo && <div>{audioInfo.title}</div>}
						<audio ref={audioRef} preload="auto" />
						<div className="fixed bottom-4 right-4">
							{audioRef?.current?.src ? (
								<div className="flex flex-row justify-center items-center gap-4">
									<button className="mt-6" onClick={togglePlayPause}>
										{isPlaying ? 'Pause' : 'Play'}
									</button>
									<button className="mt-6" onClick={toggleReset}>
										Restart
									</button>
								</div>
							) : (
								<span>Loading Player...</span>
							)}
						</div>
					</div>
					<div id="lyrics">
						{(lyrics?.length ?? 0 > 0) ? (
							<Lyrics
								isPlaying={isPlaying}
								setIsPlaying={setIsPlaying}
								lyrics={lyrics ?? []}
								audio={audioRef.current}
							/>
						) : (
							'No lyrics available'
						)}
					</div>
				</>
			)}
		</div>
	)
}
