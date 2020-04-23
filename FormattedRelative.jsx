import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

function FormattedRelative({ current = moment(), previous }) {
  const timeDifference = () => {
    var msSegundos = 1000;
    var msPorMinuto = msSegundos * 60;
    var msPorHora = msPorMinuto * 60;
    var msPorDia = msPorHora * 24;
    var msPorMes = msPorDia * 30;
    var msPorAno = msPorDia * 365;

    var elapsed = current - previous;

    if (elapsed < msPorMinuto) {
      return formatString(roundTime(elapsed, msSegundos), 'segundo');
    } else if (elapsed < msPorHora) {
      return formatString(roundTime(elapsed, msPorMinuto), 'minuto');
    } else if (elapsed < msPorDia) {
      return formatString(roundTime(elapsed, msPorHora), 'hora');
    } else if (elapsed < msPorMes) {
      return formatString(roundTime(elapsed, msPorDia), 'dia');
    } else if (elapsed < msPorAno) {
      return formatString(roundTime(elapsed, msPorMes), 'mês');
    } else {
      return formatString(roundTime(elapsed, msPorAno), 'minuto');
    }
  }

  const roundTime = (value, format) => {
    return Math.round(value / format);
  }

  const formatString = (value, unit) => {
    let string = `Há ${value} `;

    if (value === 1) {
      string += unit;
    } else if (unit === 'mês') {
      string += 'meses';
    } else {
      string += unit + 's';
    }

    return string;
  }

  return (
    <span>
      {timeDifference()}
    </span>
  );
}

FormattedRelative.propTypes = {
  current: PropTypes.object,
  previous: PropTypes.object
};

export default FormattedRelative;