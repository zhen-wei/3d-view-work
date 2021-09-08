const h1 = document.querySelector('h1');
const materialText = document.querySelector('.material');
const info = document.querySelectorAll('p');

const fullText = {
    titel: '<img src="./assets/img/000.png" alt="mark" class="small-img">HTML期末網站<img src="./assets/img/000.png" alt="mark" class="small-img">',
    name: '作者：葉鎮瑋',
    email: '信箱：ooo@mail.com',
    material: ['2D圖片：自製', '2D材質圖：CC0Textures', 'Apple模型：自製', 'Cap模型：自製', 'DamagedHelmet模型：theblueturtle_', '其餘模型：cesium', 'Icons字體：Material icons', '字體：Noto_Sans_TC']
}
function getShortening(text) {
    if (Array.isArray(text)) {
        const array = [];
        text.forEach(t => array.push(t.slice(t.indexOf('：')+1)));
        return array;
    }
    else if (typeof text === 'string') {
        return text.slice(text.indexOf('：')+1);
    }
    else {
        throw new Error('格式不正確');
    }
}

const text = {
    titel: '期末網站',
    name: getShortening(fullText.name),
    email: getShortening(fullText.email),
    material: Array.from(new Set(getShortening(fullText.material)))
}

console.log(text)

function resize() {
    const w = window.innerWidth;
    if (w < 280) {
        info[0].textContent =  text.name;
        info[1].textContent = text.email;
    } else {
        info[0].textContent =  fullText.name;
        info[1].textContent = fullText.email
    }
    if (w < 350) {
        materialText.innerHTML = text.material.map(t => `<li>${t}</li>`).join('');
    } else {
        materialText.innerHTML = fullText.material.map(t => `<li>${t}</li>`).join('');
    }
    if (w < 410) {
        h1.textContent = text.titel
    } else {
        h1.innerHTML = fullText.titel
    }
    
    
}

window.addEventListener('resize', resize);

resize();