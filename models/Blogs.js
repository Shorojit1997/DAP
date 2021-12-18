

module.exports = "CREATE TABLE IF NOT EXISTS Blogs (" +
    "BlogId INT NOT NULL," +
    "DoctorId INT NOT NULL," +
    "Date DATETIME(4) ," +
    "Description VARCHAR(255) ," +
    "PRIMARY KEY (BlogId)," +
    "FOREIGN KEY (DoctorId) REFERENCES  doctorinfo(DoctorId));"