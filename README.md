# 🧩 Chat App Frontend (Next.js + Tailwind + Socket.IO)

This is the frontend of a real-time chat application built with **Next.js**, **NextAuth (Google OAuth)**, and **Socket.IO**.

## 🔧 Tech Stack
- ✅ Next.js (App Router)
- 🎨 TailwindCSS
- ⚡ Socket.IO Client
- 🔐 NextAuth.js (Google OAuth)
- 🔊 Toast notifications
- 💬 Sentiment badges (positive/negative/neutral)

## ✅ Features
- Google Sign-In via NextAuth
- Realtime chat using Socket.IO
- Session-based routing via `middleware.ts`
- Sentiment analysis tags per message
- Notification when new users join
- Audio feedback on send

## 🛠 How to Run

```bash
cd frontend
npm install
```

### 🔑 Setup `.env.local`
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 🧪 Dev Server
```bash
npm run dev
```

## 📂 Routes
- `/` – Landing page
- `/chat` – Protected chat interface

## 🔐 Middleware
`middleware.ts` handles redirection:
- Redirects logged-in users from `/` to `/chat`
- Redirects guests from `/chat` to `/`

---

### 🚀 Future Ideas
- Typing indicators
- Emoji support
- Message search/filter