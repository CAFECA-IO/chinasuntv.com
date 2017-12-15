import React from 'react';
import { translate } from 'react-i18next';
import isNode from 'detect-node';
import PropTypes from 'prop-types';
import { withCookies } from 'react-cookie';
import update from 'immutability-helper';
import { addEventListener } from '../../utils/event';

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
        this.state = {
            classes: {
                header: '',
            }
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.scroll = this.scroll.bind(this);
    }

    componentDidMount()
    {
        const body = document.body;

        if (window.innerWidth < 768)
        {
            this.headerFolded();
        }
        else
        {
            addEventListener(window, 'scroll', () => {
                if ((body.scrollTop || document.documentElement.scrollTop) !== 0 && this.state.classes.header !== 'folded')
                {
                    this.headerFolded();
                }
                else if ((body.scrollTop || document.documentElement.scrollTop) === 0)
                {
                    this.headerOriginal();
                }
            });
        }
    }

    headerOriginal()
    {
        this.setState(update(this.state, {
            classes: {
                header: { $set: '' }
            }
        }));
    }

    headerFolded()
    {
        this.setState(update(this.state, {
            classes: {
                header: { $set: 'folded' }
            }
        }));
    }

    toggleMenu()
    {
        const header = this.state.classes.header.indexOf('color') === -1 ? 'color' : 'folded';
        const classObj = {
            header
        };

        this.setState(update(this.state, {
            classes: { $set: classObj }
        }));
    }

    scroll(section)
    {
        const scrollTo = document.querySelector(section);
        scrollTo.scrollIntoView({ behavior: 'smooth' });
    }

    render()
    {
        const { header } = this.state.classes;
        return (
            <header className={header}>
                <a href="/" className="logo">
                    <img src="/asset/img/logo-suntv.svg" alt="tideiSun" />
                    <img src="/asset/img/logo-type.svg" alt="tideiSun" />
                </a>
                <div className="slideNav">
                    <nav>
                        <span onClick={() => this.scroll('.c_programList')}>直播節目</span>
                        <span onClick={() => this.scroll('.c_about')}>關於我們</span>
                        <span onClick={() => this.scroll('.c_contact')}>聯繫我們</span>
                    </nav>
                    {/* <div className="contact">
                        <div className="language">
                            <span>日本語</span>
                            <span>English</span>
                            <span>中文</span>
                        </div>
                        <div>
                            <span className="client">成為商業客戶</span>
                        </div>
                    </div> */}
                </div>
                <div className="hamburger" onClick={this.toggleMenu}>
                    <span className="ham1" />
                    <span className="ham2" />
                    <span className="ham3" />
                </div>
                {/* <div className="slideNav2">
                    <div>關於集團</div>
                    <div>創辦人</div>
                    <div>產品發表</div>
                    <div>加入團隊</div>
                    <div>媒體室</div>
                    <div>
                        <span>日本語</span>
                        <span>English</span>
                        <span>中文</span>
                    </div>
                </div> */}
            </header>
        );
    }
}

Header.propTypes = {
    cookies: PropTypes.object.isRequired
};

export default withCookies(Header);
