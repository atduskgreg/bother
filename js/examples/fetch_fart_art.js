Tools.fetch("https://www.brainyquote.com/quotes/topics/topic_art.html", function(data){
  page = $(data.responseText);
    
    tweets = [];
    page.find(".bqQuoteLink").each(function(i, headline){
      quote = $(headline).text()
      if(quote.indexOf("art") > -1){ 
        tweets.push(quote.replace(/\sart\s/g, " farting ").replace(/\sartist\s/g, " farter "));
      }
    });
    Tools.renderTweets(tweets);
});