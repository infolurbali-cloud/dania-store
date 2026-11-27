import { Link } from 'react-router-dom'

export default function ProductCard({
  product,
  cartQuantity = 0,
  onAddToCart,
  onUpdateQty,
}) {
  const { id, title, price, stock, thumbnail, category, rating } = product

  let stockLabel = 'Tersedia'
  let stockClass = 'stock-available'

  if (stock === 0) {
    stockLabel = 'Habis'
    stockClass = 'stock-empty'
  } else if (stock <= 5) {
    stockLabel = 'Menipis'
    stockClass = 'stock-low'
  }

  return (
    <article className="product-card">
      <Link to={`/product/${id}`} className="product-thumb-wrap" aria-label={`Lihat detail ${title}`}>
        <img
          src={thumbnail}
          alt={title}
          className="product-thumb"
          loading="lazy"
        />
        <span className={`stock-badge ${stockClass}`}>{stockLabel}</span>
      </Link>

      <div className="product-info">
        <span className="product-category">{category}</span>
        <h2 className="product-title" title={title}>
          <Link to={`/product/${id}`} className="product-title-link">
            {title}
          </Link>
        </h2>

        <div className="product-meta">
          <span className="product-price">${Number(price).toFixed(2)}</span>
          <span className="product-rating" aria-label={`Rating ${rating} dari 5`}>
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="#f59e0b"
              aria-hidden="true"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>{Number(rating).toFixed(1)}</span>
          </span>
        </div>

        <div className="product-actions">
          <Link to={`/product/${id}`} className="detail-link">
            Lihat Detail
          </Link>

          {cartQuantity > 0 ? (
            <div className="card-qty-stepper" aria-label={`Jumlah ${title} di keranjang`}>
              <button
                type="button"
                className="qty-btn"
                onClick={() => onUpdateQty(id, cartQuantity - 1)}
                aria-label={`Kurangi jumlah ${title}`}
              >
                -
              </button>
              <span className="qty-value">{cartQuantity}</span>
              <button
                type="button"
                className="qty-btn"
                disabled={cartQuantity >= stock}
                onClick={() => onUpdateQty(id, cartQuantity + 1)}
                aria-label={`Tambah jumlah ${title}`}
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="add-cart-btn"
              disabled={stock === 0}
              onClick={() => onAddToCart(product)}
            >
              + Keranjang
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
