class Calculator {
    constructor(){
        this.result = 0
    }

    add(a,b){
        let firstNum = a ? a : 0;
        let secondNum = b ? b : 0;
        this.result = firstNum + secondNum + this.result;

        return this.result;
    }

    subtract(a,b){
        let firstNum = a ? a : 0;
        let secondNum = b ? b : 0;
        this.result = this.result - firstNum - secondNum; 

        return this.result;
    }

    reset(){
        this.result = 0;
        return this.result;
    }
}


var adam = new Calculator;

console.log('############# Adding 2 to the total:',adam.add(2));
console.log('############# Adding 5 to the total:',adam.add(5));
console.log('############# Adding 6 and 3 to the total:',adam.add(6,3));
console.log('############# Subtracting 4 from the total:',adam.subtract(4));
console.log('############# Subtracting 2 from the total:',adam.subtract(2));
console.log('############# Adding 3 and 5 to the total:',adam.add(3,5));
console.log('############# Resetting Calculator:',adam.reset());
console.log('############# Subtracting 3 and 7 from the total:',adam.subtract(3, 7));
console.log('############# Adding 10, 17  to the total:',adam.add(10, 17));
console.log('############# Subtracting 15 from the total:',adam.subtract(15));
