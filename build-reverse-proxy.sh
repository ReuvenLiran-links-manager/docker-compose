cd reverse-proxy1

echo "Reverse Proxy"
echo "=============================="

# echo "Remove Old Build..."
# rm ./bin/reverse-proxy

# echo "Building Reverse Proxy..."
# env GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o bin/reverse-proxy

echo "Building reverse proxy image..."
# docker ps -a -q --filter ancestor=reverse-proxy:latest | xargs docker stop
docker build -f Dockerfile -t reverse-proxy:latest .
docker run --rm -p 9000:9000 reverse-proxy:latest --no-cache

cd ..
echo ""
