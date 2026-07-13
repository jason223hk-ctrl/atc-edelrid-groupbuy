/**
 * ATC 第一團 — EDELRID Tectum Air 團購收單 Apps Script
 * ------------------------------------------------------------------
 * 部署方法見 apps-script/README.md。
 *
 * 功能：
 *  - 接收前端 POST 的訂單 JSON，寫入 Google Sheet。
 *  - 確保訂單編號不重複（如重複則重新產生）。
 *  - 回傳 { ok: true, orderNumber } 或 { ok: false, error }。
 */

// 若留空，會自動使用「與此 Script 綁定的試算表」的第一個工作表。
// 若你想寫入指定試算表，填入試算表 ID。
var SPREADSHEET_ID = '';
var SHEET_NAME = 'Orders';

var HEADERS = [
  'Timestamp',
  'Order Number',
  'Name',
  'WhatsApp',
  'Email',
  'Company',
  'Helmet Items',
  'Bundle Items',
  'Accessory Items',
  'Total',
  'Note',
  'Payment Status',
  'Order Status',
  'Raw JSON'
];

function getSheet_() {
  var ss = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error('找不到試算表，請設定 SPREADSHEET_ID 或把此 Script 綁定到試算表。');
  }
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  // 確保有標題列
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function isDuplicate_(sheet, orderNumber) {
  var last = sheet.getLastRow();
  if (last < 2) return false;
  var values = sheet.getRange(2, 2, last - 1, 1).getValues(); // 第 2 欄 = Order Number
  for (var i = 0; i < values.length; i++) {
    if (String(values[i][0]) === String(orderNumber)) return true;
  }
  return false;
}

function generateOrderNumber_() {
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var now = new Date();
  var ym = Utilities.formatDate(now, 'Asia/Hong_Kong', 'yyyyMM');
  var code = '';
  for (var i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return 'ATC-' + ym + '-' + code;
}

function jsonOutput_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000); // 序列化寫入，避免撞單
  } catch (err) {
    return jsonOutput_({ ok: false, error: '系統繁忙，請稍後再試。' });
  }

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonOutput_({ ok: false, error: '沒有收到訂單資料。' });
    }

    var data = JSON.parse(e.postData.contents);

    // 基本驗證
    if (!data.name || !data.whatsapp) {
      return jsonOutput_({ ok: false, error: '缺少必要欄位（姓名 / WhatsApp）。' });
    }
    var total = Number(data.total) || 0;

    var sheet = getSheet_();

    // 確認訂單編號不重複；如重複或缺失，重新產生
    var orderNumber = data.orderNumber || generateOrderNumber_();
    var guard = 0;
    while (isDuplicate_(sheet, orderNumber) && guard < 20) {
      orderNumber = generateOrderNumber_();
      guard++;
    }

    var timestamp = Utilities.formatDate(
      new Date(),
      'Asia/Hong_Kong',
      'yyyy-MM-dd HH:mm:ss'
    );

    sheet.appendRow([
      timestamp,
      orderNumber,
      String(data.name || ''),
      String(data.whatsapp || ''),
      String(data.email || ''),
      String(data.company || ''),
      String(data.helmetItems || ''),
      String(data.bundleItems || ''),
      String(data.accessoryItems || ''),
      total,
      String(data.note || ''),
      '未付款', // Payment Status 預設
      '已登記', // Order Status 預設
      e.postData.contents // Raw JSON
    ]);

    return jsonOutput_({ ok: true, orderNumber: orderNumber });
  } catch (err) {
    return jsonOutput_({ ok: false, error: '伺服器錯誤：' + err });
  } finally {
    lock.releaseLock();
  }
}

/** 讓你在瀏覽器直接打開 /exec 測試是否已部署成功。 */
function doGet() {
  return jsonOutput_({ ok: true, service: 'ATC EDELRID group buy', status: 'ready' });
}

/** 一次性：手動執行以初始化標題列（可選）。 */
function setupSheet() {
  getSheet_();
}
