let craneCount = 0; 
const craneCounter = document.getElementById('counter');


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
        
     
        craneCount++;
        craneCounter.innerText = craneCount;

    
        craneImage.style.zIndex = craneCount; 

    
        if (videoMilestones[craneCount]) {
            const video = document.createElement('video');
            video.src = videoMilestones[craneCount]; 
            video.className = 'crane-video';
            video.autoplay = true; 
            video.loop = true; 
            video.muted = true; 

            
            video.style.left = `${cursorX}px`;
            video.style.top = `${cursorY + 80}px`; 

            
            if (craneCount === 100) video.style.zIndex = 99;
            else if (craneCount === 300) video.style.zIndex = 299;
            else if (craneCount === 500) video.style.zIndex = 499;
            else if (craneCount === 700) video.style.zIndex = 699;
            else if (craneCount === 900) video.style.zIndex = 899;

            document.body.appendChild(video);
        }

        document.body.appendChild(craneImage);
    }

  
    if (craneCount === 1000 && !promptShown) {
        promptShown = true; 
        setTimeout(() => {
            const userInput = prompt('소원을 말해봐');
            if (!userInput) {
                alert('소원을 입력해주세요.');
            } else {
                alert('소원이 전달되었습니다.');
                
               
                document.querySelectorAll('.crane').forEach(crane => {
                    const randomX = Math.floor(Math.random() * (150 - 50 + 1)) + 50; // 50~150px 랜덤
                    crane.style.transition = 'transform 2s, opacity 2s'; // 2초 애니메이션
                    crane.style.transform = `translate(${randomX}px, -200px)`; // 좌우 이동 + 위로 이동
                    crane.style.opacity = '0'; 
                });

                
                setTimeout(() => {
                    location.reload(); 
                }, 2000); 
            }
        }, 100);
    }
});
