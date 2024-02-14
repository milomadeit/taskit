import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation} from 'react-router-dom';
// import { createProject } from '../../../store/projects';
// import { useModal } from '../../../context/Modal';
// import './CreateTask.css'
import { updateTask } from '../../../store/tasks';


function UpdateTask() {
	const location = useLocation();
	const task = location.state.task
	const project = location.state.project
	const dispatch = useDispatch();
	const history = useHistory();
	const [taskName, setTaskName] = useState(task.name)
	const [description, setDescription] = useState(task.description)
	const [errors, setErrors] = useState({})
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
		formData.append('project_id', task.project_id)
		formData.append('creator_id', user.id )

		try {
			const result = await dispatch(updateTask(formData, task.id));
			if (result.ok) {
			  history.push({
				pathname: `/projects/${project.id}`,
				state: {project: project}
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

	const navigateToUserProjects = () => {
		history.push('/projects/user')
	}

	return (
		<div className='alignment'>
		<div className='create-task-main-div'>
			<form className='create-task-form' onSubmit={handleSubmit} encType="multipart/form-data">
				<div className='task-form-inputs'>
					<label className='task-name-label'>Task</label>
					<input type='text' placeholder='Task' value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
					{errors.taskName && (<p className='errors-p'>{errors.taskName}</p>)}
				</div>
				<div className='task-form-inputs'>
					<label className='task-description-label'>Description</label>
					<textarea placeholder='description optional' value={description} onChange={(e) => setDescription(e.target.value)}/>
				</div>
					<button className='create-task-button' type='submit'>Update Task</button>
			</form>
			<button onClick={() => navigateToUserProjects()} className='back-to-project-button tasks-create'> Back To Projects </button>

		</div>

		</div>
	)
}

export default UpdateTask;