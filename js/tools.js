var Tools = {
  tagPos : function(string){
    var words = new Lexer().lex(string);
    var taggedWords = new POSTagger().tag(words);
    var result = []
    for(var i = 0; i < taggedWords.length; i++){
      result.push({word : taggedWords[i][0], pos: taggedWords[i][1]});
    }
    return result;
  },

  markovTrainAndGenerate : function(string){
    markov = new Markov(string, 5);
    results = [""];

    markov.each(function(t){
      if(results[results.length-1].length <= 140){
        results[results.length-1] += t;
      } else {
        results.push(t);
      }
    })

    console.log("generated " + results.length + " results from markov chain");

    // return a random "page" (10 results) from full result array
    const pageSize = 10;
    var pageCount = Math.floor(results.length / pageSize);
    if (pageCount > 1) {
      randomPage = Math.floor(Math.random() * pageCount);
      console.log(pageCount + " pages generated; choosing page " + randomPage);
      offset = pageSize * randomPage;
      results = results.slice(offset, offset+pageSize);
    }

    return results;
  },

  renderTweets: function(tweetList) {
    var el = $("#candidate-tweets");
    el.html("");
    _.each(tweetList, function(tweetText) {
      el.append(candidateTweet(tweetText));
    });
  },

  fetch : function(url, callback){
    $.ajax({
      url: url,
      type: "GET",
      success: function (data) {
        callback(data);
      },
      error :function(data){
        console.log("error");
        console.log(data);
      }
    });
  }
}

