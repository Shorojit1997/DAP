

module.exports = "CREATE TABLE IF NOT EXISTS Medicines (" +
    "MedicineId INT NOT NULL AUTO_INCREMENT," +
    "PrescriptionId INT NOT NULL," +
    "PatientId INT NOT NULL," +
    "MedicineName VARCHAR(255)," +
    "Duration VARCHAR(255)," +
    "Parday VARCHAR(255)," +
    "Type VARCHAR(255)," +
    "Meal DATETIME(4) ," +
    "CREATED_AT TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
    "PRIMARY KEY (MedicineId)," +
    "FOREIGN KEY (PrescriptionId) REFERENCES  Prescriptions(PrescriptionId)," +
    "FOREIGN KEY (PatientId) REFERENCES  Patients(PatientId));"