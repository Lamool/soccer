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
  for(let i=0; i<boardList.length; i++){
    html+=`<tr>
            <th >${boardList[i].no}</th>
            <td><a href="view.html?no=${boardList[i].no}">${boardList[i].title}</td>
            <td>${boardList[i].writer}</td>
            <td>${boardList[i].date}</td>
            <td>${boardList[i].view}</td>
          </tr>`
  }
  list.innerHTML=html;
  
}
