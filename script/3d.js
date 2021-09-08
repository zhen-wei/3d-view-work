import 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';

/**@typedef { { name: string; img: string; model: string;} } ModelData */

/**@type {ModelData[]} */
const models = [
    {
        name: 'Apple',
        img: './assets/img/models/Apple.webp',
        model: './assets/models/Apple.glb'
    },
    {
        name: 'Cap',
        img: './assets/img/models/Cap.webp',
        model: './assets/models/Cap.glb'
    },
    {
        name: 'DamagedHelmet',
        img: './assets/img/models/DamagedHelmet.webp',
        model: './assets/models/DamagedHelmet.glb'
    },
    {
        name: 'GroundVehicle',
        img: './assets/img/models/GroundVehicle.webp',
        model: './assets/models/GroundVehicle.glb'
    },
    {
        name: 'Pawns',
        img: './assets/img/models/Pawns.webp',
        model: './assets/models/Pawns.glb'
    },
    {
        name: 'Wood_Tower',
        img: './assets/img/models/Wood_Tower.webp',
        model: './assets/models/Wood_Tower.glb'
    }
];

const loadedIndex = new Set();
let modelsIndex = 0;
let timer = 0;


const modelViewer = document.querySelector('model-viewer');
const [prev, next] = modelViewer.querySelectorAll('span');
const modelInfo = modelViewer.querySelector('p');
/**@type { HTMLDivElement } */
const cardList = document.getElementById("cardList");


const template = document.createElement('template');

template.innerHTML = models.map(m => (`
<input type="radio" name="imgCard" id="${m.name}" hidden>
<label class="card" for="${m.name}">
    <img src="${m.img}" class="card-img" alt="${m.name}" draggable="false">
    <h5 class="card-title">${m.name}</h5>
</label>`
)).join('');

const imgCards = template.content.querySelectorAll('input');

cardList.appendChild(template.content);

customElements.get('model-viewer').modelCacheSize = models.length;

function init() {
    return new Promise(resolve => {
        let loaded = false;
        const fragment = document.createDocumentFragment();
        const preload = document.createElement('link');
        preload.rel = 'preload';
        preload.as = 'fetch';
        preload.crossOrigin = '';

        const once = {once: true};
        
        models.forEach((item, index) => {
            const pre = preload.cloneNode(true);
            pre.href = item.model;
            fragment.appendChild(pre);

            pre.addEventListener('load', () => {
                if (!loaded) {
                    loaded = true;
                    modelsIndex = index;
                    const card = imgCards[modelsIndex];
                    card.checked = true;
                    card.nextElementSibling.scrollIntoView({
                        behavior: 'smooth',
                        inline: 'center',
                        block:'nearest'
                    });
                    modelInfo.textContent = models[modelsIndex].name;                    
                    modelViewer.setAttribute('src', models[modelsIndex].model);
                    resolve(true);
                }
                loadedIndex.add(index);
            }, once);

        });

        document.head.appendChild(fragment);
    });
}

/**
 * 
 * @param { (value: string | PromiseLike<string>) => void } resolve 
 * @param { (reason?: any) => void } reject 
 */
function _getModeleData(resolve, reject) {
    if (loadedIndex.size === 0) {
        reject('無模型讀取完畢');
    } else {
        if (modelsIndex === models.length) {
            modelsIndex = 0
        }
        else if (modelsIndex < 0) {
            modelsIndex = models.length-1;
        }

        if (loadedIndex.has(modelsIndex)) {
            resolve(models[modelsIndex]);
        } else {
            modelsIndex++;
            queueMicrotask(() => _getModeleData(resolve, reject));
        }
    }
}

/**
 * @returns {Promise<ModelData>}
 */
function getModeleData() {
    return new Promise((resolve, reject) => _getModeleData(resolve, reject));
}

function renderModule(){
    
    getModeleData(modelsIndex)
    .then(data => {
        const card = imgCards[modelsIndex];
        card.checked = true;
        card.nextElementSibling.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block:'nearest'
        });
        modelViewer.setAttribute('alt', data.name);
        modelViewer.setAttribute('src', data.model);
        
        
    });
}

function carouselModel() {
    modelsIndex++;
    renderModule();
}

modelViewer.addEventListener('progress', ev =>{
    if (ev.detail.totalProgress === 1) {
        modelInfo.textContent = modelViewer.getAttribute('alt');
        timer = setTimeout(carouselModel, 5000);
    } else {
        modelInfo.textContent = `${ (ev.detail.totalProgress*100) | 0 }%`;
    }   
});

prev.addEventListener('click', ev => {
    clearTimeout(timer);
    modelsIndex--;
    renderModule();
})

next.addEventListener('click', () => {
    clearTimeout(timer);
    modelsIndex++
    renderModule();
})

// 滑鼠滾動事件
cardList.addEventListener('wheel', ev => {
    ev.preventDefault();
    // 滑鼠滾輪向下為正值、向上為負值，對應Y軸滾軸增減
    if (ev.deltaY < 0) {
        cardList.scrollLeft -= 50;
    } else {    
        cardList.scrollLeft += 50;
    }
});

imgCards.forEach((card, index) => {
    card.addEventListener('change', ev => {
        clearTimeout(timer);
        modelsIndex = index;
        renderModule();
    });
});

init();