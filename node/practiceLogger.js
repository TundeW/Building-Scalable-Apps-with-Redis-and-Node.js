const EventEmitter = require('events');
const fs = require('fs');

class Logger extends EventEmitter {
    constructor(filePath){
        super()
        if(!filePath) throw new Error('File path is required, received: ', filePath)
        this.filePath = filePath;
        this._listenForEvent('log');
        this._listenForEvent('readLogs');
    }

    /**
     * @description API to be called externally to log to a file
     * @param {String} msg - Message to log to file
     */
    log(msg){
        this.emit('log', msg);   
    }

    readLogs(){
        this.emit('readLogs')
    }

    /**
     * @description Registers event
     * @param {String} eventName - Name of event to register
     */
    _listenForEvent(eventName) {
        this.on(eventName, (data) => {

            switch(eventName){
                case 'log': this._writeMsgToFile(data);
                            console.log(`###########  EVENT ${eventName} HANDLED`);
                            break;
                case 'readLogs': this._readMsgFromFile(); 
                                console.log(`###########  EVENT ${eventName} HANDLED`);
                                break;
                default: break;
            }

        })
    }

    /**
     * @description Makes data avalaible to client
     * @param {String} data  - Logs read to be sent back to client
     */
    _sendDataToClient (data){
        this.emit('data-is-ready', data);
        console.log('########## Logs sent to client');
    }

    /**
     * @description Writes data to log
     * @param {String} msg - Message to write to log file
     */
    _writeMsgToFile(msg){
        try{
            fs.appendFileSync(this.filePath, `${msg}\n`);
        }catch(e){
            console.log('########## Error occurred logging data to a file', e);
        }  
    }

    /**
     * @description Reads data from log
     * 
     */
    _readMsgFromFile(){
        try{
           const logs = fs.readFileSync(this.filePath, 'utf8');
           this._sendDataToClient(logs);
           console.log('########## Logs read successfully:\n\n ', logs);
        }catch(e){
            console.log('############# ERROR OCCURRED WHILE READING LOGS: ', e);
        }
    }
}

// Sample usage
const cLogger = new Logger('./server.log');
cLogger.log('I love to write codes!');
cLogger.log('Waheed is a Senior Software Engineer @ Enyata Inc.');
cLogger.readLogs();