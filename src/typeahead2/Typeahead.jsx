import React, { useEffect, useState } from 'react';
import { message, Select } from 'antd';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types';
import http from 'consys/http';

const { Option } = Select;

function Typeahead({ url, params, view, method, placeholder }) {
	const [options, setOptions] = useState([]);
	const [icon, setIcon] = useState(<SearchOutlined />);
	const [selected, setSelected] = useState();

	useEffect(() => {
		fetch();
	}, []);

	const fetch = (value) => {
		http(url, {
			method: method || 'GET',
			params: { ...params, filtro: value }
		}).then((res) => {
			setOptions(res);
		}).catch((err) => {
			message.error(err.message)
		})
	}

	const handleOpen = (isOpen) => {
		if (isOpen) {
			setIcon(<CloseOutlined onClick={() => setSelected(null)} />)
		} else {
			setIcon(<SearchOutlined onClick={() => fetch()} />);
		}
	}

// Quando aperta no icone x, ele não fecha as opções, apenas seta o valor pra null.

	return (
		<Select
			suffixIcon={icon}
			onDropdownVisibleChange={handleOpen}
			showSearch
			placeholder={placeholder || "Selecionar..."}
			onSearch={fetch}
			value={selected}
			onSelect={(value) => setSelected(value)}
			filterOption={false}>
			{options && options.map((option, i) => (
				<Option key={i}>
					{view(option)}
				</Option>
			))}
		</Select >
	);
}

Typeahead.propTypes = {
	view: PropTypes.func,
	url: PropTypes.string,
	params: PropTypes.object,
	method: PropTypes.string,
	placeholder: PropTypes.string
}
export default Typeahead;