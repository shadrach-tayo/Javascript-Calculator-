import Stack from './stack.js';
import { addListenerAndCallback, isOp, isNumber} from './helper.js';


class Calculator {
	constructor() {
		this.name = 'IphoneX calculator';
		this.runtimeInput = new Stack();

		// properties to be bound
		this.clearScreen = this.clearScreen.bind(this);
		this.updateScreen = this.updateScreen.bind(this);
		this.popRuntimeInput = this.popRuntimeInput.bind(this);
		this.handleOprandClick = this.handleOprandClick.bind(this);
		this.handleDecimalClick = this.handleDecimalClick.bind(this);
		this.handleOperatorClick = this.handleOperatorClick.bind(this);
		this.evaluateRuntimeInput = this.evaluateRuntimeInput.bind(this);

		this.getDisplayScreen();
		this.getInputButtons();
		this.getUtilButtons();
	}

	getDisplayScreen() {
		this.finalDisplay = document.querySelector('.display__runtime-final');
		this.runtimeDisplay = document.querySelector('.display__runtime-input');
		console.log('Display screen initilized');
	}

	// Get all input buttons both for operators and operands
	// addeventListeners to all;
	getInputButtons() {
		this.decimalButton = document.querySelector('.input__decimal');
		this.oprandButtons = [...document.querySelectorAll('.input__oprand')];
		this.operatorButtons = [...document.querySelectorAll('.input__operator')];

		// Add listeners to input buttons;
		addListenerAndCallback(this.decimalButton, 'click', this.handleDecimalClick);
		this.oprandButtons.forEach(button => addListenerAndCallback(button, 'click', this.handleOprandClick));
		this.operatorButtons.forEach(button => addListenerAndCallback(button, 'click', this.handleOperatorClick));
		console.log('Buttons initilized');
	}  

	getUtilButtons() {
		this.deleteButton = document.querySelector('.input__button-delete');
		this.clearButton = document.querySelector('.input__button-clear');
		this.evaluteButton = document.querySelector('.js-evaluate');

		addListenerAndCallback(this.evaluteButton, 'click', this.evaluateRuntimeInput);
		addListenerAndCallback(this.deleteButton, 'click', this.popRuntimeInput);
		addListenerAndCallback(this.clearButton, 'click', this.clearScreen);
	}

	// handle oprand click events
	handleOprandClick(e) {
		console.log(this.runtimeDisplay.innerHTML, this.runtimeInput);
		let oprand = e.target.dataset.calc;

		// check if last element of runtime stack is an operator push as next oprand
		// else add to the last digits in the stack;
		if(this.runtimeInput.length() == 0) {
			this.runtimeInput.push(oprand);
		} else if(isOp(this.runtimeInput.peek())) {
			this.runtimeInput.push(oprand);
		} else {
			let newOprand = this.runtimeInput.peek().concat(oprand);
			console.log(newOprand);
			this.runtimeInput.dataStore[this.runtimeInput.top - 1] = newOprand;
		}
		this.updateScreen();
		console.log(this.runtimeInput);
	}

	// handle operator click events
	handleOperatorClick(e) {
		let operator = e.target.dataset.calc;
		if(this.runtimeInput.peek() && !isOp(this.runtimeInput.peek())) {
			this.runtimeInput.push(operator);
		}
		this.updateScreen();
		console.log(operator);
	}

	// handle insertion of decimal in runtime inputs
	handleDecimalClick(e) {
		let decimal = e.target.dataset.calc;
		// Insert if last runtime input element is a digit
		if(!isNumber(this.runtimeInput.peek())) return;
		let newOprand = this.runtimeInput.peek().concat(decimal);
		console.log(newOprand);
		this.runtimeInput.dataStore[this.runtimeInput.top - 1] = newOprand;
		this.updateScreen();
	}

	updateScreen() {
		if(this.runtimeDisplay.innerHTML
		 == this.runtimeInput.dataStore.join("")
		 ) return;
		let inputs = '';
		for(let i = 0; i < this.runtimeInput.length(); i++) {
			inputs += this.runtimeInput.dataStore[i];
		}
		this.runtimeDisplay.innerHTML = inputs;
	}

	clearScreen() {
		this.runtimeDisplay.innerHTML = '';
		this.finalDisplay.innerHTML = '';
	}

	popRuntimeInput() {
		let oprand = this.runtimeInput.peek();
		if(isOp(this.runtimeInput.peek())) {
			this.runtimeInput.pop()
		} else if(isNumber(this.runtimeInput.peek())) {
			if(oprand.length == 1) {
				this.runtimeInput.pop();
			} else {
				let newOprand = oprand.slice(0, oprand.length - 1);
				this.runtimeInput.dataStore[this.runtimeInput.top - 1] = newOprand;
			}
		}
		this.updateScreen();
	}

	evaluateRuntimeInput() {
		console.log('Evaluating expression');
	}

}

const App = new Calculator();