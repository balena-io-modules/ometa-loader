var ometajs = require('ometa-js');
module.exports = function(content) {
	this.cacheable && this.cacheable();
	try {
		return ometajs.compile(content);
	} catch (e) {
		if (e.OMeta != null && e.OMeta.line != null) {
			var idx = e.OMeta.idx,
				start = Math.max(idx - 30, content.lastIndexOf('\n', idx - 1) + 1, 0),
				end = Math.min(idx + 30, content.indexOf('\n', idx), content.length);
			throw new Error(
				'Error on line ' + e.OMeta.line + ', column ' + e.OMeta.col + '\n' +
				'Around: ' + content.substring(start, end) + '\n' +
				'Around: ' + content.substring(Math.max(start, idx - 2), Math.min(end, idx + 2))
			);
		}
		throw e;
	}
};
