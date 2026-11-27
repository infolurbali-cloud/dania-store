import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer id="tentang" className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-col">
          <span className="footer-brand">Dania Lash &amp; Salon</span>
          <p className="footer-desc">
            Supplier perlengkapan salon, eyelash extension, dan perawatan
            kecantikan terpercaya dari Denpasar, Bali.
          </p>
        </div>

        <div className="footer-links-col">
          <h3 className="footer-heading">Navigasi</h3>
          <ul className="footer-links">
            <li>
              <Link to="/">Beranda</Link>
            </li>
            <li>
              <a href="/#katalog">Katalog</a>
            </li>
            <li>
              <Link to="/articles">Artikel</Link>
            </li>
            <li>
              <Link to="/cart">Keranjang</Link>
            </li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h3 className="footer-heading">Alamat &amp; Kontak</h3>
          <ul className="footer-links">
            <li>Jl. Teuku Umar Barat No. 88, Denpasar, Bali 80119</li>
            <li>
              Telp / WA: <a href="tel:+6281234567890">+62 812-3456-7890</a>
            </li>
            <li>
              Email: <a href="mailto:support@daniastore.id">support@daniastore.id</a>
            </li>
            <li>Senin – Sabtu, 09.00 – 17.00 WITA</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Dania Lash &amp; Salon. Seluruh hak cipta dilindungi.</p>
      </div>
    </footer>
  )
}
