import React, { useState } from 'react'

export interface FormInput {
	url: string
	title: string
	artist: string
}

export default function LandingForm({
	updateSongInfo,
	errorMessage
}: {
	updateSongInfo: Function
	errorMessage?: string
}) {
	const [formInput, setFormInput] = useState({
		url: 'https://www.youtube.com/watch?v=IK7zBVmG3kA',
		title: '휘파람',
		artist: 'Blackpink'
	} as FormInput)

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (formIsEmpty()) return
		updateSongInfo(formInput)
	}

	const handleUpdateVal = (e: React.ChangeEvent<HTMLInputElement>) => {
		const updatedFormInput = { ...formInput }
		const name = e.target.name as keyof FormInput
		updatedFormInput[name] = e.target.value
		setFormInput(updatedFormInput)
	}

	const formIsEmpty = () => {
		return !formInput.url.trim() || !formInput.title.trim() || !formInput.artist.trim()
	}
	return (
		<div className="w-full">
			<form onSubmit={handleSearch} className="flex flex-col gap-4 mt-8">
				<input
					type="text"
					name="url"
					value={formInput.url}
					onChange={handleUpdateVal}
					placeholder="Paste a youtube karaoke video here"
				/>
				<input
					type="text"
					name="title"
					value={formInput.title}
					onChange={handleUpdateVal}
					placeholder="Enter the song title"
				/>
				<input
					type="text"
					name="artist"
					value={formInput.artist}
					onChange={handleUpdateVal}
					placeholder="Enter the artist name"
				/>
				<button
					type="submit"
					disabled={formIsEmpty()}
					className={
						formIsEmpty()
							? 'disabled:pointer-events-none disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none'
							: ''
					}
				>
					Submit
				</button>
				<span className="text-red-500">{errorMessage}</span>
			</form>
		</div>
	)
}
