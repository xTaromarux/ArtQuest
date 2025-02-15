provider "google" {
  project = var.project
  region  = var.region
}

# Przykładowy zasób: klaster GKE
resource "google_container_cluster" "artquest_cluster" {
  name              = "artquest-cluster"
  location          = var.region
  initial_node_count = 3

  node_config {
    machine_type = "e2-medium"
  }
}

# Przykładowy zasób: bucket w Google Cloud Storage
resource "google_storage_bucket" "artquest_bucket" {
  name          = "artquest-files-${random_id.bucket_suffix.hex}"
  location      = var.region
  force_destroy = true
}

resource "random_id" "bucket_suffix" {
  byte_length = 4
}
