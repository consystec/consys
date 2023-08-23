import React, { useState, useEffect } from 'react';
import { Button as AntdButton, Popconfirm, Tooltip } from 'antd';
import {
	SearchOutlined,
	DeleteOutlined,
	PrinterOutlined,
	FileAddOutlined,
	EditOutlined,
	InfoCircleOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';

function Button({ title, type, action, ...props }) {
	return (
		<Tooltip title={title}>
			<AntdButton {...props}
				type={type ? type : action === 'delete' ? 'danger' : 'default'} />
		</Tooltip>
	);
}

Button.propTypes = {
	title: PropTypes.string,
	type: PropTypes.string,
	action: PropTypes.string,
};

function ConsysButton({
	onConfirm,
	noIcon,
	icon,
	action,
	onCancel,
	popTitle,
	placement,
	okText,
	cancelText,
	title,
	...props
}) {
	const [iconState, setIconState] = useState(icon);
	const [buttonTitle, setButtonTitle] = useState('');

	useEffect(() => {
		if (!icon && !noIcon) {
			switch (action) {
				case 'consult':
					setIconState(<SearchOutlined />);
					break;
				case 'delete':
					setIconState(<DeleteOutlined />);
					break;
				case 'print':
					setIconState(<PrinterOutlined />);
					break;
				case 'new':
					setIconState(<FileAddOutlined />);
					break;
				case 'edit':
					setIconState(<EditOutlined />);
			}
		}

		if (!title) {
			switch (action) {
				case 'consult':
					setButtonTitle('Consultar');
					break;
				case 'delete':
					setButtonTitle('Deletar');
					break;
				case 'print':
					setButtonTitle('Imprimir');
					break;
				case 'new':
					setButtonTitle('Novo');
					break;
				case 'edit':
					setButtonTitle('Editar');
					break;
				default:
					setButtonTitle('');
			}
		} else {
			setButtonTitle(title);
		}
	}, []);


	if (!onConfirm) {
		return (
			<Button {...props}
				title={buttonTitle}
				icon={iconState}
				action={action} />
		);
	}

	return (
		<Popconfirm title={popTitle}
			onConfirm={onConfirm}
			onCancel={onCancel}
			placement={placement}
			okText={okText}
			cancelText={cancelText}
			icon={popTitle ? <InfoCircleOutlined /> : null}>
			<Button {...props}
				title={buttonTitle}
				icon={iconState}
				action={action} />
		</Popconfirm>
	);
}

ConsysButton.propTypes = {
	cancelText: PropTypes.string,
	okText: PropTypes.string,
	placement: PropTypes.string,
	popTitle: PropTypes.string,
	title: PropTypes.string,
	type: PropTypes.string,
	action: PropTypes.string,
	onCancel: PropTypes.func,
	onClick: PropTypes.func,
	onConfirm: PropTypes.func,
	children: PropTypes.node,
	icon: PropTypes.node,
	noIcon: PropTypes.bool
};

export default ConsysButton;