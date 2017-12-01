import React from 'react';
import { connect } from 'react-redux';
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
class Index extends React.PureComponent
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

                {/* <div className="content">

                </div> */}

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

export default connect()(Index);
