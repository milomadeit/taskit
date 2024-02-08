import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ProjectDetails.css';
import { getProjectTasks } from '../../../store/tasks';
import TaskCard from '../../Tasks/TaskCards';
import TaskCarousel from '../../Tasks/TaskCards/TaskCarousel';
import { getUserProjects, getAllProjects } from '../../../store/projects';
import PopOutMenu from '../../PopOutMenu';
import OpenModalButton from '../../DeleteModalButton'
import DeleteProject from '../DeleteProject';
import { newRequest } from '../../../store/collab_requests';
import { useLocation } from 'react-router-dom';
import selectProjectById from './selector';


function ProjectDetails() {

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const {projectId} = useParams();

  const project = useSelector((state) => selectProjectById(state, projectId));  // const project = location.state.project
  console.log(project, 'yoooo')

  const [loading, setLoading] = useState(false);
  const tasks = useSelector((state) => state.tasksReducer.projectTasks);
  const task_array = Object.values(tasks);
  const taskCount = useSelector((state) => state.tasksReducer.taskCount)
  const [requestToJoin, setRequestToJoin] = useState('false')
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.session.user)
  
 
  

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      await dispatch(getAllProjects());
      await dispatch(getUserProjects());
      await dispatch(getProjectTasks(project?.id));

      setLoading(false);
  }

  fetchData();
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


  const navigateToBack = () => {
		history.goBack()
	}

  const navigateToCreateTask = () => {
    history.push({
      pathname: `/projects/tasks/${project.id}/new`,
      state: {project:project}
    });
  };

  const handleEdit = (e, projectId) => {
		e.stopPropagation();
        // navigate to edit page with projectId
        history.push(`/projects/${projectId}/update`);
    };


  const handleRequestClick = async (projectId) => {
      const response = await dispatch(newRequest(projectId))
    
      setRequestToJoin(true)
      if (response.error) {
        console.log(response.error)
        setErrors({errorReq: "You've already sent a request!"})

      }
  }

  return (
	<div className='project-container'>
    <div className="main-project-details-div">
      <div className='info-grid'>

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
          <div className='project-details-actions'>
            {project.creator_id === user?.id && (
						<PopOutMenu>
              <button className='nav-to-create' onClick={() => navigateToCreate()}>New Project</button>
					    <button className="nav-to-user-proj" onClick={() => navigateToUserProjects()}>My Projects</button>
							<button className="edit-project-button" onClick={(e) => handleEdit(e, project.id)}>Edit</button>
							<OpenModalButton  className="delete-project-button" buttonText="Delete" modalComponent={<DeleteProject projectId={project.id}/>} />
						</PopOutMenu>

            )}

          </div>
				
        </div>

      </div>
      </div>
      <div className='project-description-div'>
	  <p className="project-description">{project.description}</p>
      </div>
      <div className='project-details-center-div'>
        {!user ? "": (

        <div className='project-details-mid-div-1'>
          { project.creator_id !== user?.id && (
            <>
            
              <h4 className='collab-header'>Become a collaborator!</h4>
              <button className='collab-button' onClick={() => handleRequestClick(project.id)}>Request</button>
              {errors.errorReq && (<p className='errors-p project-collab-error'>{errors.errorReq}</p>)}
            </>


) }
        </div>

        ) }
          <div className='project-details-mid-div-2'>
            
      
          {/* <TaskCarousel key={task_array.length} task_array={task_array} project={project} /> */}


        </div>
        <div className='project-details-mid-div-3'>
          {project.creator_id === user?.id && (
            <>
            <h4 className='files-h'>Files</h4>
              <p className='files-p'>No files uploaded</p>
            </>
          )}
        </div>
      </div>
      <div className='project-details-buttons'>
      {project.creator_id === user?.id  && (
      <>
        <button className="add-task-button" onClick={() => navigateToCreateTask()}>
          Add Task
        </button>
        <button className="nav-back-to-user-proj" onClick={() => navigateToUserProjects()}>Back To Projects</button>
      </>
      )}
        {project.creator_id !== user?.id && (
          <button className="nav-back-to-user-proj" onClick={() => navigateToBack()}>Go Back</button>
        )}
      </div>
    </div>
      <div className='task-grid'>
        {task_array.map((task) => (
          <TaskCard key={task.id} task={task} project={project} />
        ))}
      </div>

	</div>
  );
}

export default ProjectDetails;
