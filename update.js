

let memberList = [];

function update(){

  let pw = document.querySelector('#pw').value
  let newPw = document.querySelector('#newPw').value
  let newPwConfirm = document.querySelector('#newPwConfirm').value

  let loginNo = sessionStorage.getItem('loginNo');

  memberList = JSON.parse(localStorage.getItem('memberList'));
  if(memberList == null){memberList = []}

  let findResult = false;
  let findIndex = 0;

  for(let i = 0; i < memberList.length; i++ ){
    if(memberList[i].no == loginNo && memberList[i].pw == pw){
      findResult = true;
      findIndex = i;
      break;
    }
  }

  if(findResult == false){
    alert('회원의 비밀번호가 일치하지 않습니다.'); return;}

  if(newPw.length < 5 || newPwConfirm.length < 5){
    alert('새로운 비밀번호는 5글자 이상으로 해주세요'); return;
  }
  if(newPw != newPwConfirm){
    alert('새로운 두 비밀번호가 ㅇ ㅣㄹ치하지 않습니다.'); return;
  }

  memberList[findIndex].pw = newPw;
  localStorage.setItem('memberList' , JSON.stringify(memberList));

  alert('비밀번호가 변경되었습니다.')
  location="login.html";
}
