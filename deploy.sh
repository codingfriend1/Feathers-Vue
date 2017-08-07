sshpass  -p $1 ssh -o StrictHostKeyChecking=no $3@$2 <<-'ENDSSH'   
   docker login -u gitlab-ci-token -p $4 registry.gitlab.com
   docker-compose stop
   docker-compose rm
   docker pull $5/$5
   docker-compose up -d
ENDSSH