# Docker Build & Run Guide
To build the docker image and run the container locally
(add your docker username to build and run commands before running)
## Build the Image

```bash
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL="https://cgshusuuyjajzoscqycv.supabase.co" \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnc2h1c3V1eWphanpvc2NxeWN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MDk4MjEsImV4cCI6MjA3NzM4NTgyMX0.WibD0telCKMsk3PfwZYSMHFQ8hs0F1CbeiG8JWm-9uw" \
  -t <your docker username>/cloud-project:latest \
  .
```

## Run the Container

```bash
docker run -p 3000:3000 <your docker username>/cloud-project:latest
```

Or run in Docker Desktop.

**Note:** Environment variables are baked into the image at build time - no need to pass them when running!

---

## Final Image Stats

- **Size:** ~307 MB
- **Optimizations:** Next.js standalone output, multi-stage build, minimal dependencies
- **Security:** Non-root user, production-only dependencies
