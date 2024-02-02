import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import { createProject } from '../../../store/projects';
// import { useModal } from '../../../context/Modal';
import './CreateTask.css'

function CreateTask() {
	const [taskName, setTaskName] = useState('')
	const [description, setDescription] = useState('')

	useEffect(() => {
		// SOMETHING
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		const formErrors = {}

		if (!taskName) formErrors.taskName = "Please name the task" 
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
				<label>Task</label>
				<input type='text' placeholder='Task' value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
				</div>
				<div>
					<label>Description</label>
					<textarea placeholder='description optional' value={description} onChange={(e) => setDescription(e.target.value)}/>
				</div>
			</form>
		</div>
	)
}

export default CreateTask;