

module.exports = "CREATE TABLE IF NOT EXISTS DoctorInfo (" +
    "DoctorId INT NOT NULL AUTO_INCREMENT," +
    "Name VARCHAR(255) ," +
    "Bio VARCHAR(255) ," +
    "VideoBioUrl VARCHAR(255),"+
    "Speciality VARCHAR(255) ," +
    "treatmentAreas VARCHAR(255) ," +
    "Available VARCHAR(255) ," +
    "Awards VARCHAR(255) ," +
    "Membership VARCHAR(255) ," +
    "Since DATE ," +
    "VisitClinic INT ," +
    "VisitOnline INT ," +
    "Email VARCHAR(255) ," +
    "Username VARCHAR(255) ," +
    "Password VARCHAR(255) ," +
    "AddressId INT ," +
    "SearchTag VARCHAR(255) ," +
    "Balance FLOAT ," +
    "Gender VARCHAR(255)," +
    "DateOfBirth DATETIME(4) ," +
    "Phone VARCHAR(255) ," +
    "BloodGroup VARCHAR(255) ," +
    "Height INT ," +
    "Weight VARCHAR(255) ," +
    "Language VARCHAR(255)," +
    "CompleteProfile INT," +
    "PictureUrl VARCHAR(255)," +
    "AccountNumber VARCHAR(255) ," +
    " PRIMARY KEY (DoctorId),"+
    "foreign key (AddressId) REFERENCES  Address(AddressId));"