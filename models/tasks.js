const Task=require('./task.js');
var colors = require('colors')

class Tasks{

    _list={

    }

    get listArray(){
        const list=[];
            Object.keys(this._list).forEach(key=>{
                const task = this._list[key];
                list.push(task);
            })
            return list;
            
    }

    constructor(){
        this._list={};
    }

    createTask(description){

        const task = new Task(description);

        this._list[task.id] = task;
        

    }
    
    deleteTask(id) {

        if ( this._list[id] ) {
            delete this._list[id];
        }

    }


    loadTasksFromArray(tasks=[]){

        tasks.forEach(task=>{
            this._list[task.id] = task
        })
    }

    listAllTasks(){
  
        this.listArray.forEach((element,i)=>{
            const {description,completionDate} = element;
            const id = `${colors.green.bold(i+1)}`;

            let status='';
            if(completionDate){
                status=`Completed`.green.bold
            }else{
                status=`Pending`.red.bold;
            }
            // (completionDate)? `Completed`.green.bold : `Pending`.red.bold;

            console.log(`${(id)}${'.'.green.bold} ${description} :: ${status}`)

        })
    }

    listByStatus( completed = true ) {

        console.log();
        let count = 0;
        this.listArray.forEach( e => {

            const { description,completionDate} = e;
            const status = (completionDate ) 
                                ? 'Completed'.green
                                : 'Pending'.red;
            if ( completed ) {
                // mostrar completadas
                if ( completionDate  ) {
                    count += 1;
                    console.log(`${ (count + '.').green } ${ description } :: ${ status } time of completion: ${(completionDate).green}`);
                }
            } else {
                // mostrar pendientes
                if ( !completionDate ) {
                    count += 1;
                    console.log(`${ (count + '.').green } ${ description } :: ${ status }`);
                }
            }

        });     

    }

    toogleTasks(ids=[]) {

        ids.forEach(id=>{
            const task = this._list[id];

            if(!task.completionDate){

                task.completionDate = new Date().toISOString()

            }
        });

        this.listArray.forEach(task=>{
            if(!ids.includes(task.id)){
               this._list[task.id].completionDate=null;
               
            }
        })

    }





   

}

module.exports=Tasks;