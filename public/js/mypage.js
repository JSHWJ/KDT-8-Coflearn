const tabList = document.querySelectorAll('.leftlist_dj li');
const contents = document.querySelectorAll('.content_dj .rightcont_dj .cont')
let activeCont = ''; // 현재 활성화 된 컨텐츠 (기본:#tab1 활성화)

const currentUrl = window.location.href;
let num = currentUrl.replace("http://localhost:8000/mypage/", "");
document.addEventListener('DOMContentLoaded', async () => {
  // 프로필 정보 가지고 오기
  const mypage_pro = await axios({
    method : 'GET',
    url : `/api/mypage/${num}`,
    data : { num },
  });
  console.log('사용자의 정보', mypage_pro );

  const ni_dj = document.querySelector('#nick_dj');
  const em_dj = document.querySelector('#email_dj');
  const pw_dj = document.querySelector('#pw_dj');

  // console.log(mypage_pro.data);
  ni_dj.innerText = mypage_pro.data.userD.nick_name;
  em_dj.innerText = mypage_pro.data.userD.email;
  pw_dj.innerText = mypage_pro.data.userD.pw;


//////////////////////////////////////////////////////////////////////////////////////////////////////

  //나의 프로젝트 가지고 오기
  //이중 포문으로 join함
  const myproj = await axios({
    method : 'GET',
    url : `/api/mypage/project/${num}`,
    data : {num},
  });

  console.log('사용자의 프로젝트', myproj);
  


  //내가 담은 프로젝트 가지고 오기
  //이건 조인으로 해보자 >> 실패
  const likeproj = await axios({
    method : 'GET',
    url : `/api/mypage/cart/${num}`,
    data : { num },
  });

  console.log('사용자가 담은 프로젝트', likeproj);


  //나의 리코프런 가지고 오기

  const myrecop = await axios({
    method : 'GET',
    url : `/api/mypage/recoplearn/${num}`,
    data : { num },
  });

  console.log('리코프런 가지고 오기', myrecop);




})

//탭 기능 js
for(var i = 0; i < tabList.length; i++){
  tabList[i].querySelector('.btn').addEventListener('click', function(e){
    e.preventDefault();
    for(var j = 0; j < tabList.length; j++){
      // 나머지 버튼 클래스 제거
      tabList[j].classList.remove('ison_dj');

      // 나머지 컨텐츠 display:none 처리
      contents[j].style.display = 'none';
    }

    // 버튼 관련 이벤트
    this.parentNode.classList.add('ison_dj');

    // 버튼 클릭시 컨텐츠 전환
    activeCont = this.getAttribute('href');
    document.querySelector(activeCont).style.display = 'block';
  });
}