const addUserBtn = document.getElementById('addUser');
const btnText = addUserBtn.innerText;
const userNameTextField = document.getElementById('userName');
const recordDisplay = document.getElementById('record');
let userArray = [];
let edit_id= null;

let objStr = localStorage.getItem('users');
if(objStr!=null){
  userArray = JSON.parse(objStr);
}

DisplayInfo();
addUserBtn.onclick=()=>{
    const name = userNameTextField.value;
    if(edit_id!=null){
       userArray.splice(edit_id,1,{'name' : name});
       edit_id=null;
    }else{
    userArray.push({'name' : name});
        
    }
   
    SaveInfo(userArray);
    userNameTextField.value = '';
    DisplayInfo();
    addUserBtn.innerText = btnText;
    
  

}

function SaveInfo(userArray){

let str = JSON.stringify(userArray);
 localStorage.setItem('users', str);


}
function DisplayInfo(){
    let statement = '';
    userArray.forEach((user,i) => {
        statement += `<tr>
        <th scope="row">${i+1}</th>
        <td>${user.name}</td>
        <td> <i class=" btn btn-white fa fa-edit btn-info mx-3" onclick='EditInfo(${i})'></i> 
         <i class="btn btn-danger fa fa-trash"onclick='DeleteInfo(${i})'></i> </td>
      </tr>`;
    });
    recordDisplay.innerHTML = statement;


}
function EditInfo(id){
    edit_id = id;
    userNameTextField.value = userArray[id].name;
    addUserBtn.innerText='Save Changes';

}
function DeleteInfo(id){
  userArray.splice(id,1);
  SaveInfo(userArray);
  DisplayInfo();


}