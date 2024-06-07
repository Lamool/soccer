// ===================== 추후에 지울 예정 ===================== //

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

let commentList = [{commentNo: 1, boardNo: 1, write: '홍길동', commentContent: 'dd', date: '2024-06-08'}];

commentPrint();

// 댓글을 추가하는 함수
function commentAdd() {
  let commentInput = document.querySelector('#commentInput').value;

  let date = new Date();

  let comment = {
    commentNo: commentList.length == 0 ? 1 : commentList[commentList.length - 1].commentNo + 1,
    boardNo: 1,
    write: '홍길동',
    commentContent: commentInput,
    date: `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()}`
  };

  commentList.push(comment);

  commentPrint();

}



// 댓글을 출력하는 함수
function commentPrint() {
  let commentWrap = document.querySelector('#commentPrintWrap');

  let html = ``;

  for (let i = 0; i < commentList.length; i++) {
    html += `
            <div>댓글번호 : ${commentList[i].commentNo}</div>
            <div>작성자 : ${commentList[i].write}</div>
            <div>작성일 : ${commentList[i].date}</div>
            <div>내용 : ${commentList[i].commentContent}</div>
            `;
  }

  commentWrap.innerHTML = html;

}