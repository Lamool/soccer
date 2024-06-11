let pages = 0;              //현재 인덱스 번호
let positionValue = 0;      //images 위치값
const IMAGE_WIDTH = 250;    //한번 이동 시 IMAGE_WIDTH만큼 이동한다.

const backBtn = document.querySelector(".back");
const nextBtn = document.querySelector(".next");
const images = document.querySelector(".images");

let titleList = [];
function next(){
    if(pages < 4){
        backBtn.removeAttribute(`disabled`);
        positionValue -= IMAGE_WIDTH;
        images.style.transform = `translateX(${positionValue}px)`;
        pages += 1;
    }
    if(pages === 4){
        nextBtn.setAttribute(`disabled`, `true`);
    }
}
function back(){
    if(pages > 0){
        nextBtn.removeAttribute(`disabled`);
        positionValue += IMAGE_WIDTH;
        images.style.transform = `translateX(${positionValue}px)`;
        pages -= 1;
    }
    if(pages === 0){
        backBtn.setAttribute(`disabled`, `true`);
    }
}
function print(){
    backBtn.setAttribute('disabled', 'true');
    backBtn.addEventListener("click", back);
    nextBtn.addEventListener("click", next);
}
print();

function boardPrint(){
    let board = document.querySelector(`.CB2`);
    titleList = JSON.parse(localStorage.getItem(`boardList`));
    if(titleList == null){return;};

    let html = ``;
    for(i=0; i<titleList.length; i++){
        html +=`
                <li>
                    <span id="CBT">
                        ${i+1}
                    </span>
                    <a href="#">
                        ${titleList[i].title}
                    </a>
                    <span id="CBV">
                        [${titleList[i].view}]
                    </span>
                </li>
                `;
    }
    board.innerHTML = html;
}
boardPrint();