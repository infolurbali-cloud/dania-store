import { useState } from 'react'
import { Link } from 'react-router-dom'

const SHIPPING_OPTIONS = [
  {
    id: 'regular',
    label: 'Bebas Ongkir Reguler (3-5 Hari)',
    price: 0,
  },
  {
    id: 'express',
    label: 'Ekspres Kilat (1-2 Hari)',
    price: 15,
  },
]

const PAYMENT_OPTIONS = [
  { id: 'va', label: 'Virtual Account' },
  { id: 'card', label: 'Kartu Kredit/Debit' },
  { id: 'qris', label: 'QRIS Instant' },
]

function generateOrderId() {
  const randomDigits = Math.floor(1000 + Math.random() * 9000)
  return `ORD-2026-${randomDigits}`
}

export default function CheckoutPage({ cart, onClearCart }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [shippingId, setShippingId] = useState('regular')
  const [paymentMethod, setPaymentMethod] = useState('Virtual Account')
  const [orderSuccess, setOrderSuccess] = useState(null)

  const selectedShipping =
    SHIPPING_OPTIONS.find((opt) => opt.id === shippingId) || SHIPPING_OPTIONS[0]

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const tax = subtotal * 0.1
  const shippingCost = selectedShipping.price
  const finalTotal = subtotal + tax + shippingCost

  function handleSubmit(e) {
    e.preventDefault()
    if (cart.length === 0) return

    setOrderSuccess({
      orderId: generateOrderId(),
      customerName: fullName.trim(),
      email: email.trim(),
      shippingLabel: selectedShipping.label,
      paymentMethod,
      subtotal,
      tax,
      shippingCost,
      total: finalTotal,
      items: cart,
    })

    onClearCart()
  }

  if (orderSuccess) {
    return (
      <main className="main-preview">
        <div className="success-invoice-card">
          <div className="success-icon-wrap" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="34"
              height="34"
              fill="none"
              stroke="#16a34a"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>

          <h1>Pesanan Berhasil Dibuat!</h1>
          <p className="success-subtitle">
            Terima kasih, <strong>{orderSuccess.customerName}</strong>. Struk
            pesanan telah dikirim ke {orderSuccess.email}.
          </p>

          <div className="invoice-meta">
            <div>
              <span>No. Pesanan</span>
              <strong>{orderSuccess.orderId}</strong>
            </div>
            <div>
              <span>Kurir</span>
              <strong>{orderSuccess.shippingLabel}</strong>
            </div>
            <div>
              <span>Pembayaran</span>
              <strong>{orderSuccess.paymentMethod}</strong>
            </div>
          </div>

          <div className="invoice-items">
            <h2>Rincian Barang</h2>
            {orderSuccess.items.map((item) => (
              <div key={item.id} className="summary-row">
                <span>
                  {item.title} &times; {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="invoice-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${orderSuccess.subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Pengiriman</span>
              <span>${orderSuccess.shippingCost.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Pajak PPN (10%)</span>
              <span>${orderSuccess.tax.toFixed(2)}</span>
            </div>
            <div className="summary-total-row" style={{ paddingBottom: 0 }}>
              <span>Total Dibayar</span>
              <span>${orderSuccess.total.toFixed(2)}</span>
            </div>
          </div>

          <Link to="/" className="checkout-cta-btn" style={{ marginTop: '24px' }}>
            Kembali ke Beranda
          </Link>
        </div>
      </main>
    )
  }

  if (cart.length === 0) {
    return (
      <main className="main-preview">
        <div className="status-box">
          <h1>Keranjang Anda Kosong</h1>
          <p style={{ marginBottom: '20px' }}>
            Silakan pilih produk terlebih dahulu sebelum melanjutkan ke halaman
            pembayaran.
          </p>
          <Link to="/" className="hero-cta" style={{ marginTop: 0 }}>
            Kembali ke Katalog
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="main-preview">
      <div className="cart-page-header">
        <h1>Checkout</h1>
        <Link to="/cart" className="back-link" style={{ marginBottom: 0 }}>
          ← Kembali ke Keranjang
        </Link>
      </div>

      <form className="checkout-grid" onSubmit={handleSubmit}>
        <section className="checkout-form-card" aria-label="Informasi pengiriman dan pembayaran">
          <h2>Kontak &amp; Alamat Pengiriman</h2>

          <div className="form-field">
            <label htmlFor="fullName">Nama Lengkap</label>
            <input
              id="fullName"
              type="text"
              required
              placeholder="Contoh: Dania Marheni"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="address">Alamat Lengkap</label>
            <textarea
              id="address"
              rows="3"
              required
              placeholder="Nama jalan, nomor rumah, RT/RW"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="form-grid-2">
            <div className="form-field">
              <label htmlFor="city">Kota</label>
              <input
                id="city"
                type="text"
                required
                placeholder="Denpasar"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="postalCode">Kode Pos</label>
              <input
                id="postalCode"
                type="text"
                required
                placeholder="80228"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </div>

          <h2 className="checkout-section-title">Kurir Pengiriman</h2>
          <div className="radio-group">
            {SHIPPING_OPTIONS.map((option) => (
              <label
                key={option.id}
                className={`radio-card ${
                  shippingId === option.id ? 'active' : ''
                }`}
              >
                <input
                  type="radio"
                  name="shipping"
                  value={option.id}
                  checked={shippingId === option.id}
                  onChange={() => setShippingId(option.id)}
                />
                <span>{option.label}</span>
                <strong>${option.price.toFixed(2)}</strong>
              </label>
            ))}
          </div>

          <h2 className="checkout-section-title">Metode Pembayaran</h2>
          <div className="radio-group">
            {PAYMENT_OPTIONS.map((option) => (
              <label
                key={option.id}
                className={`radio-card ${
                  paymentMethod === option.label ? 'active' : ''
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={option.label}
                  checked={paymentMethod === option.label}
                  onChange={() => setPaymentMethod(option.label)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </section>

        <aside className="order-summary-card" aria-label="Ringkasan pembayaran">
          <h2>Ringkasan Pesanan</h2>

          <div className="checkout-items-list">
            {cart.map((item) => (
              <div key={item.id} className="summary-row">
                <span>
                  {item.title} &times; {item.quantity}
                </span>
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </div>
            ))}
          </div>

          <div className="summary-rows">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Biaya Pengiriman</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Pajak PPN (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>

          <div className="summary-total-row">
            <span>Total Pembayaran</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>

          <button type="submit" className="add-cart-btn detail-add-btn">
            Bayar Sekarang ${finalTotal.toFixed(2)}
          </button>
        </aside>
      </form>
    </main>
  )
}
