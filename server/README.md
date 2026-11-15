# Animality Pets API (Render)

Deploy this directory as a Render Web Service (Root Directory: `server`).
- Build command: `npm install`
- Start command: `npm start`
- Node: 20+

Required environment variables: `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CORS_ORIGINS`.
Image uploads require Cloudinary: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`. Images are stored in Cloudinary (not ephemeral Render disk). The API creates its PostgreSQL tables at startup.

Set the Vercel environment variable `VITE_API_URL` to the Render service URL, with no trailing slash. Example: `https://animality-pets-api.onrender.com`.

Admin page: `/#admin`. The initial admin is created from the environment variables on first startup. Changing `ADMIN_PASSWORD` later does not overwrite an existing admin password; use a secure password reset procedure rather than assuming the env var resets it.

Public endpoints:
- `GET /health`
- `GET /api/reviews`
- `GET /api/gallery`
- `POST /api/enquiries`

Protected endpoints require a Bearer token:
- `POST /api/admin/login`
- `GET/POST/DELETE /api/admin/reviews`
- `GET/POST/DELETE /api/admin/gallery`
- `GET /api/admin/enquiries`

Never commit real credentials. Configure secrets in Render Dashboard.
