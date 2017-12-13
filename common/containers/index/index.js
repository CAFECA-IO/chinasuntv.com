import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import isNode from 'detect-node';
import DocumentMeta from 'react-document-meta';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import ChinaSuntv from '../../components/chinaSuntv/chinaSuntv';
import ProgramList from '../../components/programList/programList';
import Contact from '../../components/contact/contact';
// import Slider from '../../components/slider/slider';
import { meta as metaObj } from '../../constants/meta';

if (!isNode)
{
    require('./index.scss');
}

function mapStateToProps(state)
{
    return {
        chinaSuntv: state.chinaSuntv
    };
}

function mapDispatchToProps()
{
    return {};
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
                    <ChinaSuntv data={this.props.chinaSuntv.info} />

                    <ProgramList data={this.props.chinaSuntv.info} />
                    <div className="aboutUs">
                        about us
                    </div>
                    <Contact />
                </div>

                <Footer />

            </div>
        );
    }
}

Index.propTypes = {
    // t: PropTypes.func.isRequired,
    chinaSuntv: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
