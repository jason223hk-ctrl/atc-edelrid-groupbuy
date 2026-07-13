# ATC 第一團 · EDELRID Tectum Air 頭盔團購網站

香港攀樹學院 ATC 首次官方團購 — EDELRID Tectum Air 頭盔及原廠配件。
手機優先（Mobile First）單頁落單網站：睇資料 → 選購 → 填資料 → 提交 → FPS 付款。

技術：**React + Vite + TypeScript**（純 CSS，無額外 UI 框架）。
後端：**Google Apps Script + Google Sheet**（免伺服器、免資料庫）。
部署：**Cloudflare Pages**。

---

## ⚠️ 開團前必做：核對價格（NEEDS_CONFIRMATION）

> 本專案於建立時 **未能取得原始 Google Form**，因此所有價格及 FPS 付款資料
> 目前為 **佔位數字**，並非真實團購價。正式收單前 **必須** 人手核對。

網站頂部會顯示黃色「測試模式」警告橫額，直到你完成以下步驟：

1. 開啟 [`src/data/products.ts`](src/data/products.ts)，逐項更新真實價格，
   並把該項 `priceConfirmed` 由 `false` 改為 `true`。
2. 開啟 [`src/data/payment.ts`](src/data/payment.ts)，填入真實 FPS 資料及付款文字。
3. 全部確認後，把 `src/data/products.ts` 最底的 `PRICES_CONFIRMED` 改為 `true`
   （警告橫額便會消失）。

### 需人手核對的價格清單

| # | 項目 | 檔案位置 | 目前佔位價 |
|---|------|----------|-----------|
| 1 | Tectum Air 頭盔（黑/白/黃/紅/HiVis 同價） | `HELMET.price` | HK$1,180 |
| 2 | 套裝：高清面罩防護組合 | `BUNDLES[0].price` | HK$1,680 |
| 3 | 套裝：樹藝師核心防護三件套 | `BUNDLES[1].price` | HK$2,280 |
| 4 | 套裝：其他現有 Google Form 套裝 | `BUNDLES[2]` | 待補（名稱/內容/價） |
| 5 | 配件：原廠全面罩 Full Face Visor | `ACCESSORIES[0].price` | HK$620 |
| 6 | 配件：原廠網狀面罩 Mesh Visor | `ACCESSORIES[1].price` | HK$520 |
| 7 | 配件：原廠耳罩 Helmet Ear Muffs | `ACCESSORIES[2].price` | HK$480 |

### 其他 NEEDS_CONFIRMATION（非價格）

- **頭盔尺碼**：官方為單一可調尺寸，現按均碼落單。如今次要分尺碼，請於
  `HELMET.notes` 及選購 UI 補上尺碼選項。
- **FPS 付款資料**：`src/data/payment.ts` 全部欄位（收款人、FPS ID/電話、
  付款期限、WhatsApp、付款指示文字）。若 Google Form 有指定付款文字請沿用。
- **官方影片連結**：`OFFICIAL_SOURCES.officialVideo` 現為空。Drive 內有
  `Edelrid helmet.m4v`，可上載到 YouTube／串流後填入 embed 連結（P1，非必需）。
- **產品圖片**：暫以佔位色塊顯示，未引用來源不明圖片。可把官方或自攝圖片放到
  `public/images/` 並在 `products.ts` 的 `images` 陣列填入路徑。

---

## 官方產品資料來源（可核對）

規格引用自 EDELRID 官方及授權零售商，來源 URL 保留於 `src/data/products.ts`：

- 官方產品頁：<https://edelrid.com/us-en/professional/helmet/tectum-air>
- 官方使用說明書：<https://device.report/manual/16169143>
- 2025 新品公告：<https://edelrid.com/us-en/vertical-freedom/edelrid-news/blog/press-new-produkts-work-safety-2025>

已確認官方規格：重量約 455g；ABS 外殼 + EPS 內襯；認證 EN 12492 / EN 397
（關閉通風口）/ ANSI/ISEA Z89.1-2014 Type I Class C；Wing Fit 旋鈕調節；
可關閉通風口；Euroslot 配件系統。配件：全面罩、網狀面罩、耳罩。

---

## 本機開發

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # 產生 dist/（tsc 型別檢查 + vite build）
npm run preview    # 預覽 production build
```

前端透過環境變數 `VITE_APPS_SCRIPT_URL` 連接後端。複製 `.env.example` 為 `.env`
並填入你的 Apps Script Web App URL。留空時網站仍可瀏覽及測試，只是提交會顯示
「未設定後端」錯誤。

---

## 後端設定：Google Sheet + Apps Script

詳細圖文步驟見 [`apps-script/README.md`](apps-script/README.md)，摘要如下：

### 1. 建立 Google Sheet

1. 到 <https://sheets.new> 建立新試算表，命名為「ATC EDELRID 團購訂單」。
2. Apps Script 首次執行會自動建立 `Orders` 工作表及標題列，無需手動開欄。

Sheet 欄位（由 Apps Script 自動寫入）：

```
Timestamp | Order Number | Name | WhatsApp | Email | Company |
Helmet Items | Bundle Items | Accessory Items | Total | Note |
Payment Status | Order Status | Raw JSON
```

- `Payment Status` 預設：**未付款**
- `Order Status` 預設：**已登記**

### 2. 部署 Apps Script

1. 在該試算表選 **擴充功能 → Apps Script**。
2. 把 [`apps-script/Code.gs`](apps-script/Code.gs) 全部內容貼上，儲存。
3. **部署 → 新增部署 → 類型：網頁應用程式**
   - 執行身分：**我**
   - 誰可存取：**所有人**
4. 授權後複製 Web App URL（`https://script.google.com/macros/s/XXXX/exec`）。
5. 用瀏覽器開啟該 URL，應見 `{"ok":true,...}` 代表部署成功。

### 3. 連接前端

把上述 URL 設為環境變數 `VITE_APPS_SCRIPT_URL`（見下方 Cloudflare 步驟；
本機則寫入 `.env`）。

---

## 部署：Cloudflare Pages

1. 登入 Cloudflare → **Workers & Pages → Create → Pages → Connect to Git**。
2. 選擇 GitHub repo `jason223hk-ctrl/atc-edelrid-groupbuy`，分支 `main`。
3. Build 設定：
   - **Framework preset**：Vite
   - **Build command**：`npm run build`
   - **Build output directory**：`dist`
4. **Environment variables** 加入：
   - `VITE_APPS_SCRIPT_URL` = 你的 Apps Script Web App URL
5. **Save and Deploy**。完成後會得到 `https://atc-edelrid-groupbuy.pages.dev`
   （或你自訂網域）。

> 每次 push 到 `main`，Cloudflare Pages 會自動重新 build 及部署。
> 更新價格後 push 即可上線。

---

## 測試結果

以 Playwright（Chromium）於 iPhone 尺寸（390×844）跑過完整流程，**20/20 通過**：

| 測試項目 | 結果 |
|----------|------|
| 1. 只買一頂頭盔，總額正確 | ✅ |
| 2. 買多個不同顏色頭盔，數量／總額正確 | ✅ |
| 3. 頭盔 + 套裝 + 配件，總額正確 | ✅ |
| 4. 確認頁修改數量即時更新總額 | ✅ |
| 5. 刪除產品即時更新總額 | ✅ |
| 6. 空購物車不能繼續（按鈕 disabled） | ✅ |
| 7. 缺姓名／WhatsApp／未剔條款／電話格式錯誤，均阻止提交並提示 | ✅ |
| 8. 重複按提交只送出一次（提交中 disabled） | ✅ |
| 9. 提交成功，訂單編號格式 `ATC-202607-XXXX` | ✅ |
| 10. API 失敗顯示清楚錯誤訊息 | ✅ |
| 11. 手機 Chrome：無水平捲動、可操作 | ✅ |
| 12. iPhone Safari 尺寸 responsive | ✅ |

`npm run build`（含 TypeScript 型別檢查）成功，bundle 約 165 KB（gzip 54 KB）。

> 測試腳本並非專案相依，未加入 repo；如需重跑可用 Playwright 對 `npm run preview`
> 驅動全流程。

---

## 專案結構

```
index.html              入口
src/
  main.tsx              React 掛載
  App.tsx               4 畫面流程控制（home/shop/confirm/success）
  styles.css            Cyber Arborist 設計系統
  data/
    products.ts         ⚠️ 產品 + 價格（需核對）
    payment.ts          ⚠️ FPS 付款資料（需核對）
  lib/
    types.ts            型別
    order.ts            訂單編號、計價、payload
    api.ts              提交到 Apps Script
    useCart.ts          購物車狀態
  components/
    Home.tsx Shop.tsx Confirm.tsx Success.tsx
    QtyStepper.tsx DetailModal.tsx
apps-script/
  Code.gs               Google Apps Script 收單程式
  README.md             後端部署步驟
```

---

## 範圍說明

本網站只服務 **今次 EDELRID Tectum Air 第一團**。刻意不做會員系統、CMS、
管理後台、第二團、課程、新聞、商店等。如需擴充請另開專案。
