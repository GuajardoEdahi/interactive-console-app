require('colors');

const showMenu =() => {
    return new Promise(resolve => {
        console.clear();
        console.log('================================'.green.bold);
        console.log('       Choose an option'.bold);
        console.log('================================'.green.bold);
    
        console.log(`${'1.'.green.bold} Create task`);
        console.log(`${'2.'.green.bold} List tasks`);
        console.log(`${'3.'.green.bold} List completed tasks`);
        console.log(`${'4.'.green.bold} List pendig tasks`);
        console.log(`${'5.'.green.bold} Modify tasks`);
        console.log(`${'6.'.green.bold} Delete tasks`);
        console.log(`${'0.'.green.bold} Exit\n`);
    
        const readLine = require('readline').createInterface({
            input:process.stdin,
            output:process.stdout,
    
        });
    
        readLine.question('Select an option: ',(opt)=>{
    
            readLine.close();
            resolve(opt);
        })

    })

}


    const pause = ()=>{
        return new Promise((resolve)=>{
            const readLine = require('readline').createInterface({
                input:process.stdin,
                output:process.stdout,
        
            });
        
            readLine.question(`Press ${'ENTER'.green} to continue`,(opt)=>{
              
                readLine.close();
                resolve(opt);
            })

        })
  

    }

module.exports = {
    showMenu,
    pause,
}