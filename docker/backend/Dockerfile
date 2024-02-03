# syntax=docker/dockerfile:1
FROM python:3.8
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Create code directory and copy req. deocument
WORKDIR /code
ADD ./backend/requirements.txt /code/backend/
ADD ./docker /code/docker
ADD ./backend /code/backend

# Install mysql dependencies
RUN apt-get update
RUN apt-get install gcc default-libmysqlclient-dev -y

# Entrypoint dependencies
RUN apt-get install netcat -y
# Install necessary packages
RUN pip install -U pip setuptools wheel
RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r backend/requirements.txt

# Copy backend source code at the end of build for increasing performance
#ADD ./docker /code/docker
#ADD ./backend /code/backend
