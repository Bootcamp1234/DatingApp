var friends = require("../data/friends.js");
// var path = require("path");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        console.log(req.body);
        // Take results of users survey POST and parse it.
        var userData = req.body;
        var userScores = userData.scores;

        console.log(userScores);

        // Calculate the difference between user's scores and the scores of each user in database
        var totalDifference = 0;

        // Loop through all friend possibility in database
        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i].name);
            totalDifference = 0;

            // loop through scores of each friend
            for (var j = 0; j < friends[i].scores[j]; j++) {
                // calculate the difference between scores and sum them into the totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                // when sum of the difference is less than the differences of the best match
                if (totalDifference <= bestMatch.friendDifference) {

                    // reset bestMatch to new friend
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }

            }
        }

        friends.push(userData);

        res.json(bestMatch);
    });
}