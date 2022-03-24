

module.exports = "CREATE TABLE IF NOT EXISTS Patients (" +
    "PatientId INT NOT NULL AUTO_INCREMENT," +
    "Name VARCHAR(255) ," +
    "Email VARCHAR(255) ," +
    "Username VARCHAR(255) ," +
    "Password VARCHAR(255) ," +
    "AddressId INT ," +
    "Balance FLOAT DEFAULT 0," +
    "Gender VARCHAR(255)," +
    "DateOfBirth VARCHAR(255) ," +
    "Phone VARCHAR(255) ," +
    "BloodGroup VARCHAR(255) ," +
    "Height INT ," +
    "Weight VARCHAR(255) ," +
    "Language VARCHAR(255)," +
    "AccountNumber VARCHAR(255) ," +
    "PRIMARY KEY (PatientId),"+
    "foreign key (AddressId) REFERENCES  Address(AddressId));"