const prompt = require('prompt-sync')({sigint:true});

function welcome() {
    console.log('\n');1
    console.log('Welcome to the To-Do List Manager Application!');
    console.log('\n');
    console.log('==============================================');
    console.log('\n');
    console.log('Your to-do list is empty.');
    console.log('\n');
    return;
};

function selectAnAction(){
    console.log('~ Select an action ~');
    console.log('[1] Create a to-do item');
    console.log('[2] Complete a to-do item');
    console.log('[Ctrl + C] To quit the program')
    userDecision = prompt('> ');
    return userAction(userDecision);
}

function userAction(str){
    if (str === '1'){
        toDoItem = askToCreatToDoItem();
        toDoArray = addItemToDoList(toDoItem);
    } else if (str === '2' && toDoArray[0][0] === ''){
        exceptionNoItems();
    } else if (str === '2' && toDoArray[0][0] !== ''){
        completeAnItem();
    }else {
        exceptionInvalidInput();
    }
}

function completeAnItem(){
    console.log('\n');
    console.log('==============================================');
    console.log('\n');
    console.log('~ Completing a to-do item ~');
    displayToDoList();
    checkIfAllItemsAreComplete();
    console.log('Which to-do item would you like to complete?')
    itemNumberString = prompt('> ');
    itemNumber = Number(itemNumberString);
    if(isNaN(itemNumber)){
        exceptionInvalidCompletionEntry();
    } else if (itemNumber === 0){
        exceptionInvalidCompletionEntry();
    }else if (itemNumber > toDoArray.length){
        exceptionItemDoesNotExist()
    } else if (itemNumber > 0 && itemNumber <= toDoArray.length && toDoArray[itemNumber-1][1] === false){
        writeItemComplete(itemNumber);
    } else if (toDoArray[itemNumber-1][1] === true){
        exceptionItemAlreadyComplete();
    }else if (itemNumber > toDoArray.length){
        exceptionItemDoesNotExist();
    } else {
        exceptionInvalidCompletionEntry();
    }
    displayToDoList();
    checkIfAllItemsAreComplete();
    selectAnAction();
}

function exceptionItemAlreadyComplete(){
    console.log('\n');
    console.log('==============================================');
    console.log('\n');
    console.log('Error: You have already completed that item');
    console.log('Please choose an incomplete item from your to-do list')
    return completeAnItem();
}

function writeItemComplete(num){
    toDoArray[num-1][1] = true;
}

function checkIfAllItemsAreComplete(){
    let incomplete = true;
    for(let i = 0; i < toDoArray.length; i++){
        if (toDoArray[i][1] === false){
            incomplete = false;
        }
    }
    if (incomplete === true){
        congrats();
    }
    return;
}

function congrats(){
    console.log('Congratulations, you have completed all the items on your to-do list!');
    console.log('You can now add a new item to your to-do list');
    console.log('\n');
    console.log('==============================================');
    console.log('\n');
    return selectAnAction();
}

function exceptionItemDoesNotExist(){
    console.log('\n');
    console.log('==============================================');
    console.log('\n');
    console.log('Error: That Item does not exist');
    console.log('Please choose an item from your to-do list')
    return completeAnItem();
}

function exceptionInvalidCompletionEntry(){
    console.log('\n');
    console.log('==============================================');
    console.log('\n');
    console.log('Error: Invalid entry');
    console.log('Please try again')
    return completeAnItem();
}

function askToCreatToDoItem(){
    console.log('\n');
    console.log('==============================================');
    console.log('\n');
    console.log('~ Creating a new to-do item ~');
    console.log('What is the to-do item called?');
    toDoItem = prompt('> ');
    return toDoItem;
}

function addItemToDoList(str){
    if (toDoArray[0][0] === ''){
        toDoArray[0][0] = str;
        toDoArray[0][1] = false;
    } else {
        toDoArray.push([]);
        toDoArray[toDoArray.length - 1][0] = str;
        toDoArray[toDoArray.length - 1][1] = false;
    }
    
    displayToDoList();
    return selectAnAction();
}

function incompleteItemsCount(){
    let completeItems = 0;
    for (i = 0; i < toDoArray.length; i++){
        if (toDoArray[i][1] === true){
            completeItems += 1;
        }
    }
    return completeItems;
}

function displayToDoList() {
    let completeItems = toDoArray.length - incompleteItemsCount();
    console.log('You have ' + completeItems + ' incomplete to-do item(s).');
    for (i = 0; i < toDoArray.length; i++){
        if (toDoArray[i][1] === true){
            isComplete = 'complete';
        } else {
            isComplete = 'incomplete';
        }
        console.log(i+1 + '. [' + isComplete + '] ' + toDoArray[i][0]);
    }
    console.log('\n');
    console.log('==============================================');
    console.log('\n');
    return;
}

function exceptionNoItems(){
    console.log('\n');
    console.log('==============================================');
    console.log('\n');
    console.log('Your to-do list is empty.');
    console.log('Please select: [1] Create a to-do item');
    console.log('\n');
    console.log('==============================================');
    console.log('\n');
    return selectAnAction();
}

function exceptionInvalidInput(){
    console.log('\n');
    console.log('==============================================');
    console.log('\n');
    console.log('Error: Invalid entry');
    console.log('Please try again');
    console.log('\n');
    console.log('==============================================');
    console.log('\n');
    return selectAnAction();
}

let toDoItem = '';

let itemNumberString = '';

let itemNumber = 0;

let isComplete = '';

let toDoArray = [['', false]];

let userDecision = '';

welcome();

selectAnAction();

userAction(userDecision);