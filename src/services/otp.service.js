const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTHTOKEN;
const verifySid = process.env.TWILIO_VERIFYSID;
const client = require("twilio")(accountSid, authToken);

module.exports = {
    sentOtp: (phn_no) => {
        client.verify.v2
            .services(verifySid)
            .verifications
            .create({ to: `+91${phn_no}`, channel: "sms" })
            .then((verification) => console.log(verification.status))
    },

    verifyOtp: () => {
        client.verify.v2
            .services(verifySid)
            .verificationChecks.create({ to: "+919567060029", code: req.body.otp })
            .then((verification_check) => console.log(verification_check.status))
    }
}