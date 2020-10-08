/**
 * App routing
 *
 * @fileoverview Utility
 *
 * @author Deux Huit Huit <https://deuxhuithuit.com>
 * @license MIT <https://deuxhuithuit.mit-license.org>
 *
 * @namespace routing
 * @memberof App
 * @requires App
 */
(function (global, undefined) {
	'use strict';

	/**
	 * Factory for the query string parser
	 * @return {Object} accessible methods
	 */
	const queryStringParser = (function () {
		const a = /\+/g; // Regex for replacing addition symbol with a space
		const r = /([^&=]+)=?([^&]*)/gi;
		const d = function (s) {
			return decodeURIComponent(s.replace(a, ' '));
		};

		/**
		 * Parses the querystring into an object
		 * @name parse
		 * @memberof querystring
		 * @method
		 * @param {String} qs
		 * @returns {Object}
		 * @public
		 */
		const parse = function (qs) {
			const u = {};
			let e, q;

			//if we dont have the parameter qs, use the window location search value
			if (qs !== '' && !qs) {
				qs = window.location.search;
			}

			//remove the first caracter (?)
			q = qs.substring(1);

			while ((e = r.exec(q))) {
				u[d(e[1])] = d(e[2]);
			}

			return u;
		};

		/**
		 * Format the object into a valid query string
		 * @name stringify
		 * @memberof querystring
		 * @method
		 * @param {Object} qs Object needed to be transformed into a string
		 * @returns {String} Result
		 * @public
		 */
		const stringify = function (qs) {
			const aqs = Object.entries(qs).filter(function (e) {
				return !!e[1];
			}).map(function (e) {
				return e[0] + '=' + global.encodeURIComponent(e[1]);
			});
			if (!aqs.length) {
				return '';
			}
			return '?' + aqs.join('&');
		};

		return {
			parse: parse,
			stringify: stringify
		};
	})();

	/** Public Interfaces **/
	global.App = Object.assign({}, global.App, {
		routing: {

			/**
			 * Facade to parse and stringify a query string
			 * @namespace querystring
			 * @constant
			 * @property {Function} parse Parse the current queryString or the
			 *   provided one returns an object
			 * @property {Function} stringify Stringify the provided queryString
			 *   and returns a String
			 * @memberof routing
			 * @public
			 */
			querystring: queryStringParser
		}
	});

})(window);
