

module.exports = "CREATE TABLE IF NOT EXISTS Admins (" +
    "AdminId INT NOT NULL AUTO_INCREMENT," +
    "Email VARCHAR(255)," +
    "Phone VARCHAR(255)," +
    "Password VARCHAR(255)," +
    "Status VARCHAR(255)," +
    "AdminStatus VARCHAR(255)," +
    "Name VARCHAR(255)," +
    "CREATED_AT TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
    "PRIMARY KEY (AdminId));"