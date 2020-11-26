# Image Gallery App

[![Build Status](https://travis-ci.com/ajithpmohan/image-gallery-app.svg?branch=main)](https://travis-ci.com/ajithpmohan/image-gallery-app)

## Tech Stack

* Docker
* Django Rest Framework
* React.js & Redux
* React Bootstrap
* PostgreSQL
* Swagger

## System Requirements

You need **Docker Engine** and **Docker Compose**. Install it from [Docker Website](https://docs.docker.com/)

## Usage

Download the repository:

    git clone git@github.com:ajithpmohan/image-gallery-app.git

## Permission Required

Before building the services update the permission of following bash scripts.

    chmod +x backend/entrypoint.sh

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
