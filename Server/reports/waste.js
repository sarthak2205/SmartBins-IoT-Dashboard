const router = require("express").Router();
const db = require('../db');
const dayjs = require('dayjs');


//Getting data for dashboard table
router.get("/tabledata", async (req, res) => {
    const { hospitalID } = req.query;

    let query = "SELECT c.`Color Name` AS ColorName, SUM(bd.`Number of Bags`) AS QuantityPacked, SUM(`bd`.`Weight of Bags`) AS WeightPacked, SUM(bd.`Bags Picked`) AS QuantityPicked,  SUM(bd.`Weight Picked`) AS WeightPicked, GROUP_CONCAT(d.`Driver Name` SEPARATOR ', ') AS DriverName FROM `bagdetails` bd JOIN `bagcolors` c ON bd.`Color ID` = c.`Color ID` JOIN `driverdetails` d ON bd.`Driver ID` = d.`Driver ID` WHERE bd.`Hospital_ID` = 1 AND DATE(bd.`Pick up DateTime`) = DATE(NOW() - INTERVAL 1 DAY) GROUP BY c.`Color Name`; " 

    db.query(query, hospitalID, (err, result) => {
        if(err) return res.status(404).json({message: "Error in getting table data for dashboard", error: err});
        return res.status(200).json(result);
    })
})


//Get color data
router.get('/color', async(req, res) => {
    const { hospitalID } = req.query;

    let query = "SELECT `Color Name` FROM `bagcolors` WHERE `Hospital_ID`=?"
    db.query(query,[hospitalID] ,(err, result) => {
        if(err) 
            return res.status(404).json({ message: "Error in fetching the color", error: err})
        return res.status(200).json(result)
    })
})

//Dahsboard cards Data
router.get("/cardsdata", async(req, res) => {
    const {HospitalID} = req.query;
    let query = "SELECT b.`Color ID`, c.`Color Name`, SUM(b.`Number of Bags`) AS TotalBags, SUM(b.`Weight of Bags`) AS TotalWeight FROM `bagdetails` AS b INNER JOIN `bagColors` AS c ON b.`Color ID` = c.`Color ID` WHERE b.`Hospital_ID` = ? AND b.`Pick up DateTime` >= DATE_SUB(NOW(), INTERVAL 1 WEEK) GROUP BY b.`Color ID`, c.`Color Name`"

    db.query(query, [HospitalID], (err, result) => {
        if(err)
            return res.status(404).json({message: "Error in fetching card data", error: err}) 
        return res.status(200).json(result);    
    })
})

router.get("/generation", async (req, res) => {
    const Hospital_ID = req.query.Hospital_ID;
    const { timeduration } = req.query;
    let query1;

    switch (timeduration) {
        case 'all':
            query1 = "SELECT DATE(bd.`Pick Up DateTime`) AS OriginalDate, DATE_FORMAT(bd.`Pick Up DateTime`, '%d-%m-%Y') AS Date, IFNULL(Yellow_bags, 0) AS Yellow_bags, IFNULL(Yellow_weight, 0) AS Yellow_weight, IFNULL(blue_bags, 0) AS Blue_bags, IFNULL(blue_weight, 0) AS Blue_weight,IFNULL(Red_bags, 0) AS Red_bags, IFNULL(Red_weight, 0) AS Red_weight, IFNULL(White_bags, 0) AS White_bags, IFNULL(White_weight, 0) AS White_weight FROM bagdetails bd   LEFT JOIN ( SELECT DATE(`Pick Up DateTime`) AS SubqueryDate, SUM(IF(`Color ID` = 1, `Number of Bags`, 0)) AS Yellow_bags, SUM(IF(`Color ID` = 1, `Weight of Bags`, 0)) AS Yellow_weight, SUM(IF(`Color ID` = 2, `Number of Bags`, 0)) AS Blue_bags, SUM(IF(`Color ID` = 2, `Weight of Bags`, 0)) AS Blue_weight, SUM(IF(`Color ID` = 3, `Number of Bags`, 0)) AS Red_bags, SUM(IF(`Color ID` = 3, `Weight of Bags`, 0)) AS Red_weight, SUM(IF(`Color ID` = 4, `Number of Bags`, 0)) AS White_bags, SUM(IF(`Color ID` = 4, `Weight of Bags`, 0)) AS White_weight FROM bagdetails WHERE Hospital_ID = 1 GROUP BY SubqueryDate ) subq ON DATE(bd.`Pick Up DateTime`) = subq.SubqueryDate WHERE bd.Hospital_ID = 1 GROUP BY OriginalDate;";
            break;
        case 'Yesterday':
            query1 = "SELECT `bd`.*, `c`.`Color Name` AS bagColor, `d`.`Driver Name`, `v`.`Plate Number` FROM `bagdetails` bd JOIN `bagcolors` c ON `bd`.`Color ID` = `c`.`Color ID` JOIN `driverdetails` d ON `bd`.`Driver ID` = `d`.`Driver ID` JOIN `vehicledetails` v ON `bd`.`Vehicle ID` = `v`.`Vehicle ID` WHERE bd.`Hospital_ID`=? AND DATE(`bd`.`Pick up DateTime`) = DATE(NOW() - INTERVAL 1 DAY)";
            break;
        {/*
        case 'Weekly':
            query1 = "SELECT `bd`.*, `c`.`Color Name` AS bagColor, `d`.`Driver Name`, `v`.`Plate Number` FROM `bagdetails` bd JOIN `bagcolors` c ON `bd`.`Color ID` = `c`.`Color ID` JOIN `driverdetails` d ON `bd`.`Driver ID` = `d`.`Driver ID` JOIN `vehicledetails` v ON `bd`.`Vehicle ID` = `v`.`Vehicle ID` WHERE bd.`Hospital_ID`=? AND DATE(`bd`.`Pick up DateTime`) BETWEEN DATE(NOW() - INTERVAL 7 DAY) AND DATE(NOW())";
            break;
        */}
        case 'week':
            query1 = "SELECT WEEK(bd.`Pick Up DateTime`) AS Week, DATE_FORMAT(bd.`Pick Up DateTime`, '%d-%m-%Y') AS Date, IFNULL(Yellow_bags, 0) AS Yellow_bags, IFNULL(Yellow_weight, 0) AS Yellow_weight, IFNULL(blue_bags, 0) AS Blue_bags, IFNULL(blue_weight, 0) AS Blue_weight,IFNULL(Red_bags, 0) AS Red_bags, IFNULL(Red_weight, 0) AS Red_weight, IFNULL(White_bags, 0) AS White_bags, IFNULL(White_weight, 0) AS White_weight FROM bagdetails bd   LEFT JOIN ( SELECT DATE(`Pick Up DateTime`) AS SubqueryDate, SUM(IF(`Color ID` = 1, `Number of Bags`, 0)) AS Yellow_bags, SUM(IF(`Color ID` = 1, `Weight of Bags`, 0)) AS Yellow_weight, SUM(IF(`Color ID` = 2, `Number of Bags`, 0)) AS Blue_bags, SUM(IF(`Color ID` = 2, `Weight of Bags`, 0)) AS Blue_weight, SUM(IF(`Color ID` = 3, `Number of Bags`, 0)) AS Red_bags, SUM(IF(`Color ID` = 3, `Weight of Bags`, 0)) AS Red_weight, SUM(IF(`Color ID` = 4, `Number of Bags`, 0)) AS White_bags, SUM(IF(`Color ID` = 4, `Weight of Bags`, 0)) AS White_weight FROM bagdetails WHERE Hospital_ID = 1 GROUP BY SubqueryDate ) subq ON DATE(bd.`Pick Up DateTime`) = subq.SubqueryDate WHERE bd.Hospital_ID = 1 GROUP BY Week ORDER BY Week DESC;";
            break;
        case 'month':
            query1 = "SELECT CONCAT(MONTHNAME(bd.`Pick Up DateTime`), ' - ', YEAR(bd.`Pick Up DateTime`)) AS Month, DATE_FORMAT(bd.`Pick Up DateTime`, '%d-%m-%Y') AS Date, IFNULL(Yellow_bags, 0) AS Yellow_bags, IFNULL(Yellow_weight, 0) AS Yellow_weight, IFNULL(blue_bags, 0) AS Blue_bags, IFNULL(blue_weight, 0) AS Blue_weight,IFNULL(Red_bags, 0) AS Red_bags, IFNULL(Red_weight, 0) AS Red_weight, IFNULL(White_bags, 0) AS White_bags, IFNULL(White_weight, 0) AS White_weight FROM bagdetails bd   LEFT JOIN ( SELECT DATE(`Pick Up DateTime`) AS SubqueryDate, SUM(IF(`Color ID` = 1, `Number of Bags`, 0)) AS Yellow_bags, SUM(IF(`Color ID` = 1, `Weight of Bags`, 0)) AS Yellow_weight, SUM(IF(`Color ID` = 2, `Number of Bags`, 0)) AS Blue_bags, SUM(IF(`Color ID` = 2, `Weight of Bags`, 0)) AS Blue_weight, SUM(IF(`Color ID` = 3, `Number of Bags`, 0)) AS Red_bags, SUM(IF(`Color ID` = 3, `Weight of Bags`, 0)) AS Red_weight, SUM(IF(`Color ID` = 4, `Number of Bags`, 0)) AS White_bags, SUM(IF(`Color ID` = 4, `Weight of Bags`, 0)) AS White_weight FROM bagdetails WHERE Hospital_ID = 1 GROUP BY SubqueryDate ) subq ON DATE(bd.`Pick Up DateTime`) = subq.SubqueryDate WHERE bd.Hospital_ID = 1 GROUP BY Month ORDER BY Month DESC;";
            break;
        default:
            res.status(400).send("Invalid time duration");
            return;
    }

    db.query(query1, [Hospital_ID], (err, result) => {
        if (err) {
            res.status(400).send("Error in fetching generation Report" + err);
        }
        return res.status(200).send(result);
    });
});


//Getting details of a specific date
router.get("/waste/:date", async(req, res) => {
    const { date } = req.params;
    //console.log("Recieved Date:", date);
    const dateParts = date.split('-'); // Split the date string
    if (dateParts.length === 3) {
        // Construct a JavaScript Date object
        const jsDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
        if (!isNaN(jsDate)) {
            // Format the JavaScript Date object to YYYY-MM-DD
            const convertedDate = jsDate.toISOString().split('T')[0];
            //console.log("Converted Date: ", convertedDate)
            const query1 =  "SELECT * FROM `bagdetails` JOIN `bagcolors` ON `bagdetails`.`Color ID` = `bagcolors`.`Color ID` JOIN `driverdetails` ON `bagdetails`.`Driver ID`=`driverdetails`.`Driver ID` JOIN `vehicledetails` ON `bagdetails`.`Vehicle ID` = `vehicledetails`.`Vehicle ID` where DATE(`Pick up DateTime`)=?";

            db.query(query1, [convertedDate], (err, result) => {
                if (err) {
                    return res.status(400).json({ error: "Error in fetching Specific Report", message: err.message });
                }
                return res.status(200).json(result);
            });
        } else {
            return res.status(400).json({ error: "Invalid date format" });
        }
    } else {
        return res.status(400).json({ error: "Invalid date format" });
    }
});

router.get("/pickupdetails", async(req, res) => {
    const { date } = req.params;
    const dateParts = date.split('-');
    if (dateParts.length === 3) {
        // Construct a JavaScript Date object
        const jsDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
        if (!isNaN(jsDate)) {
            // Format the JavaScript Date object to YYYY-MM-DD
            const convertedDate = jsDate.toISOString().split('T')[0];
            //console.log("Converted Date: ", convertedDate)
            const query1 =  "SELECT * FROM `driverbagdetails` JOIN `bagcolors` ON `bagdetails`.`Color ID` = `bagcolors`.`Color ID` JOIN `driverdetails` ON `driverbagdetails`.`Driver ID`=`driverdetails`.`Driver ID` JOIN `vehicledetails` ON `driverbagdetails`.`Vehicle ID` = `vehicledetails`.`Vehicle ID` where DATE(`Pick up DateTime`)=?";

            db.query(query1, [convertedDate], (err, result) => {
                if (err) {
                    return res.status(400).json({ error: "Error in fetching Specific Report", message: err.message });
                }
                return res.status(200).json(result);
            });
        } else {
            return res.status(400).json({ error: "Invalid date format" });
        }
    } else {
        return res.status(400).json({ error: "Invalid date format" });
    }
})

router.get('/vehicledetails', (req, res) => {
    query = "SELECT * FROM `vehicledetails`";
    db.query(query, (err, result) => {
        if(err) {
            return res.status(400).json({error: "Error fetching vehicle details", message: err.message});
        } 
        return res.status(200).json(result)
    })
})

router.get('/driverdetails', (req, res) => {
    query = "SELECT * FROM `driverdetails`";
    db.query(query, (err, result) => {
        if(err) {
            return res.status(400).json({error: "Error fetching vehicle details", message: err.message});
        } 
        return res.status(200).json(result)
    })
})

router.get('/bindetails', (req, res) => {
    query = "SELECT bd.`Device ID`, bd.`Location`, bd.`Sensor 1`, bd.`Sensor 2`, bd.`Status`, bd.`Updated`, cm.`Color Name` FROM bindetails bd JOIN `bagcolors` cm ON bd.`Color ID` = cm.`Color ID`";
    db.query(query, (err, result) => {
        if(err) {
            return res.status(400).json({error: "Error fetching vehicle details", message: err.message});
        } 
        return res.status(200).json(result)
    })
})


module.exports = router