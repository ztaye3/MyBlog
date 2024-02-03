#!/bin/bash

if [ "$DATABASE" = "mysql" ]
then
    echo "Waiting for mysql..."
    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done
    echo "MySQL started"
fi

# Grant access to zach in blog db
MySQLCMD="${MySQLCMD:-docker exec -i -e LANG=C.UTF-8 $1 zach_blog_db_prod -u root -p $SQL_ROOT_PASSWORD}"
${MySQLCMD} << EOF
GRANT ALL PRIVILEGES ON blog.* TO 'zach'@'%' WITH GRANT OPTION;
EOF
echo "MySQL privileges granted to Zach"

# Change directory to run wsgi commands
cd backend/

# Run DB migration and collect static files
./manage.py collectstatic --noinput
# Apply all migrations
./manage.py makemigrations
./manage.py migrate

# Run all test cases
./manage.py test

# Run gunicorn server with 4 workers and threads (16 concurrent request)
gunicorn backend.wsgi --bind 0.0.0.0:8000 --workers 4 --threads 4 --log-level debug

