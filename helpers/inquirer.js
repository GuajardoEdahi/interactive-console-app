const inquirer = require('inquirer');
require('colors');

const questions=[
    {
        type: 'list',
        name:'option',
        message: 'What would you like to do?',
        choices:[
            {
                value:'1',
                name:`${'1.'.green.bold} Create a task`
            },
            {
                value:'2',
                name:`${'2.'.green.bold} List all the tasks`
            },
            {
                value:'3',
                name:`${'3.'.green.bold} List all completed tasks`
            },
            {
                value:'4',
                name:`${'4.'.green.bold} List pending tasks`
            },
            {
                value:'5',
                name:`${'5.'.green.bold} Change status of a task`
            },
            {
                value:'6',
                name:`${'6.'.green.bold} Delete a task`
            },
            {
                value:'0',
                name:`${'0.'.green.bold} Exit`
            },
   
        ]


    }
]

const inquirerMenu=async()=>{
    
    console.clear();

    console.log('================================'.green.bold);
    console.log('       Choose an option'.bold);
    console.log('================================'.green.bold);

    const {option} = await inquirer.prompt(questions)

    return option;
}



const pause = async()=>{
    const pausePrompt=[
        {
            type:'input',
            name:'pauseQuestion',
            message:`Press ${'ENTER'.green} to continue`,
        }
    ]

    console.log('\n')

    const {pauseQuestion} = await inquirer.prompt(pausePrompt);


}


const readInput = async(message)=>{
    const question = [
        {
            type:'input',
            name:'description',
            message,
            validate(value){
                if(value.length===0){
                    return 'Please enter a description'
                }
                return true;
            }

        
    
        }

    ];

    const {description} = await inquirer.prompt(question) 
    return description;
}


const listDelete = async(tasks=[])=>{

    const choices = tasks.map((t,i)=>{
        const idx = `${i+1}.`.green.bold;
        return{
            value:t.id,
            name: `${idx}${t.description}`
        }
    })

    choices.unshift({
        value:'0',
        name: '0.'.green+'Cancel'
    })

    const questions =[
        {type:'list',
         name:'id',
         message:'Select the task that will be deleted',
         choices
        }
    ]

    const {id} = await inquirer.prompt(questions);
    return id;

}

const confirm = async (message)=>{
        
    const question = [
        {
            type:'confirm',
            name:'ok',
            message
        }
    ]
    const {ok} = await inquirer.prompt(question);
    return ok;

}
    

const checklist = async(tasks=[])=>{

    const choices = tasks.map((t,i)=>{
        const idx = `${i+1}.`.green.bold;
        return{
            value:t.id,
            name: `${idx}${t.description}`,
            checked:(t.completionDate)? true:false,
        }
    })


    const questions =[
        {type:'checkbox',
         name:'ids',
         message:'Select',
         choices
        }
    ]

    const {ids} = await inquirer.prompt(questions);
    return ids;

}



module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listDelete,
    confirm,
    checklist
}