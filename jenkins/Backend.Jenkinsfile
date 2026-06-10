pipeline {
    agent any

    environment {
        IMAGE_NAME = "moinnaik/portfolio-backend"
        IMAGE_TAG  = "${BUILD_NUMBER}"

        WORKER1 = "10.0.2.145"
        WORKER2 = "10.0.2.151"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/MoinMN/production-grade-mern-k8s-devops-project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('/app/backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('/app/backend') {
                    sh 'npm test || true'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                    docker build \
                    -t ${IMAGE_NAME}:${IMAGE_TAG} \
                    /app/backend
                """
            }
        }

        stage('DockerHub Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'docker',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        echo $DOCKER_PASS | docker login \
                        -u $DOCKER_USER \
                        --password-stdin
                    '''
                }
            }
        }

        stage('Push To DockerHub') {
            steps {
                sh """
                    docker push ${IMAGE_NAME}:${IMAGE_TAG}
                """
            }
        }

        stage('Create Offline Image Tar') {
            steps {
                sh """
                    docker save \
                    -o backend-${IMAGE_TAG}.tar \
                    ${IMAGE_NAME}:${IMAGE_TAG}
                """
            }
        }

        stage('Copy Tar To Worker-1') {
            steps {
                sshagent(['worker-ssh']) {
                    sh """
                        scp -o StrictHostKeyChecking=no \
                        backend-${IMAGE_TAG}.tar \
                        ubuntu@${WORKER1}:/tmp/
                    """
                }
            }
        }

        stage('Import Image Worker-1') {
            steps {
                sshagent(['worker-ssh']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no \
                        ubuntu@${WORKER1} \
                        'sudo ctr -n k8s.io images import /tmp/backend-${IMAGE_TAG}.tar'
                    """
                }
            }
        }

        stage('Copy Tar To Worker-2') {
            steps {
                sshagent(['worker-ssh']) {
                    sh """
                        scp -o StrictHostKeyChecking=no \
                        backend-${IMAGE_TAG}.tar \
                        ubuntu@${WORKER2}:/tmp/
                    """
                }
            }
        }

        stage('Import Image Worker-2') {
            steps {
                sshagent(['worker-ssh']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no \
                        ubuntu@${WORKER2} \
                        'sudo ctr -n k8s.io images import /tmp/backend-${IMAGE_TAG}.tar'
                    """
                }
            }
        }

        stage('Deploy To Kubernetes') {
            steps {

                withCredentials([
                    file(
                        credentialsId: 'kubeconfig',
                        variable: 'KUBECONFIG_FILE'
                    )
                ]) {

                    sh '''
                        export KUBECONFIG=$KUBECONFIG_FILE

                        kubectl set image deployment/backend \
                        backend=''' + "${IMAGE_NAME}:${IMAGE_TAG}" + ''' \
                        -n portfolio

                        kubectl rollout status deployment/backend \
                        -n portfolio --timeout=300s
                    '''
                }
            }
        }
    }

    post {

        success {
            echo "Deployment Successful"
            echo "Image Tag: ${IMAGE_TAG}"
        }

        failure {
            echo "Deployment Failed"
        }

        always {

            sh '''
                rm -f backend-*.tar || true
                docker image prune -f || true
            '''
        }
    }
}