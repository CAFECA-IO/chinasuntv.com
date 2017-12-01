import React from 'react';
import { translate } from 'react-i18next';
import isNode from 'detect-node';

if (!isNode)
{
    require('./footer.scss');
}

@translate(['common'], { wait: false })
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
                    {/* logoArea */}
                    <div className="logoArea">
                        <div>© 2017 XPlay, Inc</div>
                    </div>

                    {/* other */}
                    <div className="other">
                        <div className="socail">
                            <a href="https://www.instagram.com/xiaobianyang/" target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram" /></a>
                            <a href="https://twitter.com/XplayTech" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter" /></a>
                            <a href="https://www.facebook.com/XplayTech-1077147932422732/" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook" /></a>
                            <a href="https://www.linkedin.com/company/13449421/" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin" /></a>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
