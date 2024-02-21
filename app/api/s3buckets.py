import boto3
import botocore
import os
import uuid

# name for files bucket
BUCKET_NAME = os.environ.get("S3_BUCKET")

# need images bucket variable

# location of files bucket
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"

# allowed extensions for files
ALLOWED_EXTENSIONS = {"jpeg", "jpg", "png", 'mp3', 'mp4', 'm4a', 'aiff', '.zip', '.doc', '.gif', 'svg', 'pkg', '.py', '.js', '.json' }


# should be same to access both buckets
s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)

# functions for song upload and removal
def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the your s3 upload fails
        
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}


def download_file_from_s3(file_url):
    OBJECT_NAME = FILE_NAME = file_url.rsplit("/", 1)[1]
    
    try: 
        s3.download_file(BUCKET_NAME, OBJECT_NAME ,FILE_NAME)
    except Exception as e:
        return {'errors': str(e)}
    return {'message': f"{FILE_NAME} downloaded"}


def remove_file_from_s3(file_url):
    # AWS needs the file name, not the URL, 
    # so you split that out of the URL
    key = file_url.rsplit("/", 1)[1]
    try:
        s3.delete_object(
        Bucket=BUCKET_NAME,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True
 