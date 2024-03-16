import React from 'react'
import { useModal } from '../../../context/Modal'
import { DeleteRequest } from '../../../store/collab_requests';
import { useDispatch, useSelector } from 'react-redux';
import { updateRequest, getRequests } from '../../../store/collab_requests';
import './Edit.css'

function Edit({collabId}) {
	const user = useSelector((state) => state.session.user);


	const dispatch = useDispatch();

	const { closeModal } = useModal();

	const handleDelete = async (collabId) => {
		await dispatch(DeleteRequest(collabId))
		await dispatch(getRequests(user.id));
		closeModal();
	}

	const handleUpdate = async (collabId) => {
		await dispatch(updateRequest(collabId));
		await dispatch(getRequests(user.id));

		closeModal();
	}


	return (
		<div className='edit-collab-div'>
			<p>Respond to collaborator</p>
			<div className='edit-collab-div-buttons'>
				<button className='edit-collab-div-buttons-accept' onClick={() => handleUpdate(collabId)}>Accept</button>
				<button className='edit-collab-div-buttons-delete' onClick={() => handleDelete(collabId)}>Delete</button>

			</div>
		</div>

	)
}

export default Edit