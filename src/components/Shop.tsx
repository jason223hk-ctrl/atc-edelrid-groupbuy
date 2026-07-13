import { useState } from 'react'
import type { Cart } from '../lib/useCart'
import { HELMET, BUNDLES, ACCESSORIES } from '../data/products'
import type { SimpleProduct } from '../data/products'
import { formatMoney } from '../lib/order'
import { QtyStepper } from './QtyStepper'
import { DetailModal, type DetailData } from './DetailModal'
import type { CartLine } from '../lib/types'

interface Props {
  cart: Cart
  onBack: () => void
  onNext: () => void
}

function PriceTag({ price, confirmed }: { price: number; confirmed: boolean }) {
  return (
    <span>
      <span className="price">{formatMoney(price)}</span>
      {!confirmed && <span className="pricewarn mono">待核價</span>}
    </span>
  )
}

export function Shop({ cart, onBack, onNext }: Props) {
  const [detail, setDetail] = useState<DetailData | null>(null)

  // 頭盔：每個顏色一條 cart line
  const helmetLine = (colorId: string, colorName: string): Omit<CartLine, 'qty'> => ({
    key: `helmet:${colorId}`,
    kind: 'helmet',
    productId: HELMET.id,
    name: `${HELMET.name}（${colorName}）`,
    colorId,
    colorName,
    unitPrice: HELMET.price,
    priceConfirmed: HELMET.priceConfirmed,
  })

  const simpleLine = (p: SimpleProduct, kind: CartLine['kind']): Omit<CartLine, 'qty'> => ({
    key: p.id,
    kind,
    productId: p.id,
    name: p.name,
    unitPrice: p.price,
    priceConfirmed: p.priceConfirmed,
  })

  return (
    <main className="screen">
      {/* A. 頭盔 */}
      <section className="section">
        <div className="section-label">A · Tectum Air 頭盔</div>
        <div className="card">
          <div className="prow">
            <div
              className="helmet-ph"
              style={{ background: 'radial-gradient(circle at 40% 30%, #2a331f, #10150f)' }}
            />
            <div className="body">
              <h3>{HELMET.name}</h3>
              <p className="muted" style={{ fontSize: '0.85rem', margin: '2px 0 6px' }}>
                {HELMET.shortDesc}
              </p>
              <PriceTag price={HELMET.price} confirmed={HELMET.priceConfirmed} />
              <div style={{ marginTop: 6 }}>
                <button
                  className="linkbtn"
                  onClick={() =>
                    setDetail({
                      name: HELMET.name,
                      detail: HELMET.shortDesc,
                      specs: HELMET.specs,
                      notes: HELMET.notes,
                      sourceUrl: HELMET.sourceUrl,
                    })
                  }
                >
                  查看詳情 / 規格
                </button>
              </div>
            </div>
          </div>

          <div className="swatch-row">
            {HELMET.colors.map((c) => {
              const line = helmetLine(c.id, c.name)
              const qty = cart.qtyOf(line.key)
              return (
                <div className="swatch" key={c.id}>
                  <span className="dot" style={{ background: c.hex }} />
                  <span className="cname">
                    {c.name}
                    {c.hivis && <span className="hivis-tag" style={{ marginLeft: 8 }}>HIVIS</span>}
                  </span>
                  <QtyStepper value={qty} onChange={(d) => cart.changeQty(line, d)} />
                </div>
              )
            })}
          </div>
          <p className="muted" style={{ fontSize: '0.76rem', marginTop: 10 }}>
            {HELMET.notes[0]}
          </p>
        </div>
      </section>

      {/* B. 套裝 */}
      <section className="section">
        <div className="section-label">B · 團購套裝</div>
        {BUNDLES.map((b) => {
          const line = simpleLine(b, 'bundle')
          const qty = cart.qtyOf(line.key)
          const isPlaceholder = b.id === 'bundle-form-other'
          return (
            <div className={'card' + (qty > 0 ? ' selected' : '')} key={b.id}>
              <div className="prow">
                <div className="body">
                  <h3>{b.name}</h3>
                  <p className="muted" style={{ fontSize: '0.85rem', margin: '2px 0 6px' }}>
                    {b.shortDesc}
                  </p>
                  {!isPlaceholder && <PriceTag price={b.price} confirmed={b.priceConfirmed} />}
                  {!isPlaceholder && (
                    <div style={{ marginTop: 6 }}>
                      <button
                        className="linkbtn"
                        onClick={() =>
                          setDetail({
                            name: b.name,
                            detail: b.detail,
                            includes: b.includes,
                            compat: b.compat,
                            sourceUrl: b.sourceUrl,
                          })
                        }
                      >
                        查看內容
                      </button>
                    </div>
                  )}
                </div>
                {!isPlaceholder && (
                  <QtyStepper value={qty} onChange={(d) => cart.changeQty(line, d)} />
                )}
              </div>
              {isPlaceholder && (
                <p className="mono" style={{ fontSize: '0.72rem', color: 'var(--warn)', margin: '6px 0 0' }}>
                  NEEDS_CONFIRMATION — 待補真實套裝資料
                </p>
              )}
            </div>
          )
        })}
      </section>

      {/* C. 配件 */}
      <section className="section">
        <div className="section-label">C · 原廠配件</div>
        {ACCESSORIES.map((a) => {
          const line = simpleLine(a, 'accessory')
          const qty = cart.qtyOf(line.key)
          return (
            <div className={'card' + (qty > 0 ? ' selected' : '')} key={a.id}>
              <div className="prow">
                <div className="body">
                  <h3>{a.name}</h3>
                  <p className="muted" style={{ fontSize: '0.85rem', margin: '2px 0 6px' }}>
                    {a.shortDesc}
                  </p>
                  <PriceTag price={a.price} confirmed={a.priceConfirmed} />
                  {a.compat && (
                    <p className="cyan" style={{ fontSize: '0.74rem', margin: '4px 0 0' }}>
                      ⚙ {a.compat}
                    </p>
                  )}
                  <div style={{ marginTop: 6 }}>
                    <button
                      className="linkbtn"
                      onClick={() =>
                        setDetail({
                          name: a.name,
                          detail: a.detail,
                          compat: a.compat,
                          sourceUrl: a.sourceUrl,
                        })
                      }
                    >
                      查看詳情
                    </button>
                  </div>
                </div>
                <QtyStepper value={qty} onChange={(d) => cart.changeQty(line, d)} />
              </div>
            </div>
          )
        })}
      </section>

      <button className="btn ghost" onClick={onBack}>
        ← 返回首頁
      </button>

      {/* 固定底部：數量 + 總額 + 繼續 */}
      <div className="footer-bar">
        <div className="info">
          <div className="cnt">已選 {cart.count} 件</div>
          <div className="tot">{formatMoney(cart.total)}</div>
        </div>
        <button className="btn" disabled={cart.count === 0} onClick={onNext}>
          繼續填資料 →
        </button>
      </div>

      <DetailModal data={detail} onClose={() => setDetail(null)} />
    </main>
  )
}
