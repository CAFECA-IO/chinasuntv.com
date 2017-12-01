import React from 'react';
import update from 'immutability-helper';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import equal from 'deep-equal';
import isNode from 'detect-node';
import { withCookies } from 'react-cookie';
import { uuid } from '../../utils/uuid';

if (!isNode)
{
    require('./slider.scss');
}

@translate([], { wait: isNode ? false : true })
class Slider extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
        const { t } = this.props;
        this.data = [
            {
                uid: uuid(),
                image: '/asset/img/pic-cover.jpg',
                text: {
                    h1: t('slider:title'),
                    h2: t('slider:title1'),
                    p: t('slider:desc'),
                    download: t('slider:download'),
                },
                href: ''
            },
            {
                uid: uuid(),
                image: '/asset/img/pic-cover-02.jpg',
                text: {
                    h1: t('slider:title'),
                    h2: t('slider:title1'),
                    p: t('slider:desc'),
                    download: t('slider:title1'),
                },
                href: ''
            }
        ];

        this.state = {
            dot: ['active'],
            uid: this.data[0].uid,
            image: this.data[0].image,
            href: this.data[0].href,
            text: {
                h1: this.data[0].text.h1,
                h2: this.data[0].text.h2,
                p: this.data[0].text.p,
                download: this.data[0].text.download,
            }
        };

        this.index = 0;
        this.lastIndex = 0;
    }

    componentDidMount()
    {
        setInterval(() => {
            let index = (this.index + 1 === this.data.length) ? 0 : this.index + 1;
            this.imgChange(index);
        }, 6000);
    }

    componentWillReceiveProps(nextProps)
    {
        const { t } = nextProps;
        const dataLength = this.data.length;
        for (let i = 0; i < dataLength; i += 1)
        {
            this.data[i].text.h1 = t('slider:title');
            this.data[i].text.h2 = t('slider:title1');
            this.data[i].text.p = t('slider:desc');
            this.data[i].text.download = t('slider:download');
        }

        this.setState(update(this.state, {
            text: {
                h1: { $set: this.data[this.index].text.h1 },
                h2: { $set: this.data[this.index].text.h2 },
                p: { $set: this.data[this.index].text.p },
                download: { $set: this.data[this.index].text.download }
            }
        }));
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        if (equal(this.state, nextState) && equal(this.props, nextProps))
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    imgChange(index)
    {
        // last img index
        this.lastIndex = this.index;

        // now img index
        this.index = index;

        let dot = new Array(this.data.length);
        dot[index] = 'active';

        this.setState(update(this.state, {
            dot: { $set: dot },
            uid: { $set: this.data[this.index].uid },
            image: { $set: this.data[this.index].image },
            href: { $set: this.data[this.index].href },
            text: {
                h1: { $set: this.data[this.index].text.h1 },
                h2: { $set: this.data[this.index].text.h2 },
                p: { $set: this.data[this.index].text.p },
                download: { $set: this.data[this.index].text.download }
            }
        }));
    }

    renderContent()
    {
        const { text } = this.state;
        const { cookies } = this.props;
        let whitePaperHref;

        switch (cookies.get('xplayOffical'))
        {
            case 'ja':
                whitePaperHref = 'JP.pdf';
                break;
            case 'zh':
                whitePaperHref = 'ZH.pdf';
                break;
            case 'en':
                whitePaperHref = 'EN.pdf';
                break;
            default:
        }

        return (
            <div className="content">
                <div>
                    <h1>{text.h1}
                        <br />
                        <span>{text.h2}</span>
                    </h1>
                    <p>{text.p}</p>
                    <div className="download">
                        <a href={`/asset/uploads/XPLAY_Tech_WhitePaper_Ver.1.0_${whitePaperHref}`} target="_blank" rel="noopener noreferrer"><span>{text.download}</span></a>
                    </div>
                </div>
            </div>
        );
    }

    render()
    {
        let { image, text, uid } = this.state;

        return (
            <div className="c_slider">
                {/* img */}
                <div className="cover">
                    <TransitionGroup>
                        <CSSTransition
                            key={uid}
                            classNames="sliderFade"
                            timeout={{ enter: 750, exit: 750 }}
                        >
                            <img alt={text.h1} src={image} />
                        </CSSTransition>
                    </TransitionGroup>


                    <div className="paddingTop" />
                </div>
            </div>
        );
    }
}

Slider.defaultProps = {
    t: () => {}
};

Slider.propTypes = {
    t: PropTypes.func,
    cookies: PropTypes.object.isRequired
};

export default withCookies(Slider);
