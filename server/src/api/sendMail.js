import nodemailer from 'nodemailer';

export default
{
    init()
    {
        return {
            initExec: false,
            routes: [
                { method: 'post', url: '/api/sendMail' },
            ]
        };
    },

    exec(req, res)
    {
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 456,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'cs@isuntv.com', // generated ethereal user
                pass: 'gktkrgxfnvbyazta'  // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        const mailOptions = {
            from: req.params.sender, // sender address
            to: 'cs@isuntv.com', // list of receivers
            subject: req.params.subject, // Subject line
            text: req.params.text, // plain text body
            html: req.params.html // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error) => {
            if (error)
            {
                 // console.log(error);
            }
            // console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });


        res.json({});
    }
};
