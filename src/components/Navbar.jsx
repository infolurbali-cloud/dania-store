import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({
  brandName,
  cartCount = 0,
  storyProducts = [],
  onAddToCart,
  onToggleSidebar,
}) {
  const [activeStoryIndex, setActiveStoryIndex] = useState(null)

  const activeStory =
    activeStoryIndex !== null ? storyProducts[activeStoryIndex] : null

  useEffect(() => {
    if (activeStoryIndex === null || storyProducts.length === 0) return

    const timer = setTimeout(() => {
      if (activeStoryIndex + 1 < storyProducts.length) {
        setActiveStoryIndex(activeStoryIndex + 1)
      } else {
        setActiveStoryIndex(null)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [activeStoryIndex, storyProducts.length])

  function handlePrevStory() {
    if (activeStoryIndex === null) return
    setActiveStoryIndex((prev) => (prev > 0 ? prev - 1 : 0))
  }

  function handleNextStory() {
    if (activeStoryIndex === null) return
    if (activeStoryIndex + 1 < storyProducts.length) {
      setActiveStoryIndex(activeStoryIndex + 1)
    } else {
      setActiveStoryIndex(null)
    }
  }

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          <div className="navbar-left">
            <button
              type="button"
              className="sidebar-toggle-btn"
              onClick={onToggleSidebar}
              aria-label="Buka menu sidebar"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <Link to="/" className="navbar-brand">
              {brandName}
            </Link>
          </div>

          <nav className="navbar-nav" aria-label="Navigasi utama">
            <Link to="/">Beranda</Link>
            <a href="/#katalog">Katalog</a>
            <Link to="/articles">Artikel</Link>
            <a href="/#tentang">Tentang</a>
          </nav>

          <Link
            to="/cart"
            className="cart-button"
            aria-label={`Keranjang belanja, ${cartCount} barang`}
          >
            <svg
              className="cart-icon"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="cart-badge">{cartCount}</span>
          </Link>
        </div>

        {storyProducts.length > 0 && (
          <div className="navbar-stories-bar" aria-label="Story produk">
            <div className="navbar-stories-inner">
              {storyProducts.map((product, index) => (
                <button
                  key={product.id}
                  type="button"
                  className="story-avatar-btn"
                  onClick={() => setActiveStoryIndex(index)}
                  aria-label={`Lihat story ${product.title}`}
                >
                  <span className="story-ring">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="story-avatar-img"
                    />
                  </span>
                  <span className="story-label">{product.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {activeStory && (
        <div
          className="story-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`Story produk: ${activeStory.title}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveStoryIndex(null)
          }}
        >
          <div className="story-viewer">
            <div className="story-progress-row">
              {storyProducts.map((item, idx) => (
                <div key={item.id} className="story-progress-track">
                  <div
                    key={`${item.id}-${activeStoryIndex}`}
                    className={`story-progress-fill ${
                      idx < activeStoryIndex
                        ? 'is-done'
                        : idx === activeStoryIndex
                          ? 'is-active'
                          : ''
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="story-viewer-header">
              <div className="story-viewer-meta">
                <img
                  src={activeStory.thumbnail}
                  alt={activeStory.title}
                  className="story-viewer-thumb"
                />
                <div>
                  <strong>{activeStory.title}</strong>
                  <span>{activeStory.category}</span>
                </div>
              </div>

              <button
                type="button"
                className="story-close-btn"
                onClick={() => setActiveStoryIndex(null)}
                aria-label="Tutup story"
              >
                ✕
              </button>
            </div>

            <div className="story-media">
              <button
                type="button"
                className="story-nav-zone story-nav-left"
                onClick={handlePrevStory}
                aria-label="Story sebelumnya"
              >
                ‹
              </button>

              <img
                src={activeStory.images?.[0] || activeStory.thumbnail}
                alt={activeStory.title}
                className="story-media-img"
              />

              <button
                type="button"
                className="story-nav-zone story-nav-right"
                onClick={handleNextStory}
                aria-label="Story berikutnya"
              >
                ›
              </button>
            </div>

            <div className="story-footer">
              <div className="story-info-text">
                <span className="story-price">
                  ${Number(activeStory.price).toFixed(2)}
                </span>
                <p>{activeStory.description}</p>
              </div>

              <div className="story-actions">
                <Link
                  to={`/product/${activeStory.id}`}
                  className="story-detail-btn"
                  onClick={() => setActiveStoryIndex(null)}
                >
                  Lihat Produk
                </Link>
                <button
                  type="button"
                  className="story-cart-btn"
                  disabled={activeStory.stock === 0}
                  onClick={() => onAddToCart?.(activeStory, 1)}
                >
                  + Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
