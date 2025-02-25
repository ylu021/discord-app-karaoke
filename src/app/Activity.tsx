import { Player } from './Player'

const ExternalUrl = 'https://media.waveplay.com/t/ckwldfuiq6608re6x8dzc5tyt.mp3'
export const URL = 'https://www.youtube.com/watch?v=jWQx2f-CErU'

export const Activity = () => {
	return (
		<div>
			<img src="/rocket.png" className="logo" alt="Discord" />
			<h1>Karaoke Room</h1>
			<Player url={'/api/stream?url=' + URL} />
			<p>
				<small>
					Powered by{' '}
					<a className="robojs" href="https://roboplay.dev/docs">
						Robo.js
					</a>
				</small>
			</p>
		</div>
	)
}
