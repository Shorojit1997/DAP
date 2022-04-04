

function getPrescriptonDetails(AppointmentId) {
    var PrescriptionSection = document.getElementById('viewId');
    $.get('/dashboard/patient/prescription', { AppointmentId }).done(function (data) {
       
        PrescriptionSection.innerHTML = generateFile(data);

    }).fail(function (err, ht, h) {

    })
}

function generateFile(data) {

    const { DoctorName, Medicine, MedicleReports } = data.data;

    return `<div class="d-flex justify-content-center flex-column">
    <div style="border-bottom: 1px solid rgb(212, 210, 210); font-size: 22px; font-weight: 600;">
        Dr ${DoctorName[0].Name}
    </div>

    <div id="viewId" class="row" style="height: 400px;">
        

        <div class="col-3" style="border-right: 2px solid gray; height: 400px;">
            <div
            style="font-size:18px;font-weight: bold; text-decoration: underline;font-style: italic;">
            Medicle Test</div>
            <!-- reports section for doctor  -->
            <div id="reportSection"
                class="d-flex flex-column mt-4 justify-content-start align-items-start">
                ${MedicleReports.map(function (element) {
        return `
                    <div class="row w-100 m-0 p-0">
                    <div class="col-8">
                        ${element.ReportName}
                    </div>
                    
                </div>`
    }).join(' ')}
            </div>

        </div>
        <div class="col-7">
            <div
            style="font-size:18px;font-weight: bold; text-decoration: underline;font-style: italic;">
            Medicine</div>
            <!-- medicine sections  -->
            <div id="medicineSection"
                class="d-flex flex-column mt-4 justify-content-start align-items-start">
                ${Medicine.map(function (element) {
        return `
                    <div class="d-flex flex-column justify-content-center w-100" style="font-size: 16px;">
                    <div class="row w-100 m-1 p-0">
                        <div class="col-2" style="font-weight: bold; font-style: italic;">
                            ${element.Type} :
                        </div>
                        <div class="col-6">
                            ${element.MedicineName}
                        </div>
                        <div class="col-2">
                            ${element.Duration} times
                        </div>
                        
                    </div>
                    <div class="row w-100 notes" >
                        <div class="col-3"></div>
                        <div class="col-9">${element.Note}</div>
                       
                    </div>
                </div>`
    }).join(' ')}
              
            </div>

        </div>

    </div>
</div>
</div>
    
    `
}

function showAppointment(AppointmentId) {
    var viewId=document.getElementById("viewId");

    $.get('/dashboard/view/appointment_details', { AppointmentId }).done(function (data) {
        viewId.innerHTML=genereateTable(data);
    }).fail(function (err, ht, h) {
       
    })
}


function genereateTable(data){

    console.log(data)
   
        return `
        <table class="table table-bordered">
                                <thead class=" table-dark">
                                    <tr>
                                        <th>Doctor_Name</th>
                                        <th>Problem</th>
                                        <th>VisitAt</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                ${ data.data.AppointmentDetails.map(function(element){
                                     return `
                                        <tr>
                                            <td>${element.Name}</td>
                                            <td>${element.ProblemDesctiption}</td>
                                            <td>${element.VisitAt} </td>
                                            <td> ${element.Date}</td>
                                            <td><button onclick="getPrescriptonDetails(${element.AppointmentId})" class="btn btn-sm btn-success">View</button> </td>
                                        </tr>
                                        `
                                })}
                                    
                                </tbody>
                            </table>`
    
}

