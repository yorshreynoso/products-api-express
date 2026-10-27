# Products API

REST API built with Node.js and Express to manage a product catalog (CRUD). Data is stored in a local JSON file.

This is a personal learning project, built incrementally: basic CRUD first, then validation middleware, authentication and a React front end.

## Tech stack

- Node.js
- Express
- File system storage (`products.json`)
- Nodemon (development)

## Getting started

### Requirements

- Node.js 18 or higher
- npm

### Installation

```bash
git clone https://github.com/yorshreynoso/products-api-express.git
cd  products-api-express
npm install
```

### Running the project

```bash
npm run start   # run the server
npm run dev     # run with nodemon (restarts on file changes)
```

The server runs at `http://localhost:3000`.

## Endpoints

| Method | Route            | Description                               |
|--------|------------------|-------------------------------------------|
| GET    | `/products`      | Get all products                          |
| GET    | `/products/:id`  | Get a product by id                       |
| POST   | `/products`      | Create a product                          |
| PUT    | `/products/:id`  | Replace a product (all fields required)   |
| PATCH  | `/products/:id`  | Update only the fields sent               |
| DELETE | `/products/:id`  | Delete a product                          |

Any other route returns `404`.

### Product model

```json
{
  "id": 1,
  "name": "Mouse",
  "price": 250,
  "stock": 10
}
```

- `id` is generated automatically.
- `name` and `price` are required on create.
- `stock` defaults to `0` if not sent.

### Examples

**Create a product**

```http
POST /products
Content-Type: application/json

{ "name": "Mouse", "price": 250, "stock": 10 }
```

**Update only the price**

```http
PATCH /products/1
Content-Type: application/json

{ "price": 300 }
```

### Error responses

| Status | When                                              |
|--------|---------------------------------------------------|
| 400    | Invalid id or missing required fields             |
| 404    | Product or route not found                        |

```json
{ "error": "id must be a positive integer" }
```

## Roadmap

- [x] Basic CRUD
- [ ] Validation middleware
- [ ] Authentication middleware
- [ ] React front end

## Author

Jorge Adrian Reynoso Diaz
