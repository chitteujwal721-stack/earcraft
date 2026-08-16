# EARCRAFT — Database Architecture & Schema Guide

This guide documents the normalized PostgreSQL database structure powering the Earcraft luxury D2C e-commerce platform.

## Normalized Entity Relationships

1. **Users & RBAC (`users`)**: Stores encrypted credential hashes, user roles (`SUPER_ADMIN`, `ADMIN`, `MANAGER`, `EDITOR`, `CUSTOMER`), and email verification flags.
2. **Categories (`categories`)**: Supports hierarchical nesting via `parent_id` for categories and subcategories.
3. **Products & Variants (`products`, `product_variants`)**: Decouples base product metadata from variant SKUs, materials, metal purity (18K, 14K, Sterling Silver, Titanium), and inventory stock quantities.
4. **Orders & Fulfillment (`orders`, `order_items`)**: Stores order snapshots, billing/shipping totals, 3% GST tax calculations, and status state machines.

## Running Migrations & Seeds

```bash
# Run schema DDL on PostgreSQL
psql -U postgres -d earcraft_db -f database/schema.sql

# Seed initial luxury products & categories
psql -U postgres -d earcraft_db -f database/seed_data.sql
```
