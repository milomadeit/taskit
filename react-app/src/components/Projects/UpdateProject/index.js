import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {updateProject } from '../../../store/projects';
import { getUserProjects } from '../../../store/projects';
import './CreateProject.css'

function UpdateProject() {
	const {projectId} = useParams()
	const project = useSelector((state) => state.projectReducer.userProjects[parseInt(projectId)])
    const [projectName, setProjectName] = useState(project?.name || '');
    const [description, setDescription] = useState(project?.description || '');
    const [dueDate, setDueDate] = useState(project?.due_date || '');
    const [isPublic, setIsPublic] = useState(project?.is_public || '');
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(true);
	// const [isMounted, setIsMounted] = useState(true);
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);

	useEffect(() => {
        if (!user) {
            history.push('/login');
            return;
        }
        dispatch(getUserProjects()).then(() => setLoading(false));
    }, [dispatch, user, history]);

	  if (loading) {
		return (<div> Loading...</div>)
	  }

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formErrors = {}

		if (!projectName || projectName.length < 1) formErrors.projectName = 'Project must have a name'
		if (projectName.length > 25) formErrors.projectName = 'Please choose a short project name! Less than 25 characters.'
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

		//   if (isMounted) setLoading(true);

		  try {
			const result = await dispatch(updateProject(project.id, formData));
			if (result) {
				history.push(`/projects/${project.id}`);
			} else {
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

	const navigateToProject = () => {
		history.push(`/projects/${project.id}`)
	}


	return (
        <div className='create-project-main-div'>
            <form className='create-project-form' onSubmit={handleSubmit}>
                <div className='project-form-inputs'>
                    <label className='project-name-label'>Project Name</label>
                    <input type='text' placeholder='Project Name' value={projectName} onChange={(e) => setProjectName(e.target.value)} />
					{errors.projectName && (<p className='errors-p'>{errors.projectName}</p>)}
                </div>
                <div className='project-form-inputs'>
                    <label className='project-description-label'>Description</label>
                    <textarea placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
					{errors.description && (<p className='errors-p' >{errors.description}</p>)}
                </div>
                <div className='project-form-inputs'>
                    <label className='project-due-date-label'>Due Date</label>
                    <input type='datetime-local' value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
					{errors.dueDate && (<p className='errors-p' >{errors.dueDate}</p>)}
                </div>
                <div className='project-form-inputs public-private'>
                    <label className='project-is-public-label'>Public:</label>
                    <input type='checkbox' checked={isPublic} onChange={() => handleIsPublic()} />
                </div>
				<div>
					<button className='submit-project-button'  type='submit'>Submit</button>
				</div>
				<div className='empty'>{}</div>
            </form> 
			<button onClick={() => navigateToProject()} className='back-to-project-button'> Back To Project </button>
        </div>
    );
}

export default UpdateProject;
