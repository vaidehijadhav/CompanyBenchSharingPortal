from flask import request, jsonify
from app import app, mysql
from models import *

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    user = get_user_by_username(username)
    if user and user['password'] == password:
        return jsonify({'message': 'Login successful', 'user_type': user['user_type']})
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/resource_types', methods=['GET', 'POST'])
def resource_types():
    if request.method == 'GET':
        try:
            resource_types = get_all_resource_types()
            return jsonify(resource_types)
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    elif request.method == 'POST':
        try:
            data = request.get_json()
            type_name = data['type_name']
            add_resource_type(type_name)
            return jsonify({'message': 'Resource type added successfully'})
        except KeyError as e:
            return jsonify({'error': f'Missing key in JSON request: {str(e)}'}), 400
        except Exception as e:
            return jsonify({'error': str(e)}), 500

@app.route('/resource_types/<int:type_id>', methods=['DELETE'])
def delete_resource_type(type_id):
    try:
        delete_resource_type_by_id(type_id)
        return jsonify({'message': 'Resource type deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/resources', methods=['GET', 'POST'])
def resources():
    if request.method == 'GET':
        try:
            resources = get_all_resources()
            return jsonify(resources)
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    elif request.method == 'POST':
        try:
            data = request.get_json()
            name = data['name']
            type_id = data['type_id']
            description = data['description']
            available_from = data['available_from']
            add_resource(name, type_id, description, available_from)
            return jsonify({'message': 'Resource added successfully'})
        except KeyError as e:
            return jsonify({'error': f'Missing key in JSON request: {str(e)}'}), 400
        except Exception as e:
            return jsonify({'error': str(e)}), 500

@app.route('/book_resource', methods=['POST'])
def book():
    try:
        data = request.get_json()
        resource_id = data['resource_id']
        user_id = data['user_id']
        book_resource(resource_id, user_id)
        return jsonify({'message': 'Resource booked successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/release_resource', methods=['POST'])
def release():
    try:
        data = request.get_json()
        resource_id = data['resource_id']
        release_resource(resource_id)
        return jsonify({'message': 'Resource released successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
