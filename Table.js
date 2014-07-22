Table = function() {
	this.table = [];
	this.length = this.table.length;
};
//Takes an arbitrary number of arguments where the
//first should be the header and the rest should be data
Table.prototype.addColumn = function () {
	var column = [];

	for (var i in arguments) {
		column.push(arguments[i]);
	}

	this.table.push(column);
	//Normalizes all columns to the same length
	normalizeDimensions(this);
};
Table.prototype.addColumnAsArray = function (column) {

	this.table.push(column);
	//Normalizes all columns to the same length
	normalizeDimensions(this);
};
Table.prototype.getTable = function() {
	return this.table;
};
/*
*	Returns the number of columns in a table
*/
Table.prototype.numberOfColumns = function() {
	return this.table.length;
};
/*
*	Returns the number of rows in a column. If no argument (column)
*	is supplied, the number of rows in the first column will be returned.
*/
Table.prototype.numberOfRows = function(column) {
	if (isNaN(column)) {
		return this.table[0].length;
	} else if (column < this.table.length){
		return this.table[column].length;
	} else {
		console.log('unvalid argument specified for numberOfRows');
	}
};
Table.prototype.push = function(column,element) {
	this.table[column].push(element);
};
Table.prototype.pop = function(column) {
	this.table[column].pop();
};
Table.prototype.getLongestColumnLength = function() {
	var longest = 0;

	for (var i in this.table) {
		if (longest < this.table[i].length) {
			longest = this.table[i].length;
		}
	}

	return longest;
};
Table.prototype.renderTable = function() {

	var html = '';

	domElement = document.getElementById('javascript');
	html += '<table>';

	//Do this for each rom
	for (var n=0; n<this.table[0].length; n++) {
		
		html += '<tr>';
		
		//Do this for each column
		for (var i=0; i<this.table.length; i++) {
			html += '<td>' + this.table[i][n] + '</td>';
		}
		html += '</tr>';
	}
	html += '</table>';

	domElement.innerHTML = html;
};

/*
*	Will render output formatted as CSV. Arguments are
*	_newline:	specify a newline-character (i.e. '\n' or '<br>' - defaults to '\n')
*	_separator: specify a separator (i.e. ',' or ';' - defaults to ',')
*	_domID:		specify an ID in the DOM to print to the browser window (defaults to console)
*/
Table.prototype.renderCSV = function(_newline, _separator, _domID) {

	var newline = '\n';
	var separator = ',';
	var output = '';

	//If custom arguments are supplied initialize them
	if (typeof _newline == 'string' && typeof _separator == 'string') {
		newline = _newline;
		separator = _separator;
	}


	//Do this for each rom
	for (var n=0; n<this.numberOfRows(); n++) {
		
		//Do this for each column
		for (var i=0; i<this.numberOfColumns(); i++) {
			output += '"' + this.table[i][n] + '"';
			if (i != this.numberOfColumns() -1) {
				output +=separator;
			}
		}
		output += newline;
	}

	//If a DOM ID is supplied, the output will be written to that
	//element in the DOM. Otherwise it will be logged to the console.
	if (typeof _domID == 'string') {
		domElement = document.getElementById(_domID);
		domElement.innerHTML = output;
	} else {
		console.log(output);
	}
};
function normalizeDimensions(table) {

	if (table instanceof Table) {
		var longestColumn = table.getLongestColumnLength();

		//Done for each column
		for (var i=0; i<table.numberOfColumns(); i++) {

			var elementsToAdd = longestColumn - table.numberOfRows(i);

			while (elementsToAdd > 0) {
				table.push(i,'');//Adds empty strings to normalize array lengths
				elementsToAdd--;
			}
		}
	} else {
		console.log('normalizeDimensions was called with illegal arguments');
	}
}