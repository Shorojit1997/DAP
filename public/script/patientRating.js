
function addRating() {

    var optionName = document.getElementById('optionName');
    var RatingBox = document.getElementById('ratingBox');
    var InnerId = document.createElement('div');
    var optionName1 = optionName.value.trim();

    InnerId.classList.add('mt-1', 'row', 'd-flex', 'justify-content-between', 'align-items-center');


    if (optionName1.length)
        $.post('/dashboard/doctor/rating', {
            Description: optionName1
        }).done(function (data) {

            InnerId.innerHTML = ` 
    <h5 class="col-6 review-stat">${optionName1}</h5>
    <div class="col-3 small-ratings">
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i> 
        <i class="fa fa-star"></i>
        <i style='font-weight:bold;color:black'>(0)</i>
    </div>
    <div style="max-width:100px" class='col-3'>
      <button onclick="deleteRating(this,${data.data.RatingId})"  class='btn btn-sm btn-outline-danger'>Delete</button>
    </div>
    `
            RatingBox.appendChild(InnerId);
            optionName.value = '';
        })
            .fail(function (x, y, z) {

            })

}

function deleteRating(element, RatingId) {

    var newEle = element.parentNode.parentNode;
    var RatingBox = document.getElementById('ratingBox');


    $.post('/dashboard/doctor/delete/rating', {
        RatingId
    }).done(function (data) {
        RatingBox.removeChild(newEle);
    })
        .fail(function (x, y, z) {
        })

}