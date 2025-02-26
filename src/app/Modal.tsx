import { useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import QueueContext, { Song } from '../context/queueContext'
import LandingForm from './LandingForm'

function Modal({ open, setOpen }: { open: boolean; setOpen: Function }) {
	if (!open) return null

	const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null)

	const { addSong } = useContext(QueueContext)
	const handleAdd = (song: Song) => {
		addSong(song)
		setOpen(false)
	}

	useEffect(() => {
		setModalRoot(document.getElementById('modal-root'))
	}, [])

	return modalRoot
		? createPortal(
				<dialog open className="w-100 h-80 px-5 py-5 fixed top-20 z-1 ml-4">
					<div className="text-right">
						<button onClick={() => setOpen(false)}>
							<span className="text-xl">✖</span>
						</button>
					</div>
					<div className="font-semibold">Next Banger!</div>
					<div className="flex items-center">
						<LandingForm updateSongInfo={handleAdd} />
					</div>
				</dialog>,
				modalRoot
			)
		: null
}

export default Modal
