from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, BooleanField
from flask_wtf.file import FileField, FileAllowed, FileRequired, DataRequired
from ..api.s3buckets import ALLOWED_EXTENSIONS

class FileForm(FlaskForm):
	file_name = StringField('file_name')
	file = FileField("file", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])