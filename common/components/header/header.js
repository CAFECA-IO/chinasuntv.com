import React from 'react';
import { translate } from 'react-i18next';
import isNode from 'detect-node';
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
        const { body } = document;

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

        this.setState(update(this.state, {
            classes: {
                header: { $set: 'folded' }
            }
        }));
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
                        <div onClick={() => this.scroll('.c_programList')}>????????????</div>
                        <div onClick={() => this.scroll('.c_about')}>????????????</div>
                        <div onClick={() => this.scroll('.c_contact')}>????????????</div>
                    </nav>
                    {/* <div className="contact">
                        <div className="language">
                            <span>?????????</span>
                            <span>English</span>
                            <span>??????</span>
                        </div>
                    </div> */}
                </div>
                <div className="hamburger" onClick={this.toggleMenu}>
                    <span className="ham1" />
                    <span className="ham2" />
                    <span className="ham3" />
                </div>
            </header>
        );
    }
}

export default Header;
