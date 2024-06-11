
let page = new URL(location.href).searchParams.get('page');
console.log(page);



function gowrite(){location.href='write.html'}


let boardList=[];
print();
function print(){ 
  boardList=JSON.parse(localStorage.getItem('boardList'));
  if(boardList==null){boardList=[]};
  
  // 어디에
  let list=document.querySelector('#list')
  // 무엇을
  let html='';

  let 정렬된게시물리스트 = [];

  for(let i=boardList.length-1; i>-1; i--){
    정렬된게시물리스트.push( boardList[i] ); 
  }

  // 현재 보고 있는 페이지 : page                     1           2
  // 페이지당 표시할 게시물수 : itemCount = 10        0 ~ 9       10 ~ 19
  // 시작 게시물 번호 :                               0           10    (page-1)*itemCount
  // 마지막 게시물 번호 :                             9           19    page*itemCount-1
  // <button type="button" onclick="location.href='soccerboard.html?page=1'"> 1 </button>
  let itemCount=10;


  for(let i = 0; i < 정렬된게시물리스트.length ; i++ ){
    html+=`<tr>
            <th >${정렬된게시물리스트[i].no}</th>
            <td><a href="detail.html?no=${정렬된게시물리스트[i].no}">${정렬된게시물리스트[i].title}</td>
            <td>${정렬된게시물리스트[i].writer}</td>
            <td>${정렬된게시물리스트[i].date}</td>
            <td>${정렬된게시물리스트[i].view}</td>
          </tr>`
  }
  list.innerHTML=html;


  
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



