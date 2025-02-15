variable "project" {
  description = "Google Cloud Project ID"
  type        = string
}

variable "region" {
  description = "Region, w którym będą tworzone zasoby"
  type        = string
  default     = "us-central1"
}
