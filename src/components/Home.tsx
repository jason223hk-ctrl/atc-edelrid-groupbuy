import { GROUPBUY, HELMET, VIDEOS } from '../data/products'

interface Props {
  onShop: () => void
}

export function Home({ onShop }: Props) {
  return (
    <main className="screen">
      <section className="hero">
        <span className="team">{GROUPBUY.team}</span>
        <h1>
          <span className="green">EDELRID</span> Tectum Air
          <br />
          頭盔團購
        </h1>
        <p className="lede">{GROUPBUY.subtitle}</p>

        {HELMET.images[0] && (
          <img
            src={HELMET.images[0]}
            alt="EDELRID Tectum Air 五色頭盔"
            className="hero-img"
            loading="eager"
          />
        )}

        <div className="facts">
          <div className="fact">
            <div className="k">截單日期</div>
            <div className="v hl">{GROUPBUY.deadline}</div>
          </div>
          <div className="fact">
            <div className="k">成團門檻</div>
            <div className="v">{GROUPBUY.minQtyToConfirm} 頂</div>
          </div>
          <div className="fact">
            <div className="k">預計貨期</div>
            <div className="v">{GROUPBUY.etaText}</div>
          </div>
          <div className="fact">
            <div className="k">主辦</div>
            <div className="v">{GROUPBUY.organiser}</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">團購簡介</div>
        <div className="card">
          <p style={{ margin: 0 }} className="muted">
            {GROUPBUY.intro}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-label">頭盔重點規格</div>
        <div className="card">
          <ul className="spec-list">
            {HELMET.specs.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="muted" style={{ fontSize: '0.78rem', margin: '8px 0 0' }}>
            規格引用自 EDELRID 官方資料。
            <a href={HELMET.sourceUrl} target="_blank" rel="noreferrer noopener">
              官方產品頁 ↗
            </a>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-label">影片介紹</div>

        {/* EDELRID 官方影片 */}
        <div className="card">
          <div className="vid-label">{VIDEOS.official.label}</div>
          <div className="vid-wrap">
            <iframe
              title={VIDEOS.official.title}
              src={`https://www.youtube-nocookie.com/embed/${VIDEOS.official.youtubeId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* 團長 ArborJason */}
        <div className="card">
          <div className="vid-label">{VIDEOS.arborJason.label}</div>
          {VIDEOS.arborJason.youtubeId ? (
            <div className="vid-wrap">
              <iframe
                title={VIDEOS.arborJason.label}
                src={`https://www.youtube-nocookie.com/embed/${VIDEOS.arborJason.youtubeId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <p className="muted" style={{ fontSize: '0.86rem', margin: 0 }}>
              團長 Jason Ma（森伝園藝／香港攀樹學院創辦人）過往有親身介紹此頭盔。
              <a
                href={VIDEOS.arborJason.channelUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                {' '}前往 ArborJason YouTube 頻道 ↗
              </a>
            </p>
          )}
        </div>
      </section>

      <div style={{ height: 8 }} />
      <button className="btn" onClick={onShop}>
        立即選購 →
      </button>
      <button
        className="btn ghost"
        style={{ marginTop: 10 }}
        onClick={() => window.open(HELMET.sourceUrl, '_blank', 'noopener')}
      >
        查看頭盔官方資料
      </button>

      <p className="foot-note">
        香港攀樹學院 ATC · 第一團 · EDELRID Tectum Air Group Buy
      </p>
    </main>
  )
}
