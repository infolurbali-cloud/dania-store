import { Link, useParams } from 'react-router-dom'
import { articles } from '../data/articles.js'

export default function ArticleDetailPage() {
  const { id } = useParams()
  const article = articles.find((item) => item.id === id)

  if (!article) {
    return (
      <main className="main-preview">
        <Link to="/articles" className="back-link">
          ← Kembali ke Daftar Artikel
        </Link>
        <div className="status-box">
          <h1>Artikel Tidak Ditemukan</h1>
          <p style={{ marginBottom: '18px' }}>
            Maaf, artikel yang Anda cari tidak tersedia atau telah dipindahkan.
          </p>
          <Link to="/articles" className="hero-cta" style={{ marginTop: 0 }}>
            Lihat Semua Artikel
          </Link>
        </div>
      </main>
    )
  }

  const otherArticles = articles.filter((item) => item.id !== article.id)

  return (
    <main className="main-preview">
      <Link to="/articles" className="back-link">
        ← Kembali ke Daftar Artikel
      </Link>

      <article className="article-detail-card">
        <header className="article-detail-header">
          <span className="product-category">{article.category}</span>
          <h1>{article.title}</h1>
          <div className="article-detail-meta">
            <span>Oleh {article.author}</span>
            <span>&bull;</span>
            <span>{article.date}</span>
            <span>&bull;</span>
            <span>{article.readTime}</span>
          </div>
        </header>

        <p className="article-detail-lead">{article.excerpt}</p>

        <div className="article-detail-body">
          {article.sections.map((section) => (
            <section key={section.heading} className="article-section">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </section>
          ))}
        </div>
      </article>

      <section className="related-articles" aria-label="Artikel lainnya">
        <h2 className="related-heading">Artikel Lainnya</h2>
        <div className="articles-grid">
          {otherArticles.map((item) => (
            <article key={item.id} className="article-card">
              <div className="article-card-meta">
                <span className="product-category">{item.category}</span>
                <span className="article-read-time">{item.readTime}</span>
              </div>
              <h3 className="article-card-title">
                <Link to={`/articles/${item.id}`}>{item.title}</Link>
              </h3>
              <p className="article-card-excerpt">{item.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
