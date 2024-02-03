# Zach Blog and personal website
Created with Djanog Framework and React JS.

# 1. General info



### Tech information
``` 
Pattern:Microservice Architecture
FrameWork: Django REST (backend) and React JS (Frontend)
DB: MySQL with Docker
Security: Djoser
Back end: gunicorn
Front end: React JS
Web Serving: NGINX  
Test: Junit
CI/CD: Gitlab CI
Deployment: VPS A2 hosting
Versioning: git
Repository: GitHub
``` 



# 2. Repository Structure
```bash
zach-blog
├── backend
   ├── backend
   ├── comment 
   ├── identity
   ├── personal
   ├── post
  
├── docker
   ├── backend
   ├── ngnix

├── frontend
   ├── preview_images
   ├── public
   ├── src
```

# 3. Running locally
Port Number 8000
1) Clone the latest version of this repository
``` git clone https://gitlab.com/ztaye3/zach-blog.git ``` (_note: your credentials are needed_)

2) Run the project using docker ```docker-compose -f docker-compose-dev.yml up --build```

3) Run the application and visit http://localhost:8000/






