---
layout: page
title: Deployment
nav_order: 3
---

# Deployment

Deployment to the Development and Production environment will be triggered via Github Action workflow and need to be approved by [timokoenig](https://github.com/timokoenig). The worklow requires the following secrets to publish the Docker image to ECR and deploy the new task definition with ECS.

```
AWS_REGION
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_ECR_REPO
AWS_ECS_TASK_DEFINITION
AWS_ECS_SERVICE
AWS_ECS_CLUSTER
WEBSITE_URL
CRON_API_KEY
```
