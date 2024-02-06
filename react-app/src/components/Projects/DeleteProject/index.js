import React from 'react'
import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal'
import { deleteProject, getUserProjects } from '../../../store/projects';
import { useHistory } from 'react-router-dom';


function DeleteProject({projectId}) {

	const { closeModal } = useModal();
	const dispatch = useDispatch();
	const history = useHistory();


	const handleOnClickDelete = async (projectId) => {
		await dispatch(deleteProject(projectId))
		await dispatch(getUserProjects())
		closeModal()
		history.push(`/projects/user`)
	
	
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