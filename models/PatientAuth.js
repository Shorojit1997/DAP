

module.exports = "CREATE TABLE IF NOT EXISTS PatientAuths (" +
"PatientId INT NOT NULL," +
"PersonType varchar(25),"+
"username VARCHAR(255) ," +
"password VARCHAR(255) ,"+
"FOREIGN KEY (PatientId) REFERENCES  Patients(PatientId));"