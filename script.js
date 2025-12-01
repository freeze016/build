// State
let currentFloor = 1; // Начинаем с 1 этажа, так как 0 - парковка
let selectedFlat = null;
let favorites = [];
let compareList = [];
let currentImageIndex = 0;

// Данные квартир
const flatsData = {
    '1': { name: 'кв. 1, 3 комн.', type: 'apartment', rooms: 3, area: '85,2 кв. м.', status: 'available', price: 1125000000 },
    '2': { name: 'кв. 2, 1 комн.', type: 'apartment', rooms: 1, area: '40,1 кв. м.', status: 'sold', price: 558000000 },
    '3': { name: 'кв. 3, 2 комн.', type: 'apartment', rooms: 2, area: '64,5 кв. м.', status: 'available', price: 882000000 },
    '4': { name: 'кв. 4, 3 комн.', type: 'apartment', rooms: 3, area: '90,0 кв. м.', status: 'available', price: 1188000000 },
    '5': { name: 'кв. 5, 2 комн.', type: 'apartment', rooms: 2, area: '58,7 кв. м.', status: 'available', price: 801000000 },
    '6': { name: 'кв. 6, 2 комн.', type: 'apartment', rooms: 2, area: '59,1 кв. м.', status: 'sold', price: 810000000 },
    '7': { name: 'кв. 7, 3 комн.', type: 'apartment', rooms: 3, area: '92,3 кв. м.', status: 'available', price: 1215000000 },
    '8': { name: 'кв. 8, 2 комн.', type: 'apartment', rooms: 2, area: '68,4 кв. м.', status: 'available', price: 936000000 },
    '9': { name: 'кв. 9, 2 комн.', type: 'apartment', rooms: 2, area: '66,9 кв. м.', status: 'available', price: 909000000 },
    '10': { name: 'кв. 10, 3 комн.', type: 'apartment', rooms: 3, area: '84,5 кв. м.', status: 'sold', price: 1107000000 },
    'C1': { name: 'Помещение 1 (64,5м²)', type: 'commercial', purpose: 'Коммерческое', area: '64,5 кв. м.', status: 'available', price: 855000000 },
    'C2': { name: 'Помещение 2 (38,9м²)', type: 'commercial', purpose: 'Коммерческое', area: '38,9 кв. м.', status: 'available', price: 522000000 },
    'C3': { name: 'Помещение 3 (75,2м²)', type: 'commercial', purpose: 'Коммерческое', area: '75,2 кв. м.', status: 'available', price: 990000000 },
    'C4': { name: 'Помещение 4 (29,9м²)', type: 'commercial', purpose: 'Коммерческое', area: '29,9 кв. м.', status: 'available', price: 405000000 },
    'C5': { name: 'Помещение 5 (56,0м²)', type: 'commercial', purpose: 'Коммерческое', area: '56,0 кв. м.', status: 'available', price: 747000000 },
    'C6': { name: 'Помещение 6 (35,9м²)', type: 'commercial', purpose: 'Коммерческое', area: '35,9 кв. м.', status: 'sold', price: 477000000 },
    'C7': { name: 'Помещение 7 (32,3м²)', type: 'commercial', purpose: 'Коммерческое', area: '32,3 кв. м.', status: 'available', price: 432000000 },
    'C8': { name: 'Помещение 8 (58,4м²)', type: 'commercial', purpose: 'Коммерческое', area: '58,4 кв. м.', status: 'available', price: 774000000 }
};

// Пути этажей (исключая 0 этаж - это парковка)
const floorPaths = [
    { floor: 1, d: "M223 553.4 L444.5 564.4 L513 544.7 V 570.7 L444.5 594.4 L223 581.4 Z" },
    { floor: 2, d: "M223 528.7L443.8 536.7L513 523V544.7L444.5 564.4L223 553.4V528.7Z" },
    { floor: 3, d: "M223 526V501L443.3 504.3L513 501V521L443.7 534L223 526Z" },
    { floor: 4, d: "M223 502V477H444H513V500L445 507L223 502Z" },
    { floor: 5, d: "M223 476V451L444.3 447.3L512 454V476H444" },
    { floor: 6, d: "M223 450V424L444.5 420.7L513 431.7V453L444 446.3L223 450Z" },
    { floor: 7, d: "M222 423V399.3L443 387L514 410V431.3L443 419L222 423Z" },
    { floor: 8, d: "M222 401V376L444.2 359.7L514 388.3V409L443.7 387.3L222 401Z" },
    { floor: 9, d: "M222 376V351L444.5 330.7L514 367.3V388L442 359.3L222 376Z" },
    { floor: 10, d: "M222 350V326L445 301.3L514 345.3V367L444.7 329L222 350Z" },
    { floor: 11, d: "M222 325V301L444.5 272.3L514 323.3V344L443.7 301.7L222 325Z" },
    { floor: 12, d: "M221 301V277L443.3 244L514 303.3V323L444 272.3L221 301Z" },
    { floor: 13, d: "M222 276V252L443.2 217L513 281V302L444.3 243.7L222 276Z" },
    { floor: 14, d: "M222 252V227L444.3 189L513 259.3V280L444 216L222 252Z" },
    { floor: 15, d: "M222 226.7V201.7L442.8 158L513 237V259.7L444 186.4L222 226.7Z" },
    { floor: 16, d: "M223 202V177L443 129L513 214V237L442.3 157.7L223 202Z" },
    { floor: 17, d: "M222 177V152L441.8 100L513 192.3V215L443.3 128.7L222 177Z" },
    { floor: 18, d: "M220 151.7V125.7L442 69L511 170.7V191.7L441.7 100L220 151.7Z" }
];

// Пути квартир
const apartmentPaths = [
    { id: '1', d: "M388 81V141H314V148H267.5V131H247V32.5H338.5V16H405V81H388Z" },
    { id: '2', d: "M314 148.5H268V200H367.5V205H387.5V141H314V148.5Z" },
    { id: '3', d: "M314.192 252.662H268V200H367.916V204.602H388V268H314.192V252.662Z" },
    { id: '4', d: "M314 253H268.5V309H295.5V376H340V393H405V328.5H388V268.5H314V253Z" },
    { id: '5', d: "M218 394.5V264H247.5V273.5H267.5V310.5H294.5V375H259.5V394.5H218Z" },
    { id: '6', d: "M217 394.5V264H187.5V273.5H167.5V310.5H140.5V375H175.5V394.5H217Z" },
    { id: '7', d: "M121 252H166.5V309H139.5V376H95V393H30V328.5H47V273.5H121V252Z" },
    { id: '8', d: "M119.5 273.5H46V198H167V250.822H119.5V273.5Z" },
    { id: '9', d: "M124.729 116H46V198H167V145.178H124.729V116Z" },
    { id: '10', d: "M46.5 81V115.5H125V144.5H164V131H184.5V32.5H93V16H28V81H46.5Z" }
];

// Пути коммерческих помещений
const commercialPaths = [
    { id: 'C1', d: "M 10 8 L 268 8 L 268 55 L 245 55 L 245 80 L 180 80 L 180 105 L 115 105 L 115 80 L 10 80 Z" },
    { id: 'C2', d: "M 10 148 L 175 148 L 175 232 L 140 232 L 140 260 L 108 260 L 108 285 L 75 285 L 75 260 L 10 260 Z" },
    { id: 'C3', d: "M 730 8 L 990 8 L 990 30 L 975 30 L 975 262 L 900 262 L 900 235 L 860 235 L 860 210 L 900 210 L 900 180 L 860 180 L 860 155 L 900 155 L 900 128 L 860 128 L 860 102 L 900 102 L 900 75 L 730 75 Z" },
    { id: 'C4', d: "M 730 298 L 990 298 L 990 442 L 900 442 L 900 398 L 860 398 L 860 370 L 900 370 L 900 342 L 860 342 L 860 318 L 730 318 Z" },
    { id: 'C5', d: "M 10 308 L 230 308 L 230 442 L 10 442 Z" },
    { id: 'C6', d: "M 305 370 L 425 370 L 425 442 L 305 442 Z" },
    { id: 'C7', d: "M 465 370 L 585 370 L 585 442 L 465 442 Z" },
    { id: 'C8', d: "M 625 308 L 710 308 L 710 442 L 625 442 Z" }
];

// Галерея
const galleryImages = [
    { url: 'img/2.jpg', title: 'Современный фасад', category: 'exterior' },
    { url: 'img/2.jpg', title: 'Панорамные окна', category: 'interior' },
    { url: 'img/2.jpg', title: 'Просторная гостиная', category: 'interior' },
    { url: 'img/2.jpg', title: 'Дизайнерская кухня', category: 'interior' },
    { url: 'img/2.jpg', title: 'Премиум-класс спальня', category: 'interior' },
    { url: 'img/2.jpg', title: 'Территория комплекса', category: 'exterior' },
    { url: 'img/2.jpg', title: 'Детская площадка', category: 'infrastructure' },
    { url: 'img/2.jpg', title: 'Лобби-зона', category: 'infrastructure' }
];

// Utility функции
function formatSum(value) {
    return (value / 1000000).toFixed(0) + ' млн';
}

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Scroll to top button
    const scrollTop = document.getElementById('scrollTop');
    if (window.scrollY > 300) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

// Mobile menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
const mobileLinks = document.querySelectorAll('.nav-link-mobile');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Floor Selector
function initFloorSelector() {
    const svg = document.querySelector('.building-svg');
    
    // Добавляем пути этажей
    floorPaths.forEach(({ floor, d }) => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        path.setAttribute('data-floor', floor);
        path.setAttribute('fill', 'transparent');
        path.setAttribute('class', 'floor-path');
        path.style.cursor = 'pointer';
        path.style.transition = 'all 0.3s';
        
        path.addEventListener('mouseenter', () => {
            if (currentFloor !== floor) {
                path.setAttribute('fill', '#8b5cf650');
            }
            updateFloorLabel(floor);
        });
        
        path.addEventListener('mouseleave', () => {
            if (currentFloor !== floor) {
                path.setAttribute('fill', 'transparent');
            }
            updateFloorLabel(currentFloor);
        });
        
        path.addEventListener('click', () => {
            setFloor(floor);
        });
        
        svg.appendChild(path);
    });
    
    updateFloorDisplay();
}

function setFloor(floor) {
    currentFloor = floor;
    updateFloorDisplay();
}

function updateFloorDisplay() {
    // Update floor number
    document.getElementById('floorNumber').textContent = String(currentFloor).padStart(2, '0');
    updateFloorLabel(currentFloor);
    
    // Update floor paths
    const paths = document.querySelectorAll('.floor-path');
    paths.forEach(path => {
        const floor = parseInt(path.getAttribute('data-floor'));
        if (floor === currentFloor) {
            path.setAttribute('fill', 'url(#floorGradient)');
            path.setAttribute('stroke', '#a78bfa');
            path.setAttribute('stroke-width', '2');
        } else {
            path.setAttribute('fill', 'transparent');
            path.setAttribute('stroke', 'transparent');
        }
    });
    
    // Update buttons
    const floorUp = document.getElementById('floorUp');
    const floorDown = document.getElementById('floorDown');
    floorUp.disabled = currentFloor >= 18;
    floorDown.disabled = currentFloor <= 1;
}

function updateFloorLabel(floor) {
    const label = document.getElementById('floorLabel');
    const number = label.querySelector('.floor-label-number');
    number.textContent = String(floor).padStart(2, '0');
}

// Floor navigation buttons
document.getElementById('floorUp').addEventListener('click', () => {
    if (currentFloor < 18) {
        setFloor(currentFloor + 1);
    }
});

document.getElementById('floorDown').addEventListener('click', () => {
    if (currentFloor > 1) {
        setFloor(currentFloor - 1);
    }
});

// View flats button
document.getElementById('viewFlatsBtn').addEventListener('click', () => {
    openFloorModal();
});

// Floor Modal
function openFloorModal() {
    const modal = document.getElementById('floorModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    renderFloorPlan();
    renderFlatsList();
    updateModalTitle();
}

function closeFloorModal() {
    const modal = document.getElementById('floorModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    selectedFlat = null;
}

function updateModalTitle() {
    const isCommercial = currentFloor === 1;
    document.getElementById('modalTitle').textContent = selectedFlat 
        ? flatsData[selectedFlat]?.name 
        : `Этаж ${String(currentFloor).padStart(2, '0')}`;
    document.getElementById('modalSubtitle').textContent = isCommercial 
        ? 'Коммерческие помещения' 
        : 'Жилые квартиры';
    
    const backBtn = document.getElementById('modalBack');
    backBtn.style.display = selectedFlat ? 'block' : 'none';
}

function renderFloorPlan() {
    const container = document.getElementById('planContainer');
    const isCommercial = currentFloor === 1;
    
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', isCommercial ? '0 0 1000 450' : '0 0 433 408');
    svg.style.width = '100%';
    svg.style.height = 'auto';
    
    // Background image
    const image = document.createElementNS(svgNS, 'image');
    image.setAttribute('href', isCommercial 
        ? 'img/mise.png'
        : 'img/Floor.png');
    image.setAttribute('width', isCommercial ? '1000' : '433');
    image.setAttribute('height', isCommercial ? '450' : '408');
    image.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.appendChild(image);
    
    // Paths
    const paths = isCommercial ? commercialPaths : apartmentPaths;
    paths.forEach(({ id, d }) => {
        const flat = flatsData[id];
        if (!flat) return;
        
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', d);
        path.setAttribute('data-flat-id', id);
        
        const isSelected = selectedFlat === id;
        const isSold = flat.status === 'sold';
        
        path.setAttribute('fill', isSelected ? '#8b5cf6' : isSold ? '#ef4444' : isCommercial ? '#f59e0b' : '#6366f1');
        path.setAttribute('opacity', isSelected ? '0.7' : '0.4');
        path.setAttribute('stroke', isSelected ? '#a78bfa' : 'transparent');
        path.setAttribute('stroke-width', isSelected ? '4' : '0');
        path.style.cursor = 'pointer';
        path.style.transition = 'all 0.3s';
        
        path.addEventListener('mouseenter', () => {
            if (!isSelected) {
                path.setAttribute('opacity', '0.6');
            }
        });
        
        path.addEventListener('mouseleave', () => {
            if (!isSelected) {
                path.setAttribute('opacity', '0.4');
            }
        });
        
        path.addEventListener('click', () => {
            selectedFlat = id;
            renderFloorPlan();
            renderFlatDetails(id);
            updateModalTitle();
        });
        
        svg.appendChild(path);
    });
    
    container.innerHTML = '';
    container.appendChild(svg);
}

function renderFlatsList() {
    const sidebar = document.getElementById('modalSidebar');
    const isCommercial = currentFloor === 1;
    
    const flats = Object.entries(flatsData).filter(([id, flat]) => {
        if (isCommercial) return flat.type === 'commercial';
        return flat.type === 'apartment';
    });
    
    sidebar.innerHTML = `
        <div style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); overflow-y: auto;">
            ${flats.map(([id, flat]) => `
                <button 
                    onclick="selectFlat('${id}')"
                    style="width: 100%; text-align: left; padding: 1rem; margin-bottom: 0.75rem; background: rgba(30,41,59,0.5); border: 1px solid rgba(255,255,255,0.1); border-radius: 0.75rem; color: white; cursor: pointer; transition: all 0.3s;"
                    onmouseover="this.style.background='rgba(30,41,59,0.8)'"
                    onmouseout="this.style.background='rgba(30,41,59,0.5)'"
                >
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                        <div style="font-size: 1rem;">${flat.name}</div>
                        <span style="font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 9999px; ${flat.status === 'sold' ? 'background: rgba(239,68,68,0.2); color: #ef4444' : 'background: rgba(16,185,129,0.2); color: #10b981'}">
                            ${flat.status === 'sold' ? 'Продано' : 'Доступно'}
                        </span>
                    </div>
                    <div style="font-size: 0.875rem; color: #94a3b8;">${flat.area}</div>
                    ${flat.price ? `<div style="font-size: 1.125rem; background: linear-gradient(to right, #8b5cf6, #d946ef); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-top: 0.5rem;">${formatSum(flat.price)} сум</div>` : ''}
                </button>
            `).join('')}
        </div>
    `;
}

function selectFlat(id) {
    selectedFlat = id;
    renderFloorPlan();
    renderFlatDetails(id);
    updateModalTitle();
}

function renderFlatDetails(id) {
    const sidebar = document.getElementById('modalSidebar');
    const flat = flatsData[id];
    
    if (!flat) return;
    
    const isFavorite = favorites.includes(id);
    const isInCompare = compareList.includes(id);
    
    sidebar.innerHTML = `
        <div style="padding: 1.5rem; overflow-y: auto;">
            <h3 style="font-size: 1.5rem; color: white; margin-bottom: 1.5rem;">${flat.name}</h3>
            
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
                <div style="background: rgba(30,41,59,0.5); border-radius: 0.75rem; padding: 1rem; border: 1px solid rgba(255,255,255,0.1);">
                    <div style="font-size: 0.875rem; color: #94a3b8; margin-bottom: 0.25rem;">Площадь</div>
                    <div style="font-size: 1.25rem; color: white;">${flat.area}</div>
                </div>
                
                ${flat.rooms ? `
                <div style="background: rgba(30,41,59,0.5); border-radius: 0.75rem; padding: 1rem; border: 1px solid rgba(255,255,255,0.1);">
                    <div style="font-size: 0.875rem; color: #94a3b8; margin-bottom: 0.25rem;">Комнат</div>
                    <div style="font-size: 1.25rem; color: white;">${flat.rooms}</div>
                </div>
                ` : ''}
                
                ${flat.price ? `
                <div style="background: linear-gradient(135deg, rgba(139,92,246,0.3), rgba(217,70,239,0.3)); border-radius: 0.75rem; padding: 1rem; border: 1px solid rgba(139,92,246,0.2);">
                    <div style="font-size: 0.875rem; color: #94a3b8; margin-bottom: 0.25rem;">Цена</div>
                    <div style="font-size: 2rem; background: linear-gradient(to right, #8b5cf6, #d946ef); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 700;">${formatSum(flat.price)} сум</div>
                    <div style="font-size: 0.875rem; color: #64748b; margin-top: 0.25rem;">${Math.round(flat.price / parseFloat(flat.area) / 1000).toLocaleString('ru-RU')}K сум/м²</div>
                </div>
                ` : ''}
                
                <div style="background: rgba(30,41,59,0.5); border-radius: 0.75rem; padding: 1rem; border: 1px solid rgba(255,255,255,0.1);">
                    <div style="font-size: 0.875rem; color: #94a3b8; margin-bottom: 0.5rem;">Статус</div>
                    <span style="display: inline-block; padding: 0.5rem 1rem; border-radius: 0.5rem; font-size: 0.875rem; ${flat.status === 'sold' ? 'background: rgba(239,68,68,0.2); color: #ef4444' : 'background: rgba(16,185,129,0.2); color: #10b981'}">
                        ${flat.status === 'sold' ? 'Продано' : 'В продаже'}
                    </span>
                </div>
            </div>
            
            ${flat.status === 'available' ? `
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <button 
                    onclick="toggleFavorite('${id}')"
                    class="btn ${isFavorite ? 'btn-primary' : 'btn-secondary'}"
                    style="width: 100%;"
                >
                    ❤ ${isFavorite ? 'В избранном' : 'В избранное'}
                </button>
                
                <button 
                    onclick="toggleCompare('${id}')"
                    class="btn ${isInCompare ? 'btn-primary' : 'btn-secondary'}"
                    style="width: 100%;"
                    ${compareList.length >= 3 && !isInCompare ? 'disabled' : ''}
                >
                    📊 ${isInCompare ? 'В сравнении' : 'Сравнить'}
                </button>
                
                <button class="btn btn-primary" style="width: 100%;">
                    Забронировать квартиру
                </button>
            </div>
            ` : ''}
        </div>
    `;
}

function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(f => f !== id);
    } else {
        favorites.push(id);
    }
    renderFlatDetails(id);
}

function toggleCompare(id) {
    if (compareList.includes(id)) {
        compareList = compareList.filter(f => f !== id);
    } else if (compareList.length < 3) {
        compareList.push(id);
    }
    renderFlatDetails(id);
    updateCompareBar();
}

function updateCompareBar() {
    const compareBar = document.getElementById('compareBar');
    const compareCount = document.getElementById('compareCount');
    
    if (compareList.length > 0) {
        compareBar.style.display = 'block';
        compareCount.textContent = compareList.length;
    } else {
        compareBar.style.display = 'none';
    }
}

// Modal close handlers
document.getElementById('modalClose').addEventListener('click', closeFloorModal);
document.getElementById('modalBack').addEventListener('click', () => {
    selectedFlat = null;
    renderFloorPlan();
    renderFlatsList();
    updateModalTitle();
});

document.querySelector('.modal-overlay').addEventListener('click', closeFloorModal);

// Compare bar handlers
document.getElementById('compareClear').addEventListener('click', () => {
    compareList = [];
    updateCompareBar();
});

document.getElementById('compareBtn').addEventListener('click', () => {
    alert('Функция сравнения квартир будет доступна в ближайшее время!');
});

// Gallery
function initGallery() {
    const grid = document.getElementById('galleryGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let currentCategory = 'all';
    
    function renderGallery(category = 'all') {
        const filtered = category === 'all' 
            ? galleryImages 
            : galleryImages.filter(img => img.category === category);
        
        grid.innerHTML = filtered.map((img, index) => `
            <div class="gallery-item" onclick="openLightbox(${galleryImages.indexOf(img)})">
                <img src="${img.url}" alt="${img.title}" loading="lazy">
                <div class="gallery-overlay">
                    <div class="gallery-category">${getCategoryName(img.category)}</div>
                    <div class="gallery-title">${img.title}</div>
                </div>
                <div class="gallery-zoom">
                    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>
                    </svg>
                </div>
            </div>
        `).join('');
    }
    
    function getCategoryName(category) {
        const names = {
            'exterior': 'Экстерьер',
            'interior': 'Интерьер',
            'infrastructure': 'Инфраструктура'
        };
        return names[category] || category;
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-category');
            currentCategory = category;
            renderGallery(category);
        });
    });
    
    renderGallery();
}

// Lightbox
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    const category = document.getElementById('lightboxCategory');
    const title = document.getElementById('lightboxTitle');
    
    const image = galleryImages[index];
    img.src = image.url;
    category.textContent = getCategoryName(image.category);
    title.textContent = image.title;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function getCategoryName(category) {
    const names = {
        'exterior': 'Экстерьер',
        'interior': 'Интерьер',
        'infrastructure': 'Инфраструктура'
    };
    return names[category] || category;
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    openLightbox(currentImageIndex);
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    openLightbox(currentImageIndex);
}

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    prevImage();
});
document.querySelector('.lightbox-next').addEventListener('click', (e) => {
    e.stopPropagation();
    nextImage();
});

document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// Calculator
function initCalculator() {
    const priceSlider = document.getElementById('priceSlider');
    const initialSlider = document.getElementById('initialSlider');
    const termSlider = document.getElementById('termSlider');
    const rateSlider = document.getElementById('rateSlider');
    
    const priceValue = document.getElementById('priceValue');
    const initialValue = document.getElementById('initialValue');
    const termValue = document.getElementById('termValue');
    const rateValue = document.getElementById('rateValue');
    const initialMax = document.getElementById('initialMax');
    
    const monthlyPayment = document.getElementById('monthlyPayment');
    const totalAmount = document.getElementById('totalAmount');
    const overpayment = document.getElementById('overpayment');
    const loanAmount = document.getElementById('loanAmount');
    
    function calculate() {
        const price = parseInt(priceSlider.value);
        const initial = parseInt(initialSlider.value);
        const term = parseInt(termSlider.value);
        const rate = parseFloat(rateSlider.value);
        
        const loan = price - initial;
        const monthlyRate = rate / 12 / 100;
        const months = term * 12;
        
        let monthly = 0;
        let total = 0;
        let over = 0;
        
        if (loan > 0 && monthlyRate > 0) {
            monthly = loan * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
            total = monthly * months + initial;
            over = monthly * months - loan;
        }
        
        // Update displays
        priceValue.textContent = formatSum(price) + ' сум';
        const initialPercent = ((initial / price) * 100).toFixed(0);
        initialValue.textContent = `${formatSum(initial)} (${initialPercent}%)`;
        termValue.textContent = term + ' лет';
        rateValue.textContent = rate + '%';
        initialMax.textContent = formatSum(price);
        
        monthlyPayment.textContent = formatSum(monthly);
        totalAmount.textContent = formatSum(total) + ' сум';
        overpayment.textContent = formatSum(over) + ' сум';
        loanAmount.textContent = formatSum(loan) + ' сум';
        
        // Update initial slider max
        initialSlider.max = price;
    }
    
    priceSlider.addEventListener('input', calculate);
    initialSlider.addEventListener('input', calculate);
    termSlider.addEventListener('input', calculate);
    rateSlider.addEventListener('input', calculate);
    
    calculate();
}

// Contact Form
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show success message
    contactForm.style.display = 'none';
    formSuccess.classList.add('active');
    
    // Reset form and hide success after 3 seconds
    setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'block';
        formSuccess.classList.remove('active');
    }, 3000);
});

// Scroll to top
document.getElementById('scrollTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initFloorSelector();
    initGallery();
    initCalculator();
});
