import type { CartLine, OrderPayload } from './types'

/** 產生訂單編號：ATC-202607-XXXX（XXXX 為短碼，Apps Script 端會再確認不重複） */
export function generateOrderNumber(): string {
  const y4 = '2026'
  const m2 = '07'
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // 去除易混淆字元 I,O,0,1
  let code = ''
  const buf = new Uint32Array(4)
  // 使用 crypto 取得較佳隨機性；退回 Math.random 以防萬一
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(buf)
    for (let i = 0; i < 4; i++) code += chars[buf[i] % chars.length]
  } else {
    for (let i = 0; i < 4; i++)
      code += chars[Math.floor(Math.random() * chars.length)]
  }
  return `ATC-${y4}${m2}-${code}`
}

export function lineSubtotal(line: CartLine): number {
  return line.unitPrice * line.qty
}

export function cartTotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + lineSubtotal(l), 0)
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.qty, 0)
}

function summariseKind(lines: CartLine[], kind: CartLine['kind']): string {
  return lines
    .filter((l) => l.kind === kind)
    .map((l) => `${l.name} x${l.qty}`)
    .join('; ')
}

export function buildOrderPayload(
  orderNumber: string,
  form: { name: string; whatsapp: string; email: string; company: string; note: string },
  lines: CartLine[],
): OrderPayload {
  return {
    orderNumber,
    name: form.name.trim(),
    whatsapp: form.whatsapp.trim(),
    email: form.email.trim(),
    company: form.company.trim(),
    note: form.note.trim(),
    helmetItems: summariseKind(lines, 'helmet'),
    bundleItems: summariseKind(lines, 'bundle'),
    accessoryItems: summariseKind(lines, 'accessory'),
    total: cartTotal(lines),
    lines,
  }
}

export function formatMoney(n: number): string {
  return 'HK$' + n.toLocaleString('en-US')
}
