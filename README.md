# Production-Grade MERN Stack DevOps Project 🚀

A complete end-to-end Production-Grade MERN Stack deployment on AWS using Kubernetes, Jenkins CI/CD, Docker, MongoDB Replica Set, ELK Stack, NGINX Ingress, and HTTPS.

## 📌 Project Overview

This project demonstrates how a modern MERN Stack application can be deployed and managed in a production-like environment using DevOps best practices.

The application consists of:

* Frontend (React + Vite)
* Backend (Node.js + Express)
* MongoDB Replica Set
* Kubernetes Cluster
* Jenkins CI/CD
* Docker & DockerHub
* ELK Stack (Elasticsearch, Kibana, Filebeat, Metricbeat)
* Elastic APM
* NGINX Ingress Controller
* Let's Encrypt SSL Certificates

---

## 🏗 Infrastructure Architecture

### AWS Infrastructure

* VPC
* Public Subnet
* Private Subnets
* Security Groups
* EC2 Instances

### Kubernetes Cluster

| Node           | Role                       |
| -------------- | -------------------------- |
| Master Node    | Kubernetes Control Plane   |
| Worker Node 1  | Application Workloads      |
| Worker Node 2  | Application Workloads      |
| Jenkins Server | CI/CD                      |
| ELK Server     | Monitoring & Observability |

---

## ☸ Kubernetes Components

### Backend

* Deployment
* Service (ClusterIP)
* Health Checks
* Rolling Updates
* 2 Replicas

### Frontend

* Deployment
* Service (ClusterIP)
* NGINX-based Container
* 2 Replicas

### MongoDB

* StatefulSet
* Headless Service
* 3 Pod Replica Set
* Automatic Synchronization

### Ingress

* NGINX Ingress Controller
* TLS Termination
* Domain Routing

---

## 🔄 CI/CD Pipeline

### Backend Pipeline

1. Checkout Source Code
2. Install Dependencies
3. Build Docker Image
4. Health Check Validation
5. Push Image to DockerHub
6. Create Offline TAR Image
7. Copy Image to Worker Nodes
8. Import Image into Containerd
9. Kubernetes Rollout Deployment

### Frontend Pipeline

1. Checkout Source Code
2. Install Dependencies
3. Build React Application
4. Build Docker Image
5. Health Check Validation
6. Push Image to DockerHub
7. Create Offline TAR Image
8. Copy Image to Worker Nodes
9. Import Image into Containerd
10. Kubernetes Rollout Deployment

---

## 🐳 Container Registry

DockerHub Images:

Backend:

moinnaik/portfolio-backend

Frontend:

moinnaik/portfolio-frontend

Tagging Strategy:

* latest
* Build Number Tags

Example:

moinnaik/portfolio-backend:latest

moinnaik/portfolio-backend:25

---

## 📊 Monitoring & Observability

### ELK Stack

* Elasticsearch
* Kibana
* Filebeat
* Metricbeat
* Fleet Server

### Application Monitoring

Elastic APM:

* Backend Transaction Monitoring
* API Performance Analysis
* Error Tracking

### Infrastructure Monitoring

Metricbeat collects:

* CPU Usage
* Memory Usage
* Disk Usage
* Network Statistics

---

## 🔐 Security Features

* HTTPS Enabled
* Let's Encrypt SSL Certificates
* TLS Termination at Ingress
* Private Worker Nodes
* Restricted Security Groups
* Internal Service Communication

---

## 🌍 Application Access

Frontend:

https://profile.moinnaik.in

Backend:

Internal Kubernetes Service

Monitoring:

Kibana Dashboard

Jenkins:

https://jenkins.moinnaik.in

---

## 📂 Project Structure

```text
.
├── app
│   ├── frontend
│   └── backend
│
├── kubernetes
│   ├── frontend
│   ├── backend
│   ├── mongodb
│   ├── cert-manager
│   └── observability
│
├── jenkins
│   ├── Frontend.Jenkinsfile
│   └── Backend.Jenkinsfile
│
└── README.md
```

## 🚀 Features Implemented

### DevOps

* CI/CD Automation
* Dockerized Applications
* Kubernetes Deployments
* Rolling Updates
* Health Checks
* Automated Rollbacks

### High Availability

* Multi-Replica Deployments
* MongoDB Replica Set
* Kubernetes Self-Healing
* Horizontal Pod Autoscaling

### Monitoring

* Centralized Logging
* Metrics Collection
* APM Monitoring
* Infrastructure Visibility

### Security

* SSL/TLS
* Private Networking
* Controlled Access

---

## 🛠 Technology Stack

### Frontend

* React
* Vite
* Bootstrap

### Backend

* Node.js
* Express.js

### Database

* MongoDB Replica Set

### DevOps

* Docker
* Kubernetes
* Jenkins
* DockerHub

### Monitoring

* Elasticsearch
* Kibana
* Filebeat
* Metricbeat
* Elastic APM

### Cloud

* AWS EC2
* AWS VPC

### Networking

* NGINX Ingress
* Let's Encrypt

---

## 📈 Future Enhancements

* Terraform Infrastructure Provisioning
* ArgoCD GitOps Deployment
* SonarQube Integration
* Trivy Security Scanning
* Prometheus & Grafana
* AWS ECR Migration
* Automated Backups to S3

---

## 👨‍💻 Author

Moin Mohammed Naik

* GitHub: https://github.com/MoinMN
* LinkedIn: https://www.linkedin.com/in/moinnaik
* Portfolio: https://moinnaik.in

---

## ⭐ Project Goal

To demonstrate real-world DevOps practices by deploying a production-grade MERN Stack application with CI/CD, Kubernetes orchestration, monitoring, logging, scalability, security, and high availability on AWS.
