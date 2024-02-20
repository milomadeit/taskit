import React from 'react';
import './UserProfile.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProjects } from '../../../store/projects';
import { TaskCount } from '../../../store/tasks';
import { useHistory } from 'react-router-dom';
import { getRequests } from '../../../store/collab_requests';
import OpenModalButton from '../../OpenModalRequest/index'
import Edit from './Edit';


function UserProfile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const projects = useSelector((state) => state.projectReducer.userProjects);
    const projects_list = Object.values(projects);
    const taskCount = useSelector((state) => state.tasksReducer.taskCount);
	const history = useHistory();
    const collab_requests = useSelector((state)=> state.collabReducer.currentRequests)
    const collab_list = Object.values(collab_requests)

    useEffect(() => {
    if (!user) {
        history.push('/')
    }

    dispatch(getRequests(user.id))
    dispatch(getUserProjects());
    dispatch(TaskCount());
       
   
    }, [dispatch, user.id]);


	const navigateToProject = (projectId, project) => {
		history.push({
			pathname: `/projects/${projectId}`,
			state: {project: project}
		})
	}
    const navigateToUserProjects = () => {
        history.push('/projects/user')
    }

    const navigateToBack = () => {
		history.goBack()
	}

	const navigateToPublic = () => {
		history.push('/projects/public')
	}

    const truncateText = (text, length) => {
        return text.length > length ? text.substring(0, length) + '...' : text;
    };

    return (
        <div className="user-profile-dashboard">
            <h2>Hello, {user.username}</h2>
            <div className='main-profile-back'>
			<button className='main-public-back-button' onClick={() => navigateToBack()}>Back</button>
			<button className="main-public-back-button" onClick={() => navigateToPublic()}>Public Projects</button>

		    </div>
            <div className="user-stats">
                <p>Tasks Completed: {taskCount}</p>
                {/* {projects_list.filter(project => project.is_completed).length} */}
                <p>Number Of Projects: {projects_list.length}</p>
            </div>
            <div className="user-projects">
                <h3 className='projects-h3' onClick={() => navigateToUserProjects()}>Your Projects</h3>
				<div className='grid-container-projects'>
					<div className='project-list-main'>
						{projects_list.map((project) => (
							<p onClick={() => navigateToProject(project.id, project)} key={project.id}>
                                {truncateText(project.name, 15)}
							</p>
						))}
					</div>
                            

				</div>

            </div>
            <div className="user-collaborations">
                <h3>Collaborators</h3>
                <div className='grid-container'>
                <div className='collab-grid-div'>
                {collab_list.map((collab) => (
                    <div className='user-collab-div' key={collab.id}>
                        <div className='user-icon'>

                        </div>
                        <p className='username-p'>{collab.sender.username}</p>
                        <p className='project-p'> {collab.project.name}</p>
                        <p className='status-p'>{collab.status}</p>
                        <OpenModalButton className='modal-edit-button' buttonText='Edit' modalComponent={<Edit collabId={collab.id} />} />

                    </div>
                ))}

                </div>
                    
                </div>

            </div>
            <div className="user-badges">
                <h3>Your Badges</h3>
                {/* logic for badges list */}
            </div>
        </div>
    );
}

export default UserProfile;
