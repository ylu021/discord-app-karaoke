import React, { createRef, useRef } from 'react'
import { useDiscordSdk } from '../hooks/useDiscordSdk'
import { useSyncState } from '@robojs/sync'
import KaraokeStatusContext from './karaokeStatusContext'
import AudioElement from '../types/AudioElementType'

const audioRef = createRef<HTMLAudioElement>()

const KaraokeStatusProvider = ({ children }: { children: React.ReactNode }) => {
	const { discordSdk } = useDiscordSdk()
	const [loading, setLoading] = useSyncState(false, [discordSdk.instanceId, 'playerLoading'])
	const [audioInfo, setAudioInfo] = useSyncState({ title: '' }, [discordSdk.instanceId, 'playerAudioInfo'])
	const [audioElement, setAudioElement] = useSyncState<AudioElement | undefined>(
		{
			currentTime: 0,
			isPlaying: false
		},
		[discordSdk.instanceId, 'playerElement']
	)

	return (
		<KaraokeStatusContext.Provider
			value={{
				audioRef,
				loading,
				setLoading,
				audioInfo,
				setAudioInfo,
				isPlaying,
				setIsPlaying,
				audioElement,
				setAudioElement
			}}
		>
			{children}
		</KaraokeStatusContext.Provider>
	)
}

export default KaraokeStatusProvider
