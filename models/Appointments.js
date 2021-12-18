

module.exports = "CREATE TABLE IF NOT EXISTS Appointments (" +
    "AppointmentId INT NOT NULL AUTO_INCREMENT," +
    "DoctorId INT NOT NULL," +
    "PatientId INT NOT NULL," +
    "Status VARCHAR(255)," +
    "VisitAt VARCHAR(255)," +
    "Location VARCHAR(255)," +
    "ProblemDesctiption VARCHAR(255)," +
    "Date DATETIME(4) ," +
    "Emmergiency INT ," +
    "NextAppointment DATETIME(4) ," +
    "CREATED_AT TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
    "PRIMARY KEY (AppointmentId)," +
    "FOREIGN KEY (DoctorId) REFERENCES  doctorinfo(DoctorId)," +
    "FOREIGN KEY (PatientId) REFERENCES  Patients(PatientId));"