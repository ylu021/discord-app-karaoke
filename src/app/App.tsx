import { SyncContextProvider } from '@robojs/sync'
import QueueProvider from '../context/QueueProvider'
import { DiscordContextProvider } from '../hooks/useDiscordSdk'
import { Activity } from './Activity'
import './App.css'

/**
 * 🔒 Set `authenticate` to true to enable Discord authentication
 * You can also set the `scope` prop to request additional permissions
 *
 * Example:
 * ```tsx
 * <DiscordContextProvider authenticate scope={['identify', 'guilds']}>
 * ```
 */
export default function App() {
	return (
		<DiscordContextProvider>
			<SyncContextProvider>
				<QueueProvider>
					<Activity />
				</QueueProvider>
			</SyncContextProvider>
		</DiscordContextProvider>
	)
}
