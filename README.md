# 🛒 Manav Grocery Commerce

A modern e-commerce platform built with Next.js, TypeScript, and MongoDB.

## 🚀 Features

- 🛍️ Product listing and search
- 🛒 Shopping cart
- 💳 Secure payment with Stripe
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔍 Real-time search
- 📦 Order management

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.3.0, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB + Mongoose
- **Payment**: Stripe
- **UI**: React Icons, React Toastify

## 📋 Prerequisites

- Node.js
- MongoDB
- Stripe account

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/manav-grocery-commerce.git
cd manav-grocery-commerce
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit the `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/your_database_name
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🗃️ Database

To load test data:

```bash
node seedGrocery.js
```

## 📚 API Documentation

Check `ManavAPI_Kullanimi.md` and Postman collection `ManavAPI.postman_collection.json` for API usage.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

# Packages

Required packages after including the API folder:

- mongoose
- stripe

# Parallel Routes

In Next.js, **parallel routes** are very useful when you want to manage different parts of a page independently. They come into play especially when you need to show multiple "sub-content" areas within the same page without synchronizing them.

### 👇 When to Use?

- When there are multiple **independent areas** within a page, each managed by different routes
- When different contents like modals, tabs, or dashboards need to be rendered simultaneously but independently
- When each area needs to maintain its own URL state

---

## ✅ Example Scenario: Dashboard Page

Consider an admin panel:

```
/dashboard
```

This page has three main sections:

1. 👤 `UserList` (user list on the left)
2. 📝 `UserDetail` (selected user details in the middle)
3. 📈 `UserActivity` (user activity graph on the right)

These three areas need to work **independently**:

- When a user is selected, only the middle section changes
- Activity details on the right manage their own route and state
- Maybe a modal opens only on one outlet

### 📂 Structure with Parallel Route

```bash
/app
  /dashboard
    @users/page.tsx          → Left panel (UserList)
    @details/[id]/page.tsx   → Middle panel (UserDetail)
    @activity/[id]/page.tsx  → Right panel (UserActivity)
    layout.tsx               → Places these three areas together
```

```tsx
// /app/dashboard/layout.tsx

export default function DashboardLayout({users, details, activity}) {
  return (
    <div className="dashboard">
      <aside>{users}</aside>
      <main>{details}</main>
      <section>{activity}</section>
    </div>
  );
}
```

Now the URL can be:

```
/dashboard
/dashboard/details/123
/dashboard/activity/123
```

With this structure:

- Each panel loads independently
- Only the relevant section renders when `@details` or `@activity` routes change
- User experience becomes fast, modular, and manageable

---

## 💡 Other Examples

- E-commerce product detail page: Gallery on the left, product description on the right, recommended products at the bottom
- Messaging app: Chat list on the left panel, selected chat in the middle, person details on the right
- Modal routing: Main content continues below while modal opens, modal works in its own route

---

## Dynamically Grouping Objects in an Array

```ts
// To transform my array into the desired format
const groupedProducts = groceries.reduce<Record<string, Product[]>>(
  (groups, products) => {
    const category = products.category;

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(products);

    return groups;
  },
  {},
);

// Before reduce
//? const groceries = [{cat:"a"},{cat:"b"},{cat:"a"},{cat:"b"}]

// After reduce
//? const groupedProducts = { a:[{cat:"a"},{cat:"a"}],  b:[{cat:"b"},{cat:"b"}]}
```

## 🔑 Why Use Object.keys

The `Object.keys()` method returns an array of all keys in an object.
