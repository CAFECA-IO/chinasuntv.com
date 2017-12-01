import React from 'react';
import { translate } from 'react-i18next';
import isNode from 'detect-node';
import PropTypes from 'prop-types';
import { withCookies } from 'react-cookie';
import i18nClient from '../../i18n/i18n-client';

if (!isNode)
{
    require('./header.scss');
}

@translate([], { wait: isNode ? false : true })
class Header extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
    }

    langChange(e)
    {
        i18nClient.changeLanguage(e.target.value);
        this.props.cookies.set('xplayOffical', e.target.value);
    }

    render()
    {
        return (
            <header>
                <div>
                    <div className="f">
                        <a href="/">
                            <div className="logo bg" />
                        </a>
                    </div>
                    <div className="langauge">
                        <select value={this.props.cookies.get('xplayOffical')} onChange={::this.langChange}>
                            <option value="zh">中文</option>
                            <option value="ja">日本語</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    cookies: PropTypes.object.isRequired
};

export default withCookies(Header);
