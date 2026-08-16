#!/bin/bash
echo "=== Earcraft Database Seeding Script ==="
psql -U postgres -d earcraft_db -f ../database/schema.sql
psql -U postgres -d earcraft_db -f ../database/seed_data.sql
echo "Database seeding completed successfully."

