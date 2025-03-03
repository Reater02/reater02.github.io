// iUp动画模块（修正语法版）
const iUp = (function () {
    let time = 0;
    const duration = 150;
    
    return {
        clean: () => time = 0,
        up: (element) => {
            setTimeout(() => element.classList.add("up"), time);
            time += duration;
        },
        down: (element) => element.classList.remove("up"),
        toggle: (element) => {
            setTimeout(() => element.classList.toggle("up"), time);
            time += duration;
        }
    };
})();

// 移动端菜单交互（修复版）
function setupMobileMenu() {
    const btn = document.querySelector('.btn-mobile-menu');
    const nav = document.querySelector('.navigation-wrapper');
    
    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
        const isVisible = nav.classList.contains('visible');
        
        nav.classList.toggle('visible', !isVisible);
        nav.classList.toggle('animated', true);
        nav.classList.toggle(
            isVisible ? 'bounceOutUp' : 'bounceInDown'
        );

        // 按钮图标切换
        btn.classList.toggle('icon-angleup');
        btn.classList.toggle('icon-list');
    });
}

// 初始化入口
document.addEventListener('DOMContentLoaded', () => {
    // 初始化动画
    document.querySelectorAll('.iUp').forEach(iUp.up);
    
    // 设置移动菜单
    setupMobileMenu();

    // 头像加载处理
    const avatar = document.querySelector('.js-avatar');
    if (avatar) {
        avatar.addEventListener('load', () => {
            avatar.style.opacity = 1;
        });
    }
});
