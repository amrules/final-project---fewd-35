
/***** PSEUDO CODE FOR FORM!!!!!!!!!!
 * Big idea: Form, collect the data
 *
 * .submit() event handler
 * Get polling place location from form
 * Get Race from form
 * Get Party from form
 * Get Reason from form field select
 *
 * Condition 1: If Reason = registration issue
 *   Display message with another drop-down menu with options:
 *     1- Address Change
 *        A-If address change at office, then message displayed
 *        B-If address change online, then message displayed
 *     2- Declined at polling place
 *        A-If previously registered and voted, then messages
 *        B-If voter registration app filled out before, display messages
 *        C-If never registered to vote, display a message
 *
 * Condition 2: If Reason = identification issue
 *   Display a message with provisional ballot YES and NO radio buttons:
 *    1- if YES, they submitted a provisional ballot, then message displayed
 *    2- if NO, they did not submit a provisional ballot, then message displayed
 *
 * Condition 3: If Reason = accessibility issues
 *   Display message
 *
 * After all conditions: display about provisional ballots https://voter.azsos.gov/VoterView/ProvisionalBallotSearch.do
 */

// Check to maker sure the document has loaded
$(document).ready(function(){



  // Find the form element and attach a submit event handler - changed to option selected in Reason drop down
  // Our event handler requires an anonymous function that instructs JS brain what to do next
  $('#my-form').change( function(event) {
    $('#reason').submit();

    // Prevents our application from submitting the form to the server yet
    event.preventDefault();

    // Get form data from each of the four main form elements
    var lmvPollingPlace = $('#polling-place').val();
    var lmvRace = $('#race').val();
    var lmvParty = $('#party').val();
    var lmvReason = $('#reason').val();
    var lmvRegistrationIssue;
    var lmvAddressChange;
    var lmvNotRegistered;
    var lmvIdIssue;

    // Interpret the reason, then show user message or message and dropdown
    // If the user selects REGISTRATION ISSUE, then display a message with another dropdown
    if (lmvReason === 'reason-registration-issues') {
      $('#registration-issue-path').slideDown("slow");
        //this should make it auto-scroll to bottom of added text but it does not work
        var objDiv = document.getElementById("my-form");
        objDiv.scrollTop = objDiv.scrollHeight;


//HOW oh how do I now insert a new element of the form where I click an option it displays something else? JK! I DID THIS!
      $('#my-form').change(function(event) {
          $('#registration-issues').submit();
          event.preventDefault();


          // Get form data from the form elements
          lmvRegistrationIssue = $('#registration-issues').val();
          console.log(lmvRegistrationIssue)

          //If user selects registration issue --> ADDRESS CHANGE
          if (lmvRegistrationIssue === 'address-change-option') {
            $('#address-change-path').slideDown("slow")
            $('#my-form').change(function(event) {
                $('#address-change').submit();
                event.preventDefault();

                lmvAddressChange= $('#address-change').val();
                //If user selects registration issue --> ADDRESS CHANGE --> ADOT
                if (lmvAddressChange === 'address-change-option-ADOT') {
                  $('#ADOT-address-change-path').slideDown("slow");
                  $('#next-button').slideDown("slow");
                }
                //If user selects registration issue --> ADDRESS CHANGE --> ONLINE
                if (lmvAddressChange === 'address-change-option-online') {
                  $('#online-address-change-path').slideDown("slow");
                  $('#next-button').slideDown("slow");
                }
              });
          };
          //If user selects registration issue --> TOLD NOT REGISTERED
          if (lmvRegistrationIssue === 'not-registered-option') {
            console.log('ive selected a dropdown')
            $('#not-registered-path').slideDown("slow");
            $('#my-form').change(function(event) {
                $('#not-registered').submit();
                event.preventDefault();

                lmvNotRegistered = $('#not-registered').val();
                //If user selects registration issue --> TOLD NOT REGISTERED --> PREVIOUSLY REGISTERED AND VOTED BEFORE
                if (lmvNotRegistered === 'previously-registered') {
                  $('#previously-not-registered-path').slideDown("slow");
                  $('#next-button').slideDown("slow");
                }
                //If user selects registration issue --> TOLD NOT REGISTERED --> FILLED OUT APPLICATION
                if (lmvNotRegistered === 'filled-out-application') {
                  $('#filled-application-not-registered-path').slideDown("slow");
                  $('#next-button').slideDown("slow");
                }
           });
          };

          if (lmvRegistrationIssue === 'none-registration-option') {


          };

        });
    };

    // If the user selects ID ISSUE, then display a message
    if (lmvReason === 'reason-id-issues') {
      $('#id-issue-path').slideDown("slow");
      $('#my-form').change(function(event) {
          $('#radio-button-form').submit();
          event.preventDefault();

          lmvIdIssue= $('.radio-button-form').val();
            if (lmvIdIssue === 'yes') {
              $('#provisional-yes').slideDown("slow");
              $('#next-button').slideDown("slow");
            }
            if (lmvIdIssue === 'no') {
              $('#provisional-no').slideDown("slow");
              $('#next-button').slideDown("slow");
            }
          });


    };
    if (lmvReason === 'reason-accessibility-issues') {
      $('#accessibility-issue-path').slideDown("slow");
      $('#next-button').slideDown("slow");
    }


});

});



// fire base stuff

  var config = {
    apiKey: "AIzaSyD75abhp940Z8HQPfX5nLGft9xGSSf6qCc",
    authDomain: "let-me-vote.firebaseapp.com",
    databaseURL: "https://let-me-vote.firebaseio.com",
    projectId: "let-me-vote",
    storageBucket: "let-me-vote.appspot.com",
    messagingSenderId: "350592486364"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

//this makes it so all of this stuff goes to the database, it works https://firebase.google.com/docs/database/web/read-and-write
  function writeUserData(selectedPollingPlace, selectedRace, selectedParty, selectedReason, selectedRegistrationIssue, selectedAddressChange,
  selectedNotRegistered, selectedIdIssue) {
    // firebase.database().ref('users/' + selectedPollingPlace).set({
    //   race: selectedRace,
    //   party : selectedParty,
    //   reason: selectedReason,
    //   registrationissues: selectedRegistrationIssue,
    //   addresschanges: selectedAddressChange,
    //   notregistered: selectedNotRegistered,
    //   provisonalballot: selectedIdIssue,
    // });

    var recordData = database.ref().push();

    recordData.set({
        pollingplace: selectedPollingPlace,
        race: selectedRace,
        party : selectedParty,
        reason: selectedReason,
        registrationissues: selectedRegistrationIssue,
        addresschanges: selectedAddressChange,
        notregistered: selectedNotRegistered,
        provisonalballot: selectedIdIssue,

    })
  }


// sends the user input into the database! its real and it WORKS!!!!!!!!!!!!
  $('#next-button').click(function(){
    var lmvAddress = $('#autocomplete').val();
    var lmvRace = $('#race').val();
    var lmvParty = $('#party').val();
    var lmvReason = $('#reason').val();
    var lmvRegistrationIssue = $('#registration-issues').val();
    var lmvAddressChange = $('#address-change').val();
    var lmvNotRegistered = $('#not-registered').val();
    var lmvIdIssue = $('.radio-button-form').val();

    writeUserData(lmvAddress, lmvRace, lmvParty, lmvReason, lmvRegistrationIssue, lmvAddressChange, lmvNotRegistered, lmvIdIssue);

document.location.href = "../html/thank-you.html";

});


//GOOGLE AUTO COMPLETE FOR ADDRESSES



  var placeSearch, autocomplete;

  function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete')),
    {types: ['geocode']});




  }

  function fillInAddress() {
     // Get the place details from the autocomplete object.
     var place = autocomplete.getPlace();

     for (var component in componentForm) {
       document.getElementById(component).value = '';
       document.getElementById(component).disabled = false;
     }
   }

//makes it so the webpage asks for you location and then bases suggestions on your location
  function geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  };
