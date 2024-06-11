

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