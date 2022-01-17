const ssConfig = 'config';
const ssMessage = 'slack';
let postUrl = '';
let username = '';
let icon = '';

function slack_notify() {
  set_config();
  const message = get_message();
  slack(message);
}

function set_config() {  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(ssConfig);
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  const arrConfig = sheet.getRange(1, 1, lastRow, lastCol).getValues();
  postUrl = arrConfig[0][1];
  username = arrConfig[1][1];
  icon = arrConfig[2][1];

}

function get_message() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(ssMessage);
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  const arrMessage = sheet.getRange(1, 1, lastRow, lastCol).getValues();
  
  // 実行日の曜日を取得
  // Utilities.formatDate format=uは曜日(1=月曜〜7=日曜）で返す。Date().getDayだとGMTとJSTの差がでる
  const formattedDate = Utilities.formatDate(new Date(), "JST", "u");

  // =============================
  // 実行日の次の日の内容を見るため
  // =============================
  let youbiIndex = 0;
  if (formattedDate === '7') {
    // 日曜のときは月曜を見たいのでIndex=0
    youbiIndex = 0;
  } else {
    // 日曜以外はリストindexとfomattedDateが+1違うので、そのまま利用
    youbiIndex = parseInt(formattedDate, 10);
  }
  
  const message = arrMessage[youbiIndex].join();

  return message;

}

function slack(message) {
  const jsonData =
  {
     "username" : username,
     "icon_emoji": icon,
     "text" : message
  };
  const payload = JSON.stringify(jsonData);

  const options =
  {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };

  const response = UrlFetchApp.fetch(postUrl, options);
  Logger.log(response);

}
