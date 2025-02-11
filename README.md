A. Lokalne uruchomienie poszczególnych modułów
1. Frontend:
Wejdź do katalogu ArtQuest/frontend i uruchom:
expo start

2. Python gRPC:
W katalogu ArtQuest/backend/python-grpc (po aktywacji środowiska wirtualnego) uruchom:
python app/main.py
Upewnij się, że metryki Prometheus są wystawione (np. na porcie 8000).

3. Node-service & Auth-service:
W odpowiednich katalogach (node-service oraz auth-service) uruchom serwery:
node server.js
Lub wykorzystaj narzędzia takie jak nodemon dla automatycznego restartu podczas developmentu.

B. Docker & Kubernetes
1. Docker Compose:
Jeśli skonfigurowałeś docker-compose.yml w katalogu infrastructure, uruchom:
docker-compose up

2. Kubernetes:
Po provisioningu za pomocą Terraform i konfiguracji manifestów YAML, wdroż aplikacje przy pomocy:
kubectl apply -f path/to/k8s/


3. Terraform:
W katalogu infrastructure/terraform uruchom:
terraform init
terraform plan
terraform apply
