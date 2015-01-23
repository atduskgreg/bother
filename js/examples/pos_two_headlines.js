// a helper function to find a "proper noun phrase"
// based on a sentence tagged with parts of speech
// a "proper noun phrase" is a series of proper nouns
// or adjectives all in a row with no other parts of 
// speech between them
function findProperNounPhrase(tags){
  console.log("find");
  var previousTag = "";
  var properNounPhrase = "";
  for(var i = 0; i < tags.length; i++){
   console.log(tags[i].pos);
    
   includedTags = ["NNP", "NNPS", "JJ", "PRP$", "NN"];
    
    if(includedTags.indexOf(tags[i].pos) > -1){
        if(includedTags.indexOf(previousTag) > -1){
          properNounPhrase +=  " " + tags[i].word;
        } else {
          properNounPhrase = tags[i].word;
        }
      } else {
        if(properNounPhrase.length > 0){
            break;
          }
      }
    previousTag = tags[i].pos;
  }

    return properNounPhrase;
}

// get the source of a webpage, in this case, google news
Tools.fetch("http://news.google.com", function(data){
    // parse the html string so we can find specific elements
  page = $(data.responseText);
  // get headlines elements by their 'selector', i.e. classnames
  // gather all of the headline text
  headlines = page.find('.section-stream-content .titletext').map(function(i, headline){
    return $(headline).text();
  });
  
  // get two random headlines
  var headline1 = headlines[Math.floor(Math.random() * headlines.length)];                                        
  var headline2 = headlines[Math.floor(Math.random() * headlines.length)];
  
  // get the part of speech tags for each headline
  var tags1 = Tools.tagPos(headline1);
  var tags2 = Tools.tagPos(headline2);
  
  // find proper noun phrases from the pos tags
  var pn1 = findProperNounPhrase(tags1);
  var pn2 = findProperNounPhrase(tags2);

  // generate two tweets by swapping the proper noun phrases
  var tweet1 = headline1.replace(pn1, pn2);
  var tweet2 = headline2.replace(pn2, pn1);

  // display tweets
  Tools.renderTweets([tweet1, tweet2]);
});