# 🏦 e-banking-app — Mock Online Banking Application

This is a full-stack mock online banking application built with **React**, **AWS Cognito**, **Lambda**, and **S3**. It features a **custom frontend authentication UI**, user KYC capture, and transaction management.

---

## ⚙️ Features

- 🔐 **Custom Authentication Flow** (Signup, Sign-in, Sign-out using AWS Cognito)
- 🗂️ **User Data Stored in S3** (`e-bank-user-data/users/[username].json`)
- 💸 **Mock Transactions** (Send/Receive/Deposit)
- 📈 **Monthly Stats Tracking**
- 🧾 **Recent & Full Transaction Views**
- ☁️ **AWS Lambda API Integration**

---

## 📦 Tech Stack

| Frontend       | Backend           | Cloud                    |
| -------------- | ----------------- | ------------------------ |
| React (w/ MUI) | Node.js + Express | AWS Lambda + API Gateway |
| AWS Cognito    |                   | AWS S3                   |

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/YOUR_USERNAME/e-banking-app.git
cd e-banking-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create `.env.development`:

```env
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_REGION=us-east-1
REACT_APP_USER_POOL_ID=your_user_pool_id
REACT_APP_CLIENT_ID=your_client_id
```

To ignore them from Git:

```
# .gitignore
.env*
```

### 4. Run the Frontend

```bash
npm start
```

### 5. Backend (Node.js + AWS)

- `/server.mjs` is deployed to **AWS Lambda**
- Reads/writes from `e-bank-user-data/users/[username].json` in S3
- Handles API routes for:
  - `GET /user/:username`
  - `POST /user`
  - etc.

You can run it locally for testing:

```bash
node server.mjs
```

Or deploy to Lambda using the AWS CLI or Console.

---

## 💡 Architecture Diagram

```
[ React App ]
     |
     v
[ AWS API Gateway ] ---> [ Lambda (Node.js) ] ---> [ S3 (user JSON) ]
     |
     v
[ AWS Cognito (Auth) ]
```

---

## 📝 To-Do / Future Features

- Bank account verification UI
- Real-time transaction syncing
- Notifications/alerts
- Admin dashboard

---

## 🧠 Author

**Nahiyan Ahmed**
