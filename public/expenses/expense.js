const { response } = require("express");

//add Expense
async function expense(e){
    try{
        e.preventDefault();

        const amount = e.target.amount.value;
        const description = e.target.description.value;
        const category = e.target.category.value;

        const expenseDetails = {
            amount : amount,
            description : description,
            category : category
        };

        const response = await axios.post('http://localhost:3000/expense/add-expense',expenseDetails)
        showOnScreen(response.data.newExpenseDetails);
    }
    catch(err){
        document.body.innerHTML += `<h4> Something went wrong </h4>`;
        console.log(err);
    }
}

//get expense
window.addEventListener("DOMContentLoaded",async (e) => {
    try{
        for(var i=0; i<response.data.allExpenses.length;i++){
            showOnScreen(response.data.allExpenses[i]);
        }
    }
    catch(err){
        console.log(err);
    }

})

//show expense details on screen
function showOnScreen(user) {
    const parentNode = document.getElementById("listOfUser");

    const childHTML = `<li id=${user.id}> ${user.amount} - ${user.description} - ${user.category} 
    <button style="margin: 5px; padding-left: 7px; padding-right: 7px; color:green; font-weight: bold;" onclick=editUserDetails('${user.description}','${user.amount}','${user.category}','${user.id}')>Edit</button>
    <button style="margin: 7px; padding-left: 7px; padding-right: 5px;  color:red; font-weight: bold;" onclick=deleteUser('${user.id}')>Delete</button><br> </li>`;

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

//edit expense
function editUserDetails(description,amount, category, userId) {
  
    document.getElementById("description").value = description;
    document.getElementById("amount").value = amount;
    document.getElementById("category").value = category;

    deleteExpense(userId);

}

//delete expense
async function deleteExpense(userId){
    try{
        const response = await axios.delete(`http://localhost:3000/expense/delete-expense/${userId}`)
        removeUserFromScreen(userId)
    }
    catch(err){
        console.log(err);
    }
}

//remove expense
function removeUserFromScreen(userId) {
    const parentNode = document.getElementById("listOfUser");
    const childNodeToBeDeleted = document.getElementById(userId);
  
    if (childNodeToBeDeleted) {
      parentNode.removeChild(childNodeToBeDeleted);
    }
  }