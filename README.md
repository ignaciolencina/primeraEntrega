> [!NOTE]
> Debe usarse el comando de `npm run dev` para levantar el puerto, no se utilizó nodemon.


# API Endpoints - Productos y Carritos
Dejo estos endpoints a modo de ejemplo para poder hacer pruebas en postman.

## 🛍️ PRODUCTS

### 🔹 Get all products
**GET**  
`http://localhost:8080/api/v1/products`

---

### 🔹 Get product by ID
**GET**  
`http://localhost:8080/api/v1/products/4f7fe1cf-b2fe-4a40-98f3-a8164269c517`

---

### 🔹 Create a new product
**POST**  
`http://localhost:8080/api/v1/products`

**Body (JSON):**
```json
{
  "title": "Mouse Logitech M20",
  "description": "Mouse color negro",
  "code": "MLn01",
  "price": 50000,
  "active": true,
  "stock": 30,
  "category": "Mouses",
  "thumbnails": [
    "/images/mouse-frontal.jpg",
    "/images/mouse-lateral.jpg"
  ]
}
```

---

### 🔹 Update product by ID
**PUT**  
`http://localhost:8080/api/v1/products/675e20ec-2f03-40fd-bd59-c257d6800768`

**Body (JSON):**
```json
{
  "description": "Mouse color azul con luces",
  "price": 32000
}
```

---

### 🔹 Delete product by ID
**DELETE**  
`http://localhost:8080/api/v1/products/675e20ec-2f03-40fd-bd59-c257d6800768`

---

## 🛒 CARTS

### 🔹 Get cart by ID
**GET**  
`http://localhost:8080/api/v1/carts/c3cb5c29-c223-4314-a6b5-b31e14fe6f10`

---

### 🔹 Create a new cart
**POST**  
`http://localhost:8080/api/v1/carts`

**Body (JSON):**
```json
{
  "products": [
    {
      "id": "2a7e9f54-a228-4d36-96f2-4b24b92941e5",
      "title": "Mouse Logitech M20",
      "price": 50000
    },
    {
      "id": "3270cd8e-9297-41f8-a0f0-36036142ebd0",
      "title": "Monitor Samsung",
      "price": 380000
    }
  ]
}
```

---

### 🔹 Add product to cart
**POST**  
`http://localhost:8080/api/v1/carts/c3cb5c29-c223-4314-a6b5-b31e14fe6f10/products/8ffc54f5-4d4c-4af4-a8e6-c6b19ebe50ff`

---
