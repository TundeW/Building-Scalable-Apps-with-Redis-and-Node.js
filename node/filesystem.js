const fs =  require('fs')

fs.appendFile('server.log', `\n[ ${Date()} ]: METHOD POST /login 400 IN ${__filename}`, 'utf8', (err)=>{
    if(err){
        console.log('############## UNABLE TO WRITE FILE')

    }else{
        console.log('############## DATA WRITTEN SUCCESSFULLY')
    }
})