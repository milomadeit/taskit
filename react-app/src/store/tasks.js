
const NEW_TASK = 'tasks/NEW_TASK';
const UPDATE_TASK = 'tasks/UPDATE_TASK';
const GET_TASKS = 'tasks/GET_TASKS'
const DELETE_TASK = 'tasks/DELETE_TASK'
const ADD_TASK = 'tasks/ADD_TASK'
const MINUS_TASK = 'tasks/MINUS_TASK'
const TASK_COUNT = 'tasks/TASK_COUNT'
const TASK_COUNT_UPDATE = 'tasks/TASK_COUNT_UPDATE'


const storeNewTask = (task) => {
	return {
		type: NEW_TASK,
		task
	}
}

const storeUpdateTask = (task) => {
	return {
		type: UPDATE_TASK,
		task
	}
}

const storeAllTasks = (tasks) => {
	return {
		type: GET_TASKS,
		tasks
	}
}

const storeDeleteTask = (taskId) => {
	return {
		type: DELETE_TASK,
		taskId
	}
}

const addTask = () => {
	return {
		type: ADD_TASK
	}
}

const minusTask = () => {
	return {
		type: MINUS_TASK
	}
}

const taskCountCurr = () => {
	return {type: TASK_COUNT}
}

const updateTaskCount = (taskCount) => {
	return {
		type: TASK_COUNT_UPDATE,
		taskCount
	}
}


export const TaskCount = () => async (dispatch) => {
	const response = await fetch(`/api/tasks/user/count`, {
		method: 'GET',
	})

	if (response.ok) {
		const tasksInfo = await response.json();
		dispatch(updateTaskCount(tasksInfo.task_count))
		return { ok: true, data: tasksInfo };
	} else {
		const errorData = await response.json();
		console.log(errorData, 'yooo thhhunk')
		return { ok: false, data: errorData};
	}	

}

export const createTask = (task, projectId) => async (dispatch) => {
	const response = await fetch(`/api/tasks/${projectId}/new`, {
		method: 'POST',
		body: task
	})
	if (response.ok) {
		const taskData = await response.json();
		dispatch(storeNewTask(taskData))
		return { ok: true, data: taskData };
	} else {
		const errorData = response.json();
		return { ok: false, data: errorData};
	}
}

export const updateTask = (task, taskId) => async (dispatch) => {
	const response = await fetch(`/api/tasks/${taskId}`, {
		method: 'PUT',
		body: task
	})
	if (response.ok) {
		const task = await response.json();
		
		dispatch(storeUpdateTask(task))
		return { ok: true, data: task };
	} else {
		const errorData = await response.json();
		return { ok: false, data: errorData};
	}
}

export const updateIsCompleted = (taskId, projectId) => async (dispatch) => {
	const response = await fetch(`/api/tasks/${taskId}/is-complete`, {
		method: 'PUT'
	})
	if (response.ok)  {
		const data = await response.json()
		if (data.task) {
			dispatch(addTask())
		}
		else { 
			dispatch(minusTask())
		}

		dispatch(getProjectTasks, projectId)
		return data
	} else {
		const errorData = await response.json()
		return errorData
	}
}

export const deleteTask = (taskId, projectId) => async (dispatch) => {
	const response = await fetch(`/api/tasks/${taskId}`, {
		method: 'DELETE'
	})
	if (response.ok) {
		const data = await response.json();
		dispatch(storeDeleteTask(taskId))
		dispatch(getProjectTasks(projectId))
		return data
	} else {
		const errorData = await response.json();
		return errorData
	}
}

export const getProjectTasks = (projectId) => async (dispatch) => {
	const response = await fetch(`/api/tasks/${projectId}`, {
		method: 'GET'
	})
	if (response.ok) {
		const allTasks = await response.json();

		// if (allTasks.length > 0) {
			// await dispatch(taskCountCurr())
			// 	return allTasks;
			// }
		await dispatch(storeAllTasks(allTasks))
		await dispatch(taskCountCurr())
		return allTasks;
	} else {
		const errorData = await response.json();
		return errorData;
	}
}


const initialState = {
    projectTasks: {},
    taskCount: 0, 
};

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_TASK:
            return {
                ...state,
                projectTasks: {
                    ...state.projectTasks,
                    [action.task.id]: action.task,
                },
                taskCount: state.taskCount + 1,
            };
        case DELETE_TASK:
			const newAllTasks = {...state.projectTasks}
			delete newAllTasks[action.taskId]

            return {
                ...state,
                projectTasks: newAllTasks,
                taskCount: state.taskCount - 1, 
            };
        case GET_TASKS:

            const allTasks = action.tasks.reduce((acc, task) => {
                acc[task.id] = task;
                return acc;
            }, {});
            return {
                ...state,
                projectTasks: allTasks,
                taskCount: action.tasks.length,
            };
		case ADD_TASK:
			return {
				...state,
				taskCount: state.taskCount + 1
			}
		case MINUS_TASK:
			return {
				...state,
				taskCount: state.taskCount - 1
			}
		case TASK_COUNT:
		return {
			...state,
			taskCount: state.taskCount
		}
		case TASK_COUNT_UPDATE: {
			return {
				...state,
				taskCount: action.taskCount
			}
		}

        default:
            return state;
    }
};

			
    
export default tasksReducer;