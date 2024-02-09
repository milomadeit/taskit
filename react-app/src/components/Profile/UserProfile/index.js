import React from 'react';
import './UserProfile.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProjects } from '../../../store/projects';
import { getProjectTasks } from '../../../store/tasks';


function UserProfile() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user)
	const task_count = useSelector((state) => state.session.user.tasks_completed)
	const projects  = useSelector((state) => state.projectReducer.userProjects)
	const projects_list = Object.values(projects)
	const taskCount = useSelector((state) => state.tasksReducer.taskCount)

	useEffect(() => {
		const fetchData = async () => {
			await dispatch(getUserProjects());
			for (let project of projects_list) {
				await dispatch(getProjectTasks(project));
			}
		};
	
		fetchData();
	}, [dispatch, task_count]);
	



	return (

		<div>
			<h2>Hello, {user.username}</h2>
			<div>
				<p>{user.tasks_completed}</p>
			</div>
			
		</div>
	)
}

export default UserProfile;