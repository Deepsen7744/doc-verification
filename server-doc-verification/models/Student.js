const mongoose=require("mongoose");

const StudentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    tel: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
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

