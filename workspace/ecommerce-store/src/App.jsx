import { lazy } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Suspense } from 'react'
import { Header } from './components/layout/Header.jsx'
import { Footer } from './components/layout/Footer.jsx'
import { RequireAdmin } from './components/layout/RequireAdmin.jsx'
import { CartWatcher } from './components/cart/CartWatcher.jsx'

const HomePage = lazy(() => import('./pages/public/Home.jsx'))
const CatalogPage = lazy(() => import('./pages/public/Catalog.jsx'))
const ProductPage = lazy(() => import('./pages/public/Product.jsx'))
const CartPage = lazy(() => import('./pages/public/Cart.jsx'))
const CheckoutPage = lazy(() => import('./pages/public/Checkout.jsx'))
const DashboardPage = lazy(() => import('./pages/admin/Dashboard.jsx'))
const AdminProductsPage = lazy(() => import('./pages/admin/Products.jsx'))
const AdminOrdersPage = lazy(() => import('./pages/admin/Orders.jsx'))
const AdminUsersPage = lazy(() => import('./pages/admin/Users.jsx'))
const AccountPage = lazy(() => import('./pages/public/Account.jsx'))

function App() {
  return (
    <div className="flex min-h-full flex-col bg-background bg-[radial-gradient(70%_50%_at_100%_0%,rgba(37,99,235,.08),transparent_55%),radial-gradient(60%_60%_at_0%_100%,rgba(245,158,11,.08),transparent_55%)] dark:bg-[radial-gradient(70%_50%_at_100%_0%,rgba(37,99,235,.15),transparent_55%),radial-gradient(60%_60%_at_0%_100%,rgba(245,158,11,.12),transparent_55%)]">
      <Header />
      <CartWatcher />
      <main className="flex-1">
        <Suspense fallback={<div className="container-responsive py-16 text-slate-500">Loading…</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout/*" element={<CheckoutPage />} />
            <Route path="/account/*" element={<AccountPage />} />

            <Route path="/admin" element={<RequireAdmin><DashboardPage /></RequireAdmin>} />
            <Route path="/admin/products" element={<RequireAdmin><AdminProductsPage /></RequireAdmin>} />
            <Route path="/admin/orders" element={<RequireAdmin><AdminOrdersPage /></RequireAdmin>} />
            <Route path="/admin/users" element={<RequireAdmin><AdminUsersPage /></RequireAdmin>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
