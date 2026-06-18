# Production-Grade MERN Stack DevOps Project 🚀

A complete end-to-end Production-Grade MERN Stack deployment on AWS using Kubernetes, Jenkins CI/CD, Docker, MongoDB Replica Set, ELK Stack, NGINX Ingress, HTTPS, and Elastic Observability.

---

## 🎥 Project Demo

Watch the complete project walkthrough and deployment demo:

**YouTube Demo:** `https://youtu.be/eydSCuioiBw`

---

## 📄 Project Report

Detailed project documentation and implementation report:

**Project Report:** `./docs/report.pdf`

(Report available inside this repository)

---

## 🌐 Live Application

### Portfolio Website

🔗 **Portfolio:** https://profile.moinnaik.in

### Jenkins

🔗 **Jenkins:** https://jenkins.moinnaik.in

---

## 📌 Project Overview

This project demonstrates how a modern MERN Stack application can be deployed and managed in a production-grade environment using real-world DevOps practices.

The platform hosts my personal portfolio website and showcases my DevOps, Cloud, Kubernetes, and Full Stack Development projects.

### Core Components

* React + Vite Frontend
* Node.js + Express Backend
* MongoDB Replica Set
* Kubernetes Cluster
* Jenkins CI/CD
* Docker & DockerHub
* Elasticsearch
* Kibana
* Filebeat
* Metricbeat
* Elastic APM
* NGINX Ingress Controller
* Let's Encrypt SSL

---

## 🏗 Infrastructure Architecture

### AWS Infrastructure

* VPC
* Public Subnet
* Private Subnets
* Security Groups
* EC2 Instances

### Kubernetes Cluster

| Node           | Purpose                  |
| -------------- | ------------------------ |
| Master Node    | Kubernetes Control Plane |
| Worker Node 1  | Application Workloads    |
| Worker Node 2  | Application Workloads    |
| Jenkins Server | CI/CD Automation         |
| ELK Server     | Logging & Monitoring     |

---

## ☸ Kubernetes Components

### Frontend

* React + Vite
* Deployment
* Service (ClusterIP)
* NGINX Container
* 2 Replicas

### Backend

* Node.js + Express
* Deployment
* Service (ClusterIP)
* Health Checks
* Rolling Updates
* 2 Replicas

### MongoDB

* StatefulSet
* Headless Service
* 3-Pod Replica Set
* Automatic Synchronization

### Ingress

* NGINX Ingress Controller
* Domain Routing
* SSL/TLS Termination

---

## 🔄 CI/CD Pipeline

### Backend Pipeline

1. Source Code Checkout
2. Install Dependencies
3. Build Docker Image
4. Health Validation
5. Push to DockerHub
6. Generate TAR Image
7. Copy to Worker Nodes
8. Import into Containerd
9. Kubernetes Rollout

### Frontend Pipeline

1. Source Code Checkout
2. Install Dependencies
3. Build Application
4. Build Docker Image
5. Health Validation
6. Push to DockerHub
7. Generate TAR Image
8. Copy to Worker Nodes
9. Import into Containerd
10. Kubernetes Rollout

### GitHub Webhook Integration

* Automatic Build Trigger
* Production Branch Deployment
* End-to-End CI/CD Automation

---

## 🐳 Container Registry

### DockerHub Images

Backend:

```bash
moinnaik/portfolio-backend
```

Frontend:

```bash
moinnaik/portfolio-frontend
```

### Tagging Strategy

```bash
latest
build-number
```

Example:

```bash
moinnaik/portfolio-backend:latest
moinnaik/portfolio-backend:25
```

---

## 📊 Monitoring & Observability

### ELK Stack

* Elasticsearch
* Kibana
* Filebeat
* Metricbeat

### Elastic APM

Provides:

* API Transaction Monitoring
* Request Tracing
* Error Tracking
* Performance Monitoring

### Infrastructure Monitoring

Metricbeat collects:

* CPU Usage
* Memory Usage
* Disk Usage
* Network Statistics
* Kubernetes Metrics

### Centralized Logging

Filebeat collects logs from:

* Frontend Pods
* Backend Pods
* Kubernetes Components
* System Services

All logs are indexed into Elasticsearch and visualized through Kibana.

---

## 🔐 Security Features

* HTTPS Enabled
* Let's Encrypt SSL Certificates
* TLS Termination
* Private Worker Nodes
* Restricted Security Groups
* Internal Service Communication
* Kubernetes Secrets

---

## 🌍 Application Access

### Frontend

```bash
https://profile.moinnaik.in
```

### Backend

```bash
Internal Kubernetes Service
```

### Jenkins

```bash
https://jenkins.moinnaik.in
```

### Monitoring

```bash
Kibana Dashboard
```

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
│   ├── ingress
│   └── observability
│
├── jenkins
│   ├── Frontend.Jenkinsfile
│   └── Backend.Jenkinsfile
│
├── docs
│   ├── assets
│   └── report.pdf
│
└── README.md
```

---

## 🚀 Features Implemented

### DevOps

* Jenkins CI/CD
* Dockerized Applications
* Kubernetes Deployments
* Rolling Updates
* Health Checks
* Automated Deployments
* GitHub Webhooks

### High Availability

* Multi-Replica Deployments
* MongoDB Replica Set
* Kubernetes Self-Healing
* Horizontal Pod Autoscaling

### Monitoring

* Centralized Logging
* Metrics Collection
* Application Monitoring
* Infrastructure Monitoring

### Security

* SSL/TLS
* Private Networking
* Restricted Access
* Secure Communication

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

* Terraform Infrastructure as Code
* ArgoCD GitOps
* SonarQube Code Quality
* Trivy Security Scanning
* Prometheus & Grafana
* AWS ECR Migration
* Automated S3 Backups

---

## 👨‍💻 Author

### Moin Mohammed Naik

#### Portfolio

https://moinnaik.in

#### GitHub

https://github.com/MoinMN

#### LinkedIn

https://www.linkedin.com/in/moinnaik

---

## ⭐ Project Goal

To demonstrate real-world DevOps practices by deploying a Production-Grade MERN Stack application with:

* CI/CD Automation
* Kubernetes Orchestration
* Centralized Logging
* Application Monitoring
* Security Best Practices
* Scalability
* High Availability
* Cloud Infrastructure on AWS

This project serves as a practical implementation of modern DevOps and Cloud Engineering concepts used in enterprise environments.
