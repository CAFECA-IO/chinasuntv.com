import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import isNode from 'detect-node';
import DocumentMeta from 'react-document-meta';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
// import Slider from '../../components/slider/slider';
import { meta as metaObj } from '../../constants/meta';
import * as chinaSuntvAction from '../../actions/chinaSuntv';

if (!isNode)
{
    require('./index.scss');
}

function mapStateToProps()
{
    return {};
}

function mapDispatchToProps(dispatch)
{
    return {
        actions: {
            chinaSuntv: bindActionCreators(chinaSuntvAction, dispatch)
        }
    };
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

    componentDidMount()
    {
        this.props.actions.chinaSuntv.getChinaSuntv();
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
    // t: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
