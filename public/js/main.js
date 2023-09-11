(async function (){
        
    const res = await axios({
      method: "POST",
      url: '/main',
    });

    console.log(res);
    console.log(res.data);


    //메인 페이지 프로젝트 목록
    const projectC = document.querySelector('.plist_box_dj');
    
    for(let i = 0; i<Object.keys(res.data.project).length; i++){
        const a = document.createElement('a');
        const vid  = document.createElement('video');
        // const div = document.createElement('div');
        const p_title = document.createElement('p');
        const p_period = document.createElement('p');
        const p_mem = document.createElement('p');
        
        a.setAttribute('href',`/api/dtailpage/${res.data.project[i].project_id}`)
        vid.setAttribute('autoplay','');
        // vid.setAttribute('muted', '');
        vid.setAttribute('src',`/testvideo.mp4`);//`api/${res.data.project[i].pvideo}`
        p_period.style.fontSize = '14px'
        p_title.style.fontSize = '20px'
        p_mem.style.fontSize = '14px'
        p_title.innerText = `${res.data.project[i].ptitle}`
        p_mem.innerText = `프로젝트 인원수 : ${res.data.project[i].pmembers}명`
        p_period.innerText = `프로젝트 기간 : ${res.data.project[i].pPeriod}일`



        // div.appendChild(vid);
        // a.appendChild(div);
        a.appendChild(vid);
        a.appendChild(p_title);
        a.appendChild(p_mem);
        a.appendChild(p_period);
        projectC.appendChild(a);

    }

    //메인페이지 리코프런 현황
    const recoplearnC = document.querySelector('.relist_box_dj');
    const join_re_pro = {};

    for(let j = 0; j<Object.keys(res.data.recop).length; j++) {
        for(let i = 0; i<Object.keys(res.data.projAll).length; i++){
            if(res.data.recop[j].project_id === res.data.projAll[i].project_id){
                join_re_pro[j] = {
                    recop_join_id : res.data.recop[j].recop_id,
                    project_join_id : res.data.recop[j].project_id,
                    project_join_title : res.data.projAll[i].ptitle,
                    join_video : res.data.projAll[i].pvideo,
                }
            }
        }
    }

    console.log(join_re_pro);

    const nowarr = [];

    for(let i = 0; i<Object.keys(res.data.recop).length; i++){
        const a = document.createElement('a');
        const vid  = document.createElement('video');
        // const div = document.createElement('div');
        const re_title = document.createElement('p');
        const re_people = document.createElement('p');
        const re_now = document.createElement('p');


        a.setAttribute('href',`/api/recoplearn`)        
        vid.setAttribute('autoplay','');
        // vid.setAttribute('muted', '');
        vid.setAttribute('src',`/testvideo.mp4`);//`api/${res.data.project[i].pvideo}`
        re_title.style.fontSize = '20px'
        re_people.style.fontSize = '14px'
        re_now.style.fontSize = '14px'

        if(res.data.recop[i].crr_num === res.data.recop[i].goal_num){
            nowarr.push('모집 완료');
        }else{
            nowarr.push('모집 중');
        }

        // console.log('현재',res.data.recop[i].crr_num)
        // console.log('목표',res.data.recop[i].goal_num)
        console.log(nowarr[i]);

        re_title.innerText = `${join_re_pro[i].project_join_title}`;
        re_people.innerText = `필요 인원 : 프론트엔드 [${res.data.recop[i].front_num}/${res.data.recop[i].front_goal_num}] 백엔드 [${res.data.recop[i].back_num}/${res.data.recop[i].back_goal_num}]`;
        re_now.innerText = 
        `모집 상태 : ${nowarr[i]}`

        a.appendChild(vid);
        a.appendChild(re_title);
        a.appendChild(re_people);
        a.appendChild(re_now);
        recoplearnC.appendChild(a);

    }

    const review = document.querySelector('.pro_review_dj');
    const proNum = document.querySelector('#pro_num');

    //후기 보여주기는 마이페이지랑 검색 기능 완료된 후에 하기

  })();