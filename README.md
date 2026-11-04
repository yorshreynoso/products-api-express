Products API

REST API built with Node.js, Express and TypeScript to manage a product catalog (CRUD). Data is stored in a local JSON file.

This is a personal learning project, built incrementally: basic CRUD first, then validation middleware, authentication and a React front end.

Tech stack
Node.js
Express
TypeScript
File system storage (products.json)
tsx (development, auto-restart)
Getting started
Requirements
Node.js 18 or higher
npm
Installation
bash
git clone <repository-url>
cd <project-folder>
npm install
Running the project

Development (runs the TypeScript source directly and restarts on file changes):

bash
npm run dev

Production (compiles to JavaScript in dist/ and runs it):

bash
npm run build
npm run start

The server runs at http://localhost:3000.

Project structure
src/
├── app.ts                          # Express setup and route mounting
├── routes/
│   └── products.routes.ts          # Route definitions
├── controllers/
│   └── products.controller.ts      # Handle requests and responses
└── models/
    └── products.models.ts          # Read and write data (products.json)
dist/               # Compiled JavaScript (generated, not in Git)
products.json       # Data file (generated, not in Git)
tsconfig.json       # TypeScript configuration

Errors are thrown in the model layer and caught in the controllers, which return the HTTP response.

Endpoints
Method	Route	Description
GET	/products	Get all products
GET	/products/:id	Get a product by id
POST	/products	Create a product
PUT	/products/:id	Replace a product (all fields required)
PATCH	/products/:id	Update only the fields sent
DELETE	/products/:id	Delete a product

Any other route returns 404.

Product model
json
{
  "id": 1,
  "name": "Mouse",
  "price": 250,
  "stock": 10
}
id is generated automatically.
name and price are required on create.
stock defaults to 0 if not sent.
Examples

Create a product

http
POST /products
Content-Type: application/json

{ "name": "Mouse", "price": 250, "stock": 10 }

Update only the price

http
PATCH /products/1
Content-Type: application/json

{ "price": 300 }
Error responses
Status	When
400	Invalid id or missing required fields
404	Product or route not found
500	Unexpected error reading or writing data
json
{ "error": "id must be a positive integer" }
Version history

Each stage of the project is marked with a Git tag, so you can check out any version with git checkout <tag>.

Tag	What it includes
v1.0-javascript	Initial products CRUD API with Express in JavaScript, data stored in a JSON file
v2.0-typescript	Migration to TypeScript, tsx for development and build to dist/
v3.0-mvc	Code split into routes, controllers and models; errors thrown in models and caught in controllers
Roadmap
 Basic CRUD
 Migrate to TypeScript
 Split into layers (routes, controllers, models)
 Database
 Validation middleware
 Authentication middleware
 React front end
Author

Jorge Adrian Reynoso Diaz