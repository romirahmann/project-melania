const odbc = require("odbc");
require("dotenv").config();
const path = require("path");

// const dbDataPath = path.resolve(__dirname, "../database/dbData.mdb");
const dbDataPath = path.resolve(process.env.DB_PATH);
// console.log(dbDataPath);
const dbPassword = process.env.DB_PASSWORD || "";

// Konfigurasi koneksi ODBC tanpa DSN
const connectionString = `DRIVER={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=${dbDataPath};PWD=${dbPassword};`;

let db;

async function connectDB() {
  try {
    db = await odbc.connect(connectionString);
    console.log("✅ Database 1 connected successfully!");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
}

const getDB = () => {
  if (!db) {
    throw new Error("Database not connected. Call connectDB() first.");
  }
  return db;
};

module.exports = { connectDB, getDB };
