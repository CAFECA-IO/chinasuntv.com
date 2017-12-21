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
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'cs@isuntv.com', // generated ethereal user
                pass: 'gktkrgxfnvbyazta' // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        const mailOptions = {
            to: 'chuicl@isuntv.com', // list of receivers
            subject: '陽光衛視直播網站意見回覆', // Subject line
            html: req.body.comment // html body
        };

        let message;
        let resultCode;

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error) => {
            if (error)
            {
                message = 'send failed';
                resultCode = 0;
            }
            else
            {
                message = 'sent successfully';
                resultCode = 1;
            }

            res.json({
                result: resultCode,
                message
            });
        });
    }
};
