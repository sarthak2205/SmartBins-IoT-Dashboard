const router = require("express").Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const saltRounds = 10;

function authenticareToken(req, res, next) {
    const token = req.header['authorization'];
    if(!token) {
        res.status(401).json({ message: 'Token not provided'});
        return;
    }

    jwt.verify(token, "@6$HpRPntZ2#+TPZ@vv2rnk6B-kAW2^9", (err, user) => {
        if(err) {
            res.status(403).json({message: 'Invalid Token'});
        }

        req.user = user;
        next();
    });
}

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    let query = "SELECT * from `login_master` JOIN `hospitals` ON `login_master`.`Hospital_ID`=`hospitals`.`ID` WHERE `login_master`.`username`=?"

    db.query(query, [username], (error, result) => {
        if(error) {
            res.status(500).json({ message: "Internal Server Error", error: error });
            return;
        }

        if(result.length === 0) {
            res.status(401).json({message: 'Invalid Username'});
            return;
        }

        const user = result[0];
        console.log(user)
        //console.log("Password: ", password)
        //console.log("Hashed Password: ", user.password)
        bcrypt.compare(password, user.password, (bcryptErr, bcryptRes) => {
            if(bcryptErr || !bcryptRes) {
                //console.error('bcrypt.compare Error:', bcryptErr);
                res.status(401).json({ message: 'Invalid Password'});
                return;
            }

            //console.log('bcrypt.compare Result:', bcryptRes);

            const tokenpayload = {
                user: user.username,
                h_id: user.Hospital_ID,
                hospital: user.Name,
                address: user.Address,
                name: user.Full_Name
            }
           
            //console.log("Secret Key: ", process.env.JWT_SECRET)
            const token = jwt.sign(tokenpayload, "@6$HpRPntZ2#+TPZ@vv2rnk6B-kAW2^9", {
                expiresIn: '7d'
            });

            const decodedToken = jwt.verify(token, '@6$HpRPntZ2#+TPZ@vv2rnk6B-kAW2^9');
            res.json({ token })
        });
    });
});


//Driver Login
router.post('/driverlogin', (req, res) => {
    const {username, password} = req.body;
    let query = "SELECT * from `vehicle_login` JOIN `vehicledetails` ON `vehicle_login`.`Vehicle ID`=`vehicledetails`.`Vehicle ID` WHERE username=?"

    db.query(query, [username], (error, result) => {
        if(error) {
            res.status(500).json({ message: "Internal Server Error", error: error });
            return;
        }

        if(result.length === 0) {
            res.status(401).json({message: 'Invalid Username'});
            return;
        }

        const user = result[0];
        console.log(user)
        //console.log("Password: ", password)
        //console.log("Hashed Password: ", user.password)
        bcrypt.compare(password, user.password, (bcryptErr, bcryptRes) => {
            if(bcryptErr || !bcryptRes) {
                //console.error('bcrypt.compare Error:', bcryptErr);
                res.status(401).json({ message: 'Invalid Password'});
                return;
            }

            //console.log('bcrypt.compare Result:', bcryptRes);

            const tokenpayload = {
                plateNumber: user['Plate Number'],
                h_id: user.Hospital_ID,
                hospital: user.Name,
                address: user.Address,
                name: user.Full_Name
            }
           
            //console.log("Secret Key: ", process.env.JWT_SECRET)
            const token = jwt.sign(tokenpayload, "@6$HpRPntZ2#+TPZ@vv2rnk6B-kAW2^9", {
                expiresIn: '7d'
            });

            const decodedToken = jwt.verify(token, '@6$HpRPntZ2#+TPZ@vv2rnk6B-kAW2^9');
            res.json({ token })
        });
    });
});

module.exports = router