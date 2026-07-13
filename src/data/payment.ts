/**
 * FPS 付款資料 —— 根據 Google Form 第 6 頁付款指示填入。
 *
 * ⚠️ 唯一仍待確認：`fpsId`（學院轉數快識別碼）。
 *    Google Form 本身亦留空（「請行政填寫學院號碼」），故此處為佔位，
 *    請由行政填入香港攀樹學院的真實 FPS ID／電話後，把 `fpsConfirmed` 設為 true。
 */
export const PAYMENT = {
  // 收款人（已確認）
  payeeName: 'Hong Kong Academy for Tree Climbing（香港攀樹學院）',

  // ⚠️ NEEDS_CONFIRMATION：學院 FPS 識別碼 / 電話
  fpsId: '（待行政填寫學院 FPS 號碼）',
  fpsPhone: '',
  fpsConfirmed: false,

  // 付款期限（已確認）
  deadlineText: '請於提交訂單後 24 小時內完成轉帳',

  // 對數 WhatsApp（已確認）
  whatsapp: '7075 9488',
  whatsappLink: 'https://wa.me/85270759488',

  // 付款指示文字（沿用 Google Form 內容）
  instructions: [
    '請自行核對訂單總金額。',
    '於提交訂單後 24 小時內，以轉數快 (FPS) 將總金額轉帳至香港攀樹學院帳戶。',
    '轉帳時，請必須在銀行 App 備註／附言欄輸入你的「姓名」及「聯絡電話」。',
    '付款後，請將入數紙或交易截圖（Cap 圖）WhatsApp 至 7075 9488。',
    '行政同事確認收款後，方視為成功落單。',
  ],
  reminder: '⚠️ 請務必保留付款截圖，作為對賬憑證。',
} as const
