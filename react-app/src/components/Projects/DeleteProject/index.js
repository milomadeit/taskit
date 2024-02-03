import React from 'react'
import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal'
import { deleteProject, getUserProjects } from '../../../store/projects';


function DeleteProject({projectId}) {

	const { closeModal } = useModal();
	const dispatch = useDispatch();


	const handleOnClickDelete = async (projectId) => {
		await dispatch(deleteProject(projectId))
		await dispatch(getUserProjects())
		closeModal()
	
	
	}
	const handleCloseModal = () => {
		closeModal()
	}

	return (
		<div>
			<p>Are you sure you want to delete your project?</p>
			<div>
				<button onClick={() => handleOnClickDelete(projectId)}>Yes [Delete]</button>
				<button onClick={() => handleCloseModal()}>No [Keep]</button>
			</div>
		</div>
	)
}

export default DeleteProject