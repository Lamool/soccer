
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


