

module.exports = "CREATE TABLE IF NOT EXISTS Comments (" +
    "CommentId INT NOT NULL," +
    "BlogId INT NOT NULL," +
    "PatientId INT NOT NULL," +
    "Username VARCHAR(255)," +
    "Date DATETIME(4) ," +
    "Description VARCHAR(255) ," +
    "PRIMARY KEY (BlogId)," +
    "FOREIGN KEY (BlogId) REFERENCES  Blogs(BlogId),"+
    "FOREIGN KEY (PatientId) REFERENCES  Patients(PatientId));"