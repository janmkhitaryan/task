const { GetList, getItem, createItem, deleteItem, itemUpdate } = require('./service/todo')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema,
} = require('graphql') 

// TO_DO item

const ItemType = new GraphQLObjectType({
    name: "Item",
    fields: () => ({
        desc: {  type: GraphQLString },
        completed: {  type: GraphQLBoolean },
        id: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        lists:{
            type: new GraphQLList(ItemType),
            resolve(parent, args){
               
                return GetList()
            }
        },
        item:{
            type: ItemType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
             
                return getItem(args.id)
            }
        }

    }
})

const MutationRoot = new GraphQLObjectType({
    name: "MutationRoot",
    fields: {
        createToDo: {
            type: ItemType,
            args: {desc: {type: GraphQLString}},
            resolve(parent, args){
              
                return    createItem(args.desc)
                
            }
        },
        delete: {
            type: ItemType,
            args: {id: { type: GraphQLString }},
            resolve(parent, args){
                return deleteItem(args.id)
            }
        },
        update: {
            type: ItemType,
            args: {id: { type: GraphQLString }, completed: { type: GraphQLBoolean }},
            resolve(parent, args){
                return itemUpdate(args.id, args.completed)
            }
        }

    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: MutationRoot
})