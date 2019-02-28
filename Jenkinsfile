pipeline {
    agent any

    stages {
        stage('Build') {
            //Compile docker containers.
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                // Insert some test cases here. The main things will be making sure the docker container can be made and the server code compiles.
            }
        }
        stage('Deploy') {
            //Deploy X number 
            steps {
                echo 'Deploying....'
            }
        }
    }
}
