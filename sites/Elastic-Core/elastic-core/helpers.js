
var $ = module.exports = require('handlebars');


$.registerHelper('compare', function(lvalue, operator, rvalue, options) {

	var operators, result;
	
	if (arguments.length < 3) {
		throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
	}
	
	if (options === undefined) {
		options = rvalue;
		rvalue = operator;
		operator = "===";
	}
	
	operators = {
		'==': function (l, r) { return l == r; },
		'===': function (l, r) { return l === r; },
		'!=': function (l, r) { return l != r; },
		'!==': function (l, r) { return l !== r; },
		'<': function (l, r) { return l < r; },
		'>': function (l, r) { return l > r; },
		'<=': function (l, r) { return l <= r; },
		'>=': function (l, r) { return l >= r; },
		'typeof': function (l, r) { return typeof l == r; }
	};
	
	if (!operators[operator]) {
		throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
	}
	
	result = operators[operator](lvalue, rvalue);
    
	if (result) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
});


/**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @param obj1
 * @param obj2
 * @returns obj3 a new object based on obj1 and obj2
 */
$.mergeDicts = function(obj1, obj2) {

	var obj3 = {};

	for(var attrname in obj1) { 
		obj3[attrname] = obj1[attrname]; 
	}

	for(var attrname in obj2) { 
		obj3[attrname] = obj2[attrname]; 
	}

	return obj3;
};


$.yyyymmdd = function(date) {

	var mm = ("0"+ (date.getMonth()+1)).slice(-2); // in javascript month start from 0.
	var dd = ("0"+ date.getDate()).slice(-2); // add leading zero 
	var yyyy = date.getFullYear();

	return  {"mm" : mm, "dd" : dd, "yyyy" : yyyy}; 
};


$.weekRange = function(date) {

	var day = date.getDay();

	var diff = date.getDate() - day + (day == 0 ? -6:1); // 0 for sunday


	var weekStartTstmp = date.setDate(diff);           

	var weekStart = new Date(weekStartTstmp);

	var weekStartDate = $.yyyymmdd(weekStart);

	var weekEnd  = new Date(weekStartTstmp);  // first day of week 
	weekEnd = new Date(weekEnd.setDate(weekEnd.getDate() + 6));

	var weekEndDate = $.yyyymmdd(weekEnd);


	return {"start" : weekStartDate, "end" : weekEndDate};
};


$.monthRange = function(date) {

	var firstDay = new Date(date.getFullYear(), date.getMonth(), 1); 

	var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

	var monthStartDate = $.yyyymmdd(firstDay);

	var monthEndDate = $.yyyymmdd(lastDay);

	return {"start" : monthStartDate, "end" : monthEndDate};
};


$.dateNow = function() {
	
	return new Date().format('yyyy-MM-dd HH:mm:ss.sss');
};
