const router = require("express").Router();
const db = require('../db');

const short = require('short-uuid');

//Generating waste api

router.post("/generate", async (req, res) => {
    const bagDataArray = req.body;
  
    try {
      const currentDateTime = new Date(); // Generate current date and time
      //console.log("Date Time is:", currentDateTime);

      for (const bagData of bagDataArray) 
      {
        const { 'Hospital_ID':hospital_ID, 'Color ID': colorId, 'Number of Bags': numberOfBags, 'Weight of Bags': weightOfBags, 'Driver ID': driverId, 'Vehicle ID': vehicleId, 'Bags Picked': bagsPicked, 'Weight Picked': weightPicked } = bagData;
  
        const query = "INSERT INTO `bagdetails` (`Hospital_ID`, `Color ID`, `Number of Bags`, `Weight of Bags`, `Driver ID`, `Vehicle ID`, `Bags Picked`, `Weight Picked`, `Pick up DateTime`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(query, [hospital_ID, colorId, numberOfBags, weightOfBags, driverId, vehicleId, bagsPicked, weightPicked, currentDateTime]);
      }
  
      res.status(200).json({ message: "Data inserted successfully." });
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({ error: "An error occurred while inserting data." });
    }
  });
  

//Add a device API
router.post('/AddDevice', (req, res) => {
  const { hospitalID } = req.query;
  const uid = short.generate();
  const { color, location } = req.body;
  console.log("Checking the color and corresponding ID.");
  console.log("Color name is: ", color);
  let bag_id;
    switch(color){
      case "Yellow":
        bag_id=1;
        break;
      case "Blue": 
        bag_id = 2;
        break;
      case "Red":
        bag_id = 3;
        break;
      case "White":
        bag_id = 4;
        break;
      default: 
        res.status(400).json({ message: "Invalid color_id"});
        return;
    }
    console.log("Color ID is: ", bag_id);

  let query = "INSERT INTO `bindetails` (`Device ID`, `Hospital_ID`, `Color ID`, `Location`) VALUES (?, ?, ?, ?)";

  db.query(query, [uid, hospitalID, bag_id, location], (err, result)=>{
    if(err) return res.status(404).json({message: "Error adding bin!"})
    return res.status(200).json(result)
  })

})

module.exports = router