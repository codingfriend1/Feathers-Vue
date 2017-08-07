sshpass  -p $1 ssh -o StrictHostKeyChecking=no $3@$2 <<-'ENDSSH'
	echo $1
	echo $2
	echo $3
	echo $4
	echo $5
	echo $6
	docker login -u gitlab-ci-token -p $4 registry.gitlab.com
	docker-compose stop
	docker-compose rm
	docker pull $5/$6
	docker-compose up -d
ENDSSH