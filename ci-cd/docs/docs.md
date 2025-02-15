# ArtQuest CI/CD Documentation

## Wprowadzenie

Ten dokument opisuje proces ciągłej integracji i wdrożenia (CI/CD) dla projektu ArtQuest.

## Pipeline Jenkins

Pipeline definiowany jest w pliku `Jenkinsfile`. Główne etapy to:
- **Checkout** kodu z repozytorium.
- **Budowanie** obrazów Docker dla poszczególnych modułów (node-service, auth-service, python-grpc).
- **Uruchamianie testów** – przykładowe testy Selenium.
- **Analiza kodu** przy użyciu SonarQube.
- **Generowanie dokumentacji** przy użyciu MkDocs.
- **Deploy** do klastra Kubernetes.

## Testy Selenium

Testy end-to-end są wykonywane przy użyciu Selenium. Przykładowy test znajduje się w `ci-cd/selenium/tests/sampleTest.js`.

## Analiza kodu

Analiza kodu jest wykonywana przez SonarQube za pomocą narzędzia sonar-scanner. Token i adres serwera SonarQube są pobierane z konfiguracji Jenkins.

## Deploy

Wdrożenie aplikacji odbywa się przy użyciu manifestów Kubernetes zlokalizowanych w katalogu `infrastructure/k8s`.
