import { calculateOp, isOp, isNumber } from './helper.js'
import Stack from './stack.js';


function postfixToAnswer(exp) {
	exp = exp
		.split(' ');
		let opstack = new Stack();
		for(let i = 0; i < exp.length; i++) {
			if(isNumber(exp[i])) opstack.push(Number(exp[i]));
			if(isOp(exp[i])) {
				let opr1 = opstack.pop();
				let opr2 = opstack.pop();
				let result = calculateOp(exp[i], opr1, opr2);
				opstack.push(result);
				console.log(result);
			}
		}
		return opstack.pop();
}

const priority = {
	'+': 1,
	'-': 1,
	'x': 2,
	'/': 2,
	'%': 2
}

function toPostfixToAnswer(infix) {
	let opstack = new Stack();
	let postfixList = [];
	infix = infix.split(' ');
	console.log(infix);
	for(let i = 0; i < infix.length; i++) {
		let token = infix[i];
		if(isNumber(token)) postfixList.push(token);
		if(token == '(') opstack.push(token);
		if(token == ')') {
			do {
				let popped = opstack.pop();
				if(isOp(popped)) postfixList.push(popped);
			} while(opstack.length() > 1);
			continue;
		} else if(isOp(token) && opstack.length() > 0) {	
			 	if(precedent(opstack.peek(), token)) {
			 		do {
				 		let popped = opstack.pop();
				 		postfixList.push(popped);
			 		} while(isOp(opstack.peek()))
			 	}
				opstack.push(token);
			continue;
		} else if(isOp(token) && opstack.length() == 0) {
			opstack.push(token);
		}
	};

	for(let i = 0; i < opstack.length(); i++) {
			let popped = opstack.pop();
			postfixList.push(popped);
	}

	console.log(postfixList);

	return postfixToAnswer(postfixList.join(' '));
}

function precedent(op1, op2) {
	return priority[op1] >= priority[op2];
}

export { toPostfixToAnswer };