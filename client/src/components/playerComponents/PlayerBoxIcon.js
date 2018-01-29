import React from 'react';
import PropTypes from 'prop-types';

//////////////////////////////////
const PlayerBoxIcon = (props) => {
    return(
      <div>{props.icon}</div>
    );
};/////////////////////////////////

PlayerBoxIcon.propTypes ={
  icon: PropTypes.string.isRequired
};

export default PlayerBoxIcon;