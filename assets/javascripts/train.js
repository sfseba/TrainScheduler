$( document ).ready(function() {

/* global moment firebase */

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyACAUqw5JXLTuQK23CXQGugDy_Wtv9bP2E",
    authDomain: "trainschedule-d21f5.firebaseapp.com",
    databaseURL: "https://trainschedule-d21f5.firebaseio.com",
    projectId: "trainschedule-d21f5",
    storageBucket: "",
    messagingSenderId: "389308904335"
  };

  firebase.initializeApp(config);
//create a variable to reference the database
  var database = firebase.database();
// Initial Values
  var addTrain = "";
  var destination = "";
  var firstTrainTime = 0;
  var frequency = "";

//capture button click
$("#addingTrain").on("click", function (event){
 event.preventDefault();

//grabned values from text boxes
  var addTrain = $("#trainName").val().trim();
  var destination = $("#desti").val().trim();
  var firstTrainTime = $("#trainTime").val().trim();
  var frequency = $("#frequen").val().trim();

// currentTime & first time
  var tFrequency = $("#frequen").val();
  var firstTime = $("trainTime").val();
  var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "yesrs");
  console.log("test");
  console.log(moment(firstTrainTime, "hh:mm"));
  console.log(firstTimeConverted);
// Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
// Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("Difference: " + diffTime);
// Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

// Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

//
    $("#minAway").append("<p>" + tMinutesTillTrain + "</p>")
// Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  $("#nextArrival").append("<p>" + moment(nextTrain).format("hh:mm")+ "</p>");
//append to html$("#train-name").append(addTrain);
  $("#train-name").append("<p>" +addTrain+ "</p>");
  $("#destination").append("<p>" +destination+ "</p>");
  $("#frequency").append("<p>" +frequency+ "</p>");
});

//code for handling the push
 database.ref().push({
   addTrain: addTrain,
   destination: destination,
   firstTrainTime: firstTrainTime,
   frequency: frequency,
   dataAdded: firebase.database.ServerValue.TIMESTAMP
 });



//firebase watcher + initial loader + order/limit
database.ref().orderByChild("data_added").limitToLast(1).on("child_added", function(snapshot) {
  var sv = snapshot.val();
  //console.log the last user`s data
  console.log(sv.addTrain);
  console.log(sv.destination);
  console.log(sv.firstTrainTime);
  console.log(sv.frequency);

}), function(errorObject) {
  console.log("Error handled: " + errorObject.code);
}

  console.log(addTrain);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

//$("#nextArrival").append();
  console.log("here");
});
