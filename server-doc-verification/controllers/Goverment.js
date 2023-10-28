const Institute=require("../models/Institute");
const Goverment=require("../models/Goverment");

exports.createGov = async (req,res) => {
  try {
    const {
      email,
      AccountNumber,
    } = req.body;
    if(
      !email ||
      !AccountNumber||
      !PrivateKey
    ){
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }
    if(PrivateKey !== process.env.PrivateKey)
    {
      return res.status(400).json({
				success: false,
				message: "Not Authorized",
			});
    }
    const existingGoverment = await Goverment.findOne({email});
    if(existingGoverment){
      return res.status(400).json({
				success: false,
				message: "Goverment already exists. Please sign in to continue.",
			});
    }
    const goverment = await Goverment.create({
      email,
      AccountNumber
      });

      return res.status(200).json({
        success: true,
        goverment,
        message: "Goverment registered successfully",
      });
  } catch(error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Goverment cannot be registered. Please try again.",
    });
  }
}

exports.GetAllNotRegisteredInstitute = async (req, res)=> {
    try{
        const institute = await Institute.find({ Approved: "NotApproved" });
        res.send({
            success: true,
            message: `Got All NotApproved Institutes`,
            data: institute,
          })
    } catch(error){
        return res.status(500).json({
            success: false,
            message: "Could not get NotApproved Institutes. Please try again.",
          });
    }
};

exports.GetAllRegisteredInstitute = async (req, res)=> {
  try{
      const institute = await Institute.find({ Approved: "Approved" });
      res.send({
          success: true,
          message: `Got All Approved Institutes`,
          data: institute,
        })
  } catch(error){
      return res.status(500).json({
          success: false,
          message: "Could not get Approved Institutes. Please try again.",
        });
  }
};

exports.approveInstitute = async (req, res) => {
    try {
        const institute = await Institute.findById(req.query.instid);
        if (institute) {
            institute.Approved = "Approved";
            await institute.save();
            res.send({
              success: true,
              message: 'Approved the institute',
              data: institute
            })
          } else {
            return res.status(404).json({
              success: false,
              message: 'Could Not Approve Institute',
            });
          }
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Could not get Approved Institute. Please try again.",
          });
    }
}