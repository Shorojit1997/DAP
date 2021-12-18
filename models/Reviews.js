

module.exports = "CREATE TABLE IF NOT EXISTS Reviews (" +
    "ReviewId INT NOT NULL AUTO_INCREMENT," +
    "DoctorId INT NOT NULL," +
    "PatientId INT NOT NULL," +
    "Description VARCHAR(255)," +
    "Date DATETIME(4)," +
    'PRIMARY KEY (ReviewId),'+
    "FOREIGN KEY (DoctorId) REFERENCES  doctorinfo(DoctorId)," +
    "FOREIGN KEY (PatientId) REFERENCES  Patients(PatientId));"