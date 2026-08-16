# EARCRAFT — OpenAPI & REST API Documentation

The Earcraft REST API provides complete programmatic access to products, categories, collections, cart, orders, coupons, and Super Admin CMS controls.

## Authentication
Authentication is handled via JWT (JSON Web Tokens).

### 1. Obtain Token Pair
- **Endpoint**: `POST /api/auth/token/`
- **Request Body**:
```json
{
  "username": "admin@earcraft.com",
  "password": "SuperSecureAdminPassword2026!"
}
```
- **Response**:
```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Products & Inventory

### List Products
- **Endpoint**: `GET /api/products/`
- **Query Parameters**:
  - `category`: Category slug filter
  - `min_price`: Minimum base price filter
  - `max_price`: Maximum base price filter
  - `search`: Keyword title search
  - `sort`: `price-low`, `price-high`, `rating`, `newest`

### Get Product Details
- **Endpoint**: `GET /api/products/{slug}/`

---

## Orders & Checkout

### Create Order
- **Endpoint**: `POST /api/orders/`
- **Headers**: `Authorization: Bearer <access_token>`
- **Request Body**:
```json
{
  "customer_name": "Victoria Sterling",
  "customer_email": "victoria@sterlingluxe.com",
  "customer_phone": "+91 98765 43210",
  "payment_method": "RAZORPAY",
  "items": [
    {
      "variant_sku": "AUR-EC-18K-YG",
      "quantity": 1
    }
  ]
}
```

---

## Super Admin CMS Control

### Update Live CMS Site Settings
- **Endpoint**: `PATCH /api/cms/settings/`
- **Permission**: Requires `SUPER_ADMIN` or `ADMIN` role.
