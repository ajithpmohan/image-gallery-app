# Image Gallery App

[![Build Status](https://travis-ci.com/ajithpmohan/image-gallery-app.svg?branch=main)](https://travis-ci.com/ajithpmohan/image-gallery-app) [![codecov](https://codecov.io/gh/ajithpmohan/image-gallery-app/branch/main/graph/badge.svg?token=X3F3LX9JH0)](https://codecov.io/gh/ajithpmohan/image-gallery-app)

## Tech Stack & Tools

* Docker
* Django Rest Framework
* React.js & Redux
* React Bootstrap
* PostgreSQL
* Swagger UI
* Pytest for django testing
* Code Coverage Integration
* Travis for CI

## System Requirements

You need **Docker Engine** and **Docker Compose**. Install it from [Docker Website](https://docs.docker.com/)

## Usage

Download the repository:

    git clone git@github.com:ajithpmohan/image-gallery-app.git

## Permission Required

Before building the services update the permission of following bash scripts.

    chmod +x backend/coverage.sh backend/entrypoint.sh

## Build the Services

    docker-compose build

## Starting App

    docker-compose up -d

## Access the services in the development mode.

Open [http://localhost:9001/](http://localhost:9001/) to access `frontend` service in the browser.

Open [http://localhost:9002/](http://localhost:9002/) to access `backend` service in the browser.

## Run React.js Code Linter & Formatter

    docker-compose exec frontend npm run lint

    docker-compose exec frontend npm run format

## Run Python Code Linter & Formatter

    docker-compose -f pre-commit.yml up --build

## Run Pytest & Coverage Report

    docker-compose exec backend ./coverage.sh
