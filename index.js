// //To use function add from functions.js
// import { add } from './functions.js'
// console.log(add(1,2))

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'
//Database from firebase
const appSettings = {
    databaseURL: "https://playground-ede37-default-rtdb.firebaseio.com"
}
const app = initializeApp(appSettings) //To connect our project with firebase
const database = getDatabase(app)
const ShoppingList = ref(database, "ShoppingList")

const button = document.getElementById('add-button')
const input = document.getElementById('input-field')
const right = document.getElementById('shopping-list')


button.addEventListener('click', function(){
    let val = input.value
    push(ShoppingList, val)
    clear()
})

onValue(ShoppingList, function(snapshot){
    if(snapshot.exists()){
        const now = snapshot.val()
    
        const onlyVal = Object.entries(now)
        clearShopping()
        for(let i=0;i<onlyVal.length;i++){
            let currentItem = onlyVal[i]
            let currentItemId = currentItem[0]
            let currentItemValue = currentItem[1]
            appendList(currentItem)
        }
    }
    else{
        right.innerHTML = "No items here...yet"
    }
 
})
function clearShopping(){
    right.innerHTML = ""
}

function clear(){
    input.value = ''
}
function appendList(item){

    //right.innerHTML += `<li>${item}</li>`
    let itemId = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    newEl.addEventListener('click', function(){
        let exactLocationOfItemInDB = ref(database,`ShoppingList/${itemId}`)
        remove(exactLocationOfItemInDB)  
       
    })

    right.append(newEl)
}
