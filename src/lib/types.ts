export type CartLineKind = 'helmet' | 'bundle' | 'accessory'

export interface CartLine {
  key: string // 唯一鍵：helmet 用 `helmet:<colorId>`，其他用 product id
  kind: CartLineKind
  productId: string
  name: string // 顯示名（頭盔含顏色）
  colorId?: string
  colorName?: string
  unitPrice: number
  priceConfirmed: boolean
  qty: number
}

export interface OrderForm {
  name: string
  whatsapp: string
  email: string
  company: string
  note: string
  agreed: boolean
}

export interface OrderPayload {
  orderNumber: string
  name: string
  whatsapp: string
  email: string
  company: string
  note: string
  helmetItems: string
  bundleItems: string
  accessoryItems: string
  total: number
  lines: CartLine[]
}
