function addListenerAndCallback(elem, event, callback, bind = false) {
	if(bind) {
		elem.addEventListener(event, callback.bind(null, elem));
	} else {
		elem.addEventListener(event, callback);		
	}
}


function isOp(n) {
	return operators.indexOf(n) !== -1;
}

function isNumber(n) {
	return /[0-9]/.test(n);
}

function calculateOp(op, op1, op2) {
	if(op == '+') return op2 + op1;
	if(op == '-') return op2 - op1;
	if(op == 'x') return op2 * op1;
	if(op == '/') return op2 / op1;
}

var operators = ['+', '-', '/', 'x', '%'];

export { addListenerAndCallback, isOp, isNumber, calculateOp };
