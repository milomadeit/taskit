import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { createProject } from '../../../store/projects';

function CreateProject() {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [isPublic, setIsPublic] = useState(false);
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(true);
	const [isMounted, setIsMounted] = useState(false);
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);

	useEffect(() => {
		if(!user) {
		  history.push('/login')
		}
		setIsMounted(true);
		setLoading(false)
	  }, [dispatch, user, history]);


	  if (loading) {
		return (<div> Loading...</div>)
	  }

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formErrors = {}

		if (!projectName || projectName.length < 1) formErrors.projectName = 'Project must have a name'
		if (!dueDate) formErrors.dueDate = 'Please select a due date for your project'

		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		  }

		  const formData = new FormData();
		  formData.append('name', projectName)
		  formData.append('description', description)
		  formData.append('is_public', isPublic) 
		  formData.append('due_date', dueDate)

		  if (isMounted) setLoading(true);

		  try {
			const result = await dispatch(createProject(formData));
			if (result) {
				history.push("/");
			} else {
				console.log('nooooppeeee')
			  	return result.data
	  
			}
		  } catch (error) {
			console.error("error from form", error);
		  }
		  setLoading(false);

	}

	const handleIsPublic = () => {
		setIsPublic(!isPublic)
	}


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='project-form-inputs'>
                    <label className='project-name-label'>Project Name</label>
                    <input type='text' placeholder='Project Name' value={projectName} onChange={(e) => setProjectName(e.target.value)} />
					{errors.projectName && (<p>{errors.projectName}</p>)}
                </div>
                <div className='project-form-inputs'>
                    <label className='project-description-label'>Description</label>
                    <textarea placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
					{errors.description && (<p>{errors.description}</p>)}
                </div>
                <div className='project-form-inputs'>
                    <label className='project-due-date-label'>Due Date</label>
                    <input type='datetime-local' value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
					{errors.dueDate && (<p>{errors.dueDate}</p>)}
                </div>
                <div className='project-form-inputs'>
                    <label className='project-is-public-label'>Public</label>
                    <input type='checkbox' checked={isPublic} onChange={() => handleIsPublic()} />
                </div>
				<div>
					<button type='submit'>Submit</button>
				</div>
            </form>
        </div>
    );
}

export default CreateProject;
