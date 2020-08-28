class Ladder{
    constructor(){
        this.position = 0;
    }

    up(a){
        let step = a ? a : 1;
        this.position += step;

        return this.position;
    }

    down(a){
        let step = a ? a : 1;
        if(this.position - step < 0) {
            this.position = 0;
        }
        else {
            this.position -= step;
        }

        return this.position;
    }

    reset(a){
        this.position = 0;
        return this.position;
    }
}

var adam = new Ladder


console.log('############# Going up the ladder 1 step, Position:', adam.up());
console.log('############# Going down the ladder 1 step, Position:', adam.down());
console.log('############# Going up the ladder 4 steps, Position:', adam.up(4));
console.log('############# Going down the ladder 2 steps, Position:', adam.down(2));
console.log('############# Going down the ladder 5 steps, Position:', adam.down(5));
console.log('############# Going up the ladder 6 steps, Position:', adam.up(6));
console.log('############# Going up the ladder 3 steps, Position:', adam.up(3));
console.log('############# Going down the ladder 7 steps, Position:', adam.down(7));
console.log('############# Going up the ladder 4 steps, Position:', adam.up(4));
console.log('############# Going down the ladder 3 steps, Position:', adam.down(3));
console.log('############# Resetting Ladder, Position:', adam.reset());

