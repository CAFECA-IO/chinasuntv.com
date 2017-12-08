import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import isNode from 'detect-node';
import DocumentMeta from 'react-document-meta';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
// import Slider from '../../components/slider/slider';
import { meta as metaObj } from '../../constants/meta';

if (!isNode)
{
    require('./index.scss');
}


@translate([], { wait: isNode ? false : true })
class Index extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
        this.meta = metaObj;
    }

    render()
    {
        // const { t } = this.props;
        return (
            <div className="co_index">

                {/* meta */}
                <DocumentMeta {...this.meta} />

                <Header />

                <div className="content">
                    <div className="chinaSuntv">
                        <video src="https://www.w3schools.com/html/mov_bbb.mp4" />
                        <div className="nowPlaying">
                            <div>Now Playing</div>
                            <div>世紀天才</div>
                        </div>
                        <div className="preNext">
                            <div>
                                <span>00:00</span>
                                <span>01:00</span>
                                <span>02:00</span>
                            </div>
                            <div>
                                <span><i className="fa fa-circle" aria-hidden="true" /></span>
                                <span><i className="fa fa-circle center" aria-hidden="true" /></span>
                                <span><i className="fa fa-circle" aria-hidden="true" /></span>
                            </div>
                            <div>
                                <span>紀錄片</span>
                                <span>人物傳記</span>
                                <span>歷史人文</span>
                            </div>
                            <div>
                                <span>輝煌中原</span>
                                <span>世紀天才</span>
                                <span>文明的傳承</span>
                            </div>
                        </div>
                    </div>
                    <div className="programList">
                        program list
                    </div>
                    <div className="aboutUs">
                        about us
                    </div>
                    <div className="contactUs">
                        contact Us
                    </div>
                </div>

                <Footer />

            </div>
        );
    }
}

Index.defaultProps = {
    t: () => {},
};

Index.propTypes = {
    t: PropTypes.func.isRequired
};

export default Index;
