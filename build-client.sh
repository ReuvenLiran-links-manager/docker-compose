echo "Client"
echo "==================="
cd client2;
echo "Building Client..."
yarn build;

echo "Building Client Image..."
# docker ps -a -q  --filter ancestor=client:latest | xargs docker stop
docker build --rm -f Dockerfile -t client:latest .
# docker run --rm -d -p 80:80 client:latest

cd ..
echo ""