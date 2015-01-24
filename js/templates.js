function candidateTweet(text, elTag) {
  if (typeof(elTag) == "undefined") {
    elTag = "li";
  }

  var el = $(document.createElement(elTag));
  el.addClass("candidate-tweet");

  var textDiv = $(document.createElement("div"));
  textDiv.addClass("tweet-content");
  textDiv.text(text);
  el.append(textDiv);

  var cancelBtn = $("<button class='btn-cancel'>Dismiss</button>");
  cancelBtn.click(function() {
    el.remove();
  });

  var tweetBtn = $("<button class='btn-tweet'>Tweet</button>");
  tweetBtn.click(function() {
    var tweetParam = encodeURIComponent(text);
    var intentUrl = "https://twitter.com/intent/tweet?text=" + tweetParam;

    window.open(intentUrl, "new tweet");
  });

  var buttonDiv = $(document.createElement("div"));
  buttonDiv.addClass("tweet-actions");
  buttonDiv.append(cancelBtn);
  buttonDiv.append("&nbsp;");
  buttonDiv.append(tweetBtn);

  el.append(buttonDiv);

  return el;
}
