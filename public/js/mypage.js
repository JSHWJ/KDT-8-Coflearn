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

  const my_proj_div = document.querySelector('.mypro');

  for(let i = 0; i<Object.keys(myproj.data.userProject).length; i++){
    console.log('됨');
    const a = document.createElement('a');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');

    console.log(myproj.data.userProject[i].project_id);
    a.setAttribute('href',`/detailPage/${myproj.data.userProject[i].project_id}`);
    img.setAttribute('src',`${myproj.data.userProject[i].pthumnail}`);
    p.style.fontSize = '20px'
    p1.style.fontSize = '14px'
    p2.fontSize = '14px'
    
    p.innerText = `${myproj.data.userProject[i].ptitle}`;
    p1.innerText = `프로젝트 멤버 : ${myproj.data.userProject[i].pmembers}`;
    p2.innerText = `프로젝트 기간 : ${myproj.data.userProject[i].pPeriod}`;
    
    a.appendChild(img);
    a.appendChild(p);
    a.appendChild(p1);
    a.appendChild(p2);
    my_proj_div.appendChild(a);

  }
  
  


  //내가 담은 프로젝트 가지고 오기
  //이건 조인으로 해보자 >> 실패
  const likeproj = await axios({
    method : 'GET',
    url : `/api/mypage/cart/${num}`,
    data : { num },
  });

  console.log('사용자가 담은 프로젝트', likeproj);

  const mylike_div = document.querySelector('.mylike');

  for(let i = 0; i<Object.keys(likeproj.data.cartProj).length; i++){
    console.log('됨');
    const a = document.createElement('a');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');

    console.log(likeproj.data.cartProj[i].project_id);
    a.setAttribute('href',`/detailPage/${likeproj.data.cartProj[i].project_id}`);
    img.setAttribute('src',`${likeproj.data.cartProj[i].pthumnail}`);
    p.style.fontSize = '20px'
    p1.style.fontSize = '14px'
    p2.fontSize = '14px'
    
    p.innerText = `${likeproj.data.cartProj[i].ptitle}`;
    p1.innerText = `프로젝트 멤버 : ${likeproj.data.cartProj[i].pmembers}`;
    p2.innerText = `프로젝트 기간 : ${likeproj.data.cartProj[i].pPeriod}`;
    
    a.appendChild(img);
    a.appendChild(p);
    a.appendChild(p1);
    a.appendChild(p2);
    mylike_div.appendChild(a);

  }


  //나의 리코프런 가지고 오기

  const myrecop = await axios({
    method : 'GET',
    url : `/api/mypage/recoplearn/${num}`,
    data : { num },
  });

  console.log('리코프런 가지고 오기', myrecop);

  const myre = document.querySelector('.myrecop');
  const nowarr_my = [];

  for(let i = 0; i<Object.keys(myrecop.data.recop).length; i++){
      const a = document.createElement('a');
      const img = document.createElement('div');
      const re_title = document.createElement('span');
      const re_people = document.createElement('p');
      const re_now = document.createElement('p');
      const re_cent = document.createElement('span');


      a.setAttribute('href',`/detailPage/${myrecop.data.recop[i].proj_id}`);
      a.style.borderBottom = "3px solid #FFD95A"
      a.style.marginTop = "15px"       
      // img.setAttribute('src',`${myrecop.data.proj[i].pthumnail}`);
      re_title.style.fontSize = '20px'
      re_cent.style.fontSize = '20px'
      re_people.style.fontSize = '14px'
      re_now.style.fontSize = '14px'

      if(myrecop.data.recop[i].crr_num === myrecop.data.recop[i].goal){
          nowarr_my.push('모집 완료');
      }else{
          nowarr_my.push('모집 중');
      }
      console.log(nowarr_my[i]);

      re_title.innerText = `${myrecop.data.proj[i].ptitle}`;
      re_people.innerText = `필요 인원 : 프론트엔드 [${myrecop.data.recop[i].front_num}/${myrecop.data.recop[i].frontG_num}] 백엔드 [${myrecop.data.recop[i].back_num}/${myrecop.data.recop[i].backGnum}]`;
      re_now.innerText = 
      `모집 상태 : ${nowarr_my[i]}`

      re_cent.style.color = 'red';
      const percent = (myrecop.data.recop[i].crr_num/myrecop.data.recop[i].goal)*100;
      console.log('퍼센트', percent );
      const percentR = percent.toFixed(0);
      re_cent.innerText = ` [${percentR}%] `


      // a.appendChild(img);

      a.appendChild(re_title);
      a.appendChild(re_cent);
      a.appendChild(re_people);
      a.appendChild(re_now);
      myre.appendChild(a);

  }   


  //채팅방 연결하기
  const mychat = await axios({
    method : 'GET',
    url : `/api/mypage/chat/${num}`,
    data : { num },
  });

  console.log('룸정보', mychat);
  console.log(mychat.data.room[0].room_id)

  const chat = document.querySelector('.mychat');

  for(let i=0; i<Object.keys(mychat.data.room).length; i++){
    const a2 = document.createElement('a');
    const p1 = document.createElement('p');
    const btn = document.createElement('button');
    const div = document.createElement('div');

    a2.setAttribute('href',`/chat/${mychat.data.room[i].room_id}`);
    p1.style.fontSize = '20px';
    p1.innerText = `채팅방 이름 : ${mychat.data.room[i].room_name}`
    btn.style.fontSize = '16px';
    btn.innerText = '들어가기'


    a2.appendChild(p1);
    a2.appendChild(btn);
    div.appendChild(a2);
    chat.appendChild(div);
  }

});

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