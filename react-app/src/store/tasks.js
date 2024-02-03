
const NEW_TASK = 'tasks/NEW_TASK';
const UPDATE_TASK = 'tasks/UPDATE_TASK';
const GET_TASKS = 'tasks/GET_TASKS'
const DELETE_TASK = 'tasks/DELETE_TASK'

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

const storeDeleteTask = (task) => {
	return {
		type: DELETE_TASK,
		task
	}
}

export const createTask = (task, projectId) => async (dispatch) => {
	const response = await fetch(`/api/tasks/${projectId}/new`, {
		method: 'POST',
		body: task
	})
	if (response.ok) {
		const taskData = response.json();
		dispatch(storeNewTask)
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

export const getProjectTasks = (projectId) => async (dispatch) => {
	const response = await fetch(`/api/tasks/${projectId}`, {
		method: 'GET'
	})
	if (response.ok) {
		const allTasks = await response.json();
		dispatch(storeAllTasks(allTasks))
		return allTasks;
	} else {
		const errorData = await response.json();
		return errorData;
	}
}

const initialState = {
	projectTasks: {}
}

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_TASK:
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.task.id]: action.task
                }
            };

        case UPDATE_TASK:
            return {
				...state,
				projectTasks: {
				  ...state.projectTasks, // Update projectTasks, not tasks
				  [action.task.id]: { ...state.projectTasks[action.task.id], ...action.task }
				}
			  };

        case GET_TASKS:
            const allTasks = action.tasks.reduce((acc, task) => {
                acc[task.id] = task;
                return acc;
            }, {});
            return {
				...state,
				projectTasks: {
				  ...state.projectTasks, // Update projectTasks, not tasks
				  ...allTasks
				}
			  };

        case DELETE_TASK:
		default:
			return state;
	}
}
			
    
export default tasksReducer;