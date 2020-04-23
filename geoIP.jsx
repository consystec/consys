import http from 'consys/http';

function geoIP(callback) {
  http('http://ip-api.com/json', {
    api: false,
    json: false
  }).then(({query}) => {
    callback && callback({ip: query});
  }).catch(() => {
    
  });
}

export default geoIP;