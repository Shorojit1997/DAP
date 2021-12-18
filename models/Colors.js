

module.exports = "CREATE TABLE IF NOT EXISTS Colors (" +
    "ColorId INT NOT NULL AUTO_INCREMENT," +
    "BackgroundColor VARCHAR(255)," +
    "Color VARCHAR(255)," +
    "NavbarBackgroundColor VARCHAR(255)," +
    "NavbarColor VARCHAR(255)," +
    "FooterBackgroundColor VARCHAR(255)," +
    "FooterColor VARCHAR(255)," +
    "AdminBackgroundColor VARCHAR(255)," +
    "AdminColor VARCHAR(255)," +
    "AdminNavbarBackgroundColor VARCHAR(255)," +
    "AdminNavbarColor VARCHAR(255)," +
    "AdminSidebarBackgroundColor VARCHAR(255)," +
    "AdminSidebarColor VARCHAR(255)," +
    "AdminFooterBackgroundColor VARCHAR(255)," +
    "AdminFooterColor VARCHAR(255)," +
    "CREATED_AT TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
    "PRIMARY KEY (ColorId));"