
function gowrite(){
    location.href="write.html"
}
function gosoccerboard(){
    location.href="soccerboard.html"
}
// 1. new URL(검색할URL): URL(주소의) 정보 호출, location.href: 현재 URL
console.log(new URL(location.href));
// 2. new URL(location.href).searchParams     :쿼리스트링
console.log(new URL(location.href).searchParams);
// 3. new URL(location.href).serachparams.get('key')
console.log(new URL(location.href).searchParams.get('no'));
//==================================

// 1. 현재 URL 경로상의 'no' 이름의 매개변수 값 호출, view.html?no=7
let urlParams=new URL(location.href).searchParams;
let no=urlParams.get('no'); // 클릭된 게시물 번호

let boardList=[];





// ===================== 댓글 ===================== //
// 회원목록 가져오기
let memberList = JSON.parse(localStorage.getItem('memberList'));
if(memberList == null){memberList = [];}

let member = memberList;

// 브라우저 세션에 저장된 로그인된 회원번호
let loginNo = sessionStorage.getItem('loginNo');
if (loginNo != null) {
member = memberList[loginNo - 1];
}

let commentModifyMode = 1;

let commentList = [];

commentPrint();
// ================================================ //





// 게시물 출력: js열렸을때
board();
function board(){

  let boardBox= document.querySelector('#boardBox')
  
  let title=document.querySelector('#title')
  let nick=document.querySelector('#nick')
  let date=document.querySelector('#date')
  let view=document.querySelector('#view')
  
    //1. 모든 게시물 목록을 가져온다. localStorage
    boardList=JSON.parse(localStorage.getItem('boardList'));
    if(boardList==null){boardList=[]}

    let findIndex=-1;
    for(let i=0; i<boardList.length; i++){
      if(boardList[i].no==no){findIndex=i}
    }

    console.log( boardList[findIndex].date.split('T') );


    nick.innerHTML=boardList[findIndex].writer
    date.innerHTML=`작성일: ${boardList[findIndex].date}`
    title.innerHTML=boardList[findIndex].title
    boardBox.innerHTML=boardList[findIndex].content


}

// 3. 삭제 : 삭제 버튼을 클릭했을 때
// 단 현재 로그인된 회원과 게시물의 작성자와 일치할 경우에만
function _delete(){ console.log('_delete()');
  let findBoardIndex=-1;
  for(let i=0; i<boardList.length; i++){
  if(boardList[i].no==no){findBoardIndex=i; break;
  }
  }
  
  if(myBoardCheck(findBoardIndex)==false){
    alert('해당 게시물의 작성자만 삭제 가능합니다')
    return;
  }

  // 삭제
  boardList.splice(findBoardIndex,1)

  localStorage.setItem('boardList',JSON.stringify(boardList));

  alert('삭제 성공')
  location.href="soccerboard.html";
  return;


  // 1.누구를: 현재 페이지의 게시물번호=no
  // 2. 해당 삭제할 게시물번호의 인덱스 찾기


}


// 4. 수정페이지로 이동함수
// - 로그인된회원 - 게시물작성자 일치 여부
function modify(){
  let findBoardIndex=-1;
  for(let i=0; i<boardList.length; i++){
  if(boardList[i].no==no){findBoardIndex=i; break;
  }
  }
  // - 무엇을 수정할건지 매개변수 전달
  if(myBoardCheck(findBoardIndex)==false){
    return alert('해당 게시물의 작성자만 수정 가능합니다');
  }

  location.href=`modify.html?no=${no}`;
}

// 5. 현재 로그인된 회원의 글인지 유효성 함수
function myBoardCheck(findBoardIndex){
   // 로그인 상태 체크
   let loginNo=sessionStorage.getItem('loginNo');
   if(loginNo==null){return false;}
     // 2. 로그인된 회원아이디와 게시물작성자 아이디와 다르면 실패
   let memberList=[];
   memberList=JSON.parse(localStorage.getItem('memberList'))
   if(memberList==null){memberList=[]}
   
   
   for(let i=0; i<memberList.length; i++){
     if(memberList[i].no==loginNo && memberList[i].nickname == boardList[findBoardIndex].writer){
       return true;
     }
   }
   return false;
   
}





// ===================== 댓글 함수 선언 ===================== //

// 1. 댓글을 추가하는 함수
function commentAdd() {
  let commentInput = document.querySelector('#commentInput').value;
  
  // ---------- 로그인 상태 유효성검사 ---------- //
  // 브라우저 세션에 저장된 로그인된 회원번호 없으면
  if (loginNo == null) {
      alert('로그인 후 댓글 쓰기가 가능합니다.');
      location.href="login.html";
      return;
  }
  
  // 모든 댓글 목록을 가져오는 코드
  commentList = JSON.parse(localStorage.getItem('commentList'));
  if (commentList == null) {
    commentList = [];
  }
  
  // 댓글 입력창에 아무것도 입력하지 않고 등록 버튼을 누른 경우 알림창을 띄우고 함수 종료
  if (loginNo != null && commentInput == '') {
    alert('내용을 입력해주세요.');
    return;
  }
  
  let date = new Date();
  
  let comment = {
    commentNo: commentList.length == 0 ? 1 : commentList[commentList.length - 1].commentNo + 1,
    boardNo: no,
    nickname: member.nickname,
    commentContent: commentInput,
    date: `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()} ${date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()}:${date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds()}`
  };
  
  commentList.push(comment);
  
  // 입력 완료 후에도 input 박스에 남아있는 입력값을 지우는 코드
  document.querySelector('#commentInput').value = null;
  
  localStorage.setItem('commentList', JSON.stringify(commentList));
  
  alert('댓글이 등록되었습니다.');
  
  commentPrint();
  
}
  
  
  
// 2. 댓글을 출력하는 함수
function commentPrint() {
  let commentWrap = document.querySelector('#commentPrintWrap');
  
  // 브라우저 세션에 저장된 로그인된 회원번호 가져오기
  let loginNo = sessionStorage.getItem('loginNo');
  
  // 모든 댓글 목록을 가져오는 코드
  commentList = JSON.parse(localStorage.getItem('commentList'));
  if (commentList == null) {
    commentList = [];
  }
  
  // 모든 게시물 목록을 가져오는 코드
  boardList = JSON.parse(localStorage.getItem('boardList'));
  if (boardList == null) {
      boardList = [];
  }
  
  // 모든 게시물 목록에서 클릭된 게시물번호와 일치한 게시물 찾기
  let findIndex = -1;
  for (let i = 0; i < boardList.length; i++) {
      if (boardList[i].no == no) {
          findIndex = i;
          break;
      }
  }
  
  let board = boardList[ findIndex ]; // 찾은 인덱스의 객체를 호출해서 board변수에 대입
  
  let html = ``;
  
  for (let i = 0; i < commentList.length; i++) {
    if (board.no == commentList[i].boardNo) {
  
      // 로그인 한 작성자와 댓글 작성자가 일치하다면 삭제 버튼이 보이도록 하는 코드
      if (member.nickname == commentList[i].nickname) {
        html += `
                <div id="commentContentPrint">
                  <div id="commentContentHeader">
                    <div id="commentWriter">${commentList[i].nickname}</div>
                    <div id="commentDate">작성일 : ${commentList[i].date}</div>
                  </div>
                  <div class="modifyContent${commentList[i].commentNo}">
                    <div id="commentContent">${commentList[i].commentContent}</div>
                    <div id="delMoBtn">
                      <button onclick="commentModify${commentModifyMode == 1 ? 1 : 2}(${commentList[i].commentNo}, '${commentList[i].commentContent}')" id="modifyBtn" class="btn btn-dark" type="button">수정</button>
                      <button onclick="commentDelete(${commentList[i].commentNo})" class="btn btn-dark" type="button">삭제</button>
                    </div>
                  </div>
                </div>
                `;
      } else {
          html += `
                  <div id="commentContentPrint">
                    <div id="commentContentHeader">
                      <div id="commentWriter">${commentList[i].nickname}</div>
                      <div id="commentDate">작성일 : ${commentList[i].date}</div>
                    </div>
                    <div id="commentContent">${commentList[i].commentContent}</div>
                  </div>
                  `;
                  //<div>댓글번호 : ${commentList[i].commentNo}</div>
      }
      
    }
  }
  
  commentWrap.innerHTML = html;
  
}
  
  
  
// 3. 댓글을 삭제하는 함수
function commentDelete(deleteCommentNum) {
  // 모든 댓글 목록을 가져오는 코드
  commentList = JSON.parse(localStorage.getItem('commentList'));
  if (commentList == null) {
    commentList = [];
  }
  
  
  let findCommentIndex = -1;
  for (let i = 0; i < commentList.length; i++) {
    if(commentList[i].commentNo == deleteCommentNum) {
      findCommentIndex = i;
      break;
    }
  }
  console.log(findCommentIndex);
  
  // 삭제
  commentList.splice(findCommentIndex, 1);
  
  // * localStorage 데이터 최신화 해줘야 함
  localStorage.setItem('commentList', JSON.stringify(commentList));
          
  alert('댓글이 삭제되었습니다.');
  
  commentPrint();
  
  return;
}
  
  
  
// 4. 댓글을 수정하는 함수1
function commentModify1(modifyCommentNum, commentContent) {
  // 모든 댓글 목록을 가져오는 코드
  commentList = JSON.parse(localStorage.getItem('commentList'));
  if (commentList == null) {
    commentList = [];
  }
  
  let findCommentIndex = -1;
  for (let i = 0; i < commentList.length; i++) {
    if(commentList[i].commentNo == modifyCommentNum) {
      findCommentIndex = i;
      break;
    }
  }
  console.log(findCommentIndex);
  
  let html = '';
  
  let modifyContent = document.querySelector(`.modifyContent${modifyCommentNum}`);
  html += `<textarea id="commentModifyInput" maxlength="100">${commentContent}</textarea>`;
  modifyContent.innerHTML = html;
  
  commentModifyMode = 2;
  let modifyBtn = document.querySelector('#modifyBtn');
  html += `
          <div id="delMoBtn">
            <button onclick="commentModify${commentModifyMode == 1 ? 1 : 2}(${commentList[findCommentIndex].commentNo}, '${commentList[findCommentIndex].commentContent}')" class="btn btn-dark" type="button">수정</button>
          </div>
          `;
  modifyContent.innerHTML = html;
  
  console.log(commentModifyMode);
  
  return;
}
  
  
  
// 5. 댓글을 수정하는 함수2
function commentModify2(modifyCommentNum) {
  // 모든 댓글 목록을 가져오는 코드
  commentList = JSON.parse(localStorage.getItem('commentList'));
  if (commentList == null) {
    commentList = [];
  }
    
  let modifyContent = document.querySelector(`#commentModifyInput`).value;
  
  let date = new Date();
    
  console.log(modifyContent);
    
  commentList[modifyCommentNum - 1].commentContent = modifyContent;
  commentList[modifyCommentNum - 1].date = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()} ${date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()}:${date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds()}`
  
  // localStorage 데이터 최신화
  localStorage.setItem('commentList', JSON.stringify(commentList));
            
  alert('댓글이 수정되었습니다.');
  
  commentModifyMode = 1;
  console.log(commentModifyMode);
  
  commentPrint();
  
  return;
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
                            비밀번호찾기
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