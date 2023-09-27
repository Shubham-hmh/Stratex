const mongoose = require('mongoose'); 
const bcrypt=require("bcrypt");
const { Schema } = mongoose;

const homeAddressSchema = new Schema({
    street: String,
    city: String,
    state: String,
});

const postalAddressSchema = new Schema({
   
    street: String,
    city: String,
    state: String,
});

const userSchema = new Schema({
    userGUID: {
        type: String,
        required: true,
        unique: true,
        default: () => Math.random().toString(36).slice(2, 12)
    },
    
    emailAddress: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    businessName: {
        type: String,
        required: true,
    },
    businessNumber: {
        type: String,
        required: true,
    },
    uniqueCode: {
        type: String,
        required: true,
    },
    externalReference: String,
    phoneNum: {
        type: String,
        validate: {
            validator: (value) => {
                // Use a regular expression to validate the phone number format
                return /^[0-9]{10}$/.test(value);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    homeAddress: homeAddressSchema,
    postalAddress: postalAddressSchema,
    creationDate: {
        type: Date,
        default: Date.now,
    },
    modifyDate: {
        type: Date,
        default: Date.now,
    },

    //
    password:{
        type:String,
        required:true,
    },
    archiveDate: Date,
}, { timestamps: true });


userSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        next();
    }
    const salt =await bcrypt.genSaltSync(10);
    this.password=await bcrypt.hash(this.password,salt);

});

userSchema.methods.isPasswordMatched =async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


//Export the model
module.exports = mongoose.model('User', userSchema);