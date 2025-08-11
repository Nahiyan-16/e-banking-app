# 🏦 e-Banking App — Mock Online Banking Application

A full-stack mock online banking application built with **React**, **AWS Cognito**, **AWS Lambda**, and **AWS S3**. It features a custom frontend authentication UI, user KYC capture, and robust transaction management.

---

## ✨ Features

- 🔐 **Custom Authentication Flow**: Secure signup, sign-in, and sign-out using AWS Cognito.
- 🗂️ **User Data Storage**: Stores user data in AWS S3 (`e-bank-user-data/users/[username].json`).
- 💸 **Mock Transactions**: Supports send, receive, and deposit functionalities.
- 📈 **Monthly Stats Tracking**: Visualize monthly financial activity.
- 🧾 **Transaction Views**: View recent and full transaction histories.
- ☁️ **AWS Lambda API**: Seamless integration with serverless backend APIs.

---

## 🛠️ Tech Stack

| Frontend               | Backend           | Cloud Services           |
| ---------------------- | ----------------- | ------------------------ |
| React (w/ Material-UI) | Node.js + Express | AWS Lambda + API Gateway |
| AWS Amplify (Cognito)  |                   | AWS S3                   |

---

## 🚀 Getting Started

### Prerequisites

Ensure the following are installed and configured:

- **AWS CLI**: Configured with appropriate permissions to manage AWS resources.
- **Node.js**: Version 16 or higher.
- **jq**: Required for environment variable generation.

### Step 1: Set Up the Backend

**Important**: The backend must be set up first. Follow the instructions in the [e-banking-backend repository](https://github.com/Nahiyan-16/e-banking-backend).

### Step 2: Clone the Repository

```sh
git clone https://github.com/YOUR_USERNAME/e-banking-app.git
cd e-banking-app
```

### Step 3: Install Dependencies

```sh
npm install
```

---

## ☁️ Option 1: Deploy Frontend to AWS S3

### 1. Ensure Backend is Running

Verify that the backend is deployed and operational as per the [e-banking-backend repository](https://github.com/Nahiyan-16/e-banking-backend).

### 2. Deploy to S3 (Might take a while since it will build the frontend first)

1. Navigate to the `scripts` folder.
2. Run the deployment bash script:

```sh
cd scripts
chmod +x deploy-frontend.sh
./deploy-frontend.sh
```

3. It will also generate your environment variables

### 3. Access the Hosted Application

After deployment, the CLI will provide a URL to access the hosted website.

---

## 🖥️ Option 2: Run Frontend Locally

### 1. Set Up Local Environment Variables

Create a `.env.development` file:

```env
REACT_APP_API_URL=http://localhost:4000/user
```

Add to `.gitignore` to prevent committing sensitive data:

```gitignore
# .gitignore
.env*
```

### Step 2: Generate Environment Variables

1. Navigate to the `scripts` folder.
2. Set your AWS region in the `env-generator.sh` file.
3. Run the script to generate `aws-exports.js` for AWS Cognito:

```sh
cd scripts/util-scripts
chmod +x env-generator.sh
./env-generator.sh
```

### 3. Start the Frontend

```sh
npm start
```

### 4. Run the Backend

Follow the instructions in the [e-banking-backend repository](https://github.com/Nahiyan-16/e-banking-backend) to start the backend:

```sh
node server.mjs
```

### 5. Access the Application

The application is now fully functional locally.

---

## Teardown the frontend

```sh
cd scripts
chmod +x teardown-frontend.sh
./teardown-frontend.sh
```

## 📊 Architecture Diagram

```
[ React App ] --> [ AWS API Gateway ] --> [ AWS Lambda (Node.js) ] --> [ AWS S3 (user JSON) ]
        |
        v
[ AWS Cognito (Auth) ]
```

---

## 🔮 To-Do / Future Features

- 🏦 Bank account verification UI
- ⏰ Real-time transaction syncing
- 🔔 Notifications and alerts
- 👨‍💼 Admin dashboard for user management

---

## 👨‍💻 Author

**Nahiyan Ahmed**  
GitHub: [Nahiyan-16](https://github.com/Nahiyan-16)
