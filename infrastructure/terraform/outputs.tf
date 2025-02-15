output "cluster_name" {
  description = "Nazwa klastra Kubernetes"
  value       = google_container_cluster.artquest_cluster.name
}

output "bucket_name" {
  description = "Nazwa bucketu w GCS"
  value       = google_storage_bucket.artquest_bucket.name
}
