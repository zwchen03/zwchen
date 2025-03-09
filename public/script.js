document.addEventListener('DOMContentLoaded', function() {
    // 更新页脚年份
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // 技能进度条动画
    const skillItems = document.querySelectorAll('.skill-item');
    
    const animateSkills = () => {
        skillItems.forEach(item => {
            const skillLevel = item.getAttribute('data-skill');
            const skillBar = item.querySelector('.skill-bar');
            skillBar.style.width = skillLevel + '%';
        });
    };

    // 数字统计动画
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

    // 滚动监听
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
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(section => {
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
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 标签云随机颜色
    const tagItems = document.querySelectorAll('.tag-item');
    const colors = ['#4e7cff', '#6346e4', '#f59e0b', '#10b981', '#ec4899', '#8b5cf6'];
    
    tagItems.forEach(tag => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        tag.addEventListener('mouseenter', function() {
            this.style.backgroundColor = randomColor;
            this.style.color = 'white';
        });
        tag.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#f0f0f0';
            this.style.color = 'var(--text-color)';
        });
    });

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

    // 初始化函数
    const init = () => {
        observeElements();
        lazyLoadImages();
    };

    // 调用初始化函数
    init();

    // 表单提交
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('留言已发送！谢谢您的反馈。');
            this.reset();
        });
    }
}); 