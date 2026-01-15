# SoraShop 🛒

![MERN Badge](https://img.shields.io/badge/Stack-MERN-green)
![Vercel Deployment](https://img.shields.io/badge/Deployed-Vercel-black)

[SoraShop Live Demo](https://sora-shop-gilt.vercel.app)

**SoraShop** is a full-stack e-commerce web application built with **MERN (MongoDB, Express, React, Node.js)**. Users can browse products, view product details, add items to their cart, and track orders. Admins can manage products and orders with an intuitive dashboard.

---

## 🚀 Features

### For Users
- Browse products in a responsive grid.
- View product details (image, category, description, stock, price).
- Add products to cart with quantity selection.
- Update or remove cart items.
- Checkout and track order status.
- Authentication: Login & Register.

### For Admins
- Protected admin dashboard.
- Manage products: create, update, delete.
- View and update orders.
- Quick access to stock, price, and product details.

### UI / UX
- Responsive design for mobile & desktop.
- Dark & Light mode toggle.
- Real-time notifications using `react-hot-toast`.
- Clean, fast, and intuitive interface.

---

## 🛠️ Tech Stack

- **Frontend:** React, TailwindCSS, DaisyUI, Zustand
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## 📡 Live URLs

- **Frontend:** [https://sora-shop-gilt.vercel.app](https://sora-shop-gilt.vercel.app)  
- **Backend:** [https://sorashop.onrender.com](https://sorashop.onrender.com)

---

## ⚡ Installation (Full Stack)

1. **Clone the repo**
```bash
git clone https://github.com/yourusername/sora-shop.git
cd sora-shop
````

2. **Install dependencies**

```bash
npm install
cd client
npm install
```

3. **Setup environment variables**
   Create a `.env` file in the **server** folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. **Run locally**

* Start backend:

```bash
npm run dev
```

* Start frontend (in `client` folder):

```bash
npm start
```

* Access at: `http://localhost:3000`

> The frontend communicates with your backend at `http://localhost:5000` by default. To use the live backend, update your `api.js` baseURL to `https://sorashop.onrender.com`.

---

## 📂 Folder Structure

```
sora-shop/
├─ client/       # React frontend
├─ server/       # Node/Express backend
├─ .env
├─ package.json
└─ README.md
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---


