sshpass  -p $1 ssh -o StrictHostKeyChecking=no root@x.x.x.x <<-'ENDSSH'   
   docker login -u gitlab-ci-token -p $2 registry.gitlab.com
   docker stop feathers-vue
   docker rm feathers-vue
   docker pull $3
   docker run --name feathers-vue -p 80:80 -d $3
ENDSSH