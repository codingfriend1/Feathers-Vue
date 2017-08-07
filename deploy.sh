SERVER_PASS=$1
SERVER_IP=$2
SERVER_USER=$3
DOCKER_USER=$4
DOCKER_PASS=$5
DOCKER_REGISTRY=$6
DOCKER_REPO=$7
sshpass -p $SERVER_PASS ssh -o StrictHostKeyChecking=no -o PreferredAuthentications=password -o PubkeyAuthentication=no $SERVER_USER@$SERVER_IP "
	docker login -u $DOCKER_USER -p $DOCKER_PASS $DOCKER_REGISTRY
	docker-compose stop
	docker-compose rm
	docker pull $DOCKER_REGISTRY/$DOCKER_REPO
	docker-compose up -d
"