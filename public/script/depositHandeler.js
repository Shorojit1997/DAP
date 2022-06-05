
function depositHandeler() {
    var viewId = document.getElementById('viewId');
    viewId.innerHTML = `
    <div class="d-flex justify-content-center mt-5 mb-5">
                <div class="card " style="width: 500px;">
                    <div class="card-header">
                        <h4>Pay Now</h4>
                    </div>
                    <div class="card-body">
                        <form action="/pay" method="post">
                            <div class="mb-3 mt-3">
                                <label for="amount" class="form-label">Amount:</label>
                                <input  type="number" class="form-control"
                                    id="amount" placeholder="Enter amount" name="amount">
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>

                </div>
            </div>
    `
}

function transactionList() {
    var viewId = document.getElementById('viewId');
    $.get('/dashboard/transaction', { pageNumber: 1 }, function (data, err) {
        viewId.innerHTML = `
                <table class="table">
                    <thead>
                        <tr>
                            <th>TNX_ID</th>
                            <th>Transfer_From</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    ${data.data.map(function (item) {
            return `
                        <tr>
                            <td>${item.TNX}</td>
                            <td>${item.TransferFrom}</td>
                            <td>${item.Status}</td>
                            <td>${item.Amount}</td>
                            <td>${item.CREATED_AT}</td>
                        </tr>
                        `
        }).join(" ")}

                    </tbody>
                </table>
        `
    })

}

function submitRating(AppointmentId,RatingId,Rating){
    var viewId = document.getElementById('viewId');
    $.post('/dashboard/patient/reviews', {
        AppointmentId,
        RatingId,
        Rating
    }).done(function (data) {
       viewId.innerHTML=generateRatingBar(data,AppointmentId);

    }).fail(function (x, y, z) {

    })

}

function postReview(AppointmentId) {
    var viewId = document.getElementById('viewId');
    $.get('/dashboard/patient/reviews', {
        AppointmentId
    }).done(function (data) {
       viewId.innerHTML=generateRatingBar(data,AppointmentId);

    }).fail(function (x, y, z) {

    })

}

function generateRatingBar(data,AppointmentId) {

    return data.data.map(function (element) {
        return `<div class="mt-1 row d-flex justify-content-center align-items-center">
        <div class="col-6 ratings">
                ${[0, 1, 2, 3, 4].map(function (item) {
            if (item < element.Rating) {
                return ` <i onclick="submitRating(${AppointmentId},${element.RatingId},${item+1})" class="fa fa-star rating-color" style="cursor:pointer"></i>`
            }
            else {
                return ` <i onclick="submitRating(${AppointmentId},${element.RatingId},${item+1})" class="fa fa-star" style="cursor:pointer"></i>`
            }
        }).join('')

            }
        </div>
        <h5 class="col-5 review-stat">
        ${element.Description}
     </h5>
      
    </div>`
    }).join('')

}




