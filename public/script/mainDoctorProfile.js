
function AcceptPatientRequest(element){

    var id=element.id;
   var dateId=document.getElementById('date13')
   console.log(dateId)

    $.post('/dashboard/accept',{date:dateId,appointmentId:id},function(status,data){
        console.log(data);
        element.parentNode.parentNode.remove();
        
    })

}

function ShowDoctorList(element){
     var activelist=document.querySelectorAll('#myButton > *');
     activelist.forEach(function(ele){
         ele.classList.remove('btn-warning');
         ele.classList.add('btn-light');
     });
     element.classList.remove('btn-light')
     element.classList.add('btn-warning');
}