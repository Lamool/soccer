
function gowrite(){
  location.href="write.html"
}
function gosoccerboard(){
  location.href="soccerboard.html"
}











// ===================== 추후에 지울 예정 ===================== //

// 회원목록 가져오기
// memberList = JSON.parse(localStorage.getItem('memberList'));
// if(memberList == null){memberList = [];}


// 브라우저 세션에 저장된 로그인된 회원번호
let loginNo = sessionStorage.getItem('loginNo');


// let member = memberList[loginNo - 1];




// 현재 URL 경로상의 'no' 이름의 매개변수 값 호출
let urlParams = new URL(location.href).searchParams;
let no = urlParams.get('no');       // 클릭된 게시물 번호
no = 1; // 임시




let boardList = [
// {no: 1, writer: '홍길동', date: '2024-06-07', view: 1, title: '자유', content: '게시판'}
];

// 2. 게시물 출력 : js열렸을 때
// board();
// function board() {
//     console.log('board()');

//     // 1. 어디에
//     let boardBox = document.querySelector('#boardBox');

//     // 2. 무엇을
//     let html = ``;
 
  

//     // 1. 모든 게시물 목록을 가져온다. localStorage
//     boardList = JSON.parse(localStorage.getItem('boardList'));
//     if (boardList == null) {
//         boardList = [];
//     }
//         // 2. 모든 게시물 목록에서 클릭된 게시물번호와 일치한 게시물 찾기
//     let findIndex = -1;
//     for (let i = 0; i < boardList.length; i++) {
//         if (boardList[i].no == no) {
//             findIndex = i;
//             break;
//         }
//     }

//     let board = boardList[ findIndex ]; // 찾은 인덱스의 객체를 호출해서 board변수에 대입



  
//         // 3. 찾은 인덱스의 게시물 정보를 출력
//     html += `
//             <div>게시물 번호 : ${board.no} </div>
//             <div>작성자 : ${board.writer} </div>
//             <div>날짜 : ${board.date} </div>
//             <div>조회수 : ${board.view} </div>
//             <div>제목 : ${board.title} </div>
//             <div>내용 : ${board.content} </div>
//             `;
  
//     // 3. 출력
//     boardBox.innerHTML = html;
// }







// ===================== 댓글 ===================== //

let commentList = [
// {commentNo: 1, boardNo: 1, writer: '홍길동', commentContent: 'dd', date: '2024-06-08 17:05:30'}
];

commentPrint();

// 1. 댓글을 추가하는 함수
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
    writer: member.id,    // 회원 부분 완료 되면 수정. 임시로 아이디로 해봄 - 테스트
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

/****************** 작성자랑 아이디랑 혼동 */
      // 로그인 한 작성자와 댓글 작성자가 일치하다면 삭제 버튼이 보이도록 하는 코드
      if (member.id == commentList[i].writer) {
        html += `
                <div id="commentContentPrint">
                  <div id="commentContentHeader">
                    <div id="commentWriter">${commentList[i].writer}</div>
                    <div id="commentDate">작성일 : ${commentList[i].date}</div>
                  </div>
                  <div id="commentContent">${commentList[i].commentContent}</div>
                  <div id="delMoBtn">
                    <button onclick="commentModify(${commentList[i].commentNo})" class="btn btn-dark" type="button">수정</button>
                    <button onclick="commentDelete(${commentList[i].commentNo})" class="btn btn-dark" type="button">삭제</button>
                  </div>
                </div>
                `;
      } else {
          html += `
                  <div id="commentContentPrint">
                    <div id="commentContentHeader">
                      <div id="commentWriter">${commentList[i].writer}</div>
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



// 4. 댓글을 수정하는 함수
function commentModify(modifyCommentNum) {
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


  
  // document.querySelector('#commentInput').value = commentList[findCommentIndex].commentContent;
  
  // let html = '';
  // html += `<h3>dd</h3>`;

  // mo.innerHTML = html;
 


  // localStorage 데이터 최신화
  localStorage.setItem('commentList', JSON.stringify(commentList));
          
  alert('댓글이 수정되었습니다.');

  commentPrint();

  return;
}























// // 현재 로그인된 회원의 댓글인지 유효성 함수
// function myCommentCheck(findBoardIndex) {
// // 로그인 상태 체크
// let loginNo = sessionStorage.getItem('loginNo');

// if (loginNo == null) {
//     return false;
// }
// // 로그인된 회원아이디와 댓글 작성자 아이디와 다르면 실패
// let memberList = [];

// memberList = JSON.parse( localStorage.getItem('memberList') ) ;

// if (memberList == null) {
//     memberList = [];
// }

// for (let i = 0; i < memberList.length; i++) {
//     if (memberList[i].no == loginNo && memberList[i].id == boardList[findBoardIndex].writer) {
//         return true;
//     }
// }

// return false;

// }

