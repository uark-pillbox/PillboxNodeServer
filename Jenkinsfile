pipeline {
    agent any

    stages {
        stage('Build') {
            //Compile docker containers.
            steps {
                echo 'Entering the build stage'
                echo 'Checking out git repo'
                def scmVars = checkout(
                    [
                        $class: 'GitSCM', 
                        branches: [[name: '*/master']], 
                        doGenerateSubmoduleConfigurations: false, 
                        extensions: [], 
                        submoduleCfg: [], 
                        userRemoteConfigs: [[credentialsId: 'babe9e97-05ba-48de-b97f-6f0b56aab423', 
                                              url: 'https://github.com/uark-pillbox/PillboxNodeServer']]
                    ]
                )
                echo scmVars
                echo 'Attempting to build docker container'
                sh buildDocker: '', returnStatus: true, script: 'docker build -t pillboxserver .'
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
