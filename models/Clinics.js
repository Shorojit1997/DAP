

module.exports = "CREATE TABLE IF NOT EXISTS Clinics (" +
    "ClinicId INT NOT NULL AUTO_INCREMENT," +
    "ClinicName VARCHAR(255) ," +
    "Email VARCHAR(255) ," +
    "AddressId INT ," +
    "Balance FLOAT ," +
    "Phone VARCHAR(255) ," +
    "AccountNumber VARCHAR(255) ," +
    "CREATED_AT TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
    "PRIMARY KEY (ClinicId),"+
    "foreign key (AddressId) REFERENCES  Address(AddressId));"