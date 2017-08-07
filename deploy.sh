sshpass  -p $1 ssh -o StrictHostKeyChecking=no root@$2 <<-'ENDSSH'   
   docker login -u gitlab-ci-token -p $3 registry.gitlab.com
   docker-compose stop
   docker-compose rm
   docker pull $4/$5
   docker-compose up -d
ENDSSH