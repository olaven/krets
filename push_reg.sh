docker build . -t kretsapp
docker tag kretsapp registry.digitalocean.com/krets/kretsapp
docker push registry.digitalocean.com/krets/kretsapp
