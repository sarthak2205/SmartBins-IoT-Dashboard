const router = require("express").Router();
const db = require('../db');

router.post('/pickup', (req, res) => {
    const { driver, vehicle } = req.query;
    const data = req.body;
    console.log("Data is: ", data);
  
    // Define a mapping from color to bag_id
    const colorToBagId = {
      "Yellow": 1,
      "Blue": 2,
      "Red": 3,
      "White": 4
    };
  
    const values = data.map((item) => {
      const color = item.color;
      const bag_id = colorToBagId[color];
  
      // Check if bag_id is valid
      if (bag_id === undefined) {
        return res.status(400).json({ message: "Invalid color: " + color });
      }
  
      // Adjust this part based on your data structure
      return [
        item.hospitalID,
        bag_id,
        item.quantity,
        item.weight,
        driver,
        vehicle
      ];
    });
  
    let query = "INSERT INTO `driverbagdetails` (`Hospital ID`, `Color ID`, `Bags Picked`, `Weight`, `Driver ID`, `Vehicle ID`) VALUES ?";
  
    db.query(query, [values], (err, result) => {
      if (err) {
        return res.status(404).json({ message: "Error adding Driver Pick Up Details!" });
      }
      return res.status(200).json({ message: "Data inserted successfully" });
    });
  });
  


module.exports = router