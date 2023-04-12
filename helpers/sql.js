const { BadRequestError } = require('../expressError');

// THIS NEEDS SOME GREAT DOCUMENTATION.
/** Takes in an object to update and an object that translates JS to SQL
 * transforms data to update into an array of columns and parameterized variables
 * returns string with comma seperated data and
 *  another array of values from the original input
 *  that will become the new field values in the database
 *
 * throws error if no data is provided
 */
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
	const keys = Object.keys(dataToUpdate);
	if (keys.length === 0) throw new BadRequestError('No data');

	// {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
	const cols = keys.map(
		(colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
	);

	return {
		setCols: cols.join(', '),
		values: Object.values(dataToUpdate),
	};
}

/** Return SQL to populate WHERE clause in search-related SQL queries.
 * Accepts two objects, the first is the search filter and
 *
 * RETURNS: {where: "handle ILIKE '%'|| $1 || '%' AND num_employees >= $2"
 * 						values:['net', 20]
 * 					};
 *
 */
function sqlForSearchFilters(dataToSearch) {
// [>==, <=, 'ILIKE']
}

module.exports = { sqlForPartialUpdate, sqlForSearchFilters };
