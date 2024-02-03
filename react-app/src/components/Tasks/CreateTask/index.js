import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
// import { createProject } from '../../../store/projects';
// import { useModal } from '../../../context/Modal';
import './CreateTask.css'
import { createTask } from '../../../store/tasks';


function CreateTask() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [taskName, setTaskName] = useState('')
	const [description, setDescription] = useState('')
	const [errors, setErrors] = useState({})
	const {projectId} = useParams();
	const user = useSelector((state) => state.session.user)

	useEffect(() => {
		// SOMETHING
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()
		const formErrors = {}

		if (!taskName) formErrors.taskName = "Please name the task";

		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return
		  }
		  
		const formData = new FormData();
		formData.append('name', taskName);
		formData.append('description', description);
		formData.append('project_id', projectId)
		formData.append('creator_id', user.id )

		try {
			const result = await dispatch(createTask(formData, projectId));
			if (result.ok) {
			  history.push({
				pathname: `/projects/${projectId}`,
				state: {projectId}
			});
			} else {
			  return result.data
	  
			}
		  } catch (error) {
			console.error("An error occurred", error);
			setErrors({error})
			return;
		  }


	}

	return (
		<div>
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<div>
				<label>Task</label>
				<input type='text' placeholder='Task' value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
				{errors.taskName && (<p>{errors.taskName}</p>)}
				</div>
				<div>
					<label>Description</label>
					<textarea placeholder='description optional' value={description} onChange={(e) => setDescription(e.target.value)}/>
				</div>
					<button type='submit'>Add to project</button>
			</form>
		</div>
	)
}

export default CreateTask;