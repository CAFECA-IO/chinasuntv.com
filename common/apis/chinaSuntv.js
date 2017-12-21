import { get } from 'superagent';

export function getChinaSuntv()
{
    return new Promise((resolve, reject) =>
    {
        get('/api/chinaSuntv')
            .set('Accept', 'application/json')
            .end((err, res) =>
            {
                if (err || res.status !== 200 || res.body.result !== 1)
                {
                    if (err || res.status !== 200)
                    {
                        reject(new Error(err));
                    }
                    else
                    {
                        reject(res.body);
                    }
                }
                else
                {
                    resolve(res.body);
                }
            });
    });
}
