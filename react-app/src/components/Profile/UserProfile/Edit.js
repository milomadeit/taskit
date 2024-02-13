import React from 'react'
import { useModal } from '../../../context/Modal'
import { DeleteRequest } from '../../../store/collab_requests';
import { useDispatch } from 'react-redux';
function Edit({collabId}) {

	const dispatch = useDispatch();

	const { closeModal } = useModal();

	const handleDelete = (collabId) => {
		dispatch(DeleteRequest(collabId))
		closeModal();
	}


	return (
		<div className='edit-collab-div'>
			<p>Respond to collaborator</p>
			<div className='edit-collab-div-buttons'>
				<button className='edit-collab-div-buttons-accept'>Accept</button>
				<button className='edit-collab-div-buttons-delete' onClick={() => handleDelete(collabId)}>Delete</button>

			</div>
		</div>

	)
}

export default Edit