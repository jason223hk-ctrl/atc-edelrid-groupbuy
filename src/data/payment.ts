/**
 * FPS 付款資料 —— ⚠️ NEEDS_CONFIRMATION
 *
 * 以下全部為佔位資料。正式開團前必須換成真實 FPS 資料。
 * 若現有 Google Form 有指定付款文字，請直接沿用該內容覆蓋以下欄位。
 */
export const PAYMENT = {
  // FPS 電話號碼 / FPS ID（二選一或兩者）
  fpsId: '（待填 FPS ID）',
  fpsPhone: '（待填 FPS 電話）',
  payeeName: '（待填收款人 / 公司名稱）',

  // 付款期限（例：下單後 3 日內）
  deadlineText: '請於下單後 3 日內完成付款（詳情以 WhatsApp 通知為準）',

  // 聯絡 WhatsApp（用於核對付款、查詢）
  whatsapp: '（待填 WhatsApp 號碼）',
  whatsappLink: '', // 例：https://wa.me/85290000000

  // 付款指示文字（如 Google Form 有指定文字，沿用之）
  instructions: [
    '1. 使用轉數快（FPS）轉賬至上方帳戶。',
    '2. 轉賬備註／附言請填寫你的「訂單編號」。',
    '3. 完成後請截圖付款證明。',
    '4. 將「訂單編號 + 付款截圖」透過 WhatsApp 傳送給團長核對。',
    '5. 收到確認後即完成落單。',
  ],
  reminder: '⚠️ 請務必保留付款截圖，作為對賬憑證。',
} as const
