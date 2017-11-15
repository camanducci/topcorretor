angular.module('poc').factory('commuteTimeService', ['$http', function ($http) {
      var service = {
          compCommuteTime : function (Data) {  
              var GetAll = new Object();  
              GetAll.longitudeP1 = Data.lngP1;  
              GetAll.latitudeP1 = Data.latP1;  
              GetAll.longitudeP2 = Data.lngP2;  
              GetAll.latitudeP2 = Data.latP2;  
              GetAll.departureTime = Data.departure;  
              return $http({  
                  url: "http://54.94.173.255:3000/api/commuteTime",  
                  dataType: 'json',  
                  method: 'POST',  
                  data: GetAll,  
                  headers: {  
                      "Content-Type": "application/json"  
                  }  
              });  
          },

          teste : function(param){
              return $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+param);
          },

          teste2 : function(param){
              return $http.post("...", param);
          }
       };
 
       return service;
}]);

//========================================================================
angular.module('poc').factory('googleMaps', [ function () {
    var service = {};
    var map;
    var markerArr = [];
    var directionsService ; 
    var directionsDisplay; 

    service.initMap = function (latLng, cb) {
        window.initialize = function () {
            var mapCanvas = document.getElementById('map');

            //google.maps.event.addListener(marker, 'click', function() {
    //window.location.href = www.google.com;
//});

      var mapOptions = {
          center: new google.maps.LatLng(latLng.lat, latLng.lng),
          zoom: 12,
          scrollwheel: true,
          mapTypeControl: true,
          mapTypeControlOptions: {
              position: google.maps.ControlPosition.TOP_LEFT,
              style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
              mapTypeIds: [
                google.maps.MapTypeId.ROADMAP,
                google.maps.MapTypeId.TERRAIN,
                google.maps.MapTypeId.SATELLITE,
                google.maps.MapTypeId.HYBRID
              ]
          },
          disableDefaultUI: true,
          disableDoubleClickZoom: true,
          streetViewControl: false,
          zoomControl: false,
          scaleControl: true,
          rotateControl: true,
          styles: [
              {
                featureType: "poi",
                stylers: [
                  { visibility: "off" }
                ]
              }
          ]
      };

      map = new google.maps.Map(mapCanvas, mapOptions);
      directionsService = new google.maps.DirectionsService; 
      directionsDisplay = new google.maps.DirectionsRenderer; 
      directionsDisplay.setMap(map);

      if (cb)
        cb();

    };

    var sc = document.createElement('script');
    sc.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDlxLint8QZPB43_5FdhAtnitbRev_PSPw&callback=initialize&libraries=visualization,places&language=pt');
    document.head.appendChild(sc);
  };

  service.bindPlaceAutoComplete = function ($scope){
      var origin_place_id = null;
      var destination_place_id = null;
      var travel_mode = google.maps.TravelMode.TRANSIT;
      var origin_input = document.getElementById('origin');
      var destination_input = document.getElementById('destination');
      var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
      origin_autocomplete.bindTo('bounds', map);
      var destination_autocomplete = new google.maps.places.Autocomplete(destination_input);
      destination_autocomplete.bindTo('bounds', map);

      function expandViewportToFitPlace(map, place) {
          if (place.geometry.viewport) {
              map.fitBounds(place.geometry.viewport);
          } 
          else {
              map.setCenter(place.geometry.location);
              map.setZoom(17);
          }
      }

      origin_autocomplete.addListener('place_changed', function() {
          var place = origin_autocomplete.getPlace();

          $scope.latP1 = place.geometry.location.lat();
          $scope.lngP1 = place.geometry.location.lng();

          safeDigest($scope);

          if (!place.geometry) {
              window.alert("Autocomplete's returned place contains no geometry");
              return;
          }
     
          expandViewportToFitPlace(map, place);

          origin_place_id = place.place_id;
          route(origin_place_id, destination_place_id, travel_mode, directionsService, directionsDisplay);
      });



      destination_autocomplete.addListener('place_changed', function() {
          var place = destination_autocomplete.getPlace();
          
          $scope.latP2 = place.geometry.location.lat();
          $scope.lngP2 = place.geometry.location.lng();

          safeDigest($scope);

          if (!place.geometry) {
              window.alert("Autocomplete's returned place contains no geometry");
              return;
          }
        
          expandViewportToFitPlace(map, place);

          // If the place has a geometry, store its place ID and route if we have
          // the other place ID
          destination_place_id = place.place_id;
          route(origin_place_id, destination_place_id, travel_mode, directionsService, directionsDisplay);
      });

      function route(origin_place_id, destination_place_id, travel_mode, directionsService, directionsDisplay) {
          if (!origin_place_id || !destination_place_id) {
              return;
          }
        directionsService.route({
            origin: {'placeId': origin_place_id},
            destination: {'placeId': destination_place_id},
            travelMode: travel_mode
        }, function(response, status) {
              if (status === google.maps.DirectionsStatus.OK) {
                  directionsDisplay.setDirections(response);
              } 
              else {
                  window.alert('Directions request failed due to ' + status);
              }
        });
      }
  }

  service.buildMarkers = function (markers, onclick) {
      markerArr.forEach(function (m) {
          m.setMap(null);
      });

      markerArr = [];

      markers.forEach(function (m) {
          var marker = new google.maps.Marker({
              position: { lat: m.lat, lng: m.lng },
              map: map
          });

          markerArr.push(marker);

          marker.addListener('click', function () {
              onclick(m);
          });
      });
  };

  service.setCenter = function (latLng) {
      if (map)
          map.setCenter(latLng);
  };

  service.zoomTo = function (num) {
      map.setZoom(num);
      return map.getZoom();
  };

  var polygon = [];

  service.removePolygon = function () {
      polygon.forEach(function (r) {
          r.setMap(null);
      });
      polygon = [];
  };

  service.drawPolygon = function (paths) {
      var color = "rgba(204, 113, 46, 1.0)";

      polygon.push(new google.maps.Polygon({
          strokeColor: color,
          strokeOpacity: 0.6,
          strokeWeight: 1,
          fillColor: color,
          fillOpacity: 0.35,
          map: map,
          paths: paths
      }));
  };  
  return service;
}]);
