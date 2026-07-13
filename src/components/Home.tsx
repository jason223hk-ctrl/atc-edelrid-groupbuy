import { GROUPBUY, HELMET, OFFICIAL_SOURCES } from '../data/products'

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
        <div className="section-label">官方影片</div>
        <div className="card">
          {OFFICIAL_SOURCES.officialVideo ? (
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <iframe
                title="EDELRID Tectum Air"
                src={OFFICIAL_SOURCES.officialVideo}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                allowFullScreen
              />
            </div>
          ) : (
            <div className="img-ph">
              官方影片連結待確認
              <br />
              （可將 Drive 內 Edelrid helmet.m4v 上載後填入）
            </div>
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
