const tabList = document.querySelectorAll('.leftlist_dj li');
const contents = document.querySelectorAll('.content_dj .rightcont_dj .cont')
let activeCont = ''; // 현재 활성화 된 컨텐츠 (기본:#tab1 활성화)





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