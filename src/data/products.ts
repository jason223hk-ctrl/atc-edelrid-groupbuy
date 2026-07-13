/**
 * ============================================================================
 *  ATC 第一團 — EDELRID Tectum Air 團購產品資料
 * ============================================================================
 *
 *  ⚠️  重要：所有價格目前為「佔位數字」，並非真實團購價。
 *
 *  原始 Google Form 截圖／報價未能於本次工作環境取得，因此本檔案內
 *  所有標記 `priceConfirmed: false` 的價格 **必須** 在正式開團收單前，
 *  由人手根據現有 Google Form 逐項核對及更新。
 *
 *  更新方法：改動下方 `price` 數值，並把該項 `priceConfirmed` 設為 true。
 *  當全部項目確認後，把檔案底部的 `PRICES_CONFIRMED` 設為 true，
 *  網站頂部的「價格待核對」警告橫額便會消失。
 *
 *  需人手確認的完整清單見根目錄 README.md → 「開團前價格核對清單」。
 * ============================================================================
 */

export const CURRENCY = 'HK$'

/** 團購基本資料 */
export const GROUPBUY = {
  team: 'ATC 第一團',
  organiser: '香港攀樹學院 ATC',
  title: 'EDELRID Tectum Air 頭盔團購',
  subtitle: 'EDELRID Tectum Air 頭盔及原廠配件',
  deadline: '2026 年 7 月 31 日', // 截單日期
  minQtyToConfirm: 20, // 20 頂成團
  etaText: '成團後約 3 星期至 1 個月',
  intro:
    'ATC 首次官方團購。EDELRID Tectum Air 為專業樹藝／高空工作安全頭盔，符合 EN 12492、EN 397（關閉通風口時）及 ANSI/ISEA Z89.1 標準。今次連同原廠面罩、耳罩等配件一併開團，以團購價回饋各位隊友。',
} as const

/** 官方產品內容（可合法引用之官方規格）。來源 URL 保留方便日後核對。 */
export const OFFICIAL_SOURCES = {
  productPage: 'https://edelrid.com/us-en/professional/helmet/tectum-air',
  manual: 'https://device.report/manual/16169143',
  news2025:
    'https://edelrid.com/us-en/vertical-freedom/edelrid-news/blog/press-new-produkts-work-safety-2025',
  // NEEDS_CONFIRMATION: 官方 YouTube 影片連結未百分百確認，暫時留空。
  // 使用者 Google Drive 內有 "Edelrid helmet.m4v" 可自行上載後填入 embed 連結。
  officialVideo: '',
} as const

export type PriceStatus = boolean

export interface HelmetColor {
  id: string
  name: string
  hex: string // 用於顏色圓點示意（非官方精確色）
  hivis?: boolean
}

/** A. Tectum Air 頭盔顏色（同一型號、同一團購價，只是顏色不同） */
export const HELMET = {
  id: 'tectum-air',
  name: 'EDELRID Tectum Air 頭盔',
  price: 1180, // ⚠️ NEEDS_CONFIRMATION 佔位價
  priceConfirmed: false as PriceStatus,
  shortDesc: '專業樹藝安全頭盔 · 可關閉式通風口 · Wing Fit 旋鈕調節',
  // 官方規格（可引用）
  specs: [
    '重量：約 455g',
    '外殼：ABS 抗撞擊物料；內襯：EPS 吸震物料',
    '認證：EN 12492 / EN 397（關閉通風口）/ ANSI/ISEA Z89.1-2014 Type I Class C',
    '可關閉式大型通風口，按天氣及工作需要調節通風',
    'Wing Fit 後枕旋鈕系統 + 可調下巴帶',
    '整合 Euroslot（30mm）、頭燈夾及多個配件掛點',
  ],
  notes: [
    '尺碼：均碼可調（如需分尺碼請於備註註明，暫按官方單一可調尺寸落單）', // NEEDS_CONFIRMATION：是否分尺碼
    '顏色示意色點僅供辨識，實物以官方顏色為準。',
  ],
  images: [
    // NEEDS_CONFIRMATION：官方圖片版權，建議自行上載官方或自攝圖片到 /public/images
    // 暫以佔位色塊顯示，不引用來源不明圖片。
  ] as string[],
  sourceUrl: OFFICIAL_SOURCES.productPage,
  colors: [
    { id: 'black', name: '黑', hex: '#1a1a1a' },
    { id: 'white', name: '白', hex: '#e8e8e8' },
    { id: 'yellow', name: '黃', hex: '#f2c200' },
    { id: 'red', name: '紅', hex: '#c8322b' },
    { id: 'hivis', name: 'HiVis 螢光黃', hex: '#c8ff00', hivis: true },
  ] as HelmetColor[],
} as const

export interface SimpleProduct {
  id: string
  name: string
  price: number
  priceConfirmed: PriceStatus
  shortDesc: string
  detail?: string
  compat?: string // 相容提示
  notes?: string[]
  images?: string[]
  sourceUrl?: string
  /** 套裝內含項目（僅套裝使用） */
  includes?: string[]
}

/** B. 團購套裝 */
export const BUNDLES: SimpleProduct[] = [
  {
    id: 'bundle-visor',
    name: '高清面罩防護組合',
    price: 1680, // ⚠️ NEEDS_CONFIRMATION 佔位價
    priceConfirmed: false,
    shortDesc: 'Tectum Air 頭盔 + 原廠高清全面罩（Full Face Visor）',
    detail:
      '頭盔連原廠全面罩，透過 30mm Euroslot 快速裝拆，提供全面部防護，適合修剪及碎木作業。',
    includes: ['Tectum Air 頭盔 ×1', '原廠 Full Face 高清面罩 ×1'],
    compat: '面罩專為 Tectum / Tectum Air 設計，使用 Euroslot 安裝。',
    sourceUrl: 'https://edelrid.com/us-en/professional/helmet/helmet-visor-full-face',
  },
  {
    id: 'bundle-core3',
    name: '樹藝師核心防護三件套',
    price: 2280, // ⚠️ NEEDS_CONFIRMATION 佔位價
    priceConfirmed: false,
    shortDesc: 'Tectum Air 頭盔 + 原廠全面罩 + 原廠耳罩',
    detail:
      '一次過齊備頭部、面部及聽力防護。對應官方 Forestry Helmet Set 概念（頭盔 + 聽力保護 + 全面罩）。',
    includes: ['Tectum Air 頭盔 ×1', '原廠 Full Face 高清面罩 ×1', '原廠耳罩 ×1'],
    compat: '全部配件以 Euroslot 安裝於 Tectum Air。',
    sourceUrl:
      'https://www.rescue-tec.de/en/techn.-equipment/rescue-from-heights/helmets-belts/edelrid-forestry-helmet-set-tectum-air-incl.-hearing-protection-and-full-visor',
  },
  {
    id: 'bundle-form-other',
    name: '其他現有 Google Form 套裝',
    price: 0, // ⚠️ NEEDS_CONFIRMATION：內容及價格未知
    priceConfirmed: false,
    shortDesc: '（待補：現有 Google Form 若有其他套裝，請於此補上名稱、內容及價格）',
    detail:
      'NEEDS_CONFIRMATION：本次未能取得原始 Google Form，若表格內另有套裝組合，請於 src/data/products.ts 補上或刪除本項。',
    includes: [],
  },
]

/** C. 原廠配件 */
export const ACCESSORIES: SimpleProduct[] = [
  {
    id: 'acc-visor-full',
    name: '原廠全面罩 Full Face Visor',
    price: 620, // ⚠️ NEEDS_CONFIRMATION 佔位價
    priceConfirmed: false,
    shortDesc: '全面部防護面罩 · Euroslot 快拆',
    detail:
      '高清全面部防護面罩，透過 Euroslot 系統快速安裝於 Tectum / Tectum Air，提供飛屑及碎木防護。',
    compat: '相容 Tectum / Tectum Air（30mm Euroslot）。',
    sourceUrl: 'https://edelrid.com/us-en/professional/helmet/helmet-visor-full-face',
  },
  {
    id: 'acc-visor-mesh',
    name: '原廠網狀面罩 Mesh Visor',
    price: 520, // ⚠️ NEEDS_CONFIRMATION 佔位價
    priceConfirmed: false,
    shortDesc: '網狀面罩 · 透氣不阻視線 · 減少反光',
    detail:
      '網狀設計，透氣度高、不阻擋視線並減少反光，適合長時間戶外作業。Euroslot 快速安裝。',
    compat: '相容 Tectum / Tectum Air（30mm Euroslot）。',
    sourceUrl: 'https://www.vdsteenxxl.com/en/edelrid-visor-mesh-tectum-air/',
  },
  {
    id: 'acc-earmuff',
    name: '原廠耳罩 Helmet Ear Muffs',
    price: 480, // ⚠️ NEEDS_CONFIRMATION 佔位價
    priceConfirmed: false,
    shortDesc: '聽力保護耳罩 · 寬軟墊舒適',
    detail:
      '寬身、內填發泡膠密封軟墊，長時間佩戴亦舒適，可靠保護聽力。側面 Euroslot 安裝。',
    compat: '相容 Tectum / Tectum Air（側面 30mm Euroslot）。',
    sourceUrl: 'https://edelrid.com/us-en/professional/helmet/tectum-air',
  },
]

/**
 * 全部價格是否已由人手核對？
 * 全部確認並更新後，將此值改為 true，網站頂部警告橫額便會消失。
 */
export const PRICES_CONFIRMED = false
