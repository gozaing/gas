const ssId = '1bWFJJRvfgbPuLUCG5K1PbqHxGyQ9dIRJoSdxzW5241Y';
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
  const ss = SpreadsheetApp.openById(ssId);
  const sheet = ss.getSheetByName(ssConfig);
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  const arrConfig = sheet.getRange(1, 1, lastRow, lastCol).getValues();
  postUrl = arrConfig[0][1];
  username = arrConfig[1][1];
  icon = arrConfig[2][1];

}

function get_message() {
  const ss = SpreadsheetApp.openById(ssId);
  const sheet = ss.getSheetByName(ssMessage);
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  const arrMessage = sheet.getRange(1, 1, lastRow, lastCol).getValues();

  const youbiNum = new Date().getDay();
  const message = arrMessage[youbiNum].join();

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
