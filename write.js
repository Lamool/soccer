let loginNo=sessionStorage.getItem('loginNo');
if(loginNo==null){alert('로그인 후 사용 가능합니다'); location.href='login.html'}
let boardList=[];

let memberList=[]; // 로컬스토리지에 있는 회원 목록 호출
  memberList=JSON.parse(localStorage.getItem('memberList'));
  if(memberList==null){memberList=[]};
  // 회원목록에서 로그인된 회원번호와 같은 객체 찾기

  console.log(memberList);
  let html=document.querySelector('#nick')
let nick =''
  for(let i=0; i<memberList.length; i++){
    if(memberList[i].no==loginNo){
      console.log(memberList[i]);
      html.innerHTML=memberList[i].nickname
      nick=memberList[i].nickname
        // 찾은 객체의 아이디를 writer변수에 대입
      break;  }
  }


function _write(){console.log('write()');
  boardList=JSON.parse(localStorage.getItem('boardList'));
  if(boardList==null){boardList=[]};

  
  //1. HTML 입력된 데이터 가져오기
  let title=document.querySelector('#title').value
  let content=document.querySelector('#content').value
  //2. 유효성검사
  //3. 데이터 가공
  let writer=''; // 로그인 회원의 아이디를 찾아서 넣을 변수 준비
  
  let memberList=[]; // 로컬스토리지에 있는 회원 목록 호출
  memberList=JSON.parse(localStorage.getItem('memberList'));
  if(memberList==null){memberList=[]};
  // 회원목록에서 로그인된 회원번호와 같은 객체 찾기

  console.log(memberList);

  for(let i=0; i<memberList.length; i++){
    if(memberList[i].no==loginNo){
      console.log(memberList[i]);
      writer=memberList[i].id;  // 찾은 객체의 아이디를 writer변수에 대입
      break;  }
  }
  
  let year=new Date().getFullYear();
  let month=new Date().getMonth()+1;
  let day=new Date().getDate();
  let hour=new Date().getHours();
  let minute=''
  if(new Date().getMinutes()<10){minute=`0${new Date().getMinutes()}`}
  else{minute=new Date().getMinutes()};
  let board={
    no: boardList.length==0 ? 1: boardList[boardList.length-1].no+1
    , title: title, content: content, writer: nick, date:year+`-`+month+`-`+day+` `+hour+`:`+minute , view: 1,
  }; console.log(board);
  //4. 저장
  boardList.push(board); console.log(boardList);
  localStorage.setItem('boardList', JSON.stringify(boardList));
  //5. 안내후 이후 처리
  alert('글쓰기 성공');
  location.href="soccerboard.html"; 
}

function modify(){

}

function goboard(){
  location.href="soccerboard.html"
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