let craneCount = 0; 
const craneCounter = document.getElementById('counter');

// 비디오 소스 경로
const videoMilestones = {
    100: 'sky1.mp4',
    300: 'sky2.mp4',
    500: 'sky3.mp4',
    700: 'sky4.mp4',
    900: 'sky5.mp4'
};

let promptShown = false;

document.addEventListener('mousemove', (event) => {
    const cursorX = event.clientX;
    const cursorY = event.clientY;

    if (craneCount < 1000) {
        // crane.png 생성
        const craneImage = document.createElement('img');
        craneImage.src = 'crane.png';
        craneImage.className = 'crane';
        craneImage.style.left = `${cursorX}px`;
        craneImage.style.top = `${cursorY}px`;

        // craneCount 증가
        craneCount++;
        craneCounter.innerText = craneCount;

        // crane.png의 z-index 설정
        craneImage.style.zIndex = craneCount;

        // 비디오 생성 로직 (너비에 랜덤값 적용)
        if (videoMilestones[craneCount]) {
            const video = document.createElement('video');
            video.src = videoMilestones[craneCount];
            video.className = 'crane-video';
            video.autoplay = true;
            video.loop = true;
            video.muted = true;

            // 비디오의 너비를 250px에서 500px 사이의 랜덤값으로 설정
            const randomWidth = Math.floor(Math.random() * (500 - 250 + 1)) + 250;
            video.style.width = `${randomWidth}px`;

            // 비디오 위치 설정: 커서 위치에 맞추기
            video.style.left = `${cursorX}px`;
            video.style.top = `${cursorY + 80}px`;

            // 비디오 z-index 설정
            if (craneCount === 100) video.style.zIndex = 99;
            else if (craneCount === 300) video.style.zIndex = 299;
            else if (craneCount === 500) video.style.zIndex = 499;
            else if (craneCount === 700) video.style.zIndex = 699;
            else if (craneCount === 900) video.style.zIndex = 899;

            document.body.appendChild(video);
        }

        document.body.appendChild(craneImage);
    }

    // crane.png가 1000개에 도달했을 때 프롬프트 띄우기
    if (craneCount === 1000 && !promptShown) {
        promptShown = true; 
        setTimeout(() => {
            const userInput = prompt('소원을 말해봐');
            if (!userInput) {
                alert('소원을 입력해주세요.');
            } else {
                alert('소원이 전달되었습니다.');
                
                // crane.png 애니메이션 처리
                document.querySelectorAll('.crane').forEach(crane => {
                    const randomX = Math.floor(Math.random() * (150 - 50 + 1)) + 50; // 50~150px 랜덤
                    crane.style.transition = 'transform 2s, opacity 2s'; // 2초 애니메이션
                    crane.style.transform = `translate(${randomX}px, -200px)`; // 좌우 이동 + 위로 이동
                    crane.style.opacity = '0'; 
                });

                // 애니메이션 종료 후 2초 뒤 페이지 리로드
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }
        }, 100);
    }
});
