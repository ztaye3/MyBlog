# syntax=docker/dockerfile:1
FROM python:3.8
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /code

# Install mysql dependencies
RUN apt-get update
RUN apt-get install gcc default-libmysqlclient-dev -y

# Install dependencies
RUN pip install -U pip setuptools wheel
RUN pip install --upgrade pip

COPY requirements.txt /code/
RUN pip install -r requirements.txt --no-cache-dir
COPY . /code/

# Convert plain text files from Windows or Mac format to Unix
RUN apt-get install dos2unix
RUN dos2unix --newfile docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

# Make entrypoint executable
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Entrypoint dependencies
RUN apt-get install netcat -y

# Run entrypoint.sh
#ENTRYPOINT ["bash", "/usr/local/bin/docker-entrypoint.sh"]