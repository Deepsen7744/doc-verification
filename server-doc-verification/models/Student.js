const mongoose=require("mongoose");

const StudentSchema = new mongoose.Schema({

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
    image: {
        type: String,
        required: true,
    },
    Applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
			ref: "application",
        }
    ]
});

module.exports = mongoose.model("student", StudentSchema);

