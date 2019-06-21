//***************************** DOCUMENT READY ********************************/
//*****************************************************************************/

$(document).ready(function() {

  loadPoints();

});

//******************************* FUNCTIONS ***********************************/
//*****************************************************************************/

// append each point to points-container
function renderPoints(points) {
  for(let point of points) {
    let returnedPoint = createPointElement(point);
    $('#points_container').prepend(returnedPoint);
  }
}

// create HTML for points in sidebar
function createPointElement(point) {

  // assign point information to variables
  let title = point.title;
  let description = point.description;
  let imageName = point.image; // this will be the file path to the image on the server

  // create all tags to be appended and assign the values where needed
  let $article = $('<article>').addClass('TEMP');
  let $header = $('<header>');
  let $title = $('<h5>').addClass('points_title').text(title);
  let $div = $('<div>').addClass('points_info');
  let $image = $('<img>').addClass('points_img').attr('src', `/public/images/${imageName}`);
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
function loadPoints(){
  let path = window.location.pathname;
  console.log('This is the path in the URL: ' + path);
  $.ajax({
    method: 'GET',
    url: '/api/points'
  })
    .then(function (data) {
      console.log('It worked');
      console.log(data);
      renderPoints(data);
    });
}


