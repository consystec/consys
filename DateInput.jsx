import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

const YEAR = new Date().getFullYear();
const MONTH = new Date().getMonth();
const STRING_MONTHS = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
const Option = Select.Option;

function DateInput(props) {
	const [data, setData] = useState([]);

	useEffect(() => {
		const options = pushOneYear(MONTH, YEAR);

		const firstOption = {
			month: MONTH,
			year: YEAR,
			date: new Date(YEAR, MONTH)
		};

		setData([firstOption, ...options]);
	}, []);

	const pushOneYear = (month, year) => {
		const options = [];

		for (let i = 0; i < 12; i++) {
			if (month === 0) {
				month = 11;
				year -= 1;
			} else {
				month -= 1;
			}

			options.push({ month, year, date: new Date(year, month) });
		}

		return [...options];
	}

	const onPopupScroll = (e) => {
		const { clientHeight, scrollHeight, scrollTop } = e.target;

		if (clientHeight + scrollTop >= scrollHeight) {
			const { month, year } = data.at(-1);

			const newOptions = pushOneYear(month, year);

			setData([...data, ...newOptions]);
		}
	}

	return (
		<Select	{...props}
			onPopupScroll={props.onScroll || onPopupScroll}
			style={props.style || { width: '100%' }}>
			{data && data.map(el => {
				const key = STRING_MONTHS[el.month] + '/' + el.year;

				return <Option key={el.date}
					value={el.date.toString()}
					children={key} />
			})}
		</Select>
	);
}

export default DateInput;