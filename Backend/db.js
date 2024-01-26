/*TODO{
    1. Create a connection to the database
    2. Create a schema for the todo collection
    3. Create a model for the todo collection
    4. Create a controller for the todo collection
    5. Create a service for the todo collection
    6. Create a router for the todo collection

    title:string
    description:string
    completed:boolean
} */

const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://admin:Pratyush.2004@cluster0.8vc9zym.mongodb.net/todos')
// mongodb+srv://admin:Pratyush.2004@cluster0.8vc9zym.mongodb.net/
const todoSchema=mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})
const todo=mongoose.model('todos',todoSchema);
module.exports={
    todo
}