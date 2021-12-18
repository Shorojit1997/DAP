

module.exports = "CREATE TABLE IF NOT EXISTS Address (" +
    "AddressId INT NOT NULL AUTO_INCREMENT," +
    "Location VARCHAR(255) ," +
    "Zip VARCHAR(255) ," +
    "Country VARCHAR(255) ," +
    "Primary key (AddressId) );"