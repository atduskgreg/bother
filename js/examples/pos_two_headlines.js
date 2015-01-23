var sentence1 = "Yemeni Government Collapses as President and Prime Minister Resign";
var sentence2 = "Diversity in play as Sundance Film Festival kicks off in Park City";

var tags1 = Tools.tagPos(sentence1);
var tags2 = Tools.tagPos(sentence2);

function findProperNounPhrase(tags){
  var previousTag = "";
  var properNounPhrase = "";
  for(var i = 0; i < tags.length; i++){
    if(tags[i].pos == "NNP" || tags[i].pos == "JJ"){
        if(previousTag == "NNP" || previousTag == "JJ"){
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

var pn1 = findProperNounPhrase(tags1);
var pn2 = findProperNounPhrase(tags2);

var tweet1 = sentence1.replace(pn1, pn2);
var tweet2 = sentence2.replace(pn2, pn1);

Tools.renderTweets([tweet1, tweet2]);