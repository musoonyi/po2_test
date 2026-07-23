//수정
// 프로필 크기 설정 : 숫자가 커질수록 프로필 원이 커짐
const USER_RADIUS = 30;
// 최대 이동 속도 : 값이 높을수록 빠르게 이동
const MAX_SPEED = 1.5;
// 둥둥 떠다니는 움직임의 힘 : 값이 높을수록 흔들림이 커짐
const FLOAT_POWER = 0.0008;
// 포인터(마우스/터치) 주변 감속 거리 : 가까워지면 움직임이 느려짐
const POINTER_RANGE = 150;
// 튕김 시작 거리 : 너무 가까워지면 밀어냄
const PUSH_RANGE = 50;
// 밀어내는 힘 : 값이 높을수록 강하게 튕김
const PUSH_POWER = 0.005;
// 프로필이 움직이는 원형 영역 크기
const CIRCLE_RADIUS = 150;
// 위쪽 이동 제한 위치
const TOP_LIMIT = 80;
// 오른쪽 이동 제한 위치
const RIGHT_LIMIT = 330;


// <Matter.js에서 필요한 기능 가져오기>
// 물리 엔진 생성
const Engine = Matter.Engine;
// 화면 렌더링 담당
const Render = Matter.Render;
// 물리 엔진 실행 담당
const Runner = Matter.Runner;
// 원, 사각형 같은 물리 객체 생성
const Bodies = Matter.Bodies;
// 물리 객체를 월드에 추가 관리
const Composite = Matter.Composite;

// <Matter.js 물리 엔진 생성>
const engine = Engine.create();

// 중력 제거 : 우주처럼 캐릭터가 떠다니도록 설정
engine.gravity.x = 0;
engine.gravity.y = 0;


// <Matter.js 화면 설정>
const render = Render.create({
    // 물리 화면을 표시할 캔버스 연결
    canvas: document.getElementById("physics"),
    // 사용할 물리 엔진 연결
    engine: engine,

    options:{
        // 캔버스 크기
        width:360,
        height:360,
        // 충돌 영역 선 숨기기
        wireframes:false,
        // 배경 투명 처리
        background:"transparent"
    }
});

// 화면 렌더링 시작
Render.run(render);
// 물리 계산 실행 객체 생성
const runner = Runner.create();
// 물리 엔진 실행 : 움직임, 충돌 계산 시작
Runner.run(runner, engine);

//<대화창 오픈시 대화내용>
const users = [
    {
        name: "musoonmom",
        img: "profile.png",
        messages: [
            { type: "left", text: "오늘 오로라키즈카페 이벤트 하던데", sub: "같이갈래?" },
            { type: "right", text: "오, 좋은데?" },
            { type: "left", text: "아티팩트 챙겨와 들고 다니기 번거로어" },
            { type: "right", text: "오키" }
        ]
    },
    {
        name: "futuremoblirity",
        img: "profile1.png",
        messages: [
            { type: "left", text: "미래학연구소 소식 봤는데", sub: "새 보고서 나왔대" },
            { type: "right", text: "어 그래?" },
            { type: "left", text: "미래 도시 내용도 있더라" },
            { type: "right", text: "봐야지" }
        ]
    },
    {
        name: "AuroraLibrary",
        img: "profile2.png",
        messages: [
            { type: "left", text: "오로라 키즈도서관 가봤어", sub: "책 많더라" },
            { type: "right", text: "오, 좋아" },
            { type: "left", text: "아이들 책 새로 들어왔대" },
            { type: "right", text: "가자" }
        ]
    },
    {
        name: "USF",
        img: "profile3.png",
        messages: [
            { type: "left", text: "화성올림픽 경기 봤어", sub: "진짜 신기하더라" },
            { type: "right", text: "오, 봤어" },
            { type: "left", text: "중력이 달라서 재밌더라" },
            { type: "right", text: "인정" }
        ]
    },
    {
        name: "RedPlanet",
        img: "profile4.png",
        messages: [
            { type: "left", text: "레드플레넷 글 봤어", sub: "새 글 올라왔어" },
            { type: "right", text: "오, 그래?" },
            { type: "left", text: "우주 정보 많아서 좋더라" },
            { type: "right", text: "접수" }
        ]
    },
    {
        name: "satlink",
        img: "profile5.png",
        messages: [
            { type: "left", text: "궤도조정 작업 끝났어", sub: "문제 없어?" },
            { type: "right", text: "잘 마쳤어" },
            { type: "left", text: "계산 엄청 어렵겠다" },
            { type: "right", text: "맞아" }
        ]
    },
    {
        name: "SpaceExpo",
        img: "profile6.png",
        messages: [
            { type: "left", text: "우주전시회 준비됐어", sub: "드뎌 끝" },
            { type: "right", text: "오 축하해" },
            { type: "left", text: "새 기술도 볼 수 있대" },
            { type: "right", text: "좋다" }
        ]
    },
    {
        name: "cosmo_j",
        img: "profile7.png",
        messages: [
            { type: "left", text: "화성 야경 봤어", sub: "너무 예쁘더라" },
            { type: "right", text: "아 진짜?" },
            { type: "left", text: "또 보러 가고 싶다" },
            { type: "right", text: "가자" }
        ]
    },
    {
        name: "moon_daily",
        img: "profile8.png",
        messages: [
            { type: "left", text: "식물구역 새로 열었대", sub: "가볼래?" },
            { type: "right", text: "오, 좋아" },
            { type: "left", text: "희귀 식물 많다고 하더라" },
            { type: "right", text: "콜" }
        ]
    },
    {
        name: "NeonSeoul",
        img: "profile9.png",
        messages: [
            { type: "left", text: "네온시티 서울 가봤어", sub: "야경 좋더라" },
            { type: "right", text: "오, 멋지다" },
            { type: "left", text: "새로운 거리 생겼대" },
            { type: "right", text: "가자" }
        ]
    }
];

// <프로필 DOM 자동 생성>
// 프로필을 넣을 부모 요소 가져오기 : 생성된 유저 요소들이 이 안에 들어감
const profileCircle = document.getElementById("profileCircle");


// users 배열을 하나씩 반복하면서 프로필 생성
users.forEach(user=>{
    // 새로운 div 요소 생성
    const div = document.createElement("div");
    // 생성한 div에 user 클래스 추가 : CSS에서 프로필 스타일 적용할 때 사용
    div.className = "user";
    // 프로필 내용 생성 : 이미지, 이름, 메시지 버튼 추가
    div.innerHTML = `
        <!-- 프로필 이미지 -->
        <img src="./images/${user.img}">

        <!-- 사용자 이름 -->
        <span>${user.name}</span>

        <!-- 메시지 버튼 -->
        <button class="messageBtn">
            <i class="fa-solid fa-envelope"></i>
        </button>
    `;

    // 마우스를 프로필 위에 올렸을 때 실행
    div.addEventListener("mouseenter",()=>{
        div.classList.add("active");
    });

    // 마우스가 프로필에서 벗어났을 때 실행
    div.addEventListener("mouseleave",()=>{
        div.classList.remove("active");
    });

    // 만든 프로필 div를 화면에 추가 : profileCircle 안에 프로필 배치
    profileCircle.appendChild(div);

});


// 화면에 있는 유저 이미지(캐릭터) 가져오기
const userEls = document.querySelectorAll(".user");

// 물리 객체를 저장할 배열 : 이미지와 움직이는 공을 연결해서 보관
const userBodies = [];

// 유저 수만큼 반복해서 캐릭터 만들기
users.forEach((user, index)=>{
    //캐릭터를 움직이게 할 투명한 원 생성
    const body = Bodies.circle(
        // 생성 위치 X
        100 + (index * 20) + (Math.random() * 100 - 50),
        // 생성 위치 Y
        100 + (index * 10) + (Math.random() * 100 - 50),
        // 원 크기
        USER_RADIUS,
        // 물리 설정
        {
            // 튕기는 힘
            restitution: 1,
            // 마찰 없음
            friction: 0,
            // 공기 저항 (천천히 멈추게 함)
            frictionAir: 0.06,
            // 충돌 오차 보정
            slop: 0.5
        }
    );

    // 이미지와 물리 공 연결해서 저장
    userBodies.push({
        // 움직이는 물리 객체
        body: body,
        // 실제 화면 이미지
        el: userEls[index],
        // 이름
        name: user.name
    });

    // 만든 공을 Matter.js 공간에 추가
    Composite.add(
        engine.world,
        body
    );

    // 처음 움직이는 방향 랜덤 설정
    Matter.Body.setVelocity(body,{
        // 좌우 움직임
        x:(Math.random()-0.5)*0.5,
        // 위아래 움직임
        y:(Math.random()-0.5)*0.5,

    });

});



// 마우스 / 터치 위치
const pointer={
    x:0,
    y:0,
    active:false
};


document.addEventListener("pointermove",(e)=>{
    const rect=render.canvas.getBoundingClientRect();
    pointer.x=e.clientX-rect.left;
    pointer.y=e.clientY-rect.top;
    pointer.active=true;
});



// 터치시 밀림
document.addEventListener("pointerdown",(e)=>{
    const rect=render.canvas.getBoundingClientRect();
    const x=e.clientX-rect.left;
    const y=e.clientY-rect.top;

    userBodies.forEach(user=>{
        const dx=user.body.position.x-x;
        const dy=user.body.position.y-y;
        const distance=Math.sqrt(dx*dx+dy*dy);

        if(distance<PUSH_RANGE){
            Matter.Body.applyForce(
                user.body,
                user.body.position,
                {
                    x:dx*PUSH_POWER,
                    y:dy*PUSH_POWER
                }
            );
        }
    });
});



// 둥둥 + 감속 + 튕김
Matter.Events.on(engine,"beforeUpdate",()=>{
    userBodies.forEach(user=>{
        const body=user.body;

        // 기본 둥둥 움직임
        Matter.Body.applyForce(
            body,
            body.position,
            {
                x:Math.sin(Date.now()*0.001+body.id)*FLOAT_POWER,
                y:Math.cos(Date.now()*0.001+body.id)*FLOAT_POWER
            }
        );

        if(pointer.active){
            const dx=body.position.x-pointer.x;
            const dy=body.position.y-pointer.y;
            const distance=Math.sqrt(dx*dx+dy*dy);

            // 가까우면 느려짐
            if(distance<POINTER_RANGE){
                Matter.Body.setVelocity(
                    body,
                    {
                        x:body.velocity.x*0.88,
                        y:body.velocity.y*0.88
                    }
                );
            }

            // ⭐ 가까우면 튕김
            if(distance<PUSH_RANGE){
                Matter.Body.applyForce(
                    body,
                    body.position,
                    {
                        x:(dx/distance)*PUSH_POWER,
                        y:(dy/distance)*PUSH_POWER
                    }
                );
            }
        }

        const speed=Math.sqrt(
            body.velocity.x*body.velocity.x+
            body.velocity.y*body.velocity.y
        );

        if(speed>MAX_SPEED){
            Matter.Body.setVelocity(
                body,
                {
                    x:(body.velocity.x/speed)*MAX_SPEED,
                    y:(body.velocity.y/speed)*MAX_SPEED
                }
            );
        }
    });
});



// 위치 연결 + 영역 제한
// Matter.js 엔진이 한 프레임 업데이트될 때마다 실행
Matter.Events.on(engine, "afterUpdate", () => {

    // 모든 유저(프로필) 반복
    userBodies.forEach(user => {

        const body = user.body;

        // ★ 원형 영역의 중심 좌표 (수정 가능)
        const cx = 180;
        const cy = 180;

        // 현재 위치와 중심 사이 거리 계산
        const dx = body.position.x - cx;
        const dy = body.position.y - cy;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 원 밖으로 나가면
        if (distance > CIRCLE_RADIUS) {

            // 중심에서 현재 위치까지의 각도
            const angle = Math.atan2(dy, dx);

            // ★ CIRCLE_RADIUS를 변경하면 원의 크기 변경
            Matter.Body.setPosition(body, {
                x: cx + Math.cos(angle) * CIRCLE_RADIUS,
                y: cy + Math.sin(angle) * CIRCLE_RADIUS
            });

            // ★ 0.5를 높이면 더 많이 튕기고, 낮추면 덜 튕김
            Matter.Body.setVelocity(body, {
                x: -body.velocity.x * 0.5,
                y: -body.velocity.y * 0.5
            });
        }

        // ★ TOP_LIMIT를 변경하면 위쪽 제한 위치 변경
        if (body.position.y < TOP_LIMIT) {
            Matter.Body.setPosition(body, {
                x: body.position.x,
                y: TOP_LIMIT
            });
        }

        // ★ RIGHT_LIMIT를 변경하면 오른쪽 제한 위치 변경
        if (body.position.x > RIGHT_LIMIT) {
            Matter.Body.setPosition(body, {
                x: RIGHT_LIMIT,
                y: body.position.y
            });
        }

        // HTML 요소 위치를 물리 객체 위치와 동기화
        // ★ USER_RADIUS를 변경하면 이미지 중심 위치가 변경됨
        user.el.style.left =
            body.position.x - USER_RADIUS + "px";

        user.el.style.top =
            body.position.y - USER_RADIUS + "px";
    });
});



// 클릭시 메세지에 프로필이랑 대화교체

const chatBody = document.querySelector(".chatBody");
const profileImg = document.querySelector(".chatBox .chatHeader .profile_img");
const chatUser = document.querySelector(".chatBox .chatHeader .chat_user");

userBodies.forEach((user, index) => {

    user.el.addEventListener("click", () => {

        // 프로필 이미지 변경
        profileImg.src = `./images/${users[index].img}`;

        // 이름 변경
        chatUser.innerHTML = `
            <img src="./images/slideicon2.png" alt="아이콘">
            ${users[index].name}
        `;

        // 기존 대화 삭제
        chatBody.querySelectorAll(".msg").forEach(msg => {
            msg.remove();
        });

        // 선택한 유저 대화 출력
        users[index].messages.forEach(msg => {

            const span = document.createElement("span");

            span.className = `msg ${msg.type}`;

            if (msg.sub) {
                span.innerHTML = `
                    ${msg.text}
                    <em>${msg.sub}</em>
                `;
            } else {
                span.textContent = msg.text;
            }

            chatBody.insertBefore(
                span,
                chatBody.querySelector(".chat_input")
            );
        });

        openChat();
    });

});


// 모바일 터치시 이름 표시
userBodies.forEach(user=>{
    user.el.addEventListener("pointerdown",(e)=>{
        e.stopPropagation();
        user.el.classList.toggle("active");
    });
});



// 원호 벽
// 벽(곡선 형태의 경계)을 생성하는 함수
function createWall(){
    // 생성할 벽들을 담을 배열
    const walls=[];
    // 원의 중심 좌표
    const cx=500;
    const cy=500;
    // 원의 반지름
    const r=500;
    // 90도 ~ 180도 구간을 5도 간격으로 반복
    // 원의 왼쪽 위 1/4 영역에 벽 생성
    for(let angle=90; angle<=180; angle+=5){

        // 각도를 라디안으로 변환
        // Math.cos, Math.sin은 라디안 값을 사용하기 때문
        const rad=angle*Math.PI/180;

        // 원 둘레의 x,y 좌표 계산
        // 중심점 + (삼각함수 * 반지름)
        const x = cx + Math.cos(rad) * r;
        const y = cy + Math.sin(rad) * r;

        // 계산된 위치에 직사각형 벽 생성
        walls.push(
            Bodies.rectangle(
                // 벽의 위치
                x,
                y,
                // 벽 하나의 크기
                // 여러 개가 이어져 곡선 형태를 만듦
                80,
                30,
                {
                    // 움직이지 않는 고정 벽
                    isStatic:true,
                    // 벽을 원의 접선 방향으로 회전
                    // 곡선을 따라 자연스럽게 배치하기 위해 사용
                    angle:rad,
                    // 화면에는 보이지 않는 충돌용 벽
                    render:{
                        visible:false
                    }
                }
            )
        );
    }
    // 생성한 모든 벽을 Matter.js 물리 월드에 추가
    Composite.add(engine.world,walls);
}

// 함수 실행
createWall();


// ===== 메세지 보내기 =====

const btn = document.querySelector(".sendBtn");
const input = document.querySelector(".chat_input");
// const chatBody = document.querySelector(".chatBody");

const autoReplies = [
    "좋아!",
    "오케이 😄",
    "ㅋㅋㅋㅋ",
    "알겠어",
    "그럼 그렇게 하자!",
    "좋은 생각인데?",
    "곧 갈게.",
    "확인!"
];

btn.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    // 내 메세지
    addMessage(text, "right");

    input.value = "";

    // 상대방 입력중...
    const typing = document.createElement("div");
    typing.className = "msg left typing";
    typing.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    chatBody.appendChild(typing);
    scrollBottom();

    // 랜덤 시간 후 답장
    setTimeout(() => {
        typing.remove();
        const reply =
            autoReplies[Math.floor(Math.random() * autoReplies.length)];
        addMessage(reply, "left");
    }, 1000 + Math.random() * 1200);
}

function addMessage(text, side) {
    const div = document.createElement("div");
    div.className = `msg ${side}`;
    div.textContent = text;
    chatBody.appendChild(div);
    scrollBottom();
}
function scrollBottom() {
    chatBody.scrollTo({
        top: chatBody.scrollHeight,
        behavior: "smooth"
    });
}
