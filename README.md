# Production Grade MERN Stack Application Deployment on Kubernetes

## Project Overview

This project demonstrates deployment of a Production Grade MERN (MongoDB, Express.js, React.js, Node.js) application on a Kubernetes cluster using DevOps best practices.

The project includes:

* Dockerized MERN Application
* Kubernetes Deployments and Services
* MongoDB StatefulSet
* NGINX Ingress Controller
* Jenkins CI/CD Integration
* AWS EC2 Infrastructure
* Calico CNI Networking
* High Availability Frontend and Backend Pods

---

# Architecture

## Components

### Frontend

* React Application
* Docker Image: `frontend:v1`
* Replicas: 2

### Backend

* Node.js / Express Application
* Docker Image: `backend:v1`
* Replicas: 2

### Database

* MongoDB StatefulSet
* Replicas: 2
* Persistent Storage enabled

### Ingress

* NGINX Ingress Controller
* External access through HTTP (Port 80)

---

# Project Structure

```text
.
├── app
│   ├── backend
│   ├── frontend
│   ├── db
│   ├── docker-compose.yml
│   └── README.md
│
├── docs
│   ├── Architecture-Diagram.png
│   └── High-Level-Diagram.png
│
├── jenkins
│
└── kubernetes
    ├── backend
    │   ├── backend-deployment.yaml
    │   ├── backend-service.yaml
    │   └── backend.env
    │
    ├── frontend
    │   ├── frontend-configmap.yaml
    │   ├── frontend-deployment.yaml
    │   ├── frontend-service.yaml
    │   ├── ingress-nginx.json
    │   └── ingress.yaml
    │
    └── mongodb
        ├── mongodb-statefulset.yaml
        └── pv.yaml
```

---

# Infrastructure

## AWS EC2 Instances

### Master Node

Responsibilities:

* Kubernetes Control Plane
* NGINX Ingress Controller

Security Group Rules:

| Port        | Protocol | Purpose               |
| ----------- | -------- | --------------------- |
| 22          | TCP      | SSH Access            |
| 80          | TCP      | Application Access    |
| All Traffic | All      | Worker Security Group |

---

### Worker Nodes

Responsibilities:

* Application Workloads
* MongoDB Pods
* Frontend Pods
* Backend Pods

Security Group Rules:

| Port        | Protocol | Purpose               |
| ----------- | -------- | --------------------- |
| 22          | TCP      | SSH Access            |
| 80          | TCP      | Application Access    |
| All Traffic | All      | Worker Security Group |
| All Traffic | All      | Master Security Group |

---

# Kubernetes Components

## Frontend

Deployment:

```bash
kubectl apply -f kubernetes/frontend/frontend-deployment.yaml
```

Service:

```bash
kubectl apply -f kubernetes/frontend/frontend-service.yaml
```

ConfigMap:

```bash
kubectl apply -f kubernetes/frontend/frontend-configmap.yaml
```

---

## Backend

Deployment:

```bash
kubectl apply -f kubernetes/backend/backend-deployment.yaml
```

Service:

```bash
kubectl apply -f kubernetes/backend/backend-service.yaml
```

---

## MongoDB

Persistent Volume:

```bash
kubectl apply -f kubernetes/mongodb/pv.yaml
```

StatefulSet:

```bash
kubectl apply -f kubernetes/mongodb/mongodb-statefulset.yaml
```

---

## Ingress

Install Ingress Controller:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
```

Deploy Ingress:

```bash
kubectl apply -f kubernetes/frontend/ingress.yaml
```

---

# Docker Images

Current Version:

```text
frontend:v1
backend:v1
```

Example Build Commands:

```bash
docker build -t frontend:v1 .
docker build -t backend:v1 .
```

Push Images:

```bash
docker tag frontend:v1 <dockerhub-username>/frontend:v1
docker push <dockerhub-username>/frontend:v1

docker tag backend:v1 <dockerhub-username>/backend:v1
docker push <dockerhub-username>/backend:v1
```

---

# Kubernetes Verification

Check Nodes:

```bash
kubectl get nodes
```

Check Pods:

```bash
kubectl get pods -A
```

Check Services:

```bash
kubectl get svc -A
```

Check Ingress:

```bash
kubectl get ingress -A
```

Check Endpoints:

```bash
kubectl get endpoints -A
```

---

# Troubleshooting Performed

## Issue

After AWS EC2 reboot:

* Application inaccessible through Ingress
* HTTP 504 Gateway Timeout
* Ingress unable to connect to frontend pods

Example Error:

```text
504 Gateway Timeout
upstream timed out while connecting to upstream
```

---

## Root Cause

AWS Security Groups were not allowing required traffic between Master and Worker Nodes.

Ingress Controller running on Master Node could not communicate with application pods hosted on Worker Nodes.

---

## Resolution

Updated Security Groups:

### Master Security Group

* TCP 22
* TCP 80
* All Traffic from Worker Security Group

### Worker Security Group

* TCP 22
* TCP 80
* All Traffic from Worker Security Group
* All Traffic from Master Security Group

After updating Security Groups:

* Pod-to-Pod communication restored
* Ingress connectivity restored
* Application became accessible successfully

---

# Useful Commands

View Pods:

```bash
kubectl get pods -o wide -A
```

View Services:

```bash
kubectl get svc -A
```

View Ingress:

```bash
kubectl get ingress -A
```

Ingress Logs:

```bash
kubectl logs -n ingress-nginx deployment/ingress-nginx-controller
```

Check Endpoints:

```bash
kubectl get endpoints -A
```

Launch Debug Pod:

```bash
kubectl run netshoot \
--image=nicolaka/netshoot \
-it --rm
```

Test Service:

```bash
curl http://frontend-service
curl http://backend-service
```

---

# Future Enhancements

* Jenkins CI/CD Pipeline
* Docker Hub Automated Image Updates
* HTTPS using Cert Manager
* AWS Route53 Domain Integration
* Monitoring using Prometheus & Grafana
* Logging using ELK Stack
* Horizontal Pod Autoscaling (HPA)
* ArgoCD GitOps Deployment

---

# Author

Moin Mohammed Naik

DevOps Engineer | System Administrator | Kubernetes Enthusiast
