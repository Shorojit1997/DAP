

module.exports = "CREATE TABLE IF NOT EXISTS Educations (" +
    "DoctorId INT NOT NULL," +
    "_Option VARCHAR(255) ," +
    "FOREIGN KEY (DoctorId) REFERENCES  doctorinfo(DoctorId));"