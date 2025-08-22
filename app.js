// Internet Replacement Technologies App

// Data
const technologies = [
    {
        "id": "web3",
        "name": "Web3/Blockchain Networks",
        "category": "Decentralized",
        "maturity": 60,
        "description": "Decentralizované sítě založené na blockchain technologii",
        "features": ["Decentralizace", "Kryptografická bezpečnost", "Transparentnost", "Smart contracts"],
        "pros": ["Odolnost proti cenzuře", "Transparentnost", "Globální dostupnost"],
        "cons": ["Energetická náročnost", "Pomalé transakce", "Složitost"],
        "examples": ["Ethereum", "Polkadot", "Solana"],
        "timeline": "2025-2030"
    },
    {
        "id": "quantum",
        "name": "Kvantový Internet",
        "category": "Futuristic",
        "maturity": 15,
        "description": "Internet využívající kvantovou mechaniku pro ultra-bezpečnou komunikaci",
        "features": ["Kvantová kryptografie", "Kvantová teleportace", "Nepřekonatelná bezpečnost"],
        "pros": ["Absolutní bezpečnost", "Extrémní rychlost", "Kvantové výpočty"],
        "cons": ["Velmi složité", "Vysoké náklady", "Experimentální stádium"],
        "examples": ["Kvantová distribuce klíčů", "Kvantové opakovače"],
        "timeline": "2030-2040"
    },
    {
        "id": "ipfs",
        "name": "IPFS",
        "category": "Decentralized",
        "maturity": 70,
        "description": "InterPlanetary File System - peer-to-peer protokol pro sdílení souborů",
        "features": ["Peer-to-peer", "Adresování podle obsahu", "Deduplikace", "Verze souborů"],
        "pros": ["Odolnost proti cenzuře", "Efektivní distribuce", "Historické verze"],
        "cons": ["Závislost na uzlech", "Komplexita pro běžné uživatele"],
        "examples": ["IPFS protokol", "Filecoin", "Brave browser"],
        "timeline": "Již dostupné"
    },
    {
        "id": "mesh",
        "name": "Mesh Networks",
        "category": "Decentralized",
        "maturity": 50,
        "description": "Sítě kde každý uzel funguje jako router a opakovač",
        "features": ["Plná decentralizace", "Automatické přesměrování", "Odolnost proti výpadkům"],
        "pros": ["Odolnost", "Lokální konektivita", "Nižší náklady"],
        "cons": ["Omezená rychlost", "Komplexita správy", "Pokrytí"],
        "examples": ["Freifunk", "NYC Mesh", "Disaster.radio"],
        "timeline": "2025-2030"
    },
    {
        "id": "satellite",
        "name": "Satelitní Internet",
        "category": "Infrastructure",
        "maturity": 80,
        "description": "Internet poskytovaný prostřednictvím satelitů na nízké oběžné dráze",
        "features": ["Globální pokrytí", "Vysoká rychlost", "Nízká latence"],
        "pros": ["Globální dostupnost", "Vysoké rychlosti", "Nezávislost na infrastruktuře"],
        "cons": ["Vysoké náklady", "Závislost na počasí", "Centralizace"],
        "examples": ["Starlink", "Project Kuiper", "OneWeb"],
        "timeline": "Již dostupné"
    },
    {
        "id": "holochain",
        "name": "Holochain",
        "category": "Decentralized",
        "maturity": 40,
        "description": "Agent-centrický framework pro decentralizované aplikace",
        "features": ["Agent-centrický", "Škálovatelnost", "Energetická efektivnost"],
        "pros": ["Vysoká škálovatelnost", "Nízká spotřeba energie", "Flexibilita"],
        "cons": ["Nová technologie", "Malá komunita", "Nedostatečné testování"],
        "examples": ["Holochain protokol", "Holo hosting", "Acorn"],
        "timeline": "2025-2030"
    },
    {
        "id": "solid",
        "name": "SOLID Protocol",
        "category": "Decentralized",
        "maturity": 45,
        "description": "Protokol pro decentralizované webové aplikace od Tima Berners-Lee",
        "features": ["Oddělení dat od aplikací", "Uživatelská kontrola", "Interoperabilita"],
        "pros": ["Kontrola nad daty", "Standardizace", "Flexibilita"],
        "cons": ["Komplexnost", "Pomalá adopce", "Potřeba nové infrastruktury"],
        "examples": ["Solid pods", "Inrupt", "Solid aplikace"],
        "timeline": "2025-2030"
    },
    {
        "id": "lifi",
        "name": "Li-Fi Technology",
        "category": "Wireless",
        "maturity": 25,
        "description": "Bezdrátová komunikace pomocí viditelného světla",
        "features": ["Komunikace světlem", "Vysoká rychlost", "Lepší bezpečnost"],
        "pros": ["Vysoké rychlosti", "Bezpečnost", "Energetická efektivnost"],
        "cons": ["Omezený dosah", "Potřeba přímé viditelnosti", "Experimentální"],
        "examples": ["pureLiFi", "Oledcomm", "Signify"],
        "timeline": "2030-2035"
    },
    {
        "id": "omnisflow",
        "name": "OmnisFlow/Omnis Core",
        "category": "Experimental",
        "maturity": 10,
        "description": "Český projekt propojující lidské vědomí, AI a decentralizované sítě",
        "features": ["Digitální vědomí", "AI integrace", "Síť Prout", "Etické zabezpečení"],
        "pros": ["Inovativní přístup", "Etické zaměření", "Holistické řešení"],
        "cons": ["Velmi experimentální", "Složité koncepty", "Nejistá budoucnost"],
        "examples": ["Omnis Core", "Síť Prout", "OmnisToken"],
        "timeline": "Experimentální"
    }
];

// Global variables
let selectedTechnologies = [];
let filteredTechnologies = [...technologies];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    renderTechnologies();
    setupFilters();
    setupModal();
    setupComparison();
    console.log('App initialized successfully');
}

// Navigation
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');
    
    console.log('Setting up navigation...', navButtons.length, 'buttons found');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.dataset.section;
            console.log('Navigation clicked:', targetSection);
            switchSection(targetSection);
        });
    });
}

function switchSection(sectionId) {
    console.log('Switching to section:', sectionId);
    
    // Update navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));
    const activeButton = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Update sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('Section switched successfully');
    } else {
        console.error('Target section not found:', sectionId);
    }
}

// Technology rendering
function renderTechnologies() {
    const technologiesGrid = document.getElementById('technologies-grid');
    if (!technologiesGrid) {
        console.error('Technologies grid not found');
        return;
    }
    
    console.log('Rendering technologies...', filteredTechnologies.length, 'technologies');
    technologiesGrid.innerHTML = '';
    
    filteredTechnologies.forEach(tech => {
        const card = createTechnologyCard(tech);
        technologiesGrid.appendChild(card);
    });
}

function createTechnologyCard(tech) {
    const card = document.createElement('div');
    card.className = 'tech-card';
    card.dataset.techId = tech.id;
    
    card.innerHTML = `
        <div class="tech-card-header">
            <div>
                <h3>${tech.name}</h3>
                <span class="tech-category">${tech.category}</span>
            </div>
            <input type="checkbox" class="comparison-checkbox" data-tech-id="${tech.id}">
        </div>
        <p class="tech-description">${tech.description}</p>
        <div class="maturity-section">
            <div class="maturity-label">
                <span>Vyspělost</span>
                <span>${tech.maturity}%</span>
            </div>
            <div class="maturity-bar">
                <div class="maturity-progress" style="width: ${tech.maturity}%"></div>
            </div>
        </div>
        <div class="tech-timeline">
            <strong>Časový rámec:</strong> ${tech.timeline}
        </div>
    `;
    
    // Add click event for modal
    card.addEventListener('click', function(e) {
        if (e.target.type !== 'checkbox') {
            e.preventDefault();
            console.log('Technology card clicked:', tech.name);
            showTechnologyModal(tech);
        }
    });
    
    // Add checkbox event
    const checkbox = card.querySelector('.comparison-checkbox');
    checkbox.addEventListener('change', function(e) {
        e.stopPropagation();
        console.log('Checkbox changed:', tech.id, this.checked);
        handleComparisonToggle(tech.id, this.checked);
    });
    
    return card;
}

// Filters
function setupFilters() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    
    if (!searchInput || !categoryFilter) {
        console.error('Filter elements not found');
        return;
    }
    
    console.log('Setting up filters...');
    
    searchInput.addEventListener('input', function() {
        console.log('Search input changed:', this.value);
        applyFilters();
    });
    
    categoryFilter.addEventListener('change', function() {
        console.log('Category filter changed:', this.value);
        applyFilters();
    });
}

function applyFilters() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    
    if (!searchInput || !categoryFilter) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    
    console.log('Applying filters:', searchTerm, selectedCategory);
    
    filteredTechnologies = technologies.filter(tech => {
        const matchesSearch = tech.name.toLowerCase().includes(searchTerm) ||
                            tech.description.toLowerCase().includes(searchTerm) ||
                            tech.features.some(feature => feature.toLowerCase().includes(searchTerm));
        
        const matchesCategory = !selectedCategory || tech.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    console.log('Filtered technologies:', filteredTechnologies.length);
    renderTechnologies();
}

// Modal
function setupModal() {
    const modal = document.getElementById('tech-modal');
    const modalClose = document.getElementById('modal-close');
    
    if (!modal || !modalClose) {
        console.error('Modal elements not found');
        return;
    }
    
    console.log('Setting up modal...');
    
    modalClose.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function showTechnologyModal(tech) {
    const modal = document.getElementById('tech-modal');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalBody) {
        console.error('Modal elements not found');
        return;
    }
    
    console.log('Showing modal for:', tech.name);
    
    modalBody.innerHTML = `
        <div class="modal-header">
            <div>
                <h2 class="modal-tech-name">${tech.name}</h2>
                <span class="modal-tech-category">${tech.category}</span>
            </div>
        </div>
        
        <div class="modal-section">
            <p>${tech.description}</p>
        </div>
        
        <div class="modal-section">
            <div class="maturity-section">
                <div class="maturity-label">
                    <span><strong>Současná vyspělost</strong></span>
                    <span>${tech.maturity}%</span>
                </div>
                <div class="maturity-bar">
                    <div class="maturity-progress" style="width: ${tech.maturity}%"></div>
                </div>
            </div>
        </div>
        
        <div class="modal-section">
            <h4>Klíčové vlastnosti</h4>
            <ul>
                ${tech.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h4>Výhody a nevýhody</h4>
            <div class="pros-cons-grid">
                <div>
                    <h5>Výhody</h5>
                    <ul class="pros-list">
                        ${tech.pros.map(pro => `<li>${pro}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h5>Nevýhody</h5>
                    <ul class="cons-list">
                        ${tech.cons.map(con => `<li>${con}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="modal-section">
            <h4>Příklady implementací</h4>
            <ul>
                ${tech.examples.map(example => `<li>${example}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h4>Časový rámec adopce</h4>
            <p><strong>${tech.timeline}</strong></p>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('tech-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('Modal closed');
    }
}

// Comparison
function setupComparison() {
    console.log('Setting up comparison...');
    renderComparisonCheckboxes();
    updateComparisonTable();
}

function renderComparisonCheckboxes() {
    const comparisonCheckboxes = document.getElementById('comparison-checkboxes');
    if (!comparisonCheckboxes) {
        console.error('Comparison checkboxes container not found');
        return;
    }
    
    comparisonCheckboxes.innerHTML = '';
    
    technologies.forEach(tech => {
        const item = document.createElement('div');
        item.className = 'comparison-checkbox-item';
        
        item.innerHTML = `
            <input type="checkbox" id="comp-${tech.id}" data-tech-id="${tech.id}">
            <label for="comp-${tech.id}">${tech.name}</label>
        `;
        
        const checkbox = item.querySelector('input');
        checkbox.addEventListener('change', function() {
            console.log('Comparison checkbox changed:', tech.id, this.checked);
            handleComparisonToggle(tech.id, this.checked);
        });
        
        comparisonCheckboxes.appendChild(item);
    });
}

function handleComparisonToggle(techId, isChecked) {
    if (isChecked) {
        if (!selectedTechnologies.includes(techId)) {
            selectedTechnologies.push(techId);
        }
    } else {
        selectedTechnologies = selectedTechnologies.filter(id => id !== techId);
    }
    
    console.log('Selected technologies:', selectedTechnologies);
    
    // Update all checkboxes
    updateAllCheckboxes();
    
    // Update comparison table
    updateComparisonTable();
}

function updateAllCheckboxes() {
    // Update technology card checkboxes
    document.querySelectorAll('.comparison-checkbox').forEach(checkbox => {
        const techId = checkbox.dataset.techId;
        checkbox.checked = selectedTechnologies.includes(techId);
    });
    
    // Update comparison section checkboxes
    document.querySelectorAll('#comparison-checkboxes input').forEach(checkbox => {
        const techId = checkbox.dataset.techId;
        checkbox.checked = selectedTechnologies.includes(techId);
    });
}

function updateComparisonTable() {
    const comparisonTable = document.getElementById('comparison-table');
    if (!comparisonTable) {
        console.error('Comparison table not found');
        return;
    }
    
    if (selectedTechnologies.length === 0) {
        comparisonTable.innerHTML = `
            <thead>
                <tr>
                    <th>Charakteristika</th>
                    <th>Vyberte technologie pro srovnání</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="2">Zaškrtněte technologie v sekci "Technologie" nebo výše pro jejich srovnání.</td>
                </tr>
            </tbody>
        `;
        return;
    }
    
    const selectedTechs = selectedTechnologies.map(id => 
        technologies.find(tech => tech.id === id)
    ).filter(tech => tech !== undefined);
    
    console.log('Updating comparison table with:', selectedTechs.length, 'technologies');
    
    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Charakteristika</th>
        ${selectedTechs.map(tech => `<th>${tech.name}</th>`).join('')}
    `;
    thead.appendChild(headerRow);
    
    // Create table body
    const rows = [
        {
            label: 'Kategorie',
            getValue: tech => tech.category
        },
        {
            label: 'Vyspělost',
            getValue: tech => `${tech.maturity}%`
        },
        {
            label: 'Popis',
            getValue: tech => tech.description
        },
        {
            label: 'Klíčové vlastnosti',
            getValue: tech => tech.features.join(', ')
        },
        {
            label: 'Hlavní výhody',
            getValue: tech => tech.pros.join(', ')
        },
        {
            label: 'Hlavní nevýhody',
            getValue: tech => tech.cons.join(', ')
        },
        {
            label: 'Příklady',
            getValue: tech => tech.examples.join(', ')
        },
        {
            label: 'Časový rámec',
            getValue: tech => tech.timeline
        }
    ];
    
    const tbody = document.createElement('tbody');
    rows.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${row.label}</strong></td>
            ${selectedTechs.map(tech => `<td>${row.getValue(tech)}</td>`).join('')}
        `;
        tbody.appendChild(tr);
    });
    
    comparisonTable.innerHTML = '';
    comparisonTable.appendChild(thead);
    comparisonTable.appendChild(tbody);
}