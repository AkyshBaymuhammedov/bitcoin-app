# Bitcoin App

## Description

A react app which displays the current value of bitcoin updated every 10 seconds and the average value for the last 10 minutes.

## Tech Stack
* React
* JavaScript
* Nginx
* Docker
* Helm
* Github Actions

## How-To Guide:
### Start the application locally
To run the app locally first install the dependencies:\
`npm install`

Then run:\
`npm start`

This will open the web app on a new browser on `localhost:3000`

### Build and Deploy the application
The application is built and deployed to the cluster using the CI/CD pipeline located under `.github\workflows`.
The pipeline has 3 stages and performs the following:
1. build: Build the docker image and push it to Azure Container Registry.
2. publish: Build the helm chart and publish it to Azure Container Registry.
3. deploy: Install the helm chart to the cluster.

The pipeline reuses a template located in the [workflow-templates repo](https://github.com/AkyshBaymuhammedov/workflow-templates). 
The actual code of the pipeline is located in the template.

As a prerequisite the pipeline needs the following secrets in github actions:
1. ACR_REGISTRY: Name of the Azure Container Registry.
2. ACR_USERNAME: Username for a Service Principal which has access to ACR.
3. ACR_PASSWORD: Password of the Service Principal.
4. AZURE_CREDENTIALS: Credentials for SP which has access to Azure Key Vault. (this is for fetching the kubeconfig)
5. KEY_VAULT: Name of the Key Vault.


To run the pipeline just push a change to the main branch (whether directly or via a pull request).
Or you can re-run an existing pipeline in the repo.
