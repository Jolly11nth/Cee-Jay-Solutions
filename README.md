# Cee Jay Solutions

Cee Jay Solutions Ltd is an IT company specializing in AI modeling and simulation, software development, data analysis, and technology solutions.

## Stack

- React + Vite
- Tailwind CSS
- Node.js + Express
- PostgreSQL
- Railway

## Local development

```bash
npm install
npm run dev
```

The development command starts the Vite frontend on port 3000 and the Node API on port 4000. Vite proxies `/api` requests to the API server.

For consultation storage locally, provide a PostgreSQL `DATABASE_URL` in `.env`.

## Production on Railway

Railway can deploy the repository directly from GitHub. The production service runs:

```bash
npm run build
npm start
```

The Express server serves the Vite `dist` directory and exposes the API under `/api`.

Create a PostgreSQL service in the same Railway project and reference its `DATABASE_URL` from the application service.

### Railway variables

```text
DATABASE_URL
NODE_ENV=production
TWILIO_ACCOUNT_SID      # optional
TWILIO_AUTH_TOKEN       # optional
TWILIO_WHATSAPP_NUMBER  # optional
```

The consultation table is created automatically when the API starts.

## API

- `GET /api/health`
- `POST /api/consultation`
- `GET /api/consultations`
- `PUT /api/consultations/:id/status`
- `DELETE /api/consultations/:id`
