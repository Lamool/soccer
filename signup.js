
memberList = [];

function signup(){  console.log("signup()")

  // localStorage 호출
  memberList = JSON.parse(localStorage.getItem('memberList'));
  if(memberList == null){memberList = [];}

  // 입력받은 데이터 가져오기
  let id = document.querySelector('#id').value;       console.log(id)
  let pw = document.querySelector('#pw').value;
  let pwconfirm = document.querySelector('#pwconfirm').value;
  let name = document.querySelector('#name').value;
  let nickname = document.querySelector('#nickname').value;
  let phone = document.querySelector('#phone').value;
  let soccer = document.querySelector('#soccer').value;

  // 유효성 검사
  if(id.length < 5){alert('회원가입 실패 : 아이디는 5글자 이상으로 입력해주세요'); return;}
  if(pw.length < 5){alert('회원가입 실패 : 비밀번호는 5글자 이상으로 입력해주세요'); return;}
  if(pw != pwconfirm){alert('회원가입 실패 : 두 비밀번호가 일치하지 않습니다.'); return;}
  if(name.length < 2){alert('회원가입 실패 : 이름은 2글자 이상으로 입력해주세요'); return;}
  if(phone.length < 8 || isNaN(phone)){alert('회원가입 실패 : 전화번호는 - 제외한 8자리 입력해주세요.');return;}

  for(let i = 0; i < memberList.length; i++){
    console.log( memberList[i]);
    console.log( id );
    if(memberList[i].id == id){alert('회원가입 실패 : 사용중인 아이디 입니다.'); return;}
  }
  for(let member of memberList){
    if(member.phone == phone){alert('회원가입 실패 : 사용중인 핸드폰번호 입니다.'); return;}
  }



  // 데이터 가공
  let no = memberList.length == 0 ? 1 : memberList[memberList.length-1].no+1
  let member ={no : no , id : id , pw : pw , phone : phone , soccer : soccer , name : name , nickname : nickname }

  // 저장
  memberList.push(member);
  
    //localStorage 저장
  localStorage.setItem('memberList' , JSON.stringify(memberList));
  
  // 결과안내
  alert('회원가입성공');  location.href = 'login.html';

  







  
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
loginState()
