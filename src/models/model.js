var sql = require("../../config/connection");

//Common Constructor
var Details = function (details) {
  this.RegNo = details.RegNo;
  this.CardUID = details.CardUID;
  this.Name = details.Name;
  this.DoB = details.DoB;
  this.MobNo = details.MobNo;
  this.CourseNo = details.CourseNo;
  this.DadName = details.DadName;
  this.DadMobNo = details.DadMobNo;
  this.MomName = details.MomName;
  this.MomMobNo = details.MomMobNo;
  this.DoorNo = details.DoorNo;
  this.Address = details.Address;
  this.Area = details.Area;
  this.City = details.City;
  this.State = details.State;
  this.Pin = details.Pin;
  this.Country = details.Country;
  this.CourseName = details.CourseName;
  this.SubjectNo = details.SubjectNo;
  this.SubjectName = details.SubjectName;
  this.DayofWeek = details.DayofWeek;
  this.Subject_Time = details.Subject_Time;
  this.Date = details.Date;
  this.Time = details.Time;
};

// DEFAULT GET FUNCTION
Details.gettingDataFunction = (result) => {
  sql.query("SELECT * FROM Std_Details;SELECT * FROM Id", (err, res) => {
    if (err) {
      console.log("Error while fetching from Database");
      result(null, err);
    } else {
      console.log("Data fetched from Database");
      result(null, res);
    }
  });
};

// REGISTRARION FUNCTION
Details.RegistrationFunction = (body, result) => {
  sql.query(
    "INSERT INTO Id SET RegNo=?, CardUID=?",
    [body.RegNo, body.CardUID],
    (err) => {
      if (err) {
        console.log("Error ehile Inserting Data 1 from model.js", err);
        result(null, err);
      }
    }
  );
  sql.query(
    "INSERT INTO Std_Details SET RegNo=?, Name=?, DoB=?, MobNo=?, CourseDetails=?",
    [body.RegNo, body.Name, body.DoB, body.MobNo, body.CourseDetails],
    (err, res) => {
      if (err) {
        console.log("Error ehile Inserting Data 2 from model.js", err);
        result(null, err);
      } else {
        result(null, {
          Status: true,
          message: "DATA INSERTED",
          iden: res.id,
        });
      }
    }
  );
};

//STORING ATTENDANCE
Details.StoreAttendanceFunction = (body, result) => {
  sql.query(
    "INSERT INTO Store_Attendance SET CardUID=?, Date=?, Time=?",
    [body.CardUID, body.Date, body.Time],
    (err, res) => {
      if (err) {
        console.log("Error while storing Attendance", err);
        result(null, err);
      } else {
        result(null, {
          Status: true,
          message: "ATTENDANCE STORED",
          iden: res.id,
        });
      }
    }
  );
};

//GETTING ATTENDANCE
Details.GetAttendanceFunction = (id, sub, result) => {
  sql.query(
    "SELECT Id.RegNo REG, Std_Details.Name, Subjects.Subject_Name, count(Store_Attendance.CardUID) Attendance FROM Id CROSS JOIN Std_Details ON Std_Details.RegNo = Id.RegNo CROSS JOIN Store_Attendance ON Store_Attendance.CardUID = Id.CardUID CROSS JOIN TimeTable ON TimeTable.Subject_Time = Store_Attendance.Time CROSS JOIN Subjects ON Subjects.Subject_No = TimeTable.Subject_No WHERE Id.RegNo=? and TimeTable.Subject_No=02",
    id,
    (err, res) => {
      if (err) {
        console.log("ERROR WHILE FETCHING ATTENDANCE DATA", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Details.TestFunction = (body, result) => {
  sql.query("INSERT INTO Test Set CardUID=?", [body.CardUID], (err, res) => {
    if (err) {
      console.log("Error while storing Attendance", err);
      result(null, err);
    } else {
      result(null, {
        Status: true,
        message: "CARDUID STORED",
        iden: res.id,
      });
    }
  });
};

module.exports = Details;
