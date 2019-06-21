//***************************** DOCUMENT READY ********************************/
//*****************************************************************************/

$(document).ready(function() {
  let map = (window.location.pathname).replace('/maps/', '');

  loadPoints(map);

});

//******************************* FUNCTIONS ***********************************/
//*****************************************************************************/

// append each point to points-container
function renderPoints(points, map) {
  for(let point of points) {
    console.log('This is the map id for the point: ' + point.map_id);
    console.log('This is the map id we need based on url: ' + map);

    if(point.map_id == map) {
      console.log('THIS WORKED');

      let returnedPoint = createPointElement(point);
      $('#points_container').prepend(returnedPoint);
    }
  }
}

// create HTML for points in sidebar
function createPointElement(point) {

  // assign point information to variables
  let title = point.title;
  let description = point.description;
  let imageLink = point.image;

  // create all tags to be appended and assign the values where needed
  let $article = $('<article>').addClass('TEMP');
  let $header = $('<header>');
  let $title = $('<h5>').addClass('points_title').text(title);
  let $div = $('<div>').addClass('points_info');
  let $image = $('<img>').addClass('points_img').attr('src', imageLink);
  let $description = $('<p>').text(description);

  // append all tags in reverse order (starting with furthest nested tags)
  $div
    .append($description)
    .append($image);

  $header
    .append($title);

  $article
    .append($header)
    .append($div);

  return $article;
}

// fetch points from database (points table)
function loadPoints(map){
  $.ajax({
    method: 'GET',
    url: '/points'
  })
    .then(function (data) {
      initMap(data, map);
      renderPoints(data, map);
    });
}

// function to load map
function initMap(data, map) {

  let center = centerOfMap(data);

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: center
  });
  for (let point of data) {
    let tempPosition = {lat: point.latitude, lng: point.longitude};
    let marker = new google.maps.Marker({
      position: tempPosition,
      map: map
    });
  }
}
// function to find center of map based on average from points
function centerOfMap(points) {
  let totalLat = 0;
  let totalLong = 0;
  let counter = 0;
  for (let point of points) {
    counter += 1;
    totalLat += point.latitude;
    totalLong += point.longitude;
  }

  let avgLat = totalLat / counter;
  let avgLong = totalLong / counter;

  return ({lat: avgLat, lng: avgLong});
}



// function to find center of map based on average from points
