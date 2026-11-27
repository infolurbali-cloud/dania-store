import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { products } from '../data/products.js'

export default function ProductDetailPage({ onAddToCart }) {
  const { id } = useParams()
  return <ProductDetailContent key={id} id={id} onAddToCart={onAddToCart} />
}

function ProductDetailContent({ id, onAddToCart }) {
  const product = products.find((item) => String(item.id) === id) || null

  const images = product
    ? Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : product.thumbnail
        ? [product.thumbnail]
        : []
    : []

  const [selectedImage, setSelectedImage] = useState(images[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [addedFeedback, setAddedFeedback] = useState(false)

  function handleDecrease() {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  function handleIncrease() {
    if (!product) return
    setQuantity((prev) => Math.min(product.stock, prev + 1))
  }

  function handleAdd() {
    if (!product || product.stock === 0) return
    onAddToCart(product, quantity)
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 1200)
  }

  if (!product) {
    return (
      <main className="main-preview">
        <Link to="/" className="back-link">
          ← Kembali ke Katalog
        </Link>
        <div className="status-box status-error" role="alert">
          <h2>Produk tidak ditemukan</h2>
          <p>Produk dengan ID tersebut tidak tersedia di katalog kami.</p>
        </div>
      </main>
    )
  }

  let stockLabel = `Tersedia (${product.stock})`
  let stockClass = 'stock-available'

  if (product.stock === 0) {
    stockLabel = 'Habis'
    stockClass = 'stock-empty'
  } else if (product.stock <= 5) {
    stockLabel = `Menipis (${product.stock})`
    stockClass = 'stock-low'
  }

  return (
    <main className="main-preview">
      <Link to="/" className="back-link">
        ← Kembali ke Katalog
      </Link>

      <div className="detail-layout">
        <section className="detail-gallery" aria-label="Galeri foto produk">
          <div className="detail-main-image-wrap">
            {selectedImage && (
              <img
                src={selectedImage}
                alt={product.title}
                className="detail-main-image"
              />
            )}
          </div>

          {images.length > 1 && (
            <div className="detail-thumbs" role="group" aria-label="Pilih foto produk">
              {images.map((imgUrl, index) => (
                <button
                  key={imgUrl}
                  type="button"
                  className={`detail-thumb-btn ${
                    selectedImage === imgUrl ? 'active' : ''
                  }`}
                  onClick={() => setSelectedImage(imgUrl)}
                  aria-label={`Lihat foto ${index + 1}`}
                >
                  <img src={imgUrl} alt={`${product.title} ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="detail-buybox" aria-label="Informasi pembelian">
          <span className="product-category">{product.category}</span>
          <h1 className="detail-title">{product.title}</h1>

          <div className="detail-rating-row">
            <span className="product-rating" aria-label={`Rating ${product.rating} dari 5`}>
              <svg
                viewBox="0 0 24 24"
                width="17"
                height="17"
                fill="#f59e0b"
                aria-hidden="true"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>{Number(product.rating).toFixed(1)}</span>
            </span>

            <span className={`detail-stock-badge ${stockClass}`}>
              {stockLabel}
            </span>
          </div>

          <p className="detail-price">${Number(product.price).toFixed(2)}</p>

          <p className="detail-description">{product.description}</p>

          <div className="detail-purchase-row">
            <div className="qty-stepper" aria-label="Atur jumlah">
              <button
                type="button"
                className="qty-btn"
                onClick={handleDecrease}
                disabled={product.stock === 0 || quantity <= 1}
                aria-label="Kurangi jumlah"
              >
                -
              </button>
              <span className="qty-value">{quantity}</span>
              <button
                type="button"
                className="qty-btn"
                onClick={handleIncrease}
                disabled={product.stock === 0 || quantity >= product.stock}
                aria-label="Tambah jumlah"
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="add-cart-btn detail-add-btn"
              disabled={product.stock === 0}
              onClick={handleAdd}
            >
              {product.stock === 0
                ? 'Stok Habis'
                : addedFeedback
                  ? 'Ditambahkan ke Keranjang'
                  : '+ Tambah ke Keranjang'}
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
