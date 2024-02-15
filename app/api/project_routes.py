from flask import Blueprint, jsonify, request
from flask_login import current_user
from ..models import db, Project, CollabRequest
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

		user_collabs = CollabRequest.query.filter_by(sender_id=current_user.id, status='collaborator', project_id=projectId).all()
	
		if not current_user:
			return jsonify({'error': 'you must be logged in to delete projects'}), 403
		
		# Check if the current user is the creator
		is_creator = current_user.id == project.creator_id

		# Check if the current user is a collaborator
		is_collaborator = any(request.sender_id == current_user.id for request in user_collabs)

		if not (is_creator or is_collaborator):
			return jsonify({'error': 'you are not the creator or a collaborator of this project'}), 403
		
		form = ProjectForm(request.form);
		form['csrf_token'].data = request.cookies['csrf_token']
		

		if form.validate_on_submit():

			typeBool = request.form.get('is_public') or project.is_public

			if typeBool == 'true':
				typeBool = True
			if typeBool == 'false':
				typeBool = False

			project.name = request.form.get('name') or project.name 
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
	
	try:
		user_projects = Project.query.filter_by(creator_id=current_user.id).all()


		user_collabs = CollabRequest.query.filter_by(sender_id=current_user.id, status='collaborator').all()
		collab_project_list = [{
			"id": request.project.id,
			"name": request.project.name,
			 'creator_id':request.project.creator_id,
			'description': request.project.description,
			'due_date': request.project.due_date,
			'is_public': request.project.is_public,
			'task_count': request.project.task_count,
			"collaborator_id": request.sender_id,
		} for request in user_collabs]

		
		project_list = [{'id': project.id, 'name': project.name, 'creator_id':project.creator_id, 'description': project.description, 'due_date': project.due_date, 'is_public': project.is_public, 'task_count': project.task_count } for project in user_projects]

		project_list += collab_project_list

		if len(project_list) < 1:
			return jsonify([]), 200

		return jsonify(project_list), 200
	except Exception as e:
		return jsonify({'error': 'An error occurred getting projects'}), 500

@project_routes.route('/<int:projectId>', methods=['DELETE'])
def DeleteProject(projectId):
	project = Project.query.filter_by(id=projectId).first()
	
	user_collabs = CollabRequest.query.filter_by(sender_id=current_user.id, status='collaborator', project_id=projectId).all()
	
	if not current_user:
		return jsonify({'error': 'you must be logged in to delete projects'}), 403
	
	# Check if the current user is the creator
	is_creator = current_user.id == project.creator_id

	# Check if the current user is a collaborator
	is_collaborator = any(request.sender_id == current_user.id for request in user_collabs)

	if not (is_creator or is_collaborator):
		return jsonify({'error': 'you are not the creator or a collaborator of this project'}), 403
	
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
