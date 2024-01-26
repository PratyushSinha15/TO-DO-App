const {object,number,string}=require('zod')

//for the first onr the tittle is string and description is also string
//for markComplete the id is number

const createTodo=object({
    title:string(),
    description:string()
})

const updateTodo=object({
    id:number()
})

module.exports={
    createTodo:createTodo,
    updateTodo:updateTodo
}
