
// append each point to points-container
function renderPoints(points) {
  for(let point of points) {
    let returnedPoint = createPointElement(point);
    $('#points_container').prepend(returnedPoint);    // double check with Matt on class/id name
  }
}

// create HTML for new tweet element
function createPointElement(point) {

  // assign point information to variables
  let description = point.description;
  let imageName = point.image; // this will be the file path to the image on the server

  // create all tags to be appended and assign the values where needed
  let $article = $('<article>').addClass('TEMP');
  let $header = $('<header>').addClass('TEMP');
  let $title = $('<h3>').addClass('TEMP');
  let $div = $('<div>').addClass('points_info');
  let $image = $('<img>').addClass('points_img').attr('src', `/public/images/${imageName}`);

  // append all tags in reverse order (starting with furthest nested tags)

  $div
    .append('<p>').text(description)
    .append($image);

  $header
    .append($title);

  $article
    .append($header)
    .append($div);

  return $article;
}






// scripts that run when document is ready/loaded
$(document).ready(function() {
  console.log('test test test');

  // fetch points from database (points table)
  function loadPoints(){
    console.log('This is before chicken');

    let chicken = window.location.pathname;
    console.log('This is inside loadPoint function' + chicken);

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
  loadPoints();

});
