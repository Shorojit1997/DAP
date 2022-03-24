

module.exports = "CREATE TABLE IF NOT EXISTS Transactions (" +
    "TransactionId INT NOT NULL AUTO_INCREMENT," +
    "DoctorId INT," +
    "PatientId INT ," +
    "ClinicId INT," +
    "Status VARCHAR(255)," +
    "TNX VARCHAR(255)," +
    "Amount FLOAT," +
    "TransferFrom VARCHAR(255)," +
    "CREATED_AT TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
    "PRIMARY KEY(TransactionId),"+
    "FOREIGN KEY (DoctorId) REFERENCES  DoctorInfo(DoctorId)," +
    "FOREIGN KEY (PatientId) REFERENCES  Patients(PatientId));"
    "FOREIGN KEY (ClinicId) REFERENCES  Clinics(ClinicId));"