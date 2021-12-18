

module.exports = "CREATE TABLE IF NOT EXISTS Medicle_reports (" +
    "ReportId INT NOT NULL AUTO_INCREMENT," +
    "PrescriptionId INT NOT NULL," +
    "PatientId INT NOT NULL," +
    "ReportName VARCHAR(255)," +
    "Url VARCHAR(255)," +
    "Parday VARCHAR(255)," +
    "Description VARCHAR(255)," +
    "CREATED_AT TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
    "PRIMARY KEY (ReportId)," +
    "FOREIGN KEY (PrescriptionId) REFERENCES  Prescriptions(PrescriptionId)," +
    "FOREIGN KEY (PatientId) REFERENCES  Patients(PatientId));"