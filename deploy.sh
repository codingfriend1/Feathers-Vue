echo $1
echo $2
echo $3
echo $4
echo $5
echo $6
echo $7
sshpass -p $1 ssh -o StrictHostKeyChecking=no -o PreferredAuthentications=password -o PubkeyAuthentication=no $3@$2 '
	echo "inside digitalocean"
	echo $4
	echo $5
	docker login -u $4 -p $5 registry.gitlab.com
	docker-compose stop
	docker-compose rm
	docker pull $6/$7
	docker-compose up -d
'