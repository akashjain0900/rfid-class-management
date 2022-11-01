const config = {
  db: {
    host: "akash-pi", //192.168.137.115", //process.env.DATABASE_HOST,
    user: "pisql", //process.env.DATABASE_USER,
    password: "Akash.0900", //process.env.DATABASE_PASSWORD,
    database: "Attendance", //process.env.DATABASE_NAME,
    multipleStatements: true,
  },
};

module.exports = config;
