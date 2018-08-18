class Stack {
	constructor() {
		this.top = 0;
		this.dataStore = [];
		this.pop = this.pop.bind(this);
		this.push = this.push.bind(this);
		this.peek = this.peek.bind(this);	
		this.clear = this.clear.bind(this);	
		this.length = this.length.bind(this);	
	}

	push(element) {
		this.dataStore[this.top++] = element;
	}

	pop() {
		return this.dataStore[--this.top];
	}

	peek() {
		return this.dataStore[this.top - 1];
	}

	length() {
		return this.top;
	}

	clear() {
		this.dataStore = [];
		this.top = 0;
	}
	
}

export default Stack;