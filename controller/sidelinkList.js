
const DoctorSidebar = {
    header: "Your Profile",
    items: [
        {
            link: '/dashboard/present_consultation',
            title: 'Present Consultation'
        },
        {
            link: '/dashboard/doctor_profile',
            title: 'Previous Consultation'
        },
        {
            link: '/dashboard/doctor_profile',
            title: 'Appointment Request'
        }
    ]
}


const PatientSidebar = {
    header: "Your Profile",
    items: [
        {
            link: '/dashboard/doctor_profile',
            title: 'Present Consultation'
        },
        {
            link: '/dashboard/doctor_profile',
            title: 'Previous Consultation'
        },
        {
            link: '/dashboard/doctor_profile',
            title: 'Appointment Request'
        }
    ]
}

module.exports={DoctorSidebar,PatientSidebar}