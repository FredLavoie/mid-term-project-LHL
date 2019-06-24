//***************************** DOCUMENT READY ********************************/
//*****************************************************************************/

$(document).ready(function() {
  let mapNum = (window.location.pathname).replace('/maps/', '');

  loadPoints(mapNum);

});

//******************************* FUNCTIONS ***********************************/
//*****************************************************************************/

// append each point to points-container
function renderPoints(points, mapNum) {
  for(let point of points) {
    if(point.map_id == mapNum) {
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
  let point_id = point.id;

  // create all tags to be appended and assign the values where needed
  let $article = $('<article>').addClass('indiv_point');
  let $header = $('<header>').addClass('flex_header');
  let $edit = $('<button>').addClass('btn btn-secondary').text('Edit').attr('id', 'edit_button');
  let $title = $('<h4>').addClass('points_title').text(title);
  let $div = $('<div>').addClass('points_info');
  let $image = $('<img>').addClass('points_img').attr('src', imageLink);
  let $description = $('<p>').text(description);
  let $form = $('<form>').attr('action', `/points/${point_id}/update`).attr('method', 'GET');

  // append all tags in reverse order (starting with furthest nested tags)
  $form
    .append($edit);

  $header
    .append($title);

  $div
    .append($header)
    .append($description)
    .append($form);

  $article
    .append($div)
    .append($image);

  return $article;
}

// fetch points from database (points table)
function loadPoints(mapNum){
  $.ajax({
    method: 'GET',
    url: '/points'
  })
    .then(function (data) {
      initMap(data, mapNum);
      renderPoints(data, mapNum);
    });
}

// function to load map
function initMap(data, mapNum) {

  let center = centerOfMap(data, mapNum);

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: center
  });

  for (let point of data) {
    if(point.map_id == mapNum) {
      let tempPosition = {lat: point.latitude, lng: point.longitude};
      marker = new google.maps.Marker({
        position: tempPosition,
        map: map
      });
    }
  }

}

// function to find center of map based on average from points
function centerOfMap(points, mapNum) {
  let totalLat = 0;
  let totalLong = 0;
  let counter = 0;
  for (let point of points) {
    if(point.map_id == mapNum) {
      counter += 1;
      totalLat += point.latitude;
      totalLong += point.longitude;
    }
  }

  let avgLat = totalLat / counter;
  let avgLong = totalLong / counter;

  return ({lat: avgLat, lng: avgLong});
}
