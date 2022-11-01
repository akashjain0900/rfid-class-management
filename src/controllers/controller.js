const Details_Fetch = require("../models/model");

//GETTING
exports.gettingDataFetch = (req, res) => {
  Details_Fetch.gettingDataFunction((err, data) => {
    if (err) {
      res.send("ERROR WHILE GETTING DATA FROM DATABASE");
    }
    //console.log("Data ", data);
    res.send(data);
  });
};

//INSERTING
exports.RegistrationFetch = (req, res) => {
  const Details_Request = new Details_Fetch(req.body);
  if (req.body.constructor === Object && Object(req.body).length === 0) {
    res.status(400).send({ success: false, message: "INAPPROPRIATE DATA" });
  } else {
    Details_Fetch.RegistrationFunction(Details_Request, (err, data) => {
      if (err) {
        res.status(500).send("ERROR WHILE POSTING DATA");
      } else {
        res.status(200).send(data);
      }
    });
  }
};

//STORING ATTENDANCE
exports.StoreAttendanceFetch = (req, res) => {
  const Details_Request = new Details_Fetch(req.body);
  if (req.body.constructor === Object && Object(req.body).length === 0) {
    res
      .status(400)
      .send({ success: false, message: "INAPPROPRIATE STORE DATA" });
  } else {
    Details_Fetch.StoreAttendanceFunction(Details_Request, (err, data) => {
      if (err) {
        res.status(500).send("ERROR WHILE STORING ATTENDANCE");
      } else {
        res.status(200).send(data);
      }
    });
  }
};

//GET ATTENDANCE
exports.GetAttendanceFunction = (req, res) => {
  Details_Fetch.GetAttendanceFunction(
    req.params.id,
    req.params.sub,
    (err, data) => {
      if (err) res.status(500).send("ERROR WHILE GETTING ATTENDANCE");
      else res.status(200).send(data);
    }
  );
};

exports.TestFetch = (req, res) => {
  const Details_Request = new Details_Fetch(req.body);
  if (req.body.constructor === Object && Object(req.body).length === 0) {
    res
      .status(400)
      .send({ success: false, message: "INAPPROPRIATE STORE DATA" });
  } else {
    Details_Fetch.TestFunction(Details_Request, (err, data) => {
      if (err) {
        res.status(500).send("ERROR WHILE STORING ATTENDANCE");
      } else {
        res.status(200).send(data);
      }
    });
  }
};
