import React from 'react';
import { Form } from 'antd';
import utilsCss from 'consys/utils.css';

const FormItem = ({ children, disabled, ...props }) => {
	let className = null;
	const Cloned = {
		...children,
		props: {
			...children.props
		}
	}

	if (disabled) {
		className = utilsCss.nopointer;
		Cloned.props = {
			...Cloned.props,
			tabIndex: -1,
			className: utilsCss.block
		}
	}

	return (
		<Form.Item {...props}
			className={className}>
			{Cloned}
		</Form.Item>
	)
}

export default FormItem;