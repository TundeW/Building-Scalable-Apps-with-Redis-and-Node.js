const fs = require('fs');

const createFolder = (folderName) => {
    fs.mkdir(`./${folderName}`, (err)=>{
        if(err){
            console.log(false);
        }else{
            console.log(true);
        }
    })
}

const addFiletoFolder = (folderName, fileName) => {
    const filePath = `${__dirname}/${folderName}/${fileName}`

    fs.appendFileSync(`./${folderName}/${fileName}`, `//The name of this new file is ${fileName}`, 'utf8' ,(err) =>{
        if(err){
            console.log('error', null)
        }else{
            console.log(filePath)
            console.log('############### File created!, File path:', filePath)
        }
        
    })
}

const listFilesInAFolder = (folderName) => {
    fs.readdir(`./${folderName}`, (err, files) => {
        if(err){
            console.log(null)
        }else{
            
            files.map(file => {
                let fileProperties = fs.statSync(`./${folderName}/${file}`)
                let fileSize = fileProperties.size
                console.log(`Name: ${file}, Size: ${fileSize} bytes`)
            }) 
        }
    })
}



const searchForAParticularFile = (fileName, dir) => {
    let path  = dir ? `.${dir}` : './'
    let filePath = dir ? `${dir}/` : `/`
    fs.readdir(path, (err, files) => {
        if(err){
            console.log()
        }else{
           for(let i = 0; i < files.length; i++){
               let fileProperties = fs.statSync(`.${filePath}${files[i]}`)

               if (fileProperties.isFile()){
                   if(files[i] ===  fileName){
                       console.log(`############### The File Path is: ${__dirname}${filePath}${files[i]}`);
                   }
               }
               if (fileProperties.isDirectory()){
                    searchForAParticularFile(fileName, `${filePath}${files[i]}` )
               }
           }
        }
    })
}



createFolder('life')
addFiletoFolder('life', 'programming.js')
listFilesInAFolder('waheed')
searchForAParticularFile('programming.js')




