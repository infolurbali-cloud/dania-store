export default function Sidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  onlyAvailable,
  onToggleAvailable,
  cartCount,
  isOpen,
  onClose,
}) {
  return (
    <aside className={`sidebar ${isOpen ? 'is-open' : ''}`} aria-label="Sidebar filter">
      <div className="sidebar-header-mobile">
        <span className="sidebar-heading">Filter &amp; Navigasi</span>
        <button
          type="button"
          className="sidebar-close-btn"
          onClick={onClose}
          aria-label="Tutup sidebar"
        >
          ✕
        </button>
      </div>

      <div className="sidebar-card">
        <h2 className="sidebar-title">Kategori</h2>
        <ul className="sidebar-list">
          {categories.map((category) => (
            <li key={category}>
              <button
                type="button"
                className={`sidebar-link ${
                  selectedCategory === category ? 'active' : ''
                }`}
                onClick={() => {
                  onSelectCategory(category)
                  onClose()
                }}
              >
                <span>{category === 'all' ? 'Semua Produk' : category}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-card">
        <h2 className="sidebar-title">Ketersediaan</h2>
        <label className="sidebar-checkbox">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => onToggleAvailable(e.target.checked)}
          />
          <span>Hanya stok tersedia</span>
        </label>
      </div>

      <div className="sidebar-card sidebar-cart-summary">
        <h2 className="sidebar-title">Ringkasan Keranjang</h2>
        <p className="sidebar-cart-text">
          Total item di keranjang: <strong>{cartCount}</strong>
        </p>
      </div>
    </aside>
  )
}
