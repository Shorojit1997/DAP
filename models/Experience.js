

module.exports = "CREATE TABLE IF NOT EXISTS Experience (" +
    "DoctorId INT NOT NULL," +
    "ExperienceName VARCHAR(255) ," +
    "FOREIGN KEY (DoctorId) REFERENCES  doctorinfo(DoctorId));"