# 後端部署：Google Apps Script + Google Sheet

本目錄的 [`Code.gs`](Code.gs) 是接收團購訂單並寫入 Google Sheet 的程式。
免伺服器、免資料庫，只需一個 Google 帳戶。

## 步驟

### 1. 建立試算表並綁定 Script

1. 到 <https://sheets.new> 建立新試算表，命名例如「ATC EDELRID 團購訂單」。
2. 在該試算表選 **擴充功能（Extensions）→ Apps Script**。
3. 刪除預設的 `myFunction`，把 `Code.gs` **全部內容** 貼上，按 💾 儲存。

> 因為 Script 綁定在此試算表，`Code.gs` 內的 `SPREADSHEET_ID` 可留空，
> 程式會自動使用綁定的試算表。如要寫入另一個試算表，才填入該試算表 ID。

### 2.（可選）先初始化工作表

在 Apps Script 編輯器選函式 `setupSheet` → 按 **執行（Run）**。
首次執行會要求授權，按提示允許即可。執行後試算表會出現 `Orders` 工作表及標題列。

（就算不做這步，第一張訂單提交時也會自動建立。）

### 3. 部署為網頁應用程式

1. 右上角 **部署（Deploy）→ 新增部署（New deployment）**。
2. 齒輪圖示選 **網頁應用程式（Web app）**。
3. 設定：
   - **說明**：ATC EDELRID group buy
   - **執行身分（Execute as）**：我（Me）
   - **誰可以存取（Who has access）**：**所有人（Anyone）**
4. 按 **部署**，完成授權。
5. 複製 **Web App URL**，格式如：
   `https://script.google.com/macros/s/AKfyc.../exec`

### 4. 驗證

用瀏覽器直接開啟該 `/exec` URL，應該見到：

```json
{"ok":true,"service":"ATC EDELRID group buy","status":"ready"}
```

代表部署成功。

### 5. 連接前端

把該 URL 設定為前端環境變數 `VITE_APPS_SCRIPT_URL`：

- **本機**：於專案根目錄 `.env` 檔寫入
  `VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec`
- **Cloudflare Pages**：於 Pages 專案的 Environment variables 加入同名變數。

## Sheet 欄位

程式會自動建立以下標題列（`Orders` 工作表）：

| 欄 | 說明 |
|----|------|
| Timestamp | 提交時間（香港時區） |
| Order Number | 訂單編號 `ATC-202607-XXXX` |
| Name | 姓名 |
| WhatsApp | WhatsApp 電話 |
| Email | Email（選填） |
| Company | 公司／隊伍（選填） |
| Helmet Items | 頭盔項目（含顏色及數量） |
| Bundle Items | 套裝項目 |
| Accessory Items | 配件項目 |
| Total | 總額 |
| Note | 備註 |
| Payment Status | 付款狀態，預設「未付款」 |
| Order Status | 訂單狀態，預設「已登記」 |
| Raw JSON | 完整訂單原始資料（備份用） |

## 重要特性

- **訂單編號防重複**：前端產生編號，Apps Script 端會再檢查，若撞單自動重新產生。
- **序列化寫入**：使用 `LockService` 避免同時提交造成撞行或撞單。
- **CORS**：前端以 `text/plain` 送出 JSON（簡單請求），避免預檢問題。

## 更新程式後

改動 `Code.gs` 後，需 **部署 → 管理部署 → 編輯（鉛筆）→ 版本：新版本 → 部署**，
URL 維持不變。（若選「新增部署」會得到新 URL，記得同步更新前端環境變數。）
