

memberList = [];

info();
function info(){
  
  let loginNo = sessionStorage.getItem('loginNo');
  if(loginNo == null){
    alert('로그인후 가능한 페이지입니다.');
    location.href = 'login.html'
  }

  memberList = JSON.parse(localStorage.getItem('memberList'));
  if(memberList == null){memberList = []}

  for(let i = 0; i < memberList.length; i ++){
    if(memberList[i].no == loginNo){

      document.querySelector('#noBox').innerHTML = memberList[i].no;
      document.querySelector('#idBox').innerHTML = memberList[i].id;
      document.querySelector('#nameBox').innerHTML = memberList[i].name;
      document.querySelector('#phoneBox').innerHTML = memberList[i].phone;
      document.querySelector('#soccer').innerHTML = memberList[i].soccer;
      return;

    }
  }  
}

function _delete(){

  let msg = confirm('회원탈퇴를 하시겠습니까?')

  if(msg == false) return;

  let loginNo = sessionStorage.getItem('loginNo');
  for(let i = 0; i < memberList.length; i++){
    if(memberList[i].no == loginNo){
      memberList.splice( i , 1 );
      localStorage.setItem('memberList' , JSON.stringify(memberList));
      alert('회원탈퇴 했습니다'); break;
      
    }
  }
  location.href="03_mainPage.html";
  logout();
}


function update(){
  location.href="update.html";
}
function logout(){
  sessionStorage.removeItem('loginNo');
  location.href=`03_mainPage.html`;
}





