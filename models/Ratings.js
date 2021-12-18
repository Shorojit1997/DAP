

module.exports = "CREATE TABLE IF NOT EXISTS Ratings (" +
    "RatingId INT NOT NULL AUTO_INCREMENT," +
    "DoctorId INT NOT NULL," +
    "Rating DOUBLE," +
    "Description VARCHAR(255)," +
    "Date DATE," +
    "RatingPatient VARCHAR(255)," +
    "Meal DATETIME(4) ," +
    "CREATED_AT TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
    "PRIMARY KEY (RatingId)," +
    "FOREIGN KEY (DoctorId) REFERENCES  DoctorInfo(DoctorId));" 