from app import mysql

def get_user_by_username(username):
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM users WHERE username=%s", (username,))
    user = cursor.fetchone()
    cursor.close()
    return user

def add_user(username, password, user_type):
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO users (username, password, user_type) VALUES (%s, %s, %s)", (username, password, user_type))
    mysql.connection.commit()
    cursor.close()

def get_all_resource_types():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM resource_types")
    resource_types = cursor.fetchall()
    cursor.close()
    return resource_types

def add_resource_type(type_name):
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO resource_types (type_name) VALUES (%s)", (type_name,))
    mysql.connection.commit()
    cursor.close()

def delete_resource_type_by_id(type_id):
    cursor = mysql.connection.cursor()
    cursor.execute("DELETE FROM resource_types WHERE id=%s", (type_id,))
    mysql.connection.commit()
    cursor.close()

def get_all_resources():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM resources")
    resources = cursor.fetchall()
    cursor.close()
    return resources

def add_resource(name, type_id, description, available_from):
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO resources (name, type_id, description, available_from) VALUES (%s, %s, %s, %s)", (name, type_id, description, available_from))
    mysql.connection.commit()
    cursor.close()

def book_resource(resource_id, user_id):
    cursor = mysql.connection.cursor()
    cursor.execute("UPDATE resources SET booked_by=%s WHERE id=%s", (user_id, resource_id))
    mysql.connection.commit()
    cursor.close()

def release_resource(resource_id):
    cursor = mysql.connection.cursor()
    cursor.execute("UPDATE resources SET booked_by=NULL WHERE id=%s", (resource_id,))
    mysql.connection.commit()
    cursor.close()
