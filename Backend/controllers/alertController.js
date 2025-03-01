const Alert = require("../models/Alert");

exports.getAlerts = async (req,res)=>{
    try{
        const alerts = await Alert.find({resolved: false }).sort({createdAt: -1});
        if(!alerts){
            return res.status(404).json({message: "No alerts found!"});
        }

        return res.status(200).json({message:"Alerts fetched succesfully!", data : alerts});

    }
    catch(error){
        return res.status(500).json({alert: alert.message});
    }
}