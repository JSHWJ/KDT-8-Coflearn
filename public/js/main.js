(async function (){
        
    const res = await axios({
      method: "POST",
      url: '/main',
    });

    console.log(res);
    console.log(res.data);
    console.log(res.data.project[0]);


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
        // vid.setAttribute('autoplay');
        // vid.setAttribute('muted');
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
    
    for(let i = 0; i<Object.keys(res.data.recop).length; i++){
        const a = document.createElement('a');
        const vid  = document.createElement('video');
        // const div = document.createElement('div');
        const p_title = document.createElement('p');
        const p_period = document.createElement('p');
        const p_mem = document.createElement('p');

    }


  })();