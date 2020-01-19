$(document).ready(function () {

    // firebase initialization
    var config = {
        apiKey: "AIzaSyDju6XS41NU7q-N6rmhMfIyXnpEVwKVBHo",
        authDomain: "testfirebase-a917d.firebaseapp.com",
        databaseURL: "https://testfirebase-a917d.firebaseio.com",
        projectId: "testfirebase-a917d",
        storageBucket: "testfirebase-a917d.appspot.com"
    };
    firebase.initializeApp(config);

// assign variable to the database    
    var database = firebase.database();

// onclick function to push data from input fields to firebase
    $("#submit").on("click", function (event) {
        event.preventDefault();
        database.ref().push({
            trainName: $(".train-name").val(),
            destiNation: $(".destination").val(),
            trainTime: $(".train-time").val(),
            freQuency: $(".frequency").val()
        })
    })


// function to get a snapshot of stored data and update page in real-time    
    database.ref().on("child_added", function (snapshot) {

        // setting variables to values stored in database
        var inputTrainName = snapshot.val().trainName;
        var inputDestination = snapshot.val().destiNation
        var inputTrainTime = snapshot.val().trainTime
        var inputFrequency = snapshot.val().freQuency

        // creating variables to store data from using moment.js library to convert data and do math calculations
        var firstTimeConverted = moment(inputTrainTime, "HH:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTimeConverted), "hh:mm");
        var tRemainder = diffTime % inputFrequency;
        var tMinutesTillTrain = inputFrequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");

        // creating variable to hold data to be appended to table
        var newRow = $("<tr>").append(
            $("<td>").text(inputTrainName),
            $("<td>").text(inputDestination),
            $("<td>").text(inputFrequency),
            $("<td>").text(nextTrain),
            $("<td>").text(tMinutesTillTrain)


        );

        // call to append data to table
        $(".train-info").append(newRow);
    });
});