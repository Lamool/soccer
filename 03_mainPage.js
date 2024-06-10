let pages = 0;              //현재 인덱스 번호
let positionValue = 0;      //images 위치값
const IMAGE_WIDTH = 250;    //한번 이동 시 IMAGE_WIDTH만큼 이동한다.

const backBtn = document.querySelector(".back");
const nextBtn = document.querySelector(".next");
const images = document.querySelector(".images");

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