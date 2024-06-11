let pages = 0;              //현재 인덱스 번호
let positionValue = 0;      //images 위치값
const IMAGE_WIDTH = 250;    //한번 이동 시 IMAGE_WIDTH만큼 이동한다.

const backBtn = document.querySelector(".back");
const nextBtn = document.querySelector(".next");
const images = document.querySelector(".images");

let titleList = [];
let rankList = [];
let accTeam = { };
let newTitleList = [];

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
function pref(){
    rankList = JSON.parse(localStorage.getItem(`memberList`));

    for(let i = 0; i<rankList.length ; i++){

        let m = rankList[i];

        if( accTeam.hasOwnProperty(`${m.soccer}`) ){
            accTeam[`${m.soccer}`] = accTeam[`${m.soccer}`] +1
        }else{
            accTeam[`${m.soccer}`] = 1;
        }
    }
    console.log( accTeam );
}
function boardPrint(){
    let board = document.querySelector(`#CB2`);
    let clubRank = document.querySelector(`#CB3`);
    titleList = JSON.parse(localStorage.getItem(`boardList`));
    rankList = JSON.parse(localStorage.getItem(`memberList`));
    
    if(titleList == null){return;};
    if(rankList == null){return;};

    for(i=titleList.length-1; i>-1; i--){
        newTitleList.push(titleList[i]);
    }
    console.log(newTitleList);

    let html = ``;
    let html1 = ``;
    let length1 = newTitleList.length <= 6 ? newTitleList.length : 6 
    for(i=0; i<length1 ; i++){
        html +=`
                <li>
                    <span class="CBT">
                        ${newTitleList[i].no}
                    </span>
                    <a href="detail.html?no=${newTitleList[i].no}">
                        ${newTitleList[i].title}
                    </a>
                    <span class="CBV">
                        [${newTitleList[i].view}]
                    </span>
                </li>
                `;
    }
    pref();
    let length2 = Object.keys(accTeam).length;
    let sort = Object.fromEntries(
        Object.entries(accTeam).sort(([, a], [, b]) => b - a)
    );
    let arr = Object.keys(sort);
    let value = Object.values(sort);
    console.log(sort);
    for(j=0; j<length2; j++){
        html1 += `
                <li>
                    <span class="CBT">
                        ${j+1}
                    </span>
                    <a href="#">
                        ${arr[j]}
                    </a>
                    <span class="CBV">
                        [${value[j]}]
                    </span>
                </li>`;    
    }
    console.log(html1);
    board.innerHTML = html;
    clubRank.innerHTML = html1;
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
                            내 정보
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
boardPrint();
loginState();