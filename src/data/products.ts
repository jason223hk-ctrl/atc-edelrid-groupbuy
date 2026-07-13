/**
 * ============================================================================
 *  ATC 第一團 — EDELRID Tectum Air 團購產品資料
 * ============================================================================
 *
 *  所有產品名稱及價格已根據使用者提供的官方 Google Form 截圖（第 3–5 頁）
 *  逐項核對填入；FPS 付款資料見 payment.ts，亦已確認。無待確認項目。
 * ============================================================================
 */

export const CURRENCY = 'HK$'

// 以 Vite BASE_URL 為前綴，令圖片在根網域及子路徑（GitHub Pages）都正確載入
const asset = (p: string) => import.meta.env.BASE_URL + p

/** 團購基本資料 */
export const GROUPBUY = {
  team: 'ATC 第一團',
  organiser: '香港攀樹學院 ATC',
  organiserEn: 'Hong Kong Academy for Tree Climbing',
  title: 'EDELRID Tectum Air 頭盔團購',
  subtitle: '德國 EDELRID Tectum Air 專業高空工作及攀樹頭盔',
  deadline: '2026 年 7 月 31 日', // 截單日期
  minQtyToConfirm: 20, // 20 頂成團
  etaText: '成團後約 3 星期至 1 個月',
  intro:
    'ATC 首次官方團購。EDELRID Tectum Air 為德國專業樹藝／高空工作安全頭盔，符合 EN 12492、EN 397（關閉通風口時）及 ANSI/ISEA Z89.1 標準。今次連同原廠面罩、耳罩、護頸片等配件一併開團，以團購價回饋各位隊友。',
} as const

/** 官方產品內容及影片。來源 URL 保留方便日後核對。 */
export const OFFICIAL_SOURCES = {
  productPage: 'https://edelrid.com/us-en/professional/helmet/tectum-air',
  manual: 'https://device.report/manual/16169143',
} as const

/** 影片：官方 + 團長 ArborJason 頻道 */
export const VIDEOS = {
  // EDELRID 官方 Tectum / Tectum Air 介紹片
  official: {
    youtubeId: 'CcN76CpvLgY',
    label: 'EDELRID 官方介紹',
    title: 'TECTUM & TECTUM AIR: The Perfect Helmets for Every Job',
  },
  // 團長 Jason Ma（ArborJason）— 森伝園藝 / 香港攀樹學院創辦人
  arborJason: {
    channelUrl: 'https://www.youtube.com/c/ArborJason',
    youtubeId: 'DWn7IJlt4yA', // 團長親身介紹 Tectum Air
    label: '團長 ArborJason 親身介紹',
  },
} as const

export type PriceStatus = boolean

export interface HelmetColor {
  id: string
  name: string
  nameEn: string
  hex: string // 顏色圓點示意
  price?: number // 若與基本價不同（例：HiVis）
  hivis?: boolean
}

/** A. Tectum Air 頭盔（同型號；HiVis 較貴 HK$10） */
export const HELMET = {
  id: 'tectum-air',
  name: '德國 EDELRID Tectum Air 專業頭盔',
  price: 640, // 基本團購價（黑/白/黃/紅）
  priceConfirmed: true as PriceStatus,
  shortDesc: '專業高空工作及攀樹安全頭盔 · 可關閉式通風口 · Wing Fit 旋鈕調節',
  specs: [
    '重量：約 455g',
    '外殼：ABS 抗撞擊物料；內襯：EPS 吸震物料',
    '認證：EN 12492 / EN 397（關閉通風口）/ ANSI/ISEA Z89.1-2014 Type I Class C',
    '可關閉式大型通風口，按天氣及工作需要調節通風',
    'Wing Fit 後枕旋鈕系統 + 可調下巴帶',
    '整合 Euroslot（30mm）、頭燈夾及多個配件掛點',
  ],
  notes: [
    '尺碼：均碼可調（如有特別需要請於備註註明）。',
    '圖片及產品規格僅供參考，所有裝備以工廠最終出貨實物為準。',
  ],
  images: [asset('images/helmets-lineup.jpg')] as string[],
  sourceUrl: OFFICIAL_SOURCES.productPage,
  colors: [
    { id: 'black', name: '專業黑', nameEn: 'Black', hex: '#1a1a1a', price: 640 },
    { id: 'white', name: '純潔白', nameEn: 'White', hex: '#e8e8e8', price: 640 },
    { id: 'yellow', name: '活力黃', nameEn: 'Yellow', hex: '#f2c200', price: 640 },
    { id: 'red', name: '警示紅', nameEn: 'Red', hex: '#b8433a', price: 640 },
    {
      id: 'hivis',
      name: '高能見度黃',
      nameEn: 'HiVis Yellow',
      hex: '#c8ff00',
      price: 650,
      hivis: true,
    },
  ] as HelmetColor[],
} as const

/** 套裝／產品圖示組件（頭盔 + 各配件），用於「一睇就明」的圖片分解。 */
export interface Component {
  img: string
  label: string
  /** true = 只作示意（例如頭盔另購），不計入套裝內容 */
  reference?: boolean
}

export interface SimpleProduct {
  id: string
  name: string
  price: number
  priceConfirmed: PriceStatus
  shortDesc: string
  detail?: string
  compat?: string
  notes?: string[]
  images?: string[]
  sourceUrl?: string
  includes?: string[]
  /** 套裝內容的圖片分解（頭盔另購 + 各配件） */
  components?: Component[]
}

const IMG = {
  helmet: asset('images/helmet-thumb.jpg'),
  clear: asset('images/acc-visor-clear.jpg'),
  sun: asset('images/acc-visor-sun.jpg'),
  fullface: asset('images/acc-visor-fullface.jpg'),
  mesh: asset('images/acc-visor-mesh.jpg'),
  protector: asset('images/acc-visor-protector.jpg'),
  earmuff: asset('images/acc-earmuff.jpg'),
  brim: asset('images/acc-front-brim.jpg'),
  fullBrim: asset('images/acc-full-brim.jpg'),
  neck: asset('images/acc-neck.jpg'),
}
const HELMET_REF: Component = { img: IMG.helmet, label: '頭盔（另購）', reference: true }

/** B. 精選核心防護組合（可揀多款、可揀多件） */
export const BUNDLES: SimpleProduct[] = [
  {
    id: 'bundle-visor-clear',
    name: '高清面罩防護組合 A款',
    price: 390,
    priceConfirmed: true,
    shortDesc: '透明面罩 (Clear) + 專用保護片',
    detail:
      '透明高清面罩連專用面罩保護片，透過 Euroslot 快速裝拆，提供全面部防護。',
    includes: ['EDELRID 透明面罩 Visor Clear ×1', 'EDELRID 面罩保護片 Visor Protector ×1'],
    compat: '相容 Tectum / Tectum Air（30mm Euroslot）。',
    components: [
      HELMET_REF,
      { img: IMG.clear, label: '透明面罩' },
      { img: IMG.protector, label: '保護片' },
    ],
  },
  {
    id: 'bundle-visor-sun',
    name: '高清面罩防護組合 B款',
    price: 390,
    priceConfirmed: true,
    shortDesc: '遮陽面罩 (Sun) + 專用保護片',
    detail:
      '遮陽（茶色）高清面罩連專用面罩保護片，減少強光及眩光，適合日曬環境作業。',
    includes: ['EDELRID 遮陽面罩 Visor Sun ×1', 'EDELRID 面罩保護片 Visor Protector ×1'],
    compat: '相容 Tectum / Tectum Air（30mm Euroslot）。',
    components: [
      HELMET_REF,
      { img: IMG.sun, label: '遮陽面罩' },
      { img: IMG.protector, label: '保護片' },
    ],
  },
  {
    id: 'bundle-core3',
    name: '樹藝師核心防護三件套裝',
    price: 699,
    priceConfirmed: true,
    shortDesc: '網狀面罩 + 防噪耳罩 + 護頸片',
    detail:
      '樹藝師必備核心防護：透氣網狀面罩、防噪耳罩及護頸片一次過齊備，對應頭、面、聽力及頸部防護。',
    includes: [
      'EDELRID 網狀面罩 Visor Mesh ×1',
      'EDELRID 防噪耳罩 Ear Muffs ×1',
      'EDELRID 護頸片 Neck Protector ×1',
    ],
    compat: '全部以 Euroslot 安裝於 Tectum / Tectum Air。',
    components: [
      HELMET_REF,
      { img: IMG.mesh, label: '網狀面罩' },
      { img: IMG.earmuff, label: '防噪耳罩' },
      { img: IMG.neck, label: '護頸片' },
    ],
  },
]

/** C. 原廠配件（單件加購，可揀多件） */
export const ACCESSORIES: SimpleProduct[] = [
  {
    id: 'acc-visor-mesh',
    name: 'EDELRID 網狀面罩 Visor Mesh',
    price: 346,
    priceConfirmed: true,
    shortDesc: '網狀面罩 · 透氣不阻視線 · 減少反光',
    compat: '相容 Tectum / Tectum Air（30mm Euroslot）。',
    images: [IMG.mesh],
  },
  {
    id: 'acc-visor-clear',
    name: 'EDELRID 透明面罩 Visor Clear',
    price: 247,
    priceConfirmed: true,
    shortDesc: '透明高清面罩 · 全面部防護',
    compat: '相容 Tectum / Tectum Air（30mm Euroslot）。建議配面罩保護片使用。',
    images: [IMG.clear],
  },
  {
    id: 'acc-visor-sun',
    name: 'EDELRID 遮陽面罩 Visor Sun',
    price: 247,
    priceConfirmed: true,
    shortDesc: '茶色遮陽面罩 · 減少眩光',
    compat: '相容 Tectum / Tectum Air（30mm Euroslot）。建議配面罩保護片使用。',
    images: [IMG.sun],
  },
  {
    id: 'acc-visor-fullface',
    name: 'EDELRID 全面罩 Visor Full Face',
    price: 380,
    priceConfirmed: true,
    shortDesc: '全面部防護面罩',
    compat: '相容 Tectum / Tectum Air（30mm Euroslot）。',
    images: [IMG.fullface],
  },
  {
    id: 'acc-visor-protector',
    name: 'EDELRID 面罩保護片 Visor Protector',
    price: 163,
    priceConfirmed: true,
    shortDesc: '面罩保護片 · 延長面罩壽命',
    compat: '配合 EDELRID 面罩使用。',
    images: [IMG.protector],
  },
  {
    id: 'acc-earmuff',
    name: 'EDELRID 防噪耳罩 Ear Muffs',
    price: 247,
    priceConfirmed: true,
    shortDesc: '聽力保護耳罩 · 寬軟墊舒適',
    compat: '相容 Tectum / Tectum Air（側面 30mm Euroslot）。',
    images: [IMG.earmuff],
  },
  {
    id: 'acc-front-brim',
    name: 'EDELRID 前帽簷 Front Brim',
    price: 123,
    priceConfirmed: true,
    shortDesc: '前帽簷 · 遮擋前方陽光及碎屑',
    compat: '相容 Tectum / Tectum Air。',
    images: [IMG.brim],
  },
  {
    id: 'acc-full-brim',
    name: 'EDELRID 全帽簷 Full Brim',
    price: 280,
    priceConfirmed: true,
    shortDesc: '全帽簷 · 全周遮陽 · 保護頸背',
    compat: '相容 Tectum / Tectum Air。',
    images: [IMG.fullBrim],
  },
  {
    id: 'acc-neck',
    name: 'EDELRID 護頸片 Neck Protector',
    price: 123,
    priceConfirmed: true,
    shortDesc: '護頸片 · 保護頸背免受碎屑及陽光',
    compat: '相容 Tectum / Tectum Air。',
    images: [IMG.neck],
  },
]

/** 重要條款（沿用 Google Form「重要法律及營運聲明」） */
export const TERMS: string[] = [
  '請於提交訂單後 24 小時內，將總金額轉帳至香港攀樹學院轉數快 (FPS) 帳戶。',
  '轉帳時請在銀行 App 備註／附言欄輸入你的「姓名」及「聯絡電話」。',
  '付款後請將入數紙或交易截圖 WhatsApp 至團長，行政同事確認收款後方視為成功落單。',
  '圖片及產品規格僅供參考，所有裝備以工廠最終出貨實物為準。',
  '團購涉及跨國物流及特殊供應鏈，如遇不可抗力延誤、工廠缺貨或規格調整，學院將第一時間通知並協助安排退款。',
  '香港攀樹學院保留隨時修改、變更、暫停或終止本團購活動之權利，並對本活動所有條款、定價、成團資格及最終結果擁有最終解釋及決定權。',
]

/** 回傳所有未確認價格的產品名稱（供頂部橫額顯示）。 */
export function unconfirmedPriceItems(): string[] {
  const names: string[] = []
  if (!HELMET.priceConfirmed) names.push(HELMET.name)
  for (const b of BUNDLES) if (!b.priceConfirmed) names.push(b.name)
  for (const a of ACCESSORIES) if (!a.priceConfirmed) names.push(a.name)
  return names
}

/** 全部價格及 FPS 已核對。 */
export const PRICES_CONFIRMED = true
