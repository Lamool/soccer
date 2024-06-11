

let memberList = [];

function longin(){  console.log('longin()')

memberList = JSON.parse(localStorage.getItem('memberList'));
if(memberList == null){memberList = [];}


  let id = document.querySelector('#id').value; console.log(id)
  let pw = document.querySelector('#pw').value; console.log(pw)


  for(let i = 0; i < memberList.length; i++){
    if(memberList[i].id == id && memberList[i].pw == pw){
      alert('로그인성공');

      sessionStorage.setItem('loginNo' , memberList[i].no);

      location.href = '03_mainPage.html';
      return;
    }
  }

  alert('로그인실패'); 
}