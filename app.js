// Структура городов с slug-ключами для чистых URL
const CITIES = {
    'new-york': { label: 'New York', tz: 'America/New_York' },
    'los-angeles': { label: 'Los Angeles', tz: 'America/Los_Angeles' },
    'chicago': { label: 'Chicago', tz: 'America/Chicago' },
    'london': { label: 'London', tz: 'Europe/London' },
    'paris': { label: 'Paris', tz: 'Europe/Paris' },
    'berlin': { label: 'Berlin', tz: 'Europe/Berlin' },
    'tokyo': { label: 'Tokyo', tz: 'Asia/Tokyo' },
    'singapore': { label: 'Singapore', tz: 'Asia/Singapore' },
    'sydney': { label: 'Sydney', tz: 'Australia/Sydney' },
    'dubai': { label: 'Dubai', tz: 'Asia/Dubai' },
    'hong-kong': { label: 'Hong Kong', tz: 'Asia/Hong_Kong' },
    'mumbai': { label: 'Mumbai', tz: 'Asia/Kolkata' },
    'toronto': { label: 'Toronto', tz: 'America/Toronto' },
    'san-francisco': { label: 'San Francisco', tz: 'America/Los_Angeles' },
    'amsterdam': { label: 'Amsterdam', tz: 'Europe/Amsterdam' },
    'madrid': { label: 'Madrid', tz: 'Europe/Madrid' },
    'rome': { label: 'Rome', tz: 'Europe/Rome' },
    'stockholm': { label: 'Stockholm', tz: 'Europe/Stockholm' },
    'copenhagen': { label: 'Copenhagen', tz: 'Europe/Copenhagen' },
    'vienna': { label: 'Vienna', tz: 'Europe/Vienna' },
    'warsaw': { label: 'Warsaw', tz: 'Europe/Warsaw' },
    'prague': { label: 'Prague', tz: 'Europe/Prague' },
    'athens': { label: 'Athens', tz: 'Europe/Athens' },
    'istanbul': { label: 'Istanbul', tz: 'Europe/Istanbul' },
    'moscow': { label: 'Moscow', tz: 'Europe/Moscow' },
    'shanghai': { label: 'Shanghai', tz: 'Asia/Shanghai' },
    'beijing': { label: 'Beijing', tz: 'Asia/Shanghai' },
    'seoul': { label: 'Seoul', tz: 'Asia/Seoul' },
    'bangkok': { label: 'Bangkok', tz: 'Asia/Bangkok' },
    'kuala-lumpur': { label: 'Kuala Lumpur', tz: 'Asia/Kuala_Lumpur' },
    'jakarta': { label: 'Jakarta', tz: 'Asia/Jakarta' },
    'manila': { label: 'Manila', tz: 'Asia/Manila' },
    'melbourne': { label: 'Melbourne', tz: 'Australia/Melbourne' },
    'auckland': { label: 'Auckland', tz: 'Pacific/Auckland' },
    'sao-paulo': { label: 'São Paulo', tz: 'America/Sao_Paulo' },
    'mexico-city': { label: 'Mexico City', tz: 'America/Mexico_City' },
    'buenos-aires': { label: 'Buenos Aires', tz: 'America/Argentina/Buenos_Aires' },
    'bogota': { label: 'Bogotá', tz: 'America/Bogota' },
    'lima': { label: 'Lima', tz: 'America/Lima' },
    'santiago': { label: 'Santiago', tz: 'America/Santiago' },
    'vancouver': { label: 'Vancouver', tz: 'America/Vancouver' },
    'seattle': { label: 'Seattle', tz: 'America/Los_Angeles' },
    'denver': { label: 'Denver', tz: 'America/Denver' },
    'boston': { label: 'Boston', tz: 'America/New_York' },
    'miami': { label: 'Miami', tz: 'America/New_York' },
    'atlanta': { label: 'Atlanta', tz: 'America/New_York' },
    'dallas': { label: 'Dallas', tz: 'America/Chicago' },
    'phoenix': { label: 'Phoenix', tz: 'America/Phoenix' },
    'dublin': { label: 'Dublin', tz: 'Europe/Dublin' },
    'edinburgh': { label: 'Edinburgh', tz: 'Europe/London' },
    'zurich': { label: 'Zurich', tz: 'Europe/Zurich' },
    'geneva': { label: 'Geneva', tz: 'Europe/Zurich' },
    'brussels': { label: 'Brussels', tz: 'Europe/Brussels' },
    'lisbon': { label: 'Lisbon', tz: 'Europe/Lisbon' },
    'barcelona': { label: 'Barcelona', tz: 'Europe/Madrid' },
    'milan': { label: 'Milan', tz: 'Europe/Rome' },
    'munich': { label: 'Munich', tz: 'Europe/Berlin' },
    'frankfurt': { label: 'Frankfurt', tz: 'Europe/Berlin' },
    'tel-aviv': { label: 'Tel Aviv', tz: 'Asia/Jerusalem' },
    'cairo': { label: 'Cairo', tz: 'Africa/Cairo' },
    'nairobi': { label: 'Nairobi', tz: 'Africa/Nairobi' },
    'johannesburg': { label: 'Johannesburg', tz: 'Africa/Johannesburg' },
    'bangalore': { label: 'Bangalore', tz: 'Asia/Kolkata' },
    'delhi': { label: 'Delhi', tz: 'Asia/Kolkata' },
    'karachi': { label: 'Karachi', tz: 'Asia/Karachi' },
    'dhaka': { label: 'Dhaka', tz: 'Asia/Dhaka' },
    'ho-chi-minh': { label: 'Ho Chi Minh City', tz: 'Asia/Ho_Chi_Minh' },
    'hanoi': { label: 'Hanoi', tz: 'Asia/Ho_Chi_Minh' },
    'taipei': { label: 'Taipei', tz: 'Asia/Taipei' },
    'perth': { label: 'Perth', tz: 'Australia/Perth' },
    'brisbane': { label: 'Brisbane', tz: 'Australia/Brisbane' },
    'wellington': { label: 'Wellington', tz: 'Pacific/Auckland' }
};

let selectedCities = [];
let myCity = '';

const MAX_CITIES = 5;

// Инициализация при загрузке страницы
function init() {
    populateSelects();
    loadFromURL();
    setupEventListeners();
    updateCityLimitUI();
}

// Заполнить селекты городами
function populateSelects() {
    const sortedCities = Object.keys(CITIES).sort((a, b) => 
        CITIES[a].label.localeCompare(CITIES[b].label)
    );
    
    const mySelect = document.getElementById('myCity');
    const otherSelect = document.getElementById('otherCity');
    
    sortedCities.forEach(slug => {
        const city = CITIES[slug];
        mySelect.innerHTML += `<option value="${slug}">${city.label}</option>`;
        otherSelect.innerHTML += `<option value="${slug}">${city.label}</option>`;
    });
}

// Настроить обработчики событий
function setupEventListeners() {
    document.getElementById('myCity').addEventListener('change', (e) => {
        myCity = e.target.value;
        calculate();
        updateCityLimitUI();
    });
    
    document.getElementById('addCity').addEventListener('click', (e) => {
        e.preventDefault();

        if (selectedCities.length >= MAX_CITIES) {
            updateCityLimitUI(true);
            return;
        }

        const select = document.getElementById('otherCity');
        const citySlug = select.value;
        
        if (citySlug && !selectedCities.includes(citySlug) && citySlug !== myCity) {
            selectedCities.push(citySlug);
            renderCityTags();
            calculate();
            updateCityLimitUI();
            select.value = '';
        }
    });
    
    document.getElementById('shareBtn').addEventListener('click', copyShareLink);
}

// UI: лимит городов
function updateCityLimitUI(forceError = false) {
    const hint = document.getElementById('limitHint');
    const addBtn = document.getElementById('addCity');

    const left = MAX_CITIES - selectedCities.length;

    if (forceError || left <= 0) {
        hint.textContent = `Limit reached: you can add up to ${MAX_CITIES} locations.`;
        hint.classList.add('error');
        addBtn.disabled = true;
        return;
    }

    hint.textContent = `You can add up to ${MAX_CITIES} locations. Remaining: ${left}.`;
    hint.classList.remove('error');
    addBtn.disabled = false;
}

// Отобразить теги выбранных городов
function renderCityTags() {
    const container = document.getElementById('cityTags');
    container.innerHTML = selectedCities.map(slug => `
        <div class="city-tag">
            ${CITIES[slug].label}
            <button type="button" onclick="removeCity('${slug}')" aria-label="Remove ${CITIES[slug].label}">×</button>
        </div>
    `).join('');
}

// Удалить город из списка
function removeCity(slug) {
    selectedCities = selectedCities.filter(c => c !== slug);
    renderCityTags();
    calculate();
    updateCityLimitUI();
}

// Главная функция расчёта
function calculate() {
    if (!myCity || selectedCities.length === 0) {
        document.getElementById('results').classList.add('hidden');
        return;
    }
    
    updateURL();
    displayCurrentTimes();
    findOverlap();
    updateSEOText();
    updateTitle();
    
    document.getElementById('results').classList.remove('hidden');
}

// Отобразить текущее время во всех городах
function displayCurrentTimes() {
    const allCities = [myCity, ...selectedCities];
    const now = new Date();
    
    const html = allCities.map(slug => {
        const city = CITIES[slug];
        const time = new Intl.DateTimeFormat('en-US', {
            timeZone: city.tz,
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            weekday: 'short'
        }).format(now);
        
        return `
            <div class="time-row">
                <span class="city-name">${city.label}</span>
                <span class="city-time">${time}</span>
            </div>
        `;
    }).join('');
    
    document.getElementById('timeDisplay').innerHTML = html;
}

// Найти пересечение рабочих часов
function findOverlap() {
    const allCities = [myCity, ...selectedCities];
    const now = new Date();
    
    // ✅ Округление ВВЕРХ до ближайших 30 минут (ceil),
    // чтобы стартовый слот не попадал в прошлое.
    const roundedNow = new Date(now);
    const minutes = roundedNow.getMinutes();

    if (minutes === 0 || minutes === 30) {
        // уже на границе, оставляем как есть
    } else if (minutes < 30) {
        roundedNow.setMinutes(30, 0, 0);
    } else {
        // minutes > 30 -> прыгаем на следующий час
        roundedNow.setHours(roundedNow.getHours() + 1, 0, 0, 0);
    }

    roundedNow.setSeconds(0);
    roundedNow.setMilliseconds(0);
    
    // Создать 48 слотов по 30 минут (покрытие 24 часов)
    const slots = Array(48).fill(0).map((_, i) => {
        const slotTime = new Date(roundedNow);
        slotTime.setMinutes(slotTime.getMinutes() + (i * 30));
        
        const isWorkingForAll = allCities.every(slug => {
            const city = CITIES[slug];
            const hour = parseInt(new Intl.DateTimeFormat('en-US', {
                timeZone: city.tz,
                hour: 'numeric',
                hour12: false
            }).format(slotTime));
            
            // Рабочие часы: 8:00 - 18:00
            return hour >= 8 && hour < 18;
        });
        
        return { time: slotTime, working: isWorkingForAll, index: i };
    });
    
    // Найти непрерывные интервалы
    const intervals = [];
    let start = null;
    
    slots.forEach((slot, i) => {
        if (slot.working && start === null) {
            start = i;
        } else if (!slot.working && start !== null) {
            const endIndex = i - 1;

            intervals.push({ 
                start, 
                end: endIndex,
                startTime: slots[start].time,
                // ✅ endTime = конец окна: (end slot + 30 минут)
                endTime: addMinutes(slots[endIndex].time, 30),
                length: i - start // кол-во слотов
            });
            start = null;
        }
    });
    
    // Не забыть последний интервал
    if (start !== null) {
        const endIndex = slots.length - 1;

        intervals.push({ 
            start, 
            end: endIndex,
            startTime: slots[start].time,
            // ✅ endTime = конец окна: (end slot + 30 минут)
            endTime: addMinutes(slots[endIndex].time, 30),
            length: slots.length - start
        });
    }
    
    displayOverlap(intervals, roundedNow);
}

// маленький хелпер без изменения архитектуры
function addMinutes(dateObj, minutesToAdd) {
    const d = new Date(dateObj);
    d.setMinutes(d.getMinutes() + minutesToAdd);
    return d;
}

// Отобразить результат пересечения
function displayOverlap(intervals, currentTime) {
    const container = document.getElementById('overlapResult');
    
    if (intervals.length === 0) {
        container.innerHTML = `
            <div class="overlap-box no-overlap">
                <strong>⚠️ No overlapping working hours found</strong>
                <div>Consider scheduling outside standard 9-5 hours, or choose a different day when time zones align better.</div>
            </div>
        `;
        return;
    }
    
    // Выбрать лучший интервал (ближайший будущий или самый длинный)
    let bestInterval = null;
    const currentTimestamp = currentTime.getTime();
    
    // Сначала ищем ближайший будущий интервал
    for (const interval of intervals) {
        if (interval.startTime.getTime() >= currentTimestamp) {
            bestInterval = interval;
            break;
        }
    }
    
    // Если все интервалы в прошлом, берём самый длинный
    if (!bestInterval) {
        bestInterval = intervals.reduce((longest, current) => 
            current.length > longest.length ? current : longest
        );
    }
    
    const allCities = [myCity, ...selectedCities];
    const timesHtml = allCities.map(slug => {
        const city = CITIES[slug];

        const start = new Intl.DateTimeFormat('en-US', {
            timeZone: city.tz,
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).format(bestInterval.startTime);
        
        // ✅ endTime уже правильный (end slot + 30 минут)
        const end = new Intl.DateTimeFormat('en-US', {
            timeZone: city.tz,
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).format(bestInterval.endTime);
        
        return `<div>${city.label}: ${start} - ${end}</div>`;
    }).join('');
    
    const duration = bestInterval.length * 30; // минуты
    const hours = Math.floor(duration / 60);
    const mins = duration % 60;
    const durationText = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    
    container.innerHTML = `
        <div class="overlap-box">
            <strong>✅ Best Meeting Window (${durationText} overlap)</strong>
            ${timesHtml}
        </div>
    `;
}

// Обновить URL с параметрами
function updateURL() {
    const params = new URLSearchParams();
    params.set('from', myCity);
    params.set('to', selectedCities.join(','));
    
    const newURL = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newURL);
}

// Загрузить данные из URL
function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    const from = params.get('from');
    const to = params.get('to');
    
    if (from && CITIES[from]) {
        myCity = from;
        document.getElementById('myCity').value = from;
    }
    
    if (to) {
        selectedCities = to
            .split(',')
            .filter(slug => CITIES[slug])
            .slice(0, MAX_CITIES); // ✅ лимит на URL тоже

        renderCityTags();
    }
    
    if (myCity && selectedCities.length > 0) {
        calculate();
    }
}

// Скопировать ссылку для шеринга
function copyShareLink() {
    const url = window.location.href;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            showCopyFeedback();
        }).catch(() => {
            fallbackCopyToClipboard(url);
        });
    } else {
        fallbackCopyToClipboard(url);
    }
}

// Показать feedback после копирования
function showCopyFeedback() {
    const btn = document.getElementById('shareBtn');
    const original = btn.textContent;
    btn.textContent = '✓ Link Copied!';
    btn.style.background = '#4caf50';
    btn.style.borderColor = '#4caf50';
    btn.style.color = 'white';
    
    setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
    }, 2000);
}

// Fallback для старых браузеров
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback();
    } catch (err) {
        alert('Please copy the URL manually: ' + text);
    }
    
    document.body.removeChild(textArea);
}

// Обновить SEO текст
function updateSEOText() {
    const allCities = [myCity, ...selectedCities].map(slug => CITIES[slug].label);
    
    if (allCities.length > 1) {
        const text = `Finding the best time to schedule a meeting between ${allCities.join(', ')} requires understanding time zone differences and working hours. This tool automatically calculates overlapping business hours (8 AM - 6 PM) across all locations to help you find the optimal meeting time. No signup or installation required.`;
        document.getElementById('seoText').textContent = text;
    }
}

// Обновить title страницы
function updateTitle() {
    if (myCity && selectedCities.length > 0) {
        const allCities = [myCity, ...selectedCities].map(slug => CITIES[slug].label);
        document.title = `Best Meeting Time: ${allCities.join(' ↔ ')} | Meeting Time Finder`;
    }
}

// Запуск при загрузке
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}