from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import db, Task, Project, CollabRequest
from ..forms import TaskForm

task_routes = Blueprint('tasks', __name__)


@task_routes.route('/user/count', methods=['GET'])
@login_required
def TaskCount():
	task_count = current_user.tasks_completed
	tasks = current_user.tasks
	projects = current_user.projects

	payload = {
    "task_count": task_count,
    "tasks": [task.to_dict() for task in tasks], 
    "projects": [project.to_dict() for project in projects]
	}


	return jsonify(payload), 200


@task_routes.route('/<int:projectId>/new', methods=['POST'])
@login_required
def CreateTask(projectId):

	if not current_user:
		return jsonify({'error': 'must be logged in to create a task'}), 403
	
	form = TaskForm(request.form);
	form['csrf_token'].data = request.cookies['csrf_token']

	if form.validate_on_submit():
		new_task = Task(
			name=request.form.get('name'),
			description=request.form.get('description'),
			project_id=projectId,
			creator_id=current_user.id,	
		)
		db.session.add(new_task)

		project = Project.query.filter_by(id=projectId).first()
		project.task_count += 1
		db.session.commit()

		return jsonify(new_task.to_dict()), 200
	
	if form.errors:
            # print(form.errors)
            return jsonify(form.errors), 400


@task_routes.route('/<int:taskId>', methods=['PUT'])
@login_required
def UpdateTask(taskId):
	task = Task.query.filter_by(id=taskId).first()

	if not current_user:
		return jsonify({'error': 'you must be logged in to create a task'}), 403
	
	if current_user.id != task.creator_id:
		return jsonify({'error': 'you must be the task creator to update the task'}), 403
	
	form = TaskForm(request.form);
	form['csrf_token'].data = request.cookies['csrf_token']

	if form.validate_on_submit():
		
		task.name = request.form.get('name') or task.name
		task.description = request.form.get('description') or task.description
		task.project_id = request.form.get('project_id') or task.project_id
		task.creator_id = current_user.id or task.creator_id

		db.session.commit()

		return jsonify(task.to_dict()), 200
	
	if form.errors:
            # print(form.errors)
            return jsonify(form.errors), 400
	

@task_routes.route('/<int:taskId>/is-complete', methods=['PUT'])
@login_required
def UpdateTaskIsCompleted(taskId):
	try:
		task = Task.query.filter_by(id=taskId).first()
		project = Project.query.filter_by(id=task.project_id).first()

		if not current_user:
			return jsonify({'error': 'you must be logged in to create a task'}), 403
		
		if current_user.id != task.creator_id:
			return jsonify({'error': 'you must be the task creator to update the task'}), 403
		
		task.is_completed = not task.is_completed

		project = Project.query.filter_by(id=task.project_id).first()

		if task.is_completed == True:
			project.task_count -= 1
			current_user.tasks_completed += 1
			db.session.commit()
			return jsonify({'task': True}), 200
		if task.is_completed == False:
			project.task_count += 1
			current_user.tasks_completed -= 1
			db.session.commit()
			return jsonify({'task': False}), 200
	except Exception as e:
		return jsonify({'error': str(e)}), 500
	
	


@task_routes.route('/<int:projectId>', methods=['GET'])
def GetUserTasks(projectId):
	all_tasks = Task.query.filter_by(project_id=projectId)

	task_list = [{'id': task.id, 'name': task.name, 'description': task.description, 'creator_id': task.creator_id, 'is_completed': task.is_completed, 'project_id': task.project_id } for task in all_tasks]

	# if len(task_list) < 1:
	# 		return jsonify([]), 200

	return jsonify(task_list), 200


@task_routes.route('/<int:taskId>', methods=['DELETE'])
@login_required
def DeleteTask(taskId):
	task = Task.query.filter_by(id=taskId).first()


	if current_user.id != task.creator_id:
		return jsonify({'error': 'you are not the creator of this project'}), 403
	

	try:
		project = Project.query.filter_by(id=task.project_id).first()
		if project.task_count == 0:
			db.session.delete(task)
			db.session.commit()
			return jsonify({'message': 'task deleted successfully'}), 200
		
		if task.is_completed:
			db.session.delete(task)
			db.session.commit()
			return jsonify({'message': 'task deleted successfully'}), 200

		project.task_count -= 1
		db.session.delete(task)
		db.session.commit()
		return jsonify({'message': 'task deleted successfully'}), 200

	except Exception as e:
		print(e)
		db.session.rollback()
		return jsonify({'error': 'An error occurred during deletion'}), 500
