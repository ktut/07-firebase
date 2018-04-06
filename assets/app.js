var config = {
    apiKey: "AIzaSyBeGOQT75_poeic_781gJYF-26H1mDQ9uE",
    authDomain: "rock-paper-scissors-b6319.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-b6319.firebaseio.com",
    projectId: "rock-paper-scissors-b6319",
    storageBucket: "",
    messagingSenderId: "560107886693"
};

firebase.initializeApp(config);

let database = firebase.database();

function getPlayers() {
    
}

// anytime a value in database changes
database.ref('/players').on("value", function(snapshot) {
    let sv = snapshot.val();

    // if there's a player one, show data
    if (sv.one) {
        $('.js-player-1').html("<h2>" + sv.one.name + "</h2>" + "<br>Wins: " + sv.one.wins + "<br>Losses: " + sv.one.losses);
    }
    // if there's a player two, show data
    if (sv.two) {
        $('.js-player-2').html("<h2>" + sv.two.name + "</h2>" + "<br>Wins: " + sv.two.wins + "<br>Losses: " + sv.two.losses);
    }
});


// had to use "set" which is annoying, because I couldn't figure it out the other way
$(".js-start-button").on("click", function(event) {

    database.ref('/players').once('value', function(snapshot) {
        
        let sv = snapshot.val();

        // if there's no data, set player 1
        if (sv === null) {
            database.ref('/players').set({
                one: {
                    losses: 0,
                    name: $('.js-start-text').val(),
                    wins: 0
                }
            });

            $('.js-start-text').hide();
            $('.js-start-button').hide();
            $('.js-status').text("Waiting on Player 2...");

        // otherwise if there's a player 1, set player 2
        } else if (sv.one && (sv.two === undefined)) {
            database.ref('/players').set({
                one: {
                    losses: sv.one.losses,
                    name: sv.one.name,
                    wins: sv.one.wins
                },
                two: {
                    losses: 0,
                    name: $('.js-start-text').val(),
                    wins: 0
                },
                turn: 1
            });

            $('.js-start-text').hide();
            $('.js-start-button').hide();
            $('.js-status').text("Game ready!");

        // otherwise if there are both players, just alert status
        } else if (sv.one && sv.two) {
            alert("Sorry, players already playing!");
        }

    });
    
});