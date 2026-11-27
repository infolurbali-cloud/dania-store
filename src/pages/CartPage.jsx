import { Link } from 'react-router-dom'

export default function CartPage({ cart, onUpdateQty, onRemove }) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const tax = subtotal * 0.1
  const total = subtotal + tax

  if (cart.length === 0) {
    return (
      <main className="main-preview">
        <div className="cart-empty-state">
          <svg
            viewBox="0 0 24 24"
            width="64"
            height="64"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cart-empty-icon"
            aria-hidden="true"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <h1>Keranjang Belanja Masih Kosong</h1>
          <p>
            Sepertinya Anda belum menambahkan produk apa pun ke keranjang.
          </p>
          <Link to="/" className="hero-cta">
            Mulai Belanja
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="main-preview">
      <div className="cart-page-header">
        <h1>Keranjang Belanja</h1>
        <Link to="/" className="back-link" style={{ marginBottom: 0 }}>
          ← Lanjut Belanja
        </Link>
      </div>

      <div className="cart-layout">
        <section className="cart-items-list" aria-label="Daftar item belanja">
          {cart.map((item) => (
            <article key={item.id} className="cart-item">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="cart-item-thumb"
              />

              <div className="cart-item-details">
                <Link to={`/product/${item.id}`} className="cart-item-title">
                  {item.title}
                </Link>
                <span className="cart-item-unit-price">
                  ${Number(item.price).toFixed(2)} / unit
                </span>
              </div>

              <div className="qty-stepper" aria-label={`Kuantitas ${item.title}`}>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                  aria-label={`Kurangi jumlah ${item.title}`}
                >
                  -
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                  aria-label={`Tambah jumlah ${item.title}`}
                >
                  +
                </button>
              </div>

              <div className="cart-item-subtotal">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <button
                type="button"
                className="cart-remove-btn"
                onClick={() => onRemove(item.id)}
                aria-label={`Hapus ${item.title} dari keranjang`}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              </button>
            </article>
          ))}
        </section>

        <aside className="order-summary-card" aria-label="Ringkasan pesanan">
          <h2>Ringkasan Pesanan</h2>

          <div className="summary-rows">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Estimasi Pajak (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Pengiriman</span>
              <span className="summary-free">Gratis</span>
            </div>
          </div>

          <div className="summary-total-row">
            <span>Total Bayar</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Link to="/checkout" className="checkout-cta-btn">
            Lanjut ke Pembayaran
          </Link>
        </aside>
      </div>
    </main>
  )
}
