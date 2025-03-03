// iUp动画模块
var iUp = (function () {
    var time = 0,
        duration = 150,
        clean = function () {
            time = 0;
        },
        up = function (element) {
            setTimeout(function () {
                element.classList.add("up");
            }, time);
            time += duration;
        },
        down = function (element) {
            element.classList.remove("up");
        },
        toggle = function (element) {
            setTimeout(function () {
                element.classList.toggle("up");
            }, time);
            time += duration;
        };
    return {
        clean: clean,
        up: up,
        down: down,
        toggle: toggle
    };
})();

// 加载Bing背景（修复版）
function getBingImages(imgUrls) {
    var indexName = "bing_image_index";
    var index = sessionStorage.getItem(indexName);
    var panel = document.querySelector('#panel');
    
    // 索引验证
    index = (isNaN(index) || index >= 7) ? 0 : Number(index) + 1;
    
    // 生成有效URL
    var imgUrl = imgUrls[index];
    var proxiedUrl = 'https://images.weserv.nl/?url=' + 
        encodeURIComponent('https://www.bing.com' + imgUrl);
    
    // 应用背景
    panel.style.background = `url('${proxiedUrl}') center/cover no-repeat #666`;
    sessionStorage.setItem(indexName, index);
}

// 邮箱解密
function decryptEmail(encoded) {
    var address = atob(encoded);
    window.location.href = "mailto:" + address;
}

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
    // 加载Hitokoto
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var res = JSON.parse(this.responseText);
            var target = document.getElementById('description');
            if (target) {
                target.innerHTML = `${res.hitokoto}<br/>-「<strong>${res.from}</strong>」`;
            }
        }
    };
    xhr.open("GET", "https://v1.hitokoto.cn", true);
    xhr.send();

    // 初始化动画
    var iUpElements = document.querySelectorAll(".iUp");
    iUpElements.forEach(function (element) {
        iUp.up(element);
    });

    // 头像加载处理
    var avatarElement = document.querySelector(".js-avatar");
    if (avatarElement) {
        avatarElement.addEventListener('load', function () {
            this.classList.add("show");
        });
    }

    // 移动端菜单（修复版）
    var btnMobileMenu = document.querySelector('.btn-mobile-menu');
    var navigationWrapper = document.querySelector('.navigation-wrapper');
    
    if (btnMobileMenu && navigationWrapper) {
        btnMobileMenu.addEventListener('click', function () {
            const isVisible = navigationWrapper.style.display === "block";
            
            // 动画处理
            const animationEndHandler = function () {
                navigationWrapper.classList.toggle('visible');
                navigationWrapper.classList.remove('animated', 'bounceOutUp');
                navigationWrapper.removeEventListener('animationend', animationEndHandler);
            };

            if (isVisible) {
                navigationWrapper.classList.add('animated', 'bounceOutUp');
                navigationWrapper.addEventListener('animationend', animationEndHandler);
            } else {
                navigationWrapper.classList.add('visible', 'animated', 'bounceInDown');
            }

            // 按钮图标切换
            this.classList.toggle('icon-angleup');
            this.classList.toggle('icon-list');
        });
    }
});
