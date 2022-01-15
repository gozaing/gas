
const postUrl = '';
const username = 'bot';
const icon = ':smile:';

function slack_notify() {
  const message = 'testです';
  slack(message);
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
