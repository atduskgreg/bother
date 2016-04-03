tweets = [];
for(i = 0; i < DATA["pie"].length; i++){
  tweets.push("The " + DATA["pie"][i]["color"] + " wedge is for " + DATA["pie"][i]["category"] +".");
}

Tools.renderTweets(tweets);