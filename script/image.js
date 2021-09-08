


const models = [
    {
        name: 'Apple',
        img: './assets/img/models/Apple.webp',
        model: './assets/models/Apple.glb',
        textContent: '盤子上的一顆蘋果',
        note: '自練習',
    },
    {
        name: 'Cap',
        img: './assets/img/models/Cap.webp',
        model: './assets/models/Cap.glb',
        textContent: '杯架',
        note: '自練習'
    },
    {
        name: 'DamagedHelmet',
        img: './assets/img/models/DamagedHelmet.webp',
        model: './assets/models/DamagedHelmet.glb',
        textContent: '損壞的頭盔',
        note: 'Battle Damaged Sci-fi Helmet - PBR by theblueturtle_'
    },
    {
        name: 'GroundVehicle',
        img: './assets/img/models/GroundVehicle.webp',
        model: './assets/models/GroundVehicle.glb',
        textContent: '應該是越野車...?',
        note: 'cesium'
    },
    {
        name: 'Pawns',
        img: './assets/img/models/Pawns.webp',
        model: './assets/models/Pawns.glb',
        textContent: '西洋棋，材質',
        note: 'cesium'
    },
    {
        name: 'Wood_Tower',
        img: './assets/img/models/Wood_Tower.webp',
        model: './assets/models/Wood_Tower.glb',
        textContent: '有點像寮望台?',
        note: 'cesium'
    }
];

const modelsMap = new Map(models.map((m, i) => [m.name, i]));


const template = document.createElement('template');
template.innerHTML = models.map(m => (`
    <div class="grid-item">
        <img src="${m.img}" alt="${m.name}" loading="lazy" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
            查看介紹
        </button>
    </div>
    `
)).join('');



/**@type { HTMLDivElement } */
const grid = document.querySelector('.grid');
const item = template.content.querySelectorAll('.grid-item');
const images  = template.content.querySelectorAll('img');
/**@type {NodeListOf<HTMLButtonElement>} */
const button  = template.content.querySelectorAll('button');
const info = document.getElementById('info');
const modelViewer = document.querySelector('model-viewer');

grid.appendChild(template.content);



function init() {
    let delay = (item.length-1)*0.15+1;
    grid.style.animation = `reset 1s ${delay}s forwards`;
    item.forEach((i, index) => {
        i.style.animation = `appear 2s ${index*0.15}s forwards ease-in-out`;
    });
    button.forEach((btn, index) => {
        btn.style.animation = `btnView 0.3s ${delay+1}s forwards ease-in`;
        btn.addEventListener('click', ev => {
            const m = models[index];
            info.innerHTML = `${m.textContent}<br>${m.note}`;
        });
    });
    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            const m = models[index];
            modelViewer.setAttribute('src', m.model);
        });
    });
    setTimeout(()=> document.querySelector('.top-bar-box').style.zIndex = '1', (delay+1)*1000);
    // console.log(delay)
}


init();