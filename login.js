

let memberList = [];

function longin(){

memberList = JSON.parse(localStorage.getItem('memberList'));
if(memberList == null){memberList = [];}


  let id = document.querySelector('#id').value;
  let pw = document.querySelector('#pw').value;


  for(let i = 0; i < memberList.length; i++){
    if(memberList[i].id == id && memberList[i].pw == pw){
      alert('로그인성공');

      sessionStorage.setItem('loginNo' , memberList[i].no);

      location.href = '';
      return;
    }
  }

  alert('로그인실패');
}