docker-compose down 

# Build and Deploy Client
############################
./build-client.sh

# Build and Deploy Reverse Proxy
###################################

./build-reverse-proxy.sh

docker-compose up
