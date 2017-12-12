// import fs from 'fs';
import nodexj from 'xls-to-json';

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
        nodexj({
            input: './public/asset/chinaSuntv/chinasuntv.xls',  // input xls
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
