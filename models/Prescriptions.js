

module.exports = "CREATE TABLE IF NOT EXISTS Prescriptions (" +
    "PrescriptionId INT NOT NULL AUTO_INCREMENT," +
    "PatientId INT NOT NULL," +
    "AppointmentId INT NOT NULL," +
    "Consultants VARCHAR(255)," +
    "Problems VARCHAR(255)," +
    "BPh VARCHAR(255)," +
    "Weight VARCHAR(255)," +
    "CREATED_AT TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
    "PRIMARY KEY (PrescriptionId)," +
    "FOREIGN KEY (AppointmentId) REFERENCES  Appointments(AppointmentId)," +
    "FOREIGN KEY (PatientId) REFERENCES  Patients(PatientId));"