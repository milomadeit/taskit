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
			return jsonify({'error': 'cannot create project in database'})
		return jsonify({"ok": response_data}), 200
	
	if form.errors:
            # print(form.errors)
            return jsonify(form.errors), 400