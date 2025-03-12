document.addEventListener('DOMContentLoaded', function() {
// 添加视差效果
const parallaxEffect = () => {
    const heroSection = document.querySelector('.hero');
    const aboutSection = document.querySelector('.about-section');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        
        // 给背景图添加视差效果
        document.body.style.backgroundPosition = `center ${scrollValue * 0.05}px`;
        
        // 给英雄区域内容添加视差效果
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollValue * 0.1}px)`;
        }
        
        // 微妙的卡片旋转效果
        if (aboutSection) {
            aboutSection.style.transform = `perspective(1000px) rotateX(${scrollValue * 0.001}deg)`;
        }
    });
};

// 动态玻璃板背景模糊效果
const dynamicGlassEffect = () => {
    const glassElements = document.querySelectorAll('.about-section, .stats-section, .blog-card, .tags-section, .contact-section, header');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        glassElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // 计算鼠标与元素中心的距离
            const distanceX = mouseX - centerX;
            const distanceY = mouseY - centerY;
            
            // 根据距离调整模糊程度和透明度
            if (Math.abs(distanceX) < 300 && Math.abs(distanceY) < 300) {
                const blurValue = 10 - (Math.abs(distanceX) + Math.abs(distanceY)) / 60;
                element.style.backdropFilter = `blur(${Math.max(5, blurValue)}px)`;
                element.style.backgroundColor = `rgba(255, 255, 255, ${0.7 + (Math.abs(distanceX) + Math.abs(distanceY)) / 3000})`;
            }
        });
    });
};

// 技能进度条动画
const skillItems = document.querySelectorAll('.skill-item');

const animateSkills = () => {
    skillItems.forEach(item => {
        const skillLevel = item.getAttribute('data-skill');
        const skillBar = item.querySelector('.skill-bar');
        skillBar.style.width = skillLevel + '%';
    });
};

// 初始化技能进度条（添加此行确保页面加载时就执行动画）
animateSkills();

// 数字统计动画，数字会从0慢慢增加到最终值
const statItems = document.querySelectorAll('.stat-number');
const animateStats = () => {
    statItems.forEach(item => {
        const finalValue = parseInt(item.getAttribute('data-count'));
        let currentValue = 0;
        const increment = Math.ceil(finalValue / 50); // 将动画分成50步
        const duration = 1500; // 动画持续1.5秒
        const interval = duration / 50;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                clearInterval(counter);
                item.textContent = finalValue;
            } else {
                item.textContent = currentValue;
            }
        }, interval);
    });
};

// 滚动监听，当滚动到某个部分时，会高亮当前导航项，并执行相应的动画效果
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.main-nav a');

const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // 高亮当前导航项
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
                
                // 如果是技能部分，执行技能动画
                if (id === 'about') {
                    animateSkills();
                }
                
                // 如果是统计部分，执行统计动画
                if (id === 'stats') {
                    animateStats();
                }
                
                // 给进入视图的部分添加动画效果
                entry.target.style.opacity = 0;
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, 300);
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        observer.observe(section);
    });
};

    
// 回到顶部按钮
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 图片懒加载效果
const lazyLoadImages = () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                    
                    // 添加淡入效果
                    img.style.opacity = 0;
                    setTimeout(() => {
                        img.style.transition = 'opacity 0.5s ease';
                        img.style.opacity = 1;
                    }, 100);
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
};

// 博客卡片悬停效果
const blogCards = document.querySelectorAll('.blog-card');
blogCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'var(--glass-shadow)';
    });
});

// 标签云随机颜色
const tagItems = document.querySelectorAll('.tag-item');
const colors = ['#6c63ff', '#45b6fe', '#10b981', '#ec4899', '#8b5cf6', '#f97316'];

tagItems.forEach(tag => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    tag.addEventListener('mouseenter', function() {
        this.style.backgroundColor = randomColor;
        this.style.color = 'white';
        this.style.boxShadow = `0 5px 15px ${randomColor}50`;
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    tag.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        this.style.color = 'var(--text-color)';
        this.style.boxShadow = 'none';
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 添加鼠标跟随效果，鼠标悬停时会显示一个光晕效果
const addCursorEffect = () => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-effect';
    document.body.appendChild(cursor);
    
    const cursorInner = document.createElement('div');
    cursorInner.className = 'cursor-inner';
    document.body.appendChild(cursorInner);
    
    document.addEventListener('mousemove', e => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        setTimeout(() => {
            cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }, 100);
    });
    
    // 鼠标悬停在链接和按钮上时的效果
    const links = document.querySelectorAll('a, button, .social-link, .tag-item, .gallery-item');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorInner.classList.add('cursor-inner-hover');
        });
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorInner.classList.remove('cursor-inner-hover');
        });
    });
};

// 打字机效果
const typeWriter = (element, text, speed) => {
    let i = 0;
    element.textContent = '';
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// 给第一个标题添加打字机效果
const heroTitle = document.querySelector('.hero-content h2');
const originalTitle = heroTitle.textContent;
typeWriter(heroTitle, originalTitle, 100);

// 页面加载动画
setTimeout(() => {
    document.body.classList.add('loaded');
}, 500);

// 光晕效果
const addHaloEffect = () => {
    const sections = document.querySelectorAll('.about-section, .stats-section, .blog-section, .tags-section, .contact-section');
    
    sections.forEach(section => {
        const halo = document.createElement('div');
        halo.className = 'halo-effect';
        section.prepend(halo);
        
        section.addEventListener('mouseenter', () => {
            halo.style.opacity = 0.15;
        });
        
        section.addEventListener('mousemove', (e) => {
            const rect = section.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            halo.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--primary-color), transparent 50%)`;
        });
        
        section.addEventListener('mouseleave', () => {
            halo.style.opacity = 0;
        });
    });
};

// 背景音乐控制
const musicControl = () => {
    const playBtn = document.getElementById('musicToggle');
    const prevBtn = document.getElementById('prevSong');
    const nextBtn = document.getElementById('nextSong');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const audio = document.getElementById('bgMusic');
    const progressBar = document.querySelector('.progress-current');
    const progressContainer = document.querySelector('.progress-bar');
    const currentTimeEl = document.querySelector('.current-time');
    const totalTimeEl = document.querySelector('.total-time');
    const musicPanel = document.querySelector('.music-panel');
    const musicPanelToggle = document.querySelector('.music-panel-toggle');
    const playlistToggle = document.querySelector('.music-playlist-toggle');
    const playlist = document.querySelector('.music-playlist');
    const closePlaylist = document.querySelector('.close-playlist');
    const playlistSongs = document.querySelector('.playlist-songs');
    const songTitle = document.querySelector('.song-title');
    const songArtist = document.querySelector('.song-artist');
    const songCover = document.querySelector('.song-cover img');

    // 歌曲列表
    const songs = [
        {
            title: 'The truth that you leave',
            artist: 'Pianoboy高至豪',
            src: './bgm/The truth that you leave-Pianoboy高至豪 .flac',
            cover: './img/avatar.jpg'
        },
        {
            title: 'Secret Base',
            artist: 'uBio高尾和树',
            src: './bgm/Secret Base-uBio高尾和树 .mp3',
            cover: './img/pic2.png'
        },
        {
            title: 'The Dawn',
            artist: 'Dreamtale',
            src: './bgm/The Dawn-Dreamtale.flac',
            cover: './img/pic3.png'
        }
    ];

    let currentSongIndex = 0;
    let isPlaying = false;
    let isRandom = false;

    // 初始化歌曲信息
    function loadSong(index) {
        const song = songs[index];
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        songCover.src = song.cover;
        audio.src = song.src;
        
        // 淡入淡出效果
        songCover.style.opacity = 0;
        setTimeout(() => {
            songCover.style.opacity = 1;
        }, 300);
        
        // 高亮当前播放的歌曲
        const playlistItems = document.querySelectorAll('.playlist-song');
        playlistItems.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) {
                item.classList.add('active');
                // 如果歌曲在视图外，滚动到可见区域
                if (item.offsetTop < playlistSongs.scrollTop || 
                    item.offsetTop + item.offsetHeight > playlistSongs.scrollTop + playlistSongs.offsetHeight) {
                    playlistSongs.scrollTop = item.offsetTop - 30;
                }
            }
        });
    }

    // 生成播放列表
    function createPlaylist() {
        playlistSongs.innerHTML = '';
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.className = 'playlist-song ' + (index === currentSongIndex ? 'active' : '');
            li.innerHTML = `
                <div class="playlist-song-number">${index + 1}</div>
                <div class="playlist-song-info">
                    <div class="playlist-song-title">${song.title}</div>
                    <div class="playlist-song-artist">${song.artist}</div>
                </div>
                <div class="playlist-song-duration" id="duration-${index}">--:--</div>
            `;
            li.addEventListener('click', () => {
                currentSongIndex = index;
                loadSong(currentSongIndex);
                playSong();
            });
            playlistSongs.appendChild(li);
            
            // 加载歌曲时长
            loadSongDuration(song.src, index);
        });
    }
    
    // 加载歌曲时长
    function loadSongDuration(src, index) {
        const tempAudio = new Audio();
        tempAudio.src = src;
        tempAudio.addEventListener('loadedmetadata', () => {
            const durationEl = document.getElementById(`duration-${index}`);
            if (durationEl) {
                durationEl.textContent = formatTime(tempAudio.duration);
            }
        });
    }

    // 播放功能
    function playSong() {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        playBtn.classList.add('playing');
        audio.play();
        isPlaying = true;
        musicPanel.classList.add('active');
    }

    // 暂停功能
    function pauseSong() {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playBtn.classList.remove('playing');
        audio.pause();
        isPlaying = false;
    }

    // 下一首
    function nextSong() {
        if (isRandom) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * songs.length);
            } while (randomIndex === currentSongIndex && songs.length > 1);
            currentSongIndex = randomIndex;
        } else {
            currentSongIndex++;
            if (currentSongIndex > songs.length - 1) {
                currentSongIndex = 0; // 循环回到第一首
            }
        }
        loadSong(currentSongIndex);
        if (isPlaying) {
            playSong();
        }
    }

    // 上一首
    function prevSong() {
        if (isRandom) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * songs.length);
            } while (randomIndex === currentSongIndex && songs.length > 1);
            currentSongIndex = randomIndex;
        } else {
            currentSongIndex--;
            if (currentSongIndex < 0) {
                currentSongIndex = songs.length - 1; // 循环到最后一首
            }
        }
        loadSong(currentSongIndex);
        if (isPlaying) {
            playSong();
        }
    }

    // 格式化时间
    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }

    // 更新进度条
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        
        // 更新当前时间和总时间
        currentTimeEl.textContent = formatTime(currentTime);
        if (duration) {
            totalTimeEl.textContent = formatTime(duration);
        }
    }

    // 设置进度条
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }

    // 初始化
    createPlaylist();
    loadSong(currentSongIndex);

    // 检查用户之前的音乐状态（使用本地存储）
    const savedMusicState = localStorage.getItem('bgMusicPlaying');
    const savedMusicIndex = localStorage.getItem('bgMusicIndex');
    const savedPanelState = localStorage.getItem('musicPanelOpen');
    const savedRandomState = localStorage.getItem('musicRandom');
    
    if (savedMusicIndex) {
        currentSongIndex = parseInt(savedMusicIndex);
        loadSong(currentSongIndex);
    }
    
    // 检查面板状态
    if (savedPanelState === 'true') {
        musicPanel.classList.add('active');
        musicPanelToggle.classList.add('active');
    }
    
    // 检查随机播放状态
    if (savedRandomState === 'true') {
        isRandom = true;
        shuffleBtn.classList.add('active');
    }
    
    if (savedMusicState === 'true') {
        musicPanel.classList.add('active');
        // 尝试播放音乐（需要用户交互才能自动播放）
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                playBtn.classList.add('playing');
            }).catch(error => {
                // 自动播放被阻止，需要用户交互
                isPlaying = false;
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                playBtn.classList.remove('playing');
            });
        }
    }

    // 音乐面板开关
    musicPanelToggle.addEventListener('click', () => {
        musicPanel.classList.toggle('active');
        musicPanelToggle.classList.toggle('active');
        
        // 当关闭音乐面板时，也关闭播放列表
        if (!musicPanel.classList.contains('active')) {
            playlist.classList.remove('active');
        }
        
        localStorage.setItem('musicPanelOpen', musicPanel.classList.contains('active'));
        
        // 如果打开面板时音乐正在播放，更新图标
        if (musicPanel.classList.contains('active') && isPlaying) {
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playBtn.classList.add('playing');
        }
    });

    // 事件监听器
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseSong();
            localStorage.setItem('bgMusicPlaying', 'false');
        } else {
            playSong();
            localStorage.setItem('bgMusicPlaying', 'true');
        }
        localStorage.setItem('bgMusicIndex', currentSongIndex.toString());
    });

    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    audio.addEventListener('timeupdate', updateProgress);
    progressContainer.addEventListener('click', setProgress);

    // 播放列表切换
    playlistToggle.addEventListener('click', () => {
        playlist.classList.toggle('active');
    });

    closePlaylist.addEventListener('click', () => {
        playlist.classList.remove('active');
    });

    // 当音乐元数据加载完成后更新总时间
    audio.addEventListener('loadedmetadata', () => {
        totalTimeEl.textContent = formatTime(audio.duration);
    });

    // 随机播放切换
    shuffleBtn.addEventListener('click', () => {
        isRandom = !isRandom;
        localStorage.setItem('musicRandom', isRandom);
        
        // 更新UI
        if (isRandom) {
            shuffleBtn.classList.add('active');
        } else {
            shuffleBtn.classList.remove('active');
        }
    });
    
    // 歌曲结束时的处理
    audio.addEventListener('ended', () => {
        nextSong();
    });
};

// 初始化所有功能
const init = () => {
    parallaxEffect();
    dynamicGlassEffect();
    observeElements();
    lazyLoadImages();
    addCursorEffect();
    addHaloEffect();
    musicControl(); // 添加背景音乐控制
    
    // 添加CSS
    const style = document.createElement('style');
    style.textContent = `
        .cursor-effect {
            position: fixed;
            width: 30px;
            height: 30px;
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
            transition: width 0.3s, height 0.3s, border-color 0.3s;
            opacity: 0.5;
        }
        
        .cursor-inner {
            position: fixed;
            width: 10px;
            height: 10px;
            background-color: var(--primary-color);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
            transition: width 0.3s, height 0.3s, background-color 0.3s;
        }
        
        .cursor-hover {
            width: 50px;
            height: 50px;
            border-color: var(--secondary-color);
            background-color: rgba(69, 182, 254, 0.1);
        }
        
        .cursor-inner-hover {
            width: 5px;
            height: 5px;
            background-color: var(--secondary-color);
        }
        
        .halo-effect {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 0.5s;
            pointer-events: none;
            z-index: 0;
        }
        
        @media (max-width: 768px) {
            .cursor-effect, .cursor-inner {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
};

init();
}); 