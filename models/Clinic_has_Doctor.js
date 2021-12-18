

module.exports = "CREATE TABLE IF NOT EXISTS Clinic_has_Doctors (" +
    "ClinicId INT NOT NULL," +
    "DoctorId INT NOT NULL," +
    "CREATED_AT TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
    "FOREIGN KEY (ClinicId) REFERENCES  Clinics(ClinicId)," +
    "FOREIGN KEY (DoctorId) REFERENCES  DoctorInfo(DoctorId));"