// ===== 네비게이션 스크롤 효과 =====
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // 네비게이션 스크롤 스타일
  if (scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // 맨 위로 버튼 표시
  if (scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }

  // 활성 네비 링크 업데이트
  updateActiveNavLink();
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== 활성 네비게이션 링크 =====
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollY = window.scrollY + 100;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ===== 햄버거 메뉴 =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== 타이핑 효과 =====
const texts = ['프론트엔드 개발자', '웹 크리에이터', '문제 해결사'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing-text');

function type() {
  const currentText = texts[textIndex];

  if (!isDeleting) {
    typingEl.textContent = currentText.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(type, 2000);
      return;
    }
  } else {
    typingEl.textContent = currentText.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
  }

  setTimeout(type, isDeleting ? 60 : 110);
}

type();

// ===== 스크롤 페이드인 애니메이션 =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// 페이드인 요소에 클래스 추가 후 관찰
const fadeElements = [
  '.section-header',
  '.about-text',
  '.about-image',
  '.skill-category',
  '.project-card',
  '.contact-info',
  '.contact-form',
  '.tech-icon',
];

fadeElements.forEach((selector) => {
  document.querySelectorAll(selector).forEach((el) => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
  });
});

// ===== 스킬 바 애니메이션 =====
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach((fill) => {
          fill.classList.add('animated');
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);

document.querySelectorAll('.skill-category').forEach((category) => {
  skillObserver.observe(category);
});

// ===== 숫자 카운터 애니메이션 =====
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number').forEach((el) => {
          const target = parseInt(el.getAttribute('data-count'));
          animateCounter(el, target);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

const aboutSection = document.querySelector('.about');
if (aboutSection) counterObserver.observe(aboutSection);

function animateCounter(el, target) {
  let current = 0;
  const duration = 1500;
  const step = target / (duration / 16);

  const update = () => {
    current += step;
    if (current >= target) {
      el.textContent = target + '+';
      return;
    }
    el.textContent = Math.floor(current);
    requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
}

// ===== 프로젝트 필터링 =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach((card) => {
      const category = card.getAttribute('data-category');

      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.3s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== 연락처 폼 =====
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.textContent = '전송 중...';
  submitBtn.disabled = true;

  // 전송 시뮬레이션 (실제 백엔드 연결 필요)
  setTimeout(() => {
    contactForm.reset();
    submitBtn.textContent = '메시지 보내기';
    submitBtn.disabled = false;
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 4000);
  }, 1200);
});

// ===== 네비게이션 부드러운 스크롤 =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = target.offsetTop - navHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// ===== 모바일: 화면 외부 클릭 시 메뉴 닫기 =====
document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('open') &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

// ===== 모바일: 뷰포트 높이 CSS 변수 설정 (주소창 제외) =====
function setMobileVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setMobileVh();
window.addEventListener('resize', setMobileVh);
