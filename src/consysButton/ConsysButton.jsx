import React, { useState, useEffect, Fragment } from 'react';
import { Button, Popconfirm, Tooltip } from 'antd';
import {
	SearchOutlined,
	DeleteOutlined,
	PrinterOutlined,
	FileAddOutlined,
	EditOutlined,
	InfoCircleOutlined
} from '@ant-design/icons';
import PropTypes from 'prop-types';

function _Button({ title, iconState, type, action, children, onClick, ...props }) {
	return (
		<Tooltip title={title}>
			<Button {...props}
				icon={iconState}
				type={type ? type : action === 'delete' ? 'danger' : 'default'}
				onClick={() => onClick && onClick()}>
				{children}
			</Button>
		</Tooltip>
	);
}

function ConsysButton({ title, onClick, onConfirm, children,
	noIcon, icon, action, type, onCancel, popTitle, placement = 'top',
	okText = 'Ok', cancelText = 'Cancelar', ...props }) {
	const [iconState, setIconState] = useState(icon);

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

		switch (action) {
			case 'consult':
				title = 'Consultar';
			case 'delete':
				title = 'Deletar';
			case 'print':
				title = 'Imprimir';
			case 'new':
				title = 'Novo';
			case 'edit':
				title = 'Editar';
			default:
				title = '';
		}
	}, []);


	return (
		<Fragment>
			{onConfirm ? (
				<Popconfirm title={popTitle}
					onConfirm={() => onConfirm && onConfirm()}
					onCancel={() => onCancel && onCancel()}
					placement={placement}
					okText={okText}
					icon={popTitle ? <InfoCircleOutlined /> : null}
					cancelText={cancelText}>
					<_Button {...props}
						title={title}
						iconState={iconState}
						type={type}
						action={action}
						children={children}
						onClick={onClick}>
						{children}
					</_Button>
				</Popconfirm  >
			) : (
				<_Button {...props}
					title={title}
					iconState={iconState}
					type={type}
					action={action}
					children={children}
					onClick={onClick}>
					{children}
				</_Button>
			)}
		</Fragment >
	)
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
};

export default ConsysButton;