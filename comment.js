// ===================== 추후에 지울 예정 ===================== //

// 닉네임 같은 거 받고 이건 저장을 안 해서 값이 없네
// 회원목록 가져오고서 로그인 번호 부여 - 테스트
memberList = JSON.parse(localStorage.getItem('memberList'));
  if(memberList == null){memberList = [];}

let member = memberList[0];
sessionStorage.setItem('loginNo', member.no)






let boardList = [{no: 1, writer: '홍길동', date: '2024-06-07', view: 1, title: '자유', content: '게시판'}];

// 2. 게시물 출력 : js열렸을 때
board();
function board() {
    console.log('board()');

    // 1. 어디에
    let boardBox = document.querySelector('#boardBox');

    // 2. 무엇을
    let html = ``;
   
    let index = 0;

    let board = boardList[ index ];
    
        // 3. 찾은 인덱스의 게시물 정보를 출력
    html += `
            <div>게시물 번호 : ${board.no} </div>
            <div>작성자 : ${board.writer} </div>
            <div>날짜 : ${board.date} </div>
            <div>조회수 : ${board.view} </div>
            <div>제목 : ${boardList[index].title} </div>
            <div>내용 : ${boardList[index].content} </div>
            `;
    
    // 3. 출력
    boardBox.innerHTML = html;
}







// ===================== 댓글 ===================== //

let commentList = [{commentNo: 1, boardNo: 1, write: '홍길동', commentContent: 'dd', date: '2024-06-08 17:05:30'}];

commentPrint();

// 댓글을 추가하는 함수
function commentAdd() {
  let commentInput = document.querySelector('#commentInput').value;

        // ---------- 로그인 상태 유효성검사 ---------- //
  // 브라우저 세션에 저장된 로그인된 회원번호 가져오기
  let loginNo = sessionStorage.getItem('loginNo');
  console.log(loginNo);
  // 만약에 없으면
  if (loginNo == null) {
      alert('로그인 후 댓글 쓰기가 가능합니다.');
      location.href="login.html";
  }


  // 댓글 입력창에 아무것도 입력하지 않고 등록 버튼을 누른 경우 알림창을 띄우고 함수 종료
  if (loginNo != null && commentInput == '') {
    alert('내용을 입력해주세요.');
    return;
  }

  let date = new Date();

  let comment = {
    commentNo: commentList.length == 0 ? 1 : commentList[commentList.length - 1].commentNo + 1,
    boardNo: 1,
    write: member.id,    // 회원 부분 완료 되면 수정. 임시로 아이디로 해봄 - 테스트
    commentContent: commentInput,
    date: `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()}
              ${date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()}:${date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds()}`
  };

  commentList.push(comment);

  // 입력 완료 후에도 input 박스에 남아있는 입력값을 지우는 코드
  document.querySelector('#commentInput').value = null;

  commentPrint();

}



// 댓글을 출력하는 함수
function commentPrint() {
  let commentWrap = document.querySelector('#commentPrintWrap');

  let html = ``;

  for (let i = 0; i < commentList.length; i++) {
    html += `
            <div id="commentContentPrint">
              <div id="commentContentHeader">
                
                <div id="commentWrite">작성자 : ${commentList[i].write}</div>
                <div id="commentDate">작성일 : ${commentList[i].date}</div>
              </div>
              <div id="commentContent">내용 : ${commentList[i].commentContent}</div>
            </div>
            `;
            //<div>댓글번호 : ${commentList[i].commentNo}</div>
  }

  commentWrap.innerHTML = html;

}