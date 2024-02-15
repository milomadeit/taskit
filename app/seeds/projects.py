from app.models import db, Project, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_projects():    
    project1 = Project(name='Build A Treehouse', creator_id=3, description="Building the TaskIt Treehouse", due_date='2024-04-29T15:00', is_public=True)
    project2 = Project(name='Clean The House', creator_id=3, description="Deep Cleaning Tasks", due_date='2024-03-29T15:00', is_public=False)
    project3 = Project(name='Community Organization', creator_id=3, description="Building community together ", due_date='2024-04-29T15:00', is_public=True)

    db.session.add(project1)
    db.session.add(project2)
    db.session.add(project3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM projects"))
        
    db.session.commit()
    