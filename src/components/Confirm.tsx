import { useState } from 'react'
import type { Cart } from '../lib/useCart'
import type { OrderForm, OrderPayload, CartLine } from '../lib/types'
import { formatMoney, lineSubtotal, generateOrderNumber, buildOrderPayload } from '../lib/order'
import { submitOrder } from '../lib/api'
import { QtyStepper } from './QtyStepper'
import { GROUPBUY, TERMS } from '../data/products'

interface Props {
  cart: Cart
  form: OrderForm
  setForm: (f: OrderForm) => void
  onBack: () => void
  onSubmitted: (payload: OrderPayload) => void
}

const HK_PHONE = /^\+?\d[\d\s-]{6,}$/

export function Confirm({ cart, form, setForm, onBack, onSubmitted }: Props) {
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ name?: string; whatsapp?: string; agreed?: string }>({})

  const lineTemplate = (l: CartLine): Omit<CartLine, 'qty'> => {
    const { qty: _qty, ...rest } = l
    return rest
  }

  function validate(): boolean {
    const e: typeof errors = {}
    if (!form.name.trim()) e.name = '請填寫姓名'
    if (!form.whatsapp.trim()) e.whatsapp = '請填寫 WhatsApp 電話'
    else if (!HK_PHONE.test(form.whatsapp.trim())) e.whatsapp = '電話格式不正確'
    if (!form.agreed) e.agreed = '請確認已核對訂單及團購條款'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit() {
    if (submitting) return // 防止重複提交
    setApiError(null)
    if (cart.count === 0) {
      setApiError('購物車是空的，請先選購產品。')
      return
    }
    if (!validate()) return

    setSubmitting(true)
    const orderNumber = generateOrderNumber()
    const payload = buildOrderPayload(orderNumber, form, cart.lines)
    const result = await submitOrder(payload)
    setSubmitting(false)

    if (result.ok) {
      onSubmitted({ ...payload, orderNumber: result.orderNumber ?? orderNumber })
    } else {
      setApiError(result.error ?? '提交失敗，請稍後再試。')
    }
  }

  const hasUnconfirmed = cart.lines.some((l) => !l.priceConfirmed)

  return (
    <main className="screen">
      <h2>核對訂單</h2>

      {cart.count === 0 ? (
        <div className="card center">
          <p className="muted">購物車是空的。</p>
          <button className="btn ghost" onClick={onBack}>
            ← 返回選購
          </button>
        </div>
      ) : (
        <>
          <section className="section">
            <div className="section-label">你的訂單</div>
            <div className="card">
              {cart.lines.map((l) => (
                <div className="oline" key={l.key}>
                  <div className="oname">
                    <div>{l.name}</div>
                    <div className="sub">
                      {formatMoney(l.unitPrice)} × {l.qty}
                      {!l.priceConfirmed && <span className="pricewarn mono">待核價</span>}
                    </div>
                  </div>
                  <QtyStepper
                    value={l.qty}
                    min={1}
                    onChange={(d) => cart.changeQty(lineTemplate(l), d)}
                  />
                  <div className="osub">{formatMoney(lineSubtotal(l))}</div>
                  <button
                    className="del"
                    aria-label={`刪除 ${l.name}`}
                    onClick={() => cart.remove(l.key)}
                  >
                    🗑
                  </button>
                </div>
              ))}

              <div className="total-row">
                <span className="lbl">總額</span>
                <span className="price lg">{formatMoney(cart.total)}</span>
              </div>
            </div>
            {hasUnconfirmed && (
              <p className="mono" style={{ fontSize: '0.74rem', color: 'var(--warn)' }}>
                ⚠ 部分價格待官方核對，最終金額以團長確認為準。
              </p>
            )}
            <button className="btn ghost small" onClick={onBack}>
              ← 返回修改
            </button>
          </section>

          <section className="section">
            <div className="section-label">聯絡資料</div>

            <div className="field">
              <label>
                姓名<span className="req">*</span>
              </label>
              <input
                className={errors.name ? 'err' : ''}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="你的姓名"
                autoComplete="name"
              />
              {errors.name && <div className="msg">{errors.name}</div>}
            </div>

            <div className="field">
              <label>
                WhatsApp 電話<span className="req">*</span>
              </label>
              <input
                className={errors.whatsapp ? 'err' : ''}
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                placeholder="例：9123 4567"
                inputMode="tel"
                autoComplete="tel"
              />
              {errors.whatsapp && <div className="msg">{errors.whatsapp}</div>}
            </div>

            <div className="field">
              <label>Email（選填）</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="name@example.com"
                inputMode="email"
                autoComplete="email"
              />
            </div>

            <div className="field">
              <label>公司／隊伍（選填）</label>
              <input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="公司或隊伍名稱"
              />
            </div>

            <div className="field">
              <label>備註（選填）</label>
              <textarea
                rows={3}
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                placeholder="尺碼要求、特別安排等"
              />
            </div>

            <div className="section-label" style={{ marginTop: 4 }}>
              團購條款
            </div>
            <div className="card" style={{ marginBottom: 12 }}>
              <ul className="spec-list" style={{ margin: 0 }}>
                {TERMS.map((t) => (
                  <li key={t} style={{ fontSize: '0.82rem' }}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <label className={'check' + (errors.agreed ? ' err' : '')}>
              <input
                type="checkbox"
                checked={form.agreed}
                onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
              />
              <span>
                我已核對訂單內容，並同意 {GROUPBUY.team} 團購條款（成團門檻{' '}
                {GROUPBUY.minQtyToConfirm} 頂、截單日期 {GROUPBUY.deadline}、預計貨期{' '}
                {GROUPBUY.etaText}）。
              </span>
            </label>
            {errors.agreed && <div className="msg">{errors.agreed}</div>}
          </section>

          {apiError && (
            <div className="banner" style={{ margin: '0 0 12px', borderColor: 'var(--danger)', color: 'var(--danger)' }}>
              {apiError}
            </div>
          )}

          <button className="btn" onClick={handleSubmit} disabled={submitting}>
            {submitting ? '提交中… 請稍候' : '提交團購訂單'}
          </button>
          <p className="muted center" style={{ fontSize: '0.74rem', marginTop: 10 }}>
            提交後將顯示 FPS 付款資料。請勿重複提交。
          </p>
        </>
      )}
    </main>
  )
}
