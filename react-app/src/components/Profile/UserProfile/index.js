import React from 'react';
import './UserProfile.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProjects } from '../../../store/projects';
import { getProjectTasks } from '../../../store/tasks';
import { TaskCount } from '../../../store/tasks';
import { useHistory } from 'react-router-dom';

function UserProfile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const projects = useSelector((state) => state.projectReducer.userProjects);
    const projects_list = Object.values(projects);
    const taskCount = useSelector((state) => state.tasksReducer.taskCount);
	const history = useHistory();

    useEffect(() => {
        dispatch(getUserProjects());
        dispatch(TaskCount());
    }, [dispatch]);


	const navigateToProject = (projectId, project) => {
		history.push({
			pathname: `/projects/${projectId}`,
			state: {project: project}
		})
	}

    return (
        <div className="user-profile-dashboard">
            <h2>Hello, {user.username}</h2>
            <div className="user-stats">
                <p>Tasks Completed: {taskCount}</p>
                <p>Projects Completed: {projects_list.filter(project => project.is_completed).length}</p>
            </div>
            <div className="user-projects">
                <h3>Your Projects</h3>
				<div className='grid-container-projects'>
					<div className='project-list-main'>
						{projects_list.map((project) => (
							<p onClick={() => navigateToProject(project.id, project)} key={project.id}>
								{project.name}
							</p>
						))}
					</div>

				</div>

            </div>
            <div className="user-collaborations">
                <h3>Collaborations</h3>
                {/* logic to list collaborations*/}
            </div>
            <div className="user-badges">
                <h3>Your Badges</h3>
                {/* logic for badges list */}
            </div>
        </div>
    );
}

export default UserProfile;
