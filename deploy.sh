echo $1
echo $2
echo $3
DOCKER_USER=$4
DOCKER_PASS=$5
GITLAB_REGISTRY=$6
GITLAB_REPO=$7
sshpass -p $1 ssh -o StrictHostKeyChecking=no -o PreferredAuthentications=password -o PubkeyAuthentication=no $3@$2 "
	docker login -u $DOCKER_USER -p $DOCKER_PASS $GITLAB_REGISTRY
	docker-compose stop
	docker-compose rm
	docker pull $GITLAB_REGISTRY/$GITLAB_REPO
	docker-compose up -d
"