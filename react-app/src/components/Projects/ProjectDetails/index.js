import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ProjectDetails.css';
import { getProjectTasks } from '../../../store/tasks';
// import TaskCard from '../../Tasks/TaskCards';
import TaskCarousel from '../../Tasks/TaskCards/TaskCarousel';
import { getUserProjects } from '../../../store/projects';

function ProjectDetails() {

  const history = useHistory();
  const dispatch = useDispatch();
  const {projectId} = useParams();

  const project = useSelector((state) => state.projectReducer.userProjects[parseInt(projectId)]);
  const [loading, setLoading] = useState(false);
  const tasks = useSelector((state) => state.tasksReducer.projectTasks);
  const task_array = Object.values(tasks);
  const taskCount = useSelector(state => state.tasksReducer.taskCount)
  

  useEffect(() => {
    setLoading(true);
    dispatch(getUserProjects())
    dispatch(getProjectTasks(project?.id))
    setLoading(false)
	
  }, [dispatch, project?.id, taskCount]);


  if (!project || loading) {
	return (<div>Loading...</div>)
  }

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Date(dateString)
      .toLocaleString('en-US', options)
      .replace(/(\d+)\/(\d+)\/(\d+), (\d+:\d+)/, '$1/$2/$3 $4');
  }

  const navigateToUserProjects = () => {
		history.push('/projects/user')
	}
	const navigateToCreate = () => {
		history.push('/projects/new')
	}

  const navigateToCreateTask = () => {
    history.push(`/projects/tasks/${project.id}/new`);
  };

  return (
	<div className='project-container'>
    <div className="main-project-details-div">
      <div className="project-info">
		
        <div className='project-name-div'>
            <h2 className="project-name">{project.name}</h2>
            <p className="task-count">
              {project.task_count < 1
                ? 'No tasks to complete'
                : project.task_count + ' tasks to complete'}
            </p>
        </div>

        <div className='detail-span'>
          <p className="project-detail">{formatDate(project.due_date)}</p>
          <p className={`project-public ${project.is_public ? 'public' : 'private'}`}>
              {project.is_public ? 'Public' : 'Private'}
          </p>
        </div>

      </div>
      <div className='project-description-div'>
	  <p className="project-description">{project.description}</p>
      </div>
      <div>
        <TaskCarousel key={task_array.length} task_array={task_array} project={project} />
      </div>
      <div className='project-details-buttons'>
        <button className="add-task-button" onClick={() => navigateToCreateTask()}>
          Add Task
        </button>
        <button className='nav-to-create' onClick={() => navigateToCreate()}>
					Create Project
					</button>
					{/* <OpenModalButton className='button' modalComponent={<CreateProject/>} buttonText='Create A Project' /> */}
					<button className="nav-to-user-proj" onClick={() => navigateToUserProjects()}>Current Projects</button>

      </div>
    </div>

	</div>
  );
}

export default ProjectDetails;
