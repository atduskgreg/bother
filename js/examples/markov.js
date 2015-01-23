var corpus = $("#markov textarea").val();
output = Tools.markovTrainAndGenerate(corpus);
Tools.renderTweets(output);
