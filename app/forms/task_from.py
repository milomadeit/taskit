from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from ..models.models import Project


class TaskForm(FlaskForm):
	name = StringField('name', validators=[DataRequired()])
	description = StringField('description')
