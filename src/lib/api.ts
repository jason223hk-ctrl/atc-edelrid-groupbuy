import type { OrderPayload } from './types'

// 收單後端：Google Apps Script Web App。
// 預設用學院已部署的 /exec；如要更換，設定環境變數 VITE_APPS_SCRIPT_URL 即可覆蓋。
// （此為公開的訂單接收端點，非機密憑證。）
const DEFAULT_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxNzUkrh1jYTr-zilzd42fnRWzKtcceOlvhLZndUtU8s3vXU8pFt4xQa11gtX3rUnJyPQ/exec'
const ENDPOINT =
  (import.meta.env.VITE_APPS_SCRIPT_URL as string | undefined) || DEFAULT_ENDPOINT

export interface SubmitResult {
  ok: boolean
  orderNumber?: string
  error?: string
}

/**
 * 提交訂單到 Google Apps Script Web App。
 *
 * 使用 text/plain 內容類型以避開 CORS 預檢（Apps Script 對簡單請求較友善），
 * Apps Script 端以 e.postData.contents 解析 JSON。
 */
export async function submitOrder(payload: OrderPayload): Promise<SubmitResult> {
  if (!ENDPOINT) {
    return {
      ok: false,
      error: '未設定後端（VITE_APPS_SCRIPT_URL）。請先部署 Google Apps Script 並設定環境變數。',
    }
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      // 簡單請求，避免 CORS preflight
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    })

    if (!res.ok) {
      return { ok: false, error: `伺服器回應錯誤（HTTP ${res.status}）。請稍後再試或聯絡團長。` }
    }

    const data = (await res.json()) as { ok?: boolean; orderNumber?: string; error?: string }
    if (data.ok) {
      return { ok: true, orderNumber: data.orderNumber ?? payload.orderNumber }
    }
    return { ok: false, error: data.error || '提交失敗，請稍後再試。' }
  } catch (err) {
    return {
      ok: false,
      error:
        '網絡連線失敗，訂單未送出。請檢查網絡後再試；如持續失敗，請直接 WhatsApp 聯絡團長。',
    }
  }
}
