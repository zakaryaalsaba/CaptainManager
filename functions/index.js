/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

//  const {onRequest} = require("firebase-functions/v2/https");
//  const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const pool = require("./db"); // Import the database connection

exports.getDriversBySupervisor = functions.https.onRequest(async (req, res) => {
  try {
    const {supervisorId} = req.query;

    if (!supervisorId) {
      return res.status(400).json({error: "SupervisorId is required"});
    }

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Call the stored procedure
    const [results] = await connection.query(
        "CALL GetDriversBySupervisorId(?)",
        [supervisorId]);

    // Release the connection
    connection.release();

    if (results[0].length === 0) {
      return res.status(404).json(
          {message: "No drivers found for this supervisor."});
    }
    return res.status(200).json(results[0]);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return res.status(500).json({error: "Internal Server Error", 
      message: error.message , stack: error.stack});
  }
});
