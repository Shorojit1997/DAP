

module.exports = "CREATE TABLE IF NOT EXISTS Patient_has_Ratings (" +
    "RatingId INT NOT NULL," +
    "PatientId INT NOT NULL," +
    "CREATED_AT TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
    "FOREIGN KEY (RatingId) REFERENCES  Ratings(RatingId)," +
    "FOREIGN KEY (PatientId) REFERENCES  Patients(PatientId));"