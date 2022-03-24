
function CheckBox(checkbox,value){

    var InsetItem=document.getElementById('filerDiv');
    
    var paraMeters={
        Gender: (value=="Male" || value=='Female' )? value:"",
        Speciality: (value=="Urology" || value=='Kidney' || value=="Fever")? value:"",
    }
   
    if(checkbox.checked){
        $.get('/doctor/search',paraMeters,function(items,status){
            InsetItem.innerHTML=`
            ${items.map(function(item){
                return `
                <div  class="card ps-1 pe-1 pt-4 pb-4 mb-3">
                            <div  class="row">
                                <div class="col-2">
                                    <img width="100px" style="border-radius: 50%;" height="100px"
                                        src="/images/searchDoctor.jpg" alt="searchDoctor">
                                </div>
                                <div class="col-6">
                                    <div class="d-flex w-100 flex-column align-items-start">
                                        <p class="forName">${item.Name} </p>
                                        <p class="forBody">${item._Option } </p>
                                        <p class="forBody">Specializes in ${item.Speciality}  </p>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="d-flex w-100 flex-column align-items-start">
                                        <p class="forBody">
                                            <i class='fa fa-check-circle ' style='font-size:18px;color:green;'></i>
                                            5 Patient Feedback
                                        </p>
                                        <p class="forBody">
                                            <i class='fa fa-check-circle ' style='font-size:18px;color:green;'></i>
                                            52 Years experience
                                        </p>
                                        <p class="forBody">
                                            <i class='fa fa-check-circle ' style='font-size:18px;color:green;'></i>
                                            ${item.VisitClinic}  at Clinic
                                        </p>
                                        <p class="forBody">
                                            <i class='fa fa-check-circle ' style='font-size:18px;color:green;'></i>
                                            ${item.VisitOnline } at Online
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center " style="font-size: 16px; color: blue;">
                               <a href="/doctor/view/profile? DoctorId=<%=element.DoctorId %>">View Profile</a>
                            </div>
                        </div>
                `
            })}
            
            `

        })
    }
    else{
        
    }
}