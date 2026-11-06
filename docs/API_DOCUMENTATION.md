# Anmol Lab Website — Backend API Documentation

**Project:** Codesaviours E-Training — Anmol Lab Website  
**Team:** Team B  
**Backend Developer:** Hammad Raza  
**Base URL:** `http://localhost:5000`  
**API Prefix:** `/api`

---

## 1. Introduction

This document describes the backend REST APIs developed for the Anmol Lab Website.

The backend is built using Node.js, Express.js, and MongoDB with Mongoose.

### Available modules

1. Categories
2. Tests
3. Packages
4. Branches
5. Blog Posts
6. FAQs
7. Customer Inquiries

---

## 2. General API Information

### Base URL

```text
http://localhost:5000/api
```

### Request format

- Content-Type: `application/json` for JSON requests.
- CSV imports use `multipart/form-data`.
- IDs are MongoDB ObjectIds.

### Standard response structure

Successful responses generally follow this structure:

```json
{
  "status": 200,
  "message": "Operation completed successfully",
  "data": {}
}
```

The `data` property is included when response data is provided.

### Common HTTP status codes

| Status | Meaning |
|---|---|
| 200 | Successful request |
| 201 | Resource created |
| 400 | Invalid request or validation error |
| 404 | Resource not found |
| 409 | Duplicate resource or conflict |
| 500 | Server error |

---

## 3. Category APIs

**Base endpoint:** `/api/categories`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/newCategory` | Create a category |
| GET | `/getAllCategories` | Retrieve all categories |
| GET | `/getCategoryById/:id` | Retrieve a category by ID |
| PUT | `/updateCategory/:id` | Update a category |
| DELETE | `/deleteCategory/:id` | Delete a category |

### Create Category

**POST** `/api/categories/newCategory`

Example request:

```json
{
  "name": "Hematology",
  "description": "Blood-related laboratory tests"
}
```

The backend generates the category slug automatically.

### Update Category

**PUT** `/api/categories/updateCategory/:id`

Supported fields:

- `name`
- `description`
- `isActive`

Example:

```json
{
  "name": "Updated Hematology",
  "description": "Updated category description",
  "isActive": true
}
```

---

## 4. Test APIs

**Base endpoint:** `/api/tests`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/newTest` | Create a test |
| GET | `/getAllTests` | Retrieve tests |
| GET | `/getTestById/:id` | Retrieve a test by ID |
| PUT | `/updateTest/:id` | Update a test |
| DELETE | `/deleteTest/:id` | Delete a test |
| POST | `/importCSV` | Import tests from CSV |

### Create Test

**POST** `/api/tests/newTest`

Example request:

```json
{
  "name": "Complete Blood Count",
  "description": "A blood test used to evaluate general health",
  "category": "VALID_CATEGORY_ID",
  "sampleType": "Blood",
  "preparationInstructions": "No special preparation required",
  "turnaroundTime": "24 hours",
  "price": 1500,
  "priceStatus": "confirmed"
}
```

The backend generates the test slug automatically.

The `category` value must be an existing Category document ID.

### Get All Tests

**GET** `/api/tests/getAllTests`

Supported query parameters:

| Parameter | Description |
|---|---|
| `search` | Search tests by name |
| `category` | Filter by category ID |
| `isActive` | Filter using `true` or `false` |
| `page` | Page number; default is 1 |
| `limit` | Results per page; default is 10, maximum is 100 |

Example:

```text
GET /api/tests/getAllTests?search=blood&page=1&limit=10
```

The response includes test records and pagination information.

### Update Test

**PUT** `/api/tests/updateTest/:id`

The endpoint supports partial updates.

Example:

```json
{
  "price": 1800,
  "priceStatus": "confirmed"
}
```

### Import Tests from CSV

**POST** `/api/tests/importCSV`

Request type: `multipart/form-data`

Form-data key:

```text
file
```

CSV columns:

```text
name,description,categoryId,sampleType,preparationInstructions,turnaroundTime,price,priceStatus,isActive
```

The response reports:

- `totalRows`
- `imported`
- `duplicates`
- `invalid`
- `errors`

---

## 5. Package APIs

**Base endpoint:** `/api/packages`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/newPackage` | Create a package |
| GET | `/getAllPackages` | Retrieve all packages |
| GET | `/getPackageById/:id` | Retrieve a package by ID |
| PUT | `/updatePackage/:id` | Update a package |
| DELETE | `/deletePackage/:id` | Delete a package |

### Create Package

**POST** `/api/packages/newPackage`

Example request:

```json
{
  "name": "Complete Health Package",
  "description": "A package containing selected laboratory tests",
  "includedTests": [
    "VALID_TEST_ID_1",
    "VALID_TEST_ID_2"
  ],
  "discountPercentage": 10,
  "isActive": true
}
```

### Package Pricing

The backend calculates package prices automatically using the included tests.

The calculation uses:

- Original price: Sum of included test prices.
- Package price: Original price after applying the discount.
- Savings: Difference between original price and package price.

The backend checks that included tests exist, are active, and have confirmed prices.

Clients should not submit `originalPrice`, `packagePrice`, or `savings`.

---

## 6. Branch APIs

**Base endpoint:** `/api/branches`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/newBranch` | Create a branch |
| GET | `/getAllBranches` | Retrieve all branches |
| GET | `/getBranchById/:id` | Retrieve a branch by ID |
| PUT | `/updateBranch/:id` | Update a branch |
| DELETE | `/deleteBranch/:id` | Delete a branch |

### Create Branch

**POST** `/api/branches/newBranch`

Example request:

```json
{
  "name": "Anmol Lab Islamabad",
  "address": "Blue Area, Islamabad",
  "phone": "03001234567",
  "timings": "Monday to Saturday, 9 AM - 6 PM",
  "mapEmbedUrl": "MAP_EMBED_URL",
  "directionsUrl": "DIRECTIONS_URL",
  "isActive": true
}
```

The backend generates the branch slug automatically.

**Important:** The current update endpoint validates the complete required branch information. Send the required fields when updating a branch, rather than only the changed field.

---

## 7. Blog Post APIs

**Base endpoint:** `/api/posts`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/newPost` | Create a blog post |
| GET | `/getAllPosts` | Retrieve blog posts |
| GET | `/getPostById/:id` | Retrieve a post by ID |
| PUT | `/updatePost/:id` | Update a post |
| DELETE | `/deletePost/:id` | Delete a post |

### Create Blog Post

**POST** `/api/posts/newPost`

Example request:

```json
{
  "title": "Importance of Regular Health Checkups",
  "excerpt": "Learn why regular health checkups matter.",
  "content": "Regular health checkups help people monitor their health.",
  "coverImage": "IMAGE_URL",
  "author": "Anmol Lab",
  "isPublished": true
}
```

The backend generates the slug automatically.

### Get Blog Posts

**GET** `/api/posts/getAllPosts`

Optional query parameter:

| Parameter | Description |
|---|---|
| `isPublished` | Filter published or unpublished posts |

Examples:

```text
/api/posts/getAllPosts?isPublished=true
/api/posts/getAllPosts?isPublished=false
```

### Publication behavior

- New posts default to unpublished when `isPublished` is omitted.
- Publishing a post sets `publishedAt`.
- Unpublishing a post resets `publishedAt` to `null`.
- The backend manages the publication date.

---

## 8. FAQ APIs

**Base endpoint:** `/api/faqs`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/newFAQ` | Create an FAQ |
| GET | `/getAllFAQs` | Retrieve all FAQs |
| GET | `/getFAQById/:id` | Retrieve an FAQ by ID |
| PUT | `/updateFAQ/:id` | Update an FAQ |
| DELETE | `/deleteFAQ/:id` | Delete an FAQ |

### Create FAQ

**POST** `/api/faqs/newFAQ`

Example request:

```json
{
  "question": "What are the laboratory opening hours?",
  "answer": "Our laboratory is open Monday to Saturday.",
  "isActive": true
}
```

Validation rules:

- Question is required and must contain at least 5 characters.
- Answer is required and must contain at least 2 characters.
- `isActive` must be a boolean if provided.

### Update FAQ

**PUT** `/api/faqs/updateFAQ/:id`

Partial updates are supported.

Example:

```json
{
  "answer": "Our updated opening hours are Monday to Saturday."
}
```

---

## 9. Customer Inquiry APIs

**Base endpoint:** `/api/inquiries`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/submit` | Submit a customer inquiry |
| GET | `/getAllInquiries` | Retrieve all inquiries |
| GET | `/getInquiryById/:id` | Retrieve an inquiry by ID |
| PUT | `/updateInquiry/:id` | Update an inquiry |
| DELETE | `/deleteInquiry/:id` | Delete an inquiry |

### Submit Inquiry

**POST** `/api/inquiries/submit`

Example request:

```json
{
  "name": "Ali Khan",
  "email": "ali@example.com",
  "phone": "03001234567",
  "subject": "Test Booking Inquiry",
  "message": "I want to know how I can book a blood test at your laboratory."
}
```

The backend automatically assigns the initial status as `new`.

### Inquiry Status Values

| Status | Description |
|---|---|
| `new` | Newly submitted inquiry |
| `in-progress` | Inquiry is being handled |
| `resolved` | Inquiry has been resolved |

### Update Inquiry

**PUT** `/api/inquiries/updateInquiry/:id`

Example request:

```json
{
  "status": "in-progress"
}
```

Partial updates are supported.

---

## 10. Authentication and Security

Authentication and authorization are not currently implemented in the reviewed backend API.

The management endpoints should be protected before production deployment.

In particular, inquiry listing, viewing, updating, and deletion endpoints expose customer-submitted information and should be restricted to authorized staff.

---

## 11. Development Setup

### Start the backend

Open a terminal and navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Expected server message:

```text
Server is running on port 5000
MongoDB connected successfully
```

### Environment configuration

The backend uses environment variables for configuration.

Create a local `.env` file using the existing `.env.example` as a reference. Do not commit the actual `.env` file or expose database credentials.

---

## 12. API Summary

| Module | Number of endpoints |
|---|---:|
| Categories | 5 |
| Tests | 6 |
| Packages | 5 |
| Branches | 5 |
| Blog Posts | 5 |
| FAQs | 5 |
| Inquiries | 5 |
| **Total** | **36** |

---

**Documentation maintained by:** Hammad Raza  
**Role:** Backend Developer  
**Project:** Codesaviours E-Training — Anmol Lab Website Team B
