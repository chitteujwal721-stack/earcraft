# EARCRAFT — Production Deployment & Docker Guide

## Single Command Docker Deployment

```bash
cd docker
docker-compose up --build -d
```

This starts:
1. **PostgreSQL 16**: Port 5432 with auto schema migration.
2. **Redis 7**: Port 6379 for Celery async task queue.
3. **Django Gunicorn App**: Port 8000.
4. **Celery Worker**: Background job processor.
5. **Nginx Proxy**: Reverse proxy on Port 80 / 443 with SSL termination.

## GitHub Actions CI/CD Integration
The `.github/workflows/deploy.yml` workflow automates TypeScript linting, Django unit tests, Docker image building, and production deployment upon pushing to the `main` branch.
