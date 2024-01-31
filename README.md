# KDT-8-Coflearn

## 프로젝트 공유 및 팀원 모집 사이트 Coflearn
---

### 📌 서비스 소개

- 코딩온의 수업을 듣는 다른 사람들의 프로젝트를 공유하고 클론코딩할 수 있는 사이트가 있으면 좋지 않을까? 라는 생각에서 시작됐어요.
- 서로의 프로젝트를 업로드해서 공유하고 , 함께 할 사람을 모아 원하는 프로젝트를 만들어볼 수 있어요.
- 프로젝트를 함께 만들어 볼 인원이 모이면, 코프런에서 소통을 위한 채팅방을 생성해 제공해요.

---

### 📌 주요 기능

- 로그인/로그아웃 기능
    - 로그인 시 쿠키를 생성하고 쿠기 존재 여부에 따라 아이콘을 변경
    - 아이콘에 마우스를 올리면 마이페이지 이동과 로그아웃 가능

<img src="https://github.com/JSHWJ/KDT-8-Coplearn/assets/114459629/b40ce449-4df9-40c8-8e9f-ed96ffc59604" width="500"/>


- 회원가입 기능
    - node mailer을 활용한 이메일 인증 기능
    - 비밀 번호를 Bcrypt 방식으로 암호화하여 DB에 저장

<img src="https://github.com/JSHWJ/KDT-8-Coplearn/assets/114459629/2aa722a5-8397-46d3-bc93-dd4d4c8eb0b6" width="500"/>

- 메인페이지
    - 검색기능 (태그 이용한 검색)
    - 프로젝트 현황 확인 기능

<img src="https://github.com/JSHWJ/KDT-8-Coplearn/assets/114459629/34e966b3-233c-4891-86dd-ce878e30aa16" width="400"/>
<img src="https://github.com/JSHWJ/KDT-8-Coplearn/assets/114459629/5a1ceb9c-ba8a-4358-8352-a021fd96cfb3" width="400"/>

- 마이페이지
    - 사용자의 프로젝트 확인 기능
    - 사용자가 담은 프로젝트 확인 기능

![image](https://github.com/JSHWJ/KDT-8-Coplearn/assets/114459629/d31316b4-fcfb-4328-a254-90e98b4e60ea)


- 단체 채팅방 기능
    - [Socket.io](http://socket.io/) 활용해 유저들과 실시간 소통 기능
    - DB 활용해 이전 메시지 휘발 방지
    - 허용된 유저 채팅방 접근 기능

<img src="https://github.com/JSHWJ/KDT-8-Coplearn/assets/114459629/f63c84d4-54bf-4e24-a405-c0f4e87e5efa" width="750"/>


- 프로젝트 페이지
    - TOAST UI 사용
    - 프로젝트 소개글 작성(Mark Down형식)
    - 검색창을 통한 제목 기준 검색
    - Tag 버튼 통한 tag 기준 검색

![image](https://github.com/JSHWJ/KDT-8-Coplearn/assets/114459629/defdf458-7672-4137-8ede-8438c6f11f04)


- 상세페이지
    - 프로젝트 장바구니에 담기 기능
    - 커뮤니티 글 작성 기능(Mark Down형식)
    - 커뮤니티 댓글/답글 작성 기능
    - 팀원 모집 기능을 통해 팀원모집페이지로 이동
    - 팀원 모집 여부 실시간 확인 기능

<img src="https://github.com/JSHWJ/KDT-8-Coplearn/assets/114459629/28b96c68-620c-4466-9204-fe6e8a236053" width="750"/>
<img src="https://github.com/JSHWJ/KDT-8-Coplearn/assets/114459629/1ab54d64-fd28-43e2-8418-6cb304b833c6" width="750"/>


---

### 📌 사용한 기술

- [SOCKET.IO](http://socket.io/)
- Node.js
- JWT
- Sequelize
- TOAST UI
- MySQL
- AWS, S3

---

### 📌 팀원

| 메인/마이페이지 | 단체 채팅방 | 로그인/회원가입 | 프로젝트 모집 | 프로젝트 업로드 |
| --- | --- | --- | --- | --- |
| 황동준 | 서혜원 | 서정현 | 장창현 | 조현익 |
| <img src="https://avatars.githubusercontent.com/u/114459629?v=4" width="100px" height="100px"><br> <a href="https://github.com/nebulaBdj">nebulaBdj</a> | <img src="https://avatars.githubusercontent.com/u/81088222?v=4" width="100px" height="100px"><br/><a href="https://github.com/JSHWJ">JSHWJ</a> | <img src="https://avatars.githubusercontent.com/u/105518951?v=4" width="100px" height="100px"><br><a href="https://github.com/HyunnS2">HyunnS2</a> | <img src="https://avatars.githubusercontent.com/u/86968048?v=4" width="100px" height="100px"><br> <a href="https://github.com/changhyun-jang">changhyun-jang</a> | <img src="https://avatars.githubusercontent.com/u/122008118?v=4" width="100px" height="100px"><br/><a href="https://github.com/Johyunik">Johyunik</a> |
