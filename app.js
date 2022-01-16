require('colors');

const{inquirerMenu,
    pause,
    readInput,
    listDelete,
    confirm,
    checklist
} = require('./helpers/inquirer');

const Tasks=require('./models/tasks.js');

const {
saveDB,
readDB
} = require('./helpers/actionsDB');


const main = async() => {
    let opt='';

    const tasks = new Tasks();
    
    const tasksDB=readDB();

    if(tasksDB){

        tasks.loadTasksFromArray(tasksDB); 

    }
     do{
        opt= await inquirerMenu();
        switch(opt){
            case'1':

            const description = await readInput('Task description: ');
            tasks.createTask(description);

            break;

            case'2':

            tasks.listAllTasks();

            break;

            case '3':
            
            tasks.listByStatus(true)

            break;

            case '4':

                tasks.listByStatus(false)
            break;
            
            case '5':

            const ids =  await checklist(tasks.listArray);
            tasks.toogleTasks(ids);

                
            break;
            case '6':

            const id = await listDelete(tasks.listArray);
            if(id !=='0'){

                const confirmDelete = await confirm('Are you sure you want to delete this task?');

                if(confirmDelete){
                    console.log('task deleted successfully')
                    tasks.deleteTask(id)
                }

            }
            
            break;
           

        }

        saveDB(tasks.listArray)

       await pause();
        

    }while(opt!=='0');

   


}


main();