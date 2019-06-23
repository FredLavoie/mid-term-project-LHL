//***************************** DOCUMENT READY ********************************/
//*****************************************************************************/

$(document).ready(function() {
  let pointNum = window.location.pathname;

  // loadPointToEdit(userNum);

});

//****************************** LOAD POINT ***********************************/
//*****************************************************************************/

function loadPointToEdit(userNum){

  $.ajax({
    method: 'GET',
    url: pointNum
  })
    .then(function (data) {
      console.log(data);

    });
}

