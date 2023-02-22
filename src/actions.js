import {firebaseApp} from'./firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'

const db = firebase.firestore(firebaseApp)

export const getCollections = async(collection)=>{
    const result = { statusResponse : false,data : null,error : null}
    try{
        const data = await db.collection(collection).get()
        const arrayData = data.docs.map(doc=> ({id:doc.id,... doc.data()}))
        result.statusResponse=true
        result.data=arrayData
    }catch(error){
        result.error = error
    }
    return result
}
//post task
export const addDocument = async (collection,data)=>{
    const result = { statusResponse : false,data : null,error : null}
    try{
        const response = await db.collection(collection).add(data)
        result.data= { id: response.id}
        result.statusResponse=true
    }catch(error){
        result.error=error
    }
    return result
}
//get just one document 
export const getDocument = async (collection,id)=>{
    const result = { statusResponse : false,data : null,error : null}
    try{
        const response = await db.collection(collection).doc(id).get()
        result.data = {id : response.id , ... response.data()}
        result.statusResponse=true
    }catch(error){
        result.error=error
    }
    return result
}

export const updateDocument= async (conllection,id,data)=>{
    const result = { statusResponse : false,data : null,error : null}
    try{
        await db.collection(conllection).doc(id).update(data)
        result.statusResponse=true
    }catch(error){
        result.error=error
    }
    return result
}

export const deleteDocument= async (conllection,id)=>{
    const result = { statusResponse : false,error : null}
    try{
        await db.collection(conllection).doc(id).delete()
        result.statusResponse=true
    }catch(error){
        result.error=error
    }
    return result
}
