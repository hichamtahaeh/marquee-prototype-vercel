import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Loader = ({ loading }) => {
    return loading ? (
        <div className='marquee-loader__wrap'>
            <div className='marquee-loader'>
                <div></div>
                <div></div>
            </div>
        </div>
    ) : null;
};

Loader.propTypes = {
    /**
     * Whether the loader is loading or not.
     */
    loading: PropTypes.bool.isRequired,
};

export default Loader;
