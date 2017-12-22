import React from 'react';
import { translate } from 'react-i18next';
import isNode from 'detect-node';

if (!isNode)
{
    require('./footer.scss');
}

@translate([], { wait: isNode ? false : true })
class Footer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate()
    {
        return false;
    }

    render()
    {
        return (
            <footer>
                <div>
                    <div>
                        <div><img src="/asset/img/logotype-tideisun.svg" alt="tideiSun" /></div>
                        <div>Copyright © 2017 TideiSun Group 泰德陽光集團. All rights reserved.</div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
