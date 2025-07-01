---

## 🚀 Getting Started

### 🧰 Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MySQL 
- create DB payment_system

---

### 🔧 Installation

#### 1. Clone the repository

```bash
git clone https://github.com/durai-babu-rajendhiran/payment_dashboard.git
cd payment_dashboard
```
## 2. Backend Setup (/server)
```bash
cd server
npm install
npm start
```
## 3. Frontend Setup (/client)
```bash
cd client
npm install
npm start
```
## 📚 API Documentation
```bash
http://localhost:8000/api-docs
```
## 🔐 Authentication
- JWT-based authentication
- Protected routes use getCurrentUser middleware on the server
- Tokens are expected to be passed in headers as: Authorization: Bearer <token
