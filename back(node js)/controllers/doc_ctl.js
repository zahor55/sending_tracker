
let nodemailer = require('nodemailer');
const storeName="*******";
const auth={
    user: 'xxxxx@yahoo.com',
    pass: 'xxxxxx',
    id:"xxxxxxx"
};
let transporter = nodemailer.createTransport({
    service: 'Yahoo',
    auth: {
        user: auth.user,
        pass: auth.pass
    }
    ,
    tls: {
        rejectUnauthorized: false
    }
});
exports.noNum=async (req,res,next)=>{
    let id=req.params.id===null?"":req.params.id;
    let name=req.params.name===null?"":req.params.name;
    if (name.length>30){
        name=""
    }
    let desc="";
    switch(req.params.value){
        case "24":
            desc="משלוח בדואר 24";
            break;
        case "regular":
            desc="משלוח בדואר רגיל של דואר ישראל"
            break;
        case "express":
            desc="משלוח אקספרס דואר ישראל"
            break;
        default:
            return res.json({
                code: 8252,
                text: "problem with value of send"
            })
    }

    let mailOptions = {
        from: 'acairfix@yahoo.com',
        to: `${req.params.mailToSend}`,
        subject: `הזמנתך באתר ${storeName}`,
        html:
            `<div style="color:blue;text-align:center;"><h1>${name} תודה רבה על הזמנתך באתר ${storeName}</h1><h2 style="direction: rtl;">הזמנתך נשלחה עם ${desc}</h2><h2>נשמח לראותך באתרנו בשנית</h2><h2>${storeName}</h2></div >`
    };
    if (req.params.mailToSend.length > 30 ) {
        return res.json({
            code: 111,
            text: "mail is too long"
        })
    }
    else if (req.params.mailToSend.indexOf("@") === -1) {
        return res.json({
            code: 222,
            text: "mail not have @"
        })
    }
    else if(id!==auth.id){
        return res.json({
            code: 5321,
            text: "id not correct"
        })

    }
    else {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.json({
                    code: 500
                })
            } else {
                console.log('Email sent: ' + info.response);
                return res.json({
                    code: 200
                })
            }
        });
    }
};
exports.sendNum = async (req, res, next) => {
    let name=req.params.name===null?"":req.params.name;
    let id=req.params.id===null?"":req.params.id;

    if (name.length>30){
        name=""
    }
    console.log(auth.id)
    var mailOptions = {
        from: 'acairfix@yahoo.com',
        to: `${req.params.mailToSend}`,
        subject: `הזמנתך באתר ${storeName}`,
        html:
            `<div style="color:blue;text-align:center;"><h1>${name} תודה רבה על הזמנתך באתר ${storeName}</h1><h2 style="direction: rtl;">מספר המעקב להזמנתך הוא: ${req.params.trackNumber}</h2><h2>ניתן לעקוב אחרי המשלוח באתר של דואר ישראל</h2><h2>נשמח לראותך באתרנו בשנית</h2><h2>${storeName}</h2></div >`
    };
    if (req.params.mailToSend.length > 30 || req.params.trackNumber.length > 25) {
        return res.json({
            code: 111,
            text: "mail or track number is too long"
        })
    }
    else if (req.params.mailToSend.indexOf("@") === -1) {
        return res.json({
            code: 222,
            text: "mail not have @"
        })
    }
    else if (req.params.trackNumber.toUpperCase().indexOf("IL") === -1 || req.params.trackNumber.toUpperCase().indexOf("RR") === -1) {
        return res.json({
            code: 333,
            text: "track number not have il or rr"
        })
    }
    else if(id!==auth.id){
        return res.json({
            code: 5321,
            text: "id not correct"
        })

    }
    else {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.json({
                    code: 500
                })
            } else {
                console.log('Email sent: ' + info.response);
                return res.json({
                    code: 200
                })
            }
        });
    }
};
