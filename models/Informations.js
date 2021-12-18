

module.exports = "CREATE TABLE IF NOT EXISTS Informations (" +
    "InformationId INT NOT NULL AUTO_INCREMENT," +
    "WebsiteName VARCHAR(255)," +
    "Domain VARCHAR(255)," +
    "Facebook VARCHAR(255)," +
    "Youtube VARCHAR(255)," +
    "Whatsup VARCHAR(255)," +
    "Twiter VARCHAR(255)," +
    "Instagram VARCHAR(255)," +
    "Linkdin VARCHAR(255)," +
    "Footer VARCHAR(255)," +
    "Meta_des VARCHAR(255)," +
    "Meta_keyword VARCHAR(255)," +
    "Meta_title VARCHAR(255)," +
    "Title VARCHAR(255)," +
    "About VARCHAR(255)," +
    "Logo VARCHAR(255)," +
    "Google_analytics VARCHAR(255)," +
    "CREATED_AT TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
    "PRIMARY KEY (InformationId));"