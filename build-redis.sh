echo "Redis"
echo "==================="
cd redis-sentinel;
echo "Redis Client Image..."
docker ps -a -q  --filter ancestor=client:latest | xargs docker stop
docker build --rm -f Client.Dockerfile -t client:latest .
# docker run --rm -d -p 80:80 client:latest

cd ..
echo ""