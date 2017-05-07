let hh = require('handlebars-helpers');

let ex = Object.assign(hh.logging(), hh.object());

module.exports = { };

for(let key of Object.keys(ex)) {
	module.exports['hh'+key] = ex[key];
}

// console.log(module.exports);

