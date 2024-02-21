from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import db, File, Project
from .s3buckets import get_unique_filename, upload_file_to_s3, download_file_from_s3, remove_file_from_s3
# import form for validating files
from ..forms.file_upload_form import FileForm
from werkzeug.datastructures import CombinedMultiDict


file_routes = Blueprint('files', __name__)

@file_routes.route('<int:projectID>', methods=['GET'])
@login_required
def GetFiles(projectID):
	project = Project.query.filter_by(id=projectID)
	files = File.query.filter_by(project_id=projectID).all()
	files_list = [{
		"id": file.id,
		"name": file.file_name, 
		"url": file.file_url, 
		"project_id": file.project_id, 
		"creator_id": file.creator_id
	} for file in files]

	return jsonify(files_list)
	

@file_routes.route('<int:projectID>', methods=['POST'])
@login_required
def GetFiles(projectID):
	form = FileForm(CombinedMultiDict((request.files, request.form)))
	form['csrf_token'].data = request.cookies['csrf_token']

	if form.validate_on_submit():
		# File data is accessed from request.files
		file = request.files.get('file')

		if file:
			file.filename = get_unique_filename(file.filename)
			upload = upload_file_to_s3(file)

			if 'url' not in upload:
				return jsonify({'error': 'upload failed'}), 500

			url = upload['url']

			new_file = File(
				creator_id=current_user,
				project_id=projectID,
				file_url=url,
				file_name=request.form.get('file_name')
			)
			db.session.add(new_file)
			db.session.commit()
			confirmed_file = new_file.to_dict()
			return jsonify(confirmed_file), 200


