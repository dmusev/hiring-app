# Local Frontend Setup

This is simple hiring front-end build with React, Graphql, Typescript, Docker 

## Prerequisites

### Before you begin, ensure you have installed the following software:

Setup the Back-end:
- **[Hiring Backend](https://github.com/dmusev/hiring-backend)**: Required to be able to use functionalities of the application

Development tools:
- **[Node.js](https://nodejs.org/)**: Required to run the backend application. Version 14.x or higher is recommended.
- **[Docker](https://www.docker.com/get-started)**: Required for creating and managing your application's containers.
- **[Docker Compose](https://docs.docker.com/compose/install/)**: Used for defining and running multi-container Docker applications.
- **[Git](https://git-scm.com/downloads)**: Required for cloning the repository and managing version control.

## Docker Setup

Follow these steps to set up your application using Docker:

1. **Clone the Repository**

   Clone the backend repository to your local machine:

   ```bash
   git clone git@github.com:dmusev/hiring-app.git
   cd hiring-app
   ```

2. **Build and Run Docker ContainersUse Docker Compose to build and run the containers specified in your docker-compose.yml**

   ```bash
   docker-compose -f docker-compose.frontend.yml up --build
   ```
   
3. **Verify Containers are running**

   Check the status of your Docker containers to ensure they are running correctly:
   ```bash
   docker ps
   ```

4. Application should be available at: **[http://localhost:3001](http://localhost:3001)**