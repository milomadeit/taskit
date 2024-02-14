import React from 'react'
import { useModal } from '../../../context/Modal'
import { useDispatch } from 'react-redux';
import { deleteTask, getProjectTasks } from '../../../store/tasks';


function DeleteTask({task, project}) {
	const { closeModal } = useModal();
	const dispatch = useDispatch();
	
	const handleOnClickDelete = async (taskId, projectId) => {
		await dispatch(deleteTask(taskId, projectId))
		await dispatch(getProjectTasks(projectId))
		closeModal()
	
	}

	const handleCloseModal = () => {
		closeModal()
	}
	
	return (
	<div className='delete-project-modal'>
		<p>Do you want to delete this task?</p>
		<div className='delete-modal-buttons'>
		<button className='delete-modal-button delete' onClick={() => handleOnClickDelete(task.id, project.id)}>Yes [Delete]</button>
		<button className='delete-modal-button keep' onClick={() => handleCloseModal()}>No [Keep]</button>
		</div>
	</div>)
}

export default DeleteTask