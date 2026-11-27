import { Link } from 'react-router-dom'
import { articles } from '../data/articles.js'

export default function ArticlesPage() {
  return (
    <main className="main-preview">
      <div className="cart-page-header">
        <div>
          <h1>Artikel &amp; Panduan</h1>
          <p className="articles-subtitle">
            Bacaan ringkas seputar tips belanja, perawatan produk, dan gaya hidup
            harian.
          </p>
        </div>
        <Link to="/" className="back-link" style={{ marginBottom: 0 }}>
          ← Kembali ke Katalog
        </Link>
      </div>

      <div className="articles-grid">
        {articles.map((article) => (
          <article key={article.id} className="article-card">
            <div className="article-card-meta">
              <span className="product-category">{article.category}</span>
              <span className="article-read-time">{article.readTime}</span>
            </div>

            <h2 className="article-card-title">
              <Link to={`/articles/${article.id}`}>{article.title}</Link>
            </h2>

            <p className="article-card-excerpt">{article.excerpt}</p>

            <div className="article-card-footer">
              <span className="article-date">{article.date}</span>
              <Link to={`/articles/${article.id}`} className="article-read-link">
                Baca Artikel
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
