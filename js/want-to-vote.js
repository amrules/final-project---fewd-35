//this js is for the I WANT TO VOTE page. In the future, I would like to connect this to  the Google Civic
//Info API, that has polling place locations for each state. Right now, when the user inputs their own address
//the polling place location that is added to the page is a placeholder.

  var placeSearch, autocomplete;

  function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete')),
    {types: ['geocode']});


    var arizonaPlace = {lat:33.6132031, lng: -112.2154402};
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: arizonaPlace
          });
          var marker = new google.maps.Marker({
            position: arizonaPlace,
            map: map
          });
        }

//     var myLatLng = {lat:33.6132031, lng: -112.2154402};
//
//
// //map on page?
//     var map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 4,
//       center: myLatLng
//     });
//
//     var marker = new google.maps.Marker({
//       position: myLatLng,
//       map: map,
//       title: 'Hello World!'
//     });




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

//This mimics what i want to happen when i connect this to the polling place location API
  document.getElementById("locationField").addEventListener("keydown", function(e) {
    // sometimes useful
    if (!e) { var e = window.event; }


    // Enter is pressed
    if (e.keyCode == 13) {
      e.preventDefault();
      $('#polling-place-information').slideDown("slow"); }
  }, false);
