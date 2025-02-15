# ArtQuest

ArtQuest to przykładowy projekt składający się z wielu modułów:
- **Frontend** – Aplikacja mobilna i webowa oparta na Expo / React Native z Expo Router.
- **Backend** – Usługi:
  - **auth-service** – Usługa autoryzacyjna (Express, Passport, JWT, PostgreSQL, Swagger).
  - **node-service** – Ogólna usługa Node.js (Express, RabbitMQ, Redis, Google Cloud Storage, gRPC client, Prometheus, Sentry, Zipkin, Swagger).
  - **python-grpc** – Serwer gRPC (Python, SQLAlchemy, PostgreSQL, Prometheus, OpenTelemetry, Sentry, Sphinx).
- **Infrastructure** – Zarządzanie infrastrukturą przy użyciu:
  - **Terraform** – Provisioning zasobów chmurowych (np. klaster Kubernetes, bucket w GCS).
  - **Kubernetes** – Manifesty wdrożeniowe (Deployment, Service, Ingress, ConfigMap, Secrets, Prometheus).
  - **Docker Compose** – Lokalne uruchomienie całego stacka.
- **Monitoring** – Integracja Prometheus, Grafana, Zipkin oraz Sentry.
- **Quality** – Analiza kodu z SonarQube i Skanowanie zależności z Snyk.
- **CI/CD** – Pipeline z Jenkins, Selenium testy i generowanie dokumentacji (MkDocs, Sphinx).

## Spis treści

- [ArtQuest](#artquest)
  - [Spis treści](#spis-treści)
  - [Wymagania](#wymagania)
  - [Instalacja i uruchomienie](#instalacja-i-uruchomienie)
    - [1. Środowisko lokalne przy użyciu Docker Compose](#1-środowisko-lokalne-przy-użyciu-docker-compose)
    - [2. Uruchomienie poszczególnych modułów lokalnie](#2-uruchomienie-poszczególnych-modułów-lokalnie)
      - [Frontend](#frontend)
      - [Auth-service](#auth-service)
      - [Node-service](#node-service)
      - [Python-grpc](#python-grpc)
      - [Infrastructure](#infrastructure)
  - [Moduły projektu](#moduły-projektu)
    - [Frontend](#frontend-1)
    - [Auth-service](#auth-service-1)
    - [Node-service](#node-service-1)
    - [Python-grpc](#python-grpc-1)
    - [Infrastructure](#infrastructure-1)
    - [Monitoring](#monitoring)
    - [Quality](#quality)
    - [CI/CD](#cicd)

---

## Wymagania

- [Git](https://git-scm.com/)
- [Node.js (LTS)](https://nodejs.org/)
- [Python 3.x](https://www.python.org/)
- [Docker i Docker Compose](https://www.docker.com/get-started)
- [Terraform](https://www.terraform.io/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)

---

## Instalacja i uruchomienie

### 1. Środowisko lokalne przy użyciu Docker Compose

W katalogu głównym projektu, gdzie znajduje się folder `infrastructure`, uruchom:
```bash
docker-compose up --build
```
To polecenie:
Przebuduje obrazy, jeśli wprowadziłeś zmiany w kodzie lub konfiguracji.
Uruchomi wszystkie usługi: PostgreSQL, Redis, RabbitMQ, node-service, auth-service, python-grpc, Prometheus, Zipkin, Selenium, Grafana.


### 2. Uruchomienie poszczególnych modułów lokalnie

#### Frontend
1. Przejdź do katalogu frontend:
```bash
cd frontend
```
2. Zainstaluj zależności:
```bash
npm install
```
3. Uruchom aplikację Expo:
```bash
npx expo start
```
Jeśli uruchamiasz aplikację w przeglądarce, domyślnie Expo Web działa na porcie:
[localhost:8081](http://localhost:8081)

#### Auth-service
1. Przejdź do katalogu backend/auth-service:
```bash
cd backend/auth-service
```
2. Zainstaluj zależności:
```bash
npm install
```
3. Upewnij się, że masz skonfigurowany plik .env.
4. Uruchom serwer:
```bash
npm start
```
  * Dostępne trasy:
    * GET / – "Auth Service is running." [localhost:4000/](http://localhost:4000/)
    * API: /api/auth [localhost:4000/api/auth](http://localhost:4000/api/auth)
    * Dokumentacja Swagger: /docs [localhost:4000/docs](http://localhost:4000/docs)

#### Node-service
1. Przejdź do katalogu backend/node-service:
```bash
cd backend/node-service
```
2. Zainstaluj zależności:
```bash
npm install
```
3. Uruchom serwer:
```bash
npm start
```
   * Dostępne trasy:
     * GET / – "Node-service działa!" [localhost:3000/](http://localhost:3000/)
     * API: /api/tasks [localhost:3000/api/tasks](http://localhost:3000/api/tasks)
     * Dokumentacja Swagger: /docs [localhost:3000/docs](http://localhost:3000/docs)
     * Metryki Prometheus: /metrics [localhost:3000/metrics](http://localhost:3000/metrics)

#### Python-grpc
1. Przejdź do katalogu backend/python-grpc:
```bash
cd backend/python-grpc
```
2. Utwórz i aktywuj środowisko wirtualne:
```bash
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate
```
3. Zainstaluj zależności:
```bash
pip install -r requirements.txt
```
4. Wygeneruj stuby gRPC (jeśli nie zostały wygenerowane):
```bash
python -m grpc_tools.protoc -I./proto --python_out=./app --grpc_python_out=./app ./proto/task.proto
```
5. Uruchom serwer:
```bash
python app/main.py
```
   * gRPC komunikuje się na porcie: 50051
   * Metryki Prometheus [localhost:8000](http://localhost:8000)

#### Infrastructure
* PostgreSQL:
  * Dostępny na porcie: 5432 [postgresql:5432](postgresql://user:password@localhost:5432/artquest)
* Redis:
  * Dostępny na porcie: 6379
* RabbitMQ:
  * AMQP: port 5672 [localhost:15672](http://localhost:15672)
* Prometheus:
  * Dostępny na porcie: 9090 [localhost:9090](http://localhost:9090)
* Zipkin:
  * Dostępny na porcie: 9411 [localhost:9411](http://localhost:9411)
* Selenium (WebDriver):
  * Dostępny na porcie: 4444 [localhost:4444](http://localhost:4444/wd/hub) - używany przez testy
* Grafana:
  * W przykładowej konfiguracji dostępna na porcie: 3001 [localhost:3001](http://localhost:3001)

## Moduły projektu

### Frontend
* Technologie: Expo, React Native, Expo Router, React Navigation, Axios.
* Uruchomienie: expo start (lub expo start --web dla wersji web).
* Główne trasy:
  * / – główny stack (zawiera m.in. zakładki w folderze (tabs)).
  * /docs – (jeśli wdrożysz dokumentację dla frontendu).
* Linki:
  * Dokumentacja Expo
  * Expo Router

### Auth-service
* Technologie: Express, Passport, JWT, PostgreSQL, Swagger.
* Uruchomienie: npm start lub przez Docker Compose.
* Dostępne trasy:
  * GET / – testowa trasa.
  * /api/auth – endpointy API.
  * /docs – dokumentacja Swagger.
* Linki:
  * [Express](https://expressjs.com/)
  * [Passport](https://www.passportjs.org/)
  * [JWT](https://jwt.io/)
  * [Swagger](https://swagger.io/)

### Node-service
* Technologie: Express, RabbitMQ, Redis, Google Cloud Storage, gRPC client, Prometheus, Sentry, Zipkin, Swagger.
* Uruchomienie: npm start lub przez Docker Compose.
* Dostępne trasy:
  * GET / – testowa trasa.
  * /api/tasks – endpointy dla zadań.
  * /docs – dokumentacja Swagger.
  * /metrics – metryki Prometheus.
* Linki:
  * [Express](https://expressjs.com/)
  * [RabbitMQ](https://www.rabbitmq.com/)
  * [Redis](https://redis.io/)
  * [Prometheus](https://github.com/siimon/prom-client)
  * [Zipkin](https://zipkin.io/)

### Python-grpc
* Technologie: gRPC, SQLAlchemy, PostgreSQL, Prometheus, OpenTelemetry, Sentry, Sphinx.
* Uruchomienie: python app/main.py lub przez Docker Compose.
* Linki:
  * [gRPC](https://grpc.io/)
  * [SQLAlchemy](https://www.sqlalchemy.org/)
  * [Prometheus](https://github.com/prometheus/client_python)
  * [OpenTelemetry](https://opentelemetry.io/)
  * [Sphinx](https://www.sphinx-doc.org/en/master/)

### Infrastructure
* Technologie: Terraform, Kubernetes, Docker Compose.
* Funkcje: Provisioning chmurowy (klaster Kubernetes, bucket w GCS), manifesty YAML, lokalny stack Docker.
* Linki:
  * [Terraform](https://www.terraform.io/)
  * [Kubernetes](https://kubernetes.io/)
  * [Docker](https://www.docker.com/)

### Monitoring
* Technologie: Prometheus, Grafana, Zipkin, Sentry.
* Linki:
  * [Prometheus](https://prometheus.io/)
  * [Grafana](https://grafana.com/)
  * [Zipkin](https://zipkin.io/)
  * [Sentry](https://sentry.io/welcome/)

### Quality
* Technologie: SonarQube, Snyk.
* Linki:
  * [SonarQube](https://www.sonarsource.com/products/sonarqube/)
  * [Snyk](https://snyk.io/)

### CI/CD
* Technologie: Jenkins, Selenium, MkDocs.
* Linki:
  * [Jenkins](https://www.jenkins.io/)
  * [Selenium](https://www.selenium.dev/)
  * [MkDocs](https://www.mkdocs.org/)