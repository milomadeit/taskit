from flask import Blueprint, jsonify, request
from flask_login import current_user
from ..models import db, Project
from ..forms.project_form import ProjectForm



project_routes = Blueprint('projects', __name__)


@project_routes.route('/new', methods=['POST'])
def CreateProject():
	if not current_user:
		return jsonify({'error': 'must be logged in to create a project'}), 403
	
	form = ProjectForm(request.form);
	form['csrf_token'].data = request.cookies['csrf_token']
	

	if form.validate_on_submit():

		typeBool = request.form.get('is_public')

		if typeBool == 'true':
			typeBool = True
		if typeBool == 'false':
			typeBool = False

		new_project = Project(
		name=request.form.get('name'),
		creator_id=current_user.id,
		description=request.form.get('description'),
		due_date=request.form.get('due_date'),
		is_public=typeBool
		)
		db.session.add(new_project)
		db.session.commit()

		response_data = new_project.to_dict()

		if not response_data:
			return jsonify({'error': 'cannot create project in database'}), 500
		return jsonify(response_data), 200
	
	if form.errors:
            # print(form.errors)
            return jsonify(form.errors), 400
	

@project_routes.route('/<int:projectId>', methods=['PUT'])
def UpdateProject(projectId):
	try:
		if not current_user:
			return jsonify({'error': 'must be logged in to create a project'}), 403
		
		project = Project.query.filter_by(id=projectId).first()

		if current_user.id != project.creator_id:
			return jsonify({'error': 'you did not create this project'}), 403
		
		form = ProjectForm(request.form);
		form['csrf_token'].data = request.cookies['csrf_token']
		

		if form.validate_on_submit():

			typeBool = request.form.get('is_public') or project.is_public

			if typeBool == 'true':
				typeBool = True
			if typeBool == 'false':
				typeBool = False

			project.name = request.form.get('name') or project.name 
			project.creator_id = current_user.id or project.creator_id 
			project.description = request.form.get('description') or project.description 
			project.due_date = request.form.get('due_date') or project.due_date
			project.is_public = typeBool

		
			db.session.commit()

			response_data = project.to_dict()

			if not response_data:
				return jsonify({'error': 'cannot edit project in database'}), 500
			return jsonify({"ok": response_data}), 200
		
		if form.errors:
				# print(form.errors)
				return jsonify(form.errors), 400
	except Exception as e:
		db.session.rollback()
		print(e, '<===== error')
		return jsonify(e), 500
	

@project_routes.route('/current', methods=['GET'])
def AllUserProjects():
	if not current_user:
		return jsonify({'error': 'you must be logged in to view these projects'}), 403 
	

	user_projects = Project.query.filter_by(creator_id=current_user.id).all()

	# if current_user.id != user_projects[0].creator_id:
	# 	return jsonify({'error': ' you did not create these projects'}), 403

	if user_projects:
		project_list = [{'id': project.id, 'name': project.name, 'creator_id':project.creator_id, 'description': project.description, 'due_date': project.due_date, 'is_public': project.is_public, 'task_count': project.task_count } for project in user_projects]

		if len(project_list) < 1:
			return jsonify([]), 200
	
		return jsonify(project_list), 200
	
	return jsonify({'error': 'could not get projects'})


@project_routes.route('/<int:projectId>', methods=['DELETE'])
def DeleteProject(projectId):
	project = Project.query.filter_by(id=projectId).first()

	if not current_user:
		return jsonify({'error': 'you must be logged in to delete projects'}), 403
	
	if current_user.id != project.creator_id:
		return jsonify({'error': 'you are not the creator of this project'}), 403
	
	try:
		db.session.delete(project)
		db.session.commit()
		return jsonify({'message': 'project deleted successfully'}), 200

	except Exception as e:
		db.session.rollback()
		return jsonify({'error': 'An error occurred during deletion'}), 500


@project_routes.route('', methods=['GET'])
def AllProjects():
	all_projects = Project.query.filter_by(is_public=True).all()

	if all_projects:
		project_list = [{'id': project.id, 'name': project.name, 'creator_id':project.creator_id, 'description': project.description, 'due_date': project.due_date, 'is_public': project.is_public, 'task_count': project.task_count } for project in all_projects]

		if len(project_list) < 1:
			return jsonify([]), 200

		return jsonify(project_list), 200
	
	return jsonify({'error': 'could not get projects'})
