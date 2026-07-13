import { useCallback, useMemo, useState } from 'react'
import type { CartLine } from './types'
import { cartCount, cartTotal } from './order'

const MAX_QTY = 99

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>([])

  const setQty = useCallback((template: Omit<CartLine, 'qty'>, qty: number) => {
    const clamped = Math.max(0, Math.min(MAX_QTY, Math.floor(qty)))
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.key === template.key)
      if (clamped === 0) {
        return prev.filter((l) => l.key !== template.key)
      }
      if (idx === -1) {
        return [...prev, { ...template, qty: clamped }]
      }
      const next = [...prev]
      next[idx] = { ...next[idx], ...template, qty: clamped }
      return next
    })
  }, [])

  const changeQty = useCallback(
    (template: Omit<CartLine, 'qty'>, delta: number) => {
      setLines((prev) => {
        const existing = prev.find((l) => l.key === template.key)
        const current = existing?.qty ?? 0
        const clamped = Math.max(0, Math.min(MAX_QTY, current + delta))
        if (clamped === 0) return prev.filter((l) => l.key !== template.key)
        if (!existing) return [...prev, { ...template, qty: clamped }]
        return prev.map((l) => (l.key === template.key ? { ...l, qty: clamped } : l))
      })
    },
    [],
  )

  const remove = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const qtyOf = useCallback(
    (key: string) => lines.find((l) => l.key === key)?.qty ?? 0,
    [lines],
  )

  const count = useMemo(() => cartCount(lines), [lines])
  const total = useMemo(() => cartTotal(lines), [lines])

  return { lines, setQty, changeQty, remove, clear, qtyOf, count, total }
}

export type Cart = ReturnType<typeof useCart>
