import React from 'react';
import PropTypes from 'prop-types';

function Icon({ icon, ...props }) {
	return (
		<span className='anticon'
			{...props}>
			{icon}
		</span>
	);
}

Icon.propTypes = {
	icon: PropTypes.node
}

export default Icon;