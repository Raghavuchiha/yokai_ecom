<div align="center">

# 🛍️ YOKAI

A full-stack e-commerce platform — browse collections, manage a cart, and shop across categories with secure, token-based authentication under the hood.

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[Live Demo](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## ✨ What it does

YOKAI is a full-stack storefront built to mirror how a real e-commerce backend is structured — not just a static product grid.

- 🔐 **JWT authentication** with access + refresh token rotation
- 🧑‍💻 **User profiles** — signup, login, and profile retrieval
- 🛒 **Cart system** — add, view, and remove items, synced to the backend per user
- 🗂️ **Category browsing** — Men, Women, Kids collections with a dedicated collection/search view
- 🎨 **Polished storefront UI** — hero section, best sellers, newsletter, and site policies, built with React + Tailwind

---

## 🖥️ Tech Stack

| Layer | Tech |
|---|---|
| **Frontend** | React 19, React Router, Tailwind CSS, Swiper, React Toastify, Vite |
| **Backend** | FastAPI, SQLAlchemy |
| **Database** | PostgreSQL (Supabase) |
| **Auth** | JWT (access + refresh tokens), Passlib (bcrypt) |
| **Deployment** | Vercel (frontend + backend) |

---

## 🏗️ How it works

```
┌──────────────┐        ┌──────────────┐        ┌───────────────┐
│   React UI    │  ───▶  │   FastAPI    │  ───▶  │  Supabase      │
│ (Vite build)  │  ◀───  │   Backend    │  ◀───  │  (PostgreSQL)  │
└──────────────┘        └──────────────┘        └───────────────┘
```

Auth uses short-lived access tokens paired with refresh tokens, so the frontend can silently renew a session instead of forcing repeated logins. Cart state is tied to the authenticated user rather than stored only in the browser, so it persists across devices and sessions.

---

## 📁 Folder Structure

```
yokai_ecom/
├── app/
│   ├── app.py                # FastAPI entry point, routes, CORS config
│   ├── database.py            # SQLAlchemy engine & session setup
│   ├── schemas.py              # Pydantic request/response models
│   └── utils.py                 # Auth helpers, password hashing
│
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx              # React entry point
│       ├── App.jsx                # Route definitions
│       ├── config.js
│       ├── context/
│       │   └── ShopContext.jsx    # Global cart & product state
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Hero.jsx
│       │   ├── LatestCollection.jsx
│       │   ├── category.jsx
│       │   ├── productitem.jsx
│       │   ├── SearchBar.jsx
│       │   ├── Newsletter.jsx
│       │   ├── Ourpolicy.jsx
│       │   └── footer.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── Collection.jsx
│           ├── Product.jsx
│           ├── Cart.jsx
│           ├── PlaceOrder.jsx
│           ├── Orders.jsx
│           ├── Login.jsx
│           ├── profile.jsx
│           ├── About.jsx
│           ├── Contact.jsx
│           ├── men.jsx / women.jsx / kid.jsx
│
├── requirements.txt
└── vercel.json
```

---

## 🔌 API Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/signup` | Create a new account | ❌ |
| `POST` | `/login` | Log in, receive access + refresh tokens | ❌ |
| `GET` | `/users` | List all users | ✅ |
| `GET` | `/me` | Get the current logged-in user | ✅ |
| `GET` | `/profile` | Get the current user's profile details | ✅ |
| `GET` | `/products` | Fetch all products | ❌ |
| `GET` | `/cart` | Get the current user's cart | ✅ |
| `POST` | `/cart` | Add an item to the cart | ✅ |
| `DELETE` | `/cart/{cart_id}` | Remove an item from the cart | ✅ |

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- A Supabase project (PostgreSQL database + connection string)

### 1. Clone the repo
```bash
git clone https://github.com/Raghavuchiha/yokai_ecom.git
cd yokai_ecom
```

### 2. Backend setup
```bash
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the project root:
```env
DATABASE_URL=postgresql://user:password@host:port/dbname
SECRET_KEY=your-secret-key
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-key
```

Run the server:
```bash
fastapi dev app/app.py
```

### 3. Frontend setup
```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:
```env
VITE_API_URL=http://localhost:8000
```

Run the dev server:
```bash
npm run dev
```

Visit `http://localhost:5173` 🎉

---

## 🔒 Security Notes

- Passwords are hashed with **bcrypt** — never stored in plain text
- Access + refresh token separation limits the damage of a leaked access token
- CORS is scoped to trusted origins rather than left wide open

---

## 📌 Roadmap

- [ ] Checkout & payment integration (Stripe / Razorpay)
- [ ] Order history persistence and status tracking
- [ ] Wishlist functionality
- [ ] Row-Level Security (RLS) policies on Supabase tables
- [ ] Rate limiting on auth endpoints

---

## 👤 Author

**Raghav**
GitHub: [@Raghavuchiha](https://github.com/Raghavuchiha)

---

<div align="center">

If this project helped you, consider giving it a ⭐

</div>
