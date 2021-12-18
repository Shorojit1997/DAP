

module.exports = "CREATE TABLE IF NOT EXISTS DoctorAuth (" +
    "DoctorId INT NOT NULL," +
    "PersonType varchar(25)," +
    "username VARCHAR(255) ," +
    "password VARCHAR(255) ," +
    "FOREIGN KEY (DoctorId) REFERENCES  doctorinfo(DoctorId));"