# Image storage service

## Description
This is a simple image storage service, built with Node.js. It uses Express.js as a web framework and PostgreSQL as a database.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
- Clone the repository to your local machine: `git clone https://github.com/andreacw5/asset-storage.git`
- Install dependencies: `yarn install`
- Start the application: `yarn dev`
- Visit `http://localhost:8090` in your browser to use the application.

## Features
- Upload images
- Download images
- Delete images
- List images
- Image preview

## Next planned functionality
- Image statistics

## Built With
- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [Express.js](https://expressjs.com/) - Web framework
- [PostgreSQL](https://www.postgresql.org/) - Database

## Requirements
- [Node.js](https://nodejs.org/en/download/) 18.10.0 or higher
- [Yarn](https://yarnpkg.com/en/) 1.10.1 or higher

## Authentication for management
The authentication is based on single static token, stored on env `API_KEY` variable.
Request for create/edit/delete urls need `X-API-KEY` header with the value of `API_KEY`.

## Environment Variables
| code         | description                  | default value |
|--------------|------------------------------|---------------|
| DATABASE_URL | database url                 | localhost     |
| API_KEY      | auth token for CUD Endpoints | 2342358       |

## Versioning
We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/andreacw5/url-manager-app/releases).

## Author
- [Andrea Tombolato](https://andreacw.dev)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
