# 🧠 Support Chat App — Frontend

This is the **frontend** for a real-time support chat application built with **Next.js**, **Socket.IO**, **NextAuth.js**, and **Tailwind CSS**. Users can authenticate via **Google OAuth** and chat in real-time using a secure, persistent connection.

---

## 🚀 Features

- 🔐 **Google OAuth Login** using NextAuth.js
- 💬 **Real-time messaging** via Socket.IO
- 📡 Join chat rooms based on authenticated user
- 🧠 Session management with `useSession()`
- 🎨 Responsive and modern UI built with Tailwind CSS
- 🔔 System notifications for new users joining

---

## 🛠 Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Socket.IO (client)**
- **NextAuth.js** (Google OAuth)
- **React Hooks** (`useSession`, `useEffect`, `useRef`)

---

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/support-chat-frontend.git
cd support-chat-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

Create a `.env.local` file in the root and add:

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_URL=http://localhost:3000
```

4. **Start the development server**

```bash
npm run dev
```

> The app runs at `http://localhost:3000`

---

## 🧠 Folder Structure

```
/app
  /chat            # Chat room UI
  /api/auth        # NextAuth handler
  page.tsx         # Landing page
/layout.tsx        # Root layout
/globals.css       # Tailwind styles
```

---

## 🔗 Backend Integration

Ensure your **backend (Node.js + Express + Socket.IO)** is running at:

```
http://localhost:8000
```

The frontend connects to this for real-time communication and message history via REST.

---

## 📸 Screenshots

Coming soon...

---

## ✅ TODO / Future Features

- [ ] Admin/Support Dashboard
- [ ] Typing indicators
- [ ] User avatars from Google
- [ ] Role-based permissions (agent vs. client)
- [ ] Push notifications

---

## 📄 License

This project is licensed under the MIT License. Feel free to fork, contribute, or build on top of it.

---

## 🙋‍♂️ Contact

Have questions or suggestions? Open an issue or reach out at [hamza_mughal07@outlook.com](mailto:hamza_mughal07@outlook.com).