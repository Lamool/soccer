let loginNo=sessionStorage.getItem('loginNo');
//if(loginNo==null){alert('로그인 후 사용 가능합니다'); location.href='login.html'}
let boardList=[];

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
  for(let i=0; i<memberList.length; i++){
    if(memberList[i].no==loginNo){
      writer=memberList[i].id;  // 찾은 객체의 아이디를 writer변수에 대입
      break;  }
  }
  
  let board={
    no: boardList.length==0 ? 1: boardList[boardList.length-1].no+1
    , title: title, content: content, writer: writer, date: new Date(), view: 1
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