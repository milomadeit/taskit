from flask import Blueprint, jsonify,  request
from flask_login import login_required, current_user
from app.models import db, CollabRequest, User, Project


collab_routes = Blueprint('collabs', __name__)

@collab_routes.route('/<int:projectId>/new', methods=['POST'])
@login_required
def request_collab(projectId):

	project = Project.query.filter_by(id=projectId).first()
	if not project:
		return jsonify({'error': "Project not found"}), 404

	collabExists = CollabRequest.query.filter_by(sender_id=current_user.id, project_id=project.id).first()

	if collabExists:
		return jsonify({'error': "you've already sent a request"}), 403

	new_request = CollabRequest(
		sender_id=current_user.id,
		receiver_id=project.creator_id,
		project_id=project.id,
		status = 'pending'
	)

	db.session.add(new_request)
	db.session.commit()

	return jsonify(new_request.to_dict());


@collab_routes.route('/<int:requestId>/', methods=['PUT'])
@login_required
def update_collab(requestId):

	collab_request = CollabRequest.query.filter_by(id=requestId)

	data = request.json

	print(data)

@collab_routes.route('/<int:requestId>', methods=['DELETE'])
@login_required 
def delete_collab(requestId):
    collab_request = CollabRequest.query.filter_by(id=requestId).first()
    if not collab_request:
        return jsonify({'error': 'CollabRequest not found'}), 404

    if current_user.id != collab_request.receiver_id and current_user.id != collab_request.sender_id:
        return jsonify({'error': 'Unauthorized'}), 403

    try:
        db.session.delete(collab_request)
        db.session.commit()
        return jsonify({'message': 'Request deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'An error occurred during deletion'}), 500
	

@collab_routes.route('/<int:userId>', methods=['GET'])
@login_required
def get_collabs(userId):
    requests = CollabRequest.query.filter_by(receiver_id=userId).all()

    requests_list = [{
        "id": request.id,
        "sender_id": request.sender_id,
        "receiver_id": request.receiver_id,
        "project_id": request.project_id,
        "status": request.status,
        "sender": {
            "id": request.sender.id,
            "username": request.sender.username
        },
		"project": {
			"id": request.project.id,
			"name": request.project.name,
		}
    } for request in requests]

    payload = {
        "request": requests_list
    }
    return jsonify(payload), 200