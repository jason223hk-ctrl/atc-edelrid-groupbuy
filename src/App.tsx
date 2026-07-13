import { useState, useCallback } from 'react'
import { useCart } from './lib/useCart'
import { PRICES_CONFIRMED } from './data/products'
import type { OrderPayload, OrderForm } from './lib/types'
import { Home } from './components/Home'
import { Shop } from './components/Shop'
import { Confirm } from './components/Confirm'
import { Success } from './components/Success'

export type Screen = 'home' | 'shop' | 'confirm' | 'success'

const STEP_INDEX: Record<Screen, number> = { home: 0, shop: 1, confirm: 2, success: 3 }

export default function App() {
  const cart = useCart()
  const [screen, setScreen] = useState<Screen>('home')
  const [order, setOrder] = useState<OrderPayload | null>(null)
  // 保留已填資料，返回修改時不會遺失
  const [form, setForm] = useState<OrderForm>({
    name: '',
    whatsapp: '',
    email: '',
    company: '',
    note: '',
    agreed: false,
  })

  const go = useCallback((s: Screen) => {
    setScreen(s)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const onSubmitted = useCallback(
    (payload: OrderPayload) => {
      setOrder(payload)
      cart.clear()
      go('success')
    },
    [cart, go],
  )

  const step = STEP_INDEX[screen]

  return (
    <>
      <header className="hud">
        <div className="brand">
          ATC × <b>EDELRID</b>
        </div>
        <div className="tag">Tectum Air · 第一團</div>
      </header>

      {screen !== 'success' && (
        <div className="steps" aria-hidden="true">
          {['home', 'shop', 'confirm', 'success'].map((s, i) => (
            <div
              key={s}
              className={'step' + (i < step ? ' done' : i === step ? ' active' : '')}
            />
          ))}
        </div>
      )}

      {!PRICES_CONFIRMED && (
        <div className="banner mono">
          ⚠ 測試模式：頁面顯示之價格為佔位數字，未經核對，正式開團前請於
          src/data/products.ts 更新真實團購價。
        </div>
      )}

      {screen === 'home' && <Home onShop={() => go('shop')} />}
      {screen === 'shop' && (
        <Shop cart={cart} onBack={() => go('home')} onNext={() => go('confirm')} />
      )}
      {screen === 'confirm' && (
        <Confirm
          cart={cart}
          form={form}
          setForm={setForm}
          onBack={() => go('shop')}
          onSubmitted={onSubmitted}
        />
      )}
      {screen === 'success' && order && (
        <Success order={order} onRestart={() => go('home')} />
      )}
    </>
  )
}
