import nodexj from 'xls-to-json';
import moment from 'moment-timezone';
const fs = require('fs');

export default
{
    init()
    {
        return {
            initExec: false,
            routes: [
                { method: 'get', url: '/api/chinaSuntv' },
            ]
        };
    },

    exec(req, res)
    {
        const taipeiTime = moment.tz('Asia/Taipei').format('YYYYMMDD');
        const dayOfWeek = moment(taipeiTime).format('E');
        const thisMonday = moment(taipeiTime).subtract(dayOfWeek - 1, 'days').format('YYYYMMDD');
        let readFile = `./xls/${thisMonday}chinasuntv.xls`;
        if(!fs.existsSync(readFile)) {
            const fArr = fs.readdirSync('./xls').sort();
            readFile = fArr[fArr.length - 1];
        }

        nodexj({
            input: readFile, // input xls
            output: null, // output json
        }, (err, result) => {
            let arr = [];
            let data = {};
            let message;
            let resultCode;

            if (err)
            {
                message = 'fail parser';
                resultCode = 0;
            }
            else
            {
                message = 'parser xls to json';
                resultCode = 1;

                for (let item in result)
                {
                    let obj = {};
                    Object.keys(result[item]).forEach((key) => {
                        if (key !== '')
                        {
                            obj[key] = result[item][key];
                        }
                    });
                    arr.push(obj);
                }

                let week = [];
                let weekData = {};
                arr.map((item) => {
                    const date = item.PlayTime.split(' ')[0];
                    if (date !== '')
                    {
                        if (week.indexOf(date) === -1)
                        {
                            week.push(date);
                        }
                        if (!Array.isArray(weekData[date]))
                        {
                            weekData[date] = [];
                        }
                        weekData[date].push(item);
                    }
                    return true;
                });
                data.week = week;
                data.weekInfo = weekData;
            }

            res.json({
                result: resultCode,
                message,
                data
            });
        });
    }
};
