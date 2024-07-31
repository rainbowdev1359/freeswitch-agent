
# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /appjango

# Copy the current directory contents into the container at /app
COPY . /appjango

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define environment variable
ENV DJANGO_SETTINGS_MODULE=appjango.settings

# Run the application
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
