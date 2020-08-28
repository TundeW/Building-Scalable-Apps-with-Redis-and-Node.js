const EventEmitter = require('events');
const { log } = require('console');

const Logger extends EventEmitter{
    constructor(){
        super()
    }

    log(msg){

    }

    writeMsgToFile(msg){
        this.on(eventName, data, () => {
            
        })
    }
}



const myEmitter = new EventEmitter();
console.log('Listening for event ..........')
myEmitter.on('product-order-event', ()=>{
    console.log('A new product has been ordered');
})

setTimeout(()=>{
    myEmitter.emit('product-order-event');
}, 3000)

