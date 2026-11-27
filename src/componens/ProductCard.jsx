const PRODUCT_NOTES = {
  1: 'Katun combed 24s yang adem dan jatuh rapi untuk pemakaian seharian.',
  2: 'Denim 12oz cuci lembut dengan pengatur lingkar kepala berbahan kuningan.',
  3: 'Kanvas marsoto tebal dengan saku dalam untuk laptop 14 inci dan buku catatan.',
  4: 'Baja nirkarat dinding ganda, menjaga suhu minuman dingin hingga 12 jam.',
}

function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function ProductIllustration({ id }) {
  switch (id) {
    case 1:
      // Kaos Polos
      return (
        <svg viewBox="0 0 160 140" width="136" height="120" aria-hidden="true">
          <path
            d="M46 24 L64 18 C70 28 90 28 96 18 L114 24 L140 48 L124 68 L112 58 L112 122 L48 122 L48 58 L36 68 L20 48 Z"
            fill="#23476a"
            stroke="#16212c"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M64 18 C70 31 90 31 96 18"
            fill="none"
            stroke="#f7f8f6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      )
    case 2:
      // Topi Denim
      return (
        <svg viewBox="0 0 160 140" width="136" height="120" aria-hidden="true">
          <path
            d="M32 82 C32 46 54 30 80 30 C106 30 128 46 128 82 Z"
            fill="#3b5f85"
            stroke="#16212c"
            strokeWidth="2.5"
          />
          <path
            d="M24 84 C58 76 116 78 144 94 C118 102 68 100 24 84 Z"
            fill="#23476a"
            stroke="#16212c"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <line x1="80" y1="30" x2="80" y2="80" stroke="#d8ddd6" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      )
    case 3:
      // Tas Kanvas
      return (
        <svg viewBox="0 0 160 140" width="136" height="120" aria-hidden="true">
          <path
            d="M58 46 V32 C58 20 102 20 102 32 V46"
            fill="none"
            stroke="#16212c"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <rect
            x="38"
            y="46"
            width="84"
            height="76"
            rx="4"
            fill="#e4dfd3"
            stroke="#16212c"
            strokeWidth="2.5"
          />
          <rect
            x="54"
            y="66"
            width="52"
            height="36"
            rx="2"
            fill="#d4cdbc"
            stroke="#16212c"
            strokeWidth="2"
          />
          <line x1="38" y1="54" x2="122" y2="54" stroke="#b87d28" strokeWidth="2" />
        </svg>
      )
    default:
      // Botol Minum
      return (
        <svg viewBox="0 0 160 140" width="136" height="120" aria-hidden="true">
          <rect
            x="66"
            y="18"
            width="28"
            height="12"
            rx="3"
            fill="#16212c"
          />
          <path
            d="M62 30 H98 L104 46 V116 C104 120 100 124 96 124 H64 C60 124 56 120 56 116 V46 Z"
            fill="#ffffff"
            stroke="#16212c"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <rect x="57" y="64" width="46" height="30" fill="#23476a" />
        </svg>
      )
  }
}

export default function ProductCard({ product, onAddToCart, addedId }) {
  const isOutOfStock = product.stock === 0
  const isLowStock = product.stock > 0 && product.stock <= 5
  const isRecentlyAdded = addedId === product.id

  let stockLabel = `Tersedia (${product.stock})`
  if (isOutOfStock) stockLabel = 'Stok habis'
  else if (isLowStock) stockLabel = `Sisa ${product.stock}`

  return (
    <article className="product-card">
      <div className="product-media">
        <span
          className={`stock-pill ${isOutOfStock ? 'is-empty' : ''} ${
            isLowStock ? 'is-low' : ''
          }`}
        >
          {stockLabel}
        </span>
        <ProductIllustration id={product.id} />
      </div>

      <div className="product-body">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-note">{PRODUCT_NOTES[product.id]}</p>

        <div className="product-footer">
          <span className="product-price">{formatRupiah(product.price)}</span>
          <button
            type="button"
            className="add-btn"
            disabled={isOutOfStock}
            onClick={() => onAddToCart(product)}
          >
            {isOutOfStock
              ? 'Stok habis'
              : isRecentlyAdded
                ? 'Ditambahkan'
                : 'Tambah ke keranjang'}
          </button>
        </div>
      </div>
    </article>
  )
}