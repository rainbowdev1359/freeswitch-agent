# Appjango

Appjango is a REST API application developed using Django and Django REST framework aimed at managing contact lists and associated knowledge records. It allows for CRUD operations on contacts and knowledge, integrating file handling for knowledge records within a RAG (Retrieve-And-Generate) pipeline context.

## Overview

The application utilizes Django for the backend, leveraging Django REST framework for the API. It's structured around two main models: Contacts and Knowledge. The Contacts model captures details about interactions, including call recordings, while the Knowledge model manages files relevant to the RAG pipeline. File handling in the Knowledge model is particularly noteworthy, allowing for uploading and linking files within the API responses.

## Features

- CRUD operations for Contacts and Knowledge models.
- File upload capability in the Knowledge model, with the API returning file access URLs.
- Secure access with JWT authentication for API endpoints.

## Getting started

### Requirements

- Python 3.6+
- Django 3.2.8
- Django REST framework

### Quickstart

1. Clone the repository and navigate into the project directory.
2. Install dependencies: `pip install -r requirements.txt`.
3. Run migrations: `python manage.py migrate`.
4. Start the server: `python manage.py runserver`.
5. Access the API at `http://localhost:8000/api/`.

## License

Copyright (c) 2024. All rights reserved.