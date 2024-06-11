

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
    alert('새로운 두 비밀번호가 일치하지 않습니다.'); return;
  }

  memberList[findIndex].pw = newPw;
  localStorage.setItem('memberList' , JSON.stringify(memberList));

  alert('비밀번호가 변경되었습니다.')
  location="login.html";
}



function loginState(){
  let log = document.querySelector(`#HT`);
  let html = ``;
  let loginNo = sessionStorage.getItem('loginNo');
  if( loginNo == null ){ loginNo = 0 };
  if( loginNo != 0 ){
      html =`<li>
                  <a href="#" onclick="logOut()">
                      <span>
                          로그아웃
                      </span>
                  </a>
                  |
              </li>
              <li>
                  <a href="info.html">
                      <span>
                          내정보
                      </span>
                  </a>
                  |
              </li>
              
              <li>
                  <a href="#">
                      <span>
                          모바일앱
                      </span>
                  </a>
              </li>`;
  }else{
      html = `<li>
                  <a href="login.html">
                      <span>
                          로그인
                      </span>
                  </a>
                  |
              </li>
              <li>
                  <a href="signup.html">
                      <span>
                          회원가입
                      </span>
                  </a>
                  |
              </li>
              <li>
                  <a href="#">
                      <span>
                          모바일앱
                      </span>
                  </a>
              </li>`;
  }
  log.innerHTML = html;
}
function logOut(){
  sessionStorage.removeItem('loginNo');
  alert('로그아웃 되었습니다.');
  location.href=`03_mainPage.html`;
}
loginState();