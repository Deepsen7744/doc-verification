const mongoose=require("mongoose");

const InstituteSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        trim: true,
    },
    AccountNumber: {
        type: String,
        required: true,
        trim: true
    },
    Approved: {
        type: String,
		enum: ["Approved", "NotApproved"],
		required: true,
    },
    image: {
        type: String,
        required: true,
    },
    CertificateRequest: [
        {
			type: mongoose.Schema.Types.ObjectId,
			ref: "application",
		},
    ],
});

module.exports = mongoose.model("institute", InstituteSchema);
