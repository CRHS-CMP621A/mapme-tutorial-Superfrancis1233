'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// Geolocation & Map

  let map;
  let mapEvent;

  navigator.geolocation.getCurrentPosition(
  function (position) {
    // console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log("https://www.google.com/maps/@" + longitude + "," + latitude);

    const coords = [latitude, longitude]

    var map = L.map('map').setView(coords, 13);


    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker(coords).addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();


    // Map Marker Placement
    map.on('click', function(mapE) {
      mapEvent=mapE;
      console.log(mapEvent)

      const lat= mapEvent.latlng.lat
      const lng= mapEvent.latlng.lng  

      L.marker([lat, lng]).addTo(map)
        .bindPopup(L.popup({
          maxWidth:250,
          minWidth:100,
          autoClose:false,
          closeOnClick:false,
          className:'running-popup',
        }))
        .setPopupContent('Workout')
        .openPopup();
        document.getElementsByClassName('.running-popup').reset();

        form.classList.remove('hidden');
        inputDistance.focus();
        
        // form event listener to check if submitted/completed
        form.addEventListener('submit', function(e){
          e.preventDefault()
        
        })

    })

  },
  function() {
    alert("Could not get position.");
  }

  
);

