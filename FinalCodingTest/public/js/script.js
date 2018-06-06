var geocoder;
var map;
var markers = Array();
var infos = Array();

function initialize() {
    // prepare Geocoder
    geocoder = new google.maps.Geocoder();

    // set initial position (New York)
    var myLatlng = new google.maps.LatLng(37.61005,126.99719);

    var myOptions = { // default map options
        zoom: 14,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);
}

// clear overlays function
function clearOverlays() {
    if (markers) {
        for (i in markers) {
            markers[i].setMap(null);
        }
        markers = [];
        infos = [];
    }
}

// clear infos function
function clearInfos() {
    if (infos) {
        for (i in infos) {
            if (infos[i].getMap()) {
                infos[i].close();
            }
        }
    }
}

// set coordinate function
//function setCoord() {
function setCoord(points, range) {
    var address_lat = document.getElementById("gmap_coord_lat").value;
    var address_long = document.getElementById("gmap_coord_long").value;

    // script uses our 'geocoder' in order to find location by address name
//    geocoder.geocode( { 'address': address}, function(results, status) {
//        if (status == google.maps.GeocoderStatus.OK) { // and, if everything is ok

            // we will center map
    var geolocate = new google.maps.LatLng(address_lat, address_long);
//            var geolocate2 = new google.maps.LatLng(parseFloat(address_lat)+0.01, parseFloat(address_long)+0.01);

    var zoom = (points && points.length > 1) ? (20 - Math.min(9, Math.max(0, Math.ceil(Math.log2(range*1600.0))))) : 16;

    var myOptions = { // default map options
        zoom: zoom,  // 14,
        center: geolocate,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var myname, mytype, myaddress;

    map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);

    //      alert(addrLocation.lat());
    map.setCenter(geolocate);

    // store current coordinates into hidden variables
    document.getElementById('lat').value = address_lat;
    document.getElementById('lng').value = address_long;

    // and then - add new custom marker(s)
    for(var i=0; i<points.length; i++) {
      address_lat = points[i].Y;
      address_long = points[i].X;
      myname = points[i].NAME;
      mytype = points[i].TYPE;
      myaddress = points[i].ADDRESS;

      geolocate = new google.maps.LatLng(address_lat, address_long);
      var addrMarker = new google.maps.Marker({
          position: geolocate,
          map: map,
          title: myname + ', ' + mytype + ', ' + myaddress,
          icon: 'marker.png'
        });
    }

//            var addrMarker2 = new google.maps.Marker({
//                position: geolocate2,
//                map: map,
//                title: (parseFloat(address_lat)+0.01) + ', ' + (parseFloat(address_long)+0.01),
//                icon: 'marker.png'
//            });
//            marker.setMap(map);
//            marker2.setMap(map);
//        } else {
//            alert('Geocode was not successful for the following reason: ' + status);
//        }
//    });
}

// find address function
function findAddress() {
    var address = document.getElementById("gmap_where").value;

    // script uses our 'geocoder' in order to find location by address name
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) { // and, if everything is ok

            // we will center map
            var addrLocation = results[0].geometry.location;
      //      alert(addrLocation.lat());
            map.setCenter(addrLocation);

            // store current coordinates into hidden variables
            document.getElementById('lat').value = results[0].geometry.location.lat();
            document.getElementById('lng').value = results[0].geometry.location.lng();

            // and then - add new custom marker
            var addrMarker = new google.maps.Marker({
                position: addrLocation,
                map: map,
                title: results[0].formatted_address,
                icon: 'marker.png'
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

// find custom places function
function findPlaces() {

    // prepare variables (filter)
    var type = document.getElementById('gmap_type').value;
//    type = 'restaurant';
    var radius = document.getElementById('gmap_radius').value;
    var keyword = document.getElementById('gmap_keyword').value;

    var lat = document.getElementById('lat').value;
    var lng = document.getElementById('lng').value;
//    alert(lat, lng);
    var cur_location = new google.maps.LatLng(lat, lng);

    // prepare request to Places
    var request = {
        location: cur_location,
        radius: radius,
        types: [type]
    };
    if (keyword) {
        request.keyword = [keyword];
    }

    // send request
    service = new google.maps.places.PlacesService(map);
    service.search(request, createMarkers);
}

// create markers (from 'findPlaces' function)
function createMarkers(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {

        // if we have found something - clear map (overlays)
        clearOverlays();

        // and create new markers by search result
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        alert('Sorry, nothing is found');
    }
}

// creare single marker function
function createMarker(obj) {

    // prepare new Marker object
    var mark = new google.maps.Marker({
        position: obj.geometry.location,
        map: map,
        title: obj.name
    });
    markers.push(mark);

    // prepare info window
    var infowindow = new google.maps.InfoWindow({
        content: '<img src="' + obj.icon + '" /><font style="color:#000;">' + obj.name +
        '<br />Rating: ' + obj.rating + '<br />Vicinity: ' + obj.vicinity + '</font>'
    });

    // add event handler to current marker
    google.maps.event.addListener(mark, 'click', function() {
        clearInfos();
        infowindow.open(map,mark);
    });
    infos.push(infowindow);
}

// initialization
google.maps.event.addDomListener(window, 'load', initialize);
