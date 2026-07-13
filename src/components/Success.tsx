import { useState } from 'react'
import type { OrderPayload } from '../lib/types'
import { formatMoney, lineSubtotal } from '../lib/order'
import { PAYMENT } from '../data/payment'

interface Props {
  order: OrderPayload
  onRestart: () => void
}

export function Success({ order, onRestart }: Props) {
  const [toast, setToast] = useState<string | null>(null)

  function copy(text: string, label: string) {
    const done = () => {
      setToast(`已複製${label}`)
      window.setTimeout(() => setToast(null), 1600)
    }
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done, () => fallback(text, done))
    } else {
      fallback(text, done)
    }
  }

  function fallback(text: string, done: () => void) {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    try {
      document.execCommand('copy')
      done()
    } catch {
      /* ignore */
    }
    document.body.removeChild(ta)
  }

  const fpsText = [
    PAYMENT.payeeName && `收款人：${PAYMENT.payeeName}`,
    PAYMENT.fpsId && `FPS ID：${PAYMENT.fpsId}`,
    PAYMENT.fpsPhone && `FPS 電話：${PAYMENT.fpsPhone}`,
    `金額：${formatMoney(order.total)}`,
    `訂單編號：${order.orderNumber}`,
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <main className="screen">
      <div className="success-badge">✓</div>
      <h2 className="center">訂單提交成功</h2>
      <p className="center muted" style={{ marginTop: -4 }}>
        多謝支持 ATC 第一團！請依以下指示完成 FPS 付款。
      </p>

      {/* 訂單編號 */}
      <div className="copybox">
        <div>
          <div className="k">訂單編號</div>
          <div className="v mono green">{order.orderNumber}</div>
        </div>
        <button className="btn cyan small" onClick={() => copy(order.orderNumber, '訂單編號')}>
          複製
        </button>
      </div>

      <div className="copybox">
        <div>
          <div className="k">姓名</div>
          <div className="v">{order.name}</div>
        </div>
      </div>

      {/* 訂單內容 */}
      <section className="section">
        <div className="section-label">訂單內容</div>
        <div className="card">
          {order.lines.map((l) => (
            <div className="oline" key={l.key}>
              <div className="oname">
                <div>{l.name}</div>
                <div className="sub">
                  {formatMoney(l.unitPrice)} × {l.qty}
                </div>
              </div>
              <div className="osub">{formatMoney(lineSubtotal(l))}</div>
            </div>
          ))}
          <div className="total-row">
            <span className="lbl">總額</span>
            <span className="price lg">{formatMoney(order.total)}</span>
          </div>
        </div>
      </section>

      {/* FPS 付款 */}
      <section className="section">
        <div className="section-label">FPS 轉數快付款</div>
        <div className="pay-card">
          <div className="row">
            <span className="k">收款人</span>
            <span className="v">{PAYMENT.payeeName}</span>
          </div>
          <div className="row">
            <span className="k">FPS ID</span>
            <span className="v mono">{PAYMENT.fpsId}</span>
          </div>
          <div className="row">
            <span className="k">FPS 電話</span>
            <span className="v mono">{PAYMENT.fpsPhone}</span>
          </div>
          <div className="row">
            <span className="k">應付金額</span>
            <span className="v green">{formatMoney(order.total)}</span>
          </div>
          <div className="row">
            <span className="k">付款期限</span>
            <span className="v">{PAYMENT.deadlineText}</span>
          </div>
        </div>
        <button
          className="btn cyan"
          style={{ marginTop: 10 }}
          onClick={() => copy(fpsText, 'FPS 資料')}
        >
          複製 FPS 付款資料
        </button>
      </section>

      {/* 指示 */}
      <section className="section">
        <div className="section-label">付款步驟</div>
        <div className="card">
          <ol className="ol">
            {PAYMENT.instructions.map((s) => (
              <li key={s}>{s.replace(/^\d+\.\s*/, '')}</li>
            ))}
          </ol>
          <div className="notice">{PAYMENT.reminder}</div>
        </div>
      </section>

      {/* WhatsApp 聯絡 */}
      <section className="section">
        <div className="section-label">WhatsApp 聯絡團長</div>
        <div className="card">
          <p style={{ margin: 0 }}>
            核對付款：<b>{PAYMENT.whatsapp}</b>
          </p>
          {PAYMENT.whatsappLink && (
            <button
              className="btn"
              style={{ marginTop: 10 }}
              onClick={() => window.open(PAYMENT.whatsappLink, '_blank', 'noopener')}
            >
              開啟 WhatsApp
            </button>
          )}
          <p className="muted" style={{ fontSize: '0.78rem', marginTop: 10, marginBottom: 0 }}>
            💡 提示：請截圖保留本頁訂單編號及付款證明，方便團長核對。
          </p>
        </div>
      </section>

      <button className="btn ghost" onClick={onRestart}>
        返回首頁
      </button>

      <p className="foot-note">香港攀樹學院 ATC · 第一團</p>

      {toast && <div className="toast">{toast}</div>}
    </main>
  )
}
