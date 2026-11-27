import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products.js'
import Sidebar from '../components/Sidebar.jsx'
import ProductCard from '../components/ProductCard.jsx'

export default function HomePage({
  cart = [],
  onAddToCart,
  onUpdateQty,
  cartCount = 0,
  isSidebarOpen = false,
  onCloseSidebar = () => {},
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)

  const featuredSlides = products.slice(0, 5)

  useEffect(() => {
    if (featuredSlides.length <= 1) return

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % featuredSlides.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [featuredSlides.length])

  const categories = ['all', ...new Set(products.map((p) => p.category))]

  const normalizedQuery = searchQuery.trim().toLowerCase()
  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(normalizedQuery)
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory
    const matchesStock = !onlyAvailable || item.stock > 0
    return matchesSearch && matchesCategory && matchesStock
  })

  const currentSlide =
    featuredSlides.length > 0
      ? featuredSlides[activeSlide % featuredSlides.length]
      : null

  return (
    <main>
      <section className="hero-section hero-with-slider">
        <div className="hero-slider" aria-label="Sorotan foto produk">
          {currentSlide && (
            <>
              <div className="hero-slide-frame">
                <Link
                  to={`/product/${currentSlide.id}`}
                  aria-label={`Lihat detail ${currentSlide.title}`}
                  style={{ display: 'contents' }}
                >
                  <img
                    src={currentSlide.images?.[0] || currentSlide.thumbnail}
                    alt={currentSlide.title}
                    className="hero-slide-image"
                  />
                </Link>

                <button
                  type="button"
                  className="slider-nav-btn slider-prev"
                  onClick={() =>
                    setActiveSlide(
                      (prev) =>
                        (prev - 1 + featuredSlides.length) %
                        featuredSlides.length
                    )
                  }
                  aria-label="Foto produk sebelumnya"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="slider-nav-btn slider-next"
                  onClick={() =>
                    setActiveSlide((prev) => (prev + 1) % featuredSlides.length)
                  }
                  aria-label="Foto produk berikutnya"
                >
                  ›
                </button>

                <div className="hero-slide-caption">
                  <div className="hero-slide-caption-inner">
                    <div>
                      <span className="hero-slide-category">
                        {currentSlide.category}
                      </span>
                      <strong className="hero-slide-title">
                        {currentSlide.title}
                      </strong>
                      <span className="hero-slide-price">
                        ${Number(currentSlide.price).toFixed(2)}
                      </span>
                    </div>
                    <Link
                      to={`/product/${currentSlide.id}`}
                      className="hero-slide-link"
                    >
                      Lihat Produk
                    </Link>
                  </div>
                </div>
              </div>

              <div className="slider-dots" role="tablist" aria-label="Pilih slide">
                {featuredSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={idx === activeSlide % featuredSlides.length}
                    aria-label={`Slide ${idx + 1}: ${slide.title}`}
                    className={`slider-dot ${
                      idx === activeSlide % featuredSlides.length ? 'active' : ''
                    }`}
                    onClick={() => setActiveSlide(idx)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="hero-text-col">
          <span className="hero-pill">EDISI SALON 2026</span>
          <h1>Dania Lash &amp; Salon</h1>
          <p>
            Supplier perlengkapan eyelash extension, lem bulu mata, pinset
            presisi, dan peralatan salon profesional untuk studio kecantikan
            Anda.
          </p>
          <a href="#katalog" className="hero-cta">
            Belanja Sekarang
          </a>
        </div>
      </section>

      <div id="katalog" className="main-preview store-layout">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onlyAvailable={onlyAvailable}
          onToggleAvailable={setOnlyAvailable}
          cartCount={cartCount}
          isOpen={isSidebarOpen}
          onClose={onCloseSidebar}
        />

        <section className="catalog-content" aria-label="Katalog produk">
          <div className="catalog-toolbar">
            <div className="search-box">
              <svg
                className="search-icon"
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Cari perlengkapan salon atau eyelash..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Cari produk"
              />
              {searchQuery !== '' && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Bersihkan pencarian"
                >
                  ✕
                </button>
              )}
            </div>

            <div
              className="category-pills"
              role="group"
              aria-label="Filter kategori"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`pill-btn ${
                    selectedCategory === category ? 'active' : ''
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'Semua' : category}
                </button>
              ))}
            </div>
          </div>

          {products.length === 0 ? (
            <div className="status-box">
              <h2>Belum ada produk</h2>
              <p>Data produk saat ini kosong.</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="status-box">
              <p>Tidak ada produk yang cocok dengan pencarianmu.</p>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => {
                const cartItem = cart.find((item) => item.id === product.id)
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    cartQuantity={cartItem ? cartItem.quantity : 0}
                    onAddToCart={onAddToCart}
                    onUpdateQty={onUpdateQty}
                  />
                )
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
