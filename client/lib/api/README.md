# API contract (frontend expectations)

The UI reads two endpoints. Until `NEXT_PUBLIC_API_URL` is set in
`client/.env.local`, both fall back to the labelled sample data in
`lib/data/sample.ts`.

## GET /api/tests

Query parameters (all optional):

| name       | type   | notes                                      |
| ---------- | ------ | ------------------------------------------ |
| `q`        | string | search text, max 80 characters             |
| `category` | string | exact category name from `categories`      |
| `limit`    | number | page size, the UI sends 8                  |

Response `200`:

```json
{
  "items": [
    {
      "id": "string",
      "slug": "string",
      "name": "string",
      "code": "string | null",
      "category": "string",
      "price": "number (PKR) | null"
    }
  ],
  "total": 0,
  "categories": ["string"]
}
```

`price` stays `null` until the laboratory confirms it. `total` is the number of
matches before `limit` is applied. `categories` lists every available filter.

## GET /api/packages

Response `200`:

```json
{
  "items": [
    {
      "id": "string",
      "slug": "string",
      "name": "string",
      "includedTests": ["string"],
      "regularPrice": "number (PKR) | null",
      "packagePrice": "number (PKR) | null"
    }
  ]
}
```

Errors: any non-2xx status is shown to the visitor as a retryable error state.
The server must enable CORS for the frontend origin.
