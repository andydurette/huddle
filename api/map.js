let map;

let lastOpenedInfoWindow = null;

function initMap() {
     
    map = new google.maps.Map(document.getElementById("map"), {
          
        styles: [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#ebe3cd"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#fffff2"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#7a3232"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dfd2ae"
                }
              ]
            },
            {
              "featureType": "poi.business",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#fffff3"
                }
              ]
            },
            {
              "featureType": "poi.business",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#ee7600"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#a5b076"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f5f1e6"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#fdfcf8"
                }
              ]
            },
            {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#0c90ee"
                }
              ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.stroke",
                  "stylers": [
                    {
                      "color": "#fffff2"
                    }
                  ]
                },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f8c967"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#e9bc62"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e98d58"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#7a3232"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#0c90ee"
                }
              ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#ffffe0"
                  }
                ]
              },
            {
              "featureType": "transit.line",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dfd2ae"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#8f7d77"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#ebe3cd"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dfd2ae"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#b9d3c2"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#92998d"
                }
              ]
            }
          ]
    });

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(initMapWithPosition); 
        return;
    }
    
    map.setCenter({lat: 43.651070, lng: -79.347015});
    map.setZoom(13);
}

function initMapWithPosition(position){
    map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
    map.setZoom(13);    
}

function setMarkers(restuarantList, image) {
   
    let restaurants = [];

    if (restuarantList.length > 0) {
        restaurants = restuarantList;        
    
        createMarkers(restaurants, image);
    }
    
}

async function createMarkers(restaurants, image) {
    let markers = [];
    for (const restuarant of restaurants) {
        let imageSource = '';
        let mlat = parseFloat(restuarant.lat);
        let mlng = parseFloat(restuarant.lon);
        let position = { lat: mlat, lng: mlng };

        let infowindow = new google.maps.InfoWindow({ minWidth: 400 });

        let marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: image,
            title: restuarant.name,                
            property_id: restuarant.id
        });

        google.maps.event.addListener(marker, 'click', (function (marker, thisRestaurant) {

            return function () {
                //get info window content for particular restaurant

                if (lastOpenedInfoWindow){
                    lastOpenedInfoWindow.close();
                }
                if (thisRestaurant.image_url !== null) {
                    imageSource = thisRestaurant.image_url;
                } else {
                    imageSource = "";//'/Images/info_window_fallback.png';
                }
                console.log(thisRestaurant);
                
                let categoriesStr = "cuisines";
                // let categoriesStr = thisRestaurant.categories.map(e =>{                        
                //     return e.title;
                // }).join(", ");                   
                
                let contentDiv = $("<div>").addClass("maps-info-pane")
                    .append($("<h2>").addClass("restaurant-name").text(thisRestaurant.name),
                            $("<div>").addClass("")
                            .append($("<div>").addClass("").attr("style",`background-image: url("${imageSource}")'`),
                                    $("<div>").addClass("restaurant-info")
                                    .append($("<h4>").addClass("address").text(JSON.parse(thisRestaurant.address).address1),
                                             $("<p>").addClass("").html(`Cuisine: <strong>${thisRestaurant.cuisines}</strong>`),
                                             $("<p>").addClass("").html(`Price: <strong>${thisRestaurant.price}</strong>`),
                                             $("<p>").addClass("").html(`Rating: <strong>${generateRatingGraphic(thisRestaurant.rating).get()[0].outerHTML}</strong>`),
                                             $("<button>").addClass("btn btn-success").attr("data-yelpid",thisRestaurant.visited?thisRestaurant.id:thisRestaurant.yelp_id).text("Show Details")
                                                .on('click', async function(event){
                                                   
                                                    console.log("hi");
                                                    let yelp_id = $(event.currentTarget).data("yelpid");
                                                    //console.log(yelp_id);
                                                    loadInfoModal(yelp_id, thisRestaurant.added_at);
                                                })
                                    )
                            )
                    );
              
                infowindow.setContent(contentDiv.clone(true)[0]);
                infowindow.open(map, marker);

                lastOpenedInfoWindow = infowindow;
            }
        })(marker, restuarant));
        markers.push(marker);
    }     
    
    // let listener = await google.maps.event.addListener(map, "idle", function () {
    //     fitMarkersInBounds(map, markers);
    //     google.maps.event.removeListener(listener);
    // });
    if(markers.length > 0 ){
        fitMarkersInBounds(map, markers);
        panToRestaurantClick(map, markers); //When restaurant div is clicked, move tha map's focus and zoom into it
    }
}

function fitMarkersInBounds(map, markers) {
    
    let bounds = new google.maps.LatLngBounds();
    
    for(const marker of markers){
        bounds.extend(marker.position);
    }

    map.fitBounds(bounds,
        { //padding
            top: 30,
            left: 10, //panelWidth
            bottom: 10,
            right: 10
        });
    map.panToBounds(bounds);        
    
}

function panToRestaurantClick(map, markers) {
    let elements = document.getElementsByClassName("restaurantContainer");
   
    for (let i = 0; i < elements.length; i++) {

        elements[i].setAttribute("markerIndex", i);
        elements[i].addEventListener("click", function (e) {
            google.maps.event.trigger(markers[e.currentTarget.getAttribute("markerIndex")], 'click');
            map.setZoom(15);
            
            map.panTo(markers[e.currentTarget.getAttribute("markerIndex")].getPosition());
            // if ($(window).width() > 550) {
            //     map.panBy(((mapWidth / 2) - ((mapWidth - panelWidth) / 2)), 0);
            // }
        });
    }
}



