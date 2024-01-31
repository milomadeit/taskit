from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA, 'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    projects_completed = db.Column(db.Integer, default=0)
    tasks_completed = db.Column(db.Integer, default=0)

    comments = db.relationship('Comment', back_populates='user', cascade="all, delete-orphan")
    projects = db.relationship('Project', back_populates='creator', cascade="all, delete-orphan" )
    tasks = db.relationship('Task', back_populates='creator', cascade="all, delete-orphan" )
    badges = db.relationship('Badge', back_populates='creator', cascade="all, delete-orphan" )
    files = db.relationship('File', back_populates='creator', cascade="all, delete-orphan" )
    collab_send = db.relationship('CollabRequest', 
                                  foreign_keys="[CollabRequest.sender_id]", 
                                  back_populates='sender', 
                                  cascade="all, delete-orphan")
    collab_rec = db.relationship('CollabRequest', 
                                 foreign_keys="[CollabRequest.receiver_id]", 
                                 back_populates='receiver', 
                                 cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'projects_completed': self.projects_completed,
            'tasks_completed': self.tasks_completed
        }
    

class Project(db.Model):
    __tablename__ = 'projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA, 'extend_existing': True}
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    description = db.Column(db.String(250))
    status = db.Column(db.String(25))
    due_date = db.Column(db.DateTime())
    is_public = db.Column(db.Boolean())
    is_completed = db.Column(db.Boolean, default=False)

    creator = db.relationship('User', back_populates='projects')
    collabs = db.relationship('CollabRequest', back_populates='project', cascade="all, delete-orphan")
    files = db.relationship('File', back_populates='project', cascade="all, delete-orphan")
    tasks = db.relationship('Task', back_populates='project')
    comments = db.relationship('Comment', back_populates='project')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'creator_id': self.creator_id,
            'description': self.description,
            'status': self.status,
            'due_date':self.due_date,
            'is_public': self.is_public,
            'is_completed': self.is_completed,
        }


class Task(db.Model):
    __tablename__ = 'tasks'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA, 'extend_existing': True}
        
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")))
    name = db.Column(db.String(100), nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    description = db.Column(db.String(250))
    is_completed = db.Column(db.Boolean, default=False)

    creator = db.relationship('User', back_populates='tasks')
    project = db.relationship('Project', back_populates='tasks')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'creator_id': self.creator_id,
            'project_id': self.project_id,
            'description': self.description,
            'is_completed': self.is_completed,
        }
    
class CollabRequest(db.Model):
    __tablename__ = 'collab_requests'
    if environment == "production":
         __table_args__ = {'schema': SCHEMA, 'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")), nullable=False)
    status = db.Column(db.String, default='pending')

    sender = db.relationship('User', foreign_keys=[sender_id], back_populates='collab_send')
    receiver = db.relationship('User', foreign_keys=[receiver_id], back_populates='collab_rec')
    project = db.relationship('Project', back_populates='collabs')

    def to_dict(self):
        return {
            'id': self.id,
            'sender': self.sender_id,
            'receiver': self.receiver_id,
            'project': self.project_id,
            'status': self.status,
        }


class Badge(db.Model):
    __tablename__ = 'badges'
    if environment == "production":
         __table_args__ = {'schema': SCHEMA, 'extend_existing': True}
    
    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False) 
    badge_name = db.Column(db.String(100), nullable=False)

    creator = db.relationship('User', back_populates='badges')


    def to_dict(self):
        return {
            'id': self.id,
            'creator_id': self.creator_id,
            'badge': self.badge_name,
        }

class File(db.Model):
    __tablename__ = 'files'
    if environment == "production":
         __table_args__ = {'schema': SCHEMA, 'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")))
    file_name = db.Column(db.String(100), nullable=False)
    file_url = db.Column(db.String, nullable=False)
    is_public = db.Column(db.Boolean, default=False )

    creator = db.relationship('User', back_populates='files')
    project = db.relationship('Project', back_populates='files')

    def to_dict(self):
        return {
            'id': self.id,
            'creator_id': self.creator_id,
            'project_id': self.project_id,
            'file_name': self.file_name,
            'file_url': self.file_url,
            'is_public': self.is_public
        }
    

class Comment(db.Model):

    __tablename__ = 'comments'
    if environment == "production":
         __table_args__ = {'schema': SCHEMA, 'extend_existing': True}


    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")))
    content = db.Column(db.String(250), nullable=False)

    user = db.relationship('User', back_populates='comments')
    project = db.relationship('Project', back_populates='comments')


    def to_dict(self):
        return {
            'id': self.id,
            'creator_id': self.creator_id,
            'project_id': self.project_id,
            'content': self.content,
        }
