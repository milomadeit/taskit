from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import db, Task
from ..forms import TaskForm

task_routes = Blueprint('tasks', __name__)

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

		current_user.task_count += 1
		db.session.commit()

		return jsonify(new_task.to_dict()), 200
	
	if form.errors:
            # print(form.errors)
            return jsonify(form.errors), 400
