// Unified Custom Constructor & Standard Sheets Calculator

(function () {
    // 1. Data & State Initialization
    const SHARED_ADDITIONS = [
        { id: "win_lux_50_50_p", name: "Окно ПВХ ЛЮКС 50х50 поворотное", price: 5500, type: "quantity", quantity: 0 },
        { id: "win_lux_50_50_po2", name: "Окно ПВХ ЛЮКС 50х50 (2 камеры) поворотно-откидное", price: 8500, type: "quantity", quantity: 0 },
        { id: "win_lux_60_90_po", name: "Окно ПВХ ЛЮКС 60х90 поворотно-откидное", price: 7500, type: "quantity", quantity: 0 },
        { id: "win_lux_60_120_po", name: "Окно ПВХ ЛЮКС 60х120 поворотно-откидное", price: 10000, type: "quantity", quantity: 0 },
        { id: "win_lux_60_180_po", name: "Окно ПВХ ЛЮКС 60х180 поворотно-откидное", price: 12000, type: "quantity", quantity: 0 },
        { id: "win_lux_100_100_po", name: "Окно ПВХ ЛЮКС 100х100 поворотно-откидное", price: 9000, type: "quantity", quantity: 0 },
        { id: "win_lux_100_120_po1", name: "Окно ПВХ ЛЮКС 100х120 (1 камера) поворотно-откидное", price: 11000, type: "quantity", quantity: 0 },
        { id: "win_lux_100_120_po2", name: "Окно ПВХ ЛЮКС 100х120 (2 камеры) поворотно-откидное", price: 14000, type: "quantity", quantity: 0 },
        { id: "win_lux_120_120_po", name: "Окно ПВХ ЛЮКС 120х120 поворотно-откидное", price: 13000, type: "quantity", quantity: 0 },
        { id: "win_lux_100_140_po", name: "Окно ПВХ ЛЮКС 100х140 поворотно-откидное", price: 14000, type: "quantity", quantity: 0 },
        { id: "win_lux_100_150_po", name: "Окно ПВХ ЛЮКС 100х150 поворотно-откидное", price: 15000, type: "quantity", quantity: 0 },
        { id: "win_lux_120_150_po", name: "Окно ПВХ ЛЮКС 120х150 поворотно-откидное", price: 16500, type: "quantity", quantity: 0 },
        { id: "win_lux_140_150_po", name: "Окно ПВХ ЛЮКС 140х150 поворотно-откидное", price: 17000, type: "quantity", quantity: 0 },
        { id: "win_lux_150_150_po", name: "Окно ПВХ ЛЮКС 150х150 поворотно-откидное", price: 17500, type: "quantity", quantity: 0 },
        { id: "win_lux_150_100_po", name: "Окно ПВХ ЛЮКС 150х100 поворотно-откидное", price: 18000, type: "quantity", quantity: 0 },
        { id: "win_lux_150_190_po", name: "Окно ПВХ ЛЮКС 150х190 поворотно-откидное", price: 25000, type: "quantity", quantity: 0 },
        { id: "win_lux_180_190_po", name: "Окно ПВХ ЛЮКС 180х190 поворотно-откидное", price: 26000, type: "quantity", quantity: 0 },
        { id: "win_lux_180_200_po", name: "Окно ПВХ ЛЮКС 180х200 поворотно-откидное", price: 30000, type: "quantity", quantity: 0 },

        { id: "pile_76_1500", name: "Свая винтовая 76/1500", price: 3550, type: "quantity", quantity: 0 },
        { id: "pile_76_2000", name: "Свая винтовая 76/2000", price: 3700, type: "quantity", quantity: 0 },
        { id: "pile_76_2500", name: "Свая винтовая 76/2500", price: 4000, type: "quantity", quantity: 0 },
        { id: "pile_76_3000", name: "Свая винтовая 76/3000", price: 4300, type: "quantity", quantity: 0 },
        { id: "pile_89_2000", name: "Свая винтовая 89/2000", price: 3900, type: "quantity", quantity: 0 },
        { id: "pile_89_2500", name: "Свая винтовая 89/2500", price: 4200, type: "quantity", quantity: 0 },
        { id: "pile_89_3000", name: "Свая винтовая 89/3000", price: 4600, type: "quantity", quantity: 0 },
        { id: "pile_108_2000", name: "Свая винтовая 108/2000", price: 4700, type: "quantity", quantity: 0 },
        { id: "pile_108_2500", name: "Свая винтовая 108/2500", price: 5100, type: "quantity", quantity: 0 },
        { id: "pile_108_3000", name: "Свая винтовая 108/3000", price: 5600, type: "quantity", quantity: 0 },
        { id: "pile_delivery_60", name: "Доставка свай (60 р/км)", price: 60, type: "area", quantity: 0 },

        { id: "profile_harness", name: "Обвязка профилем 20х40 одной линией (периметр * 450 р)", price: 450, type: "area", quantity: 0 },

        { id: "roof_metal", name: "Кровля: Металлочерепица (+1500 р/м²)", price: 1500, type: "area", quantity: 0 },
        { id: "roof_proflist", name: "Кровля: Профлист С8 цветной (+750 р/м²)", price: 750, type: "area", quantity: 0 },
        { id: "frame_upgrade", name: "Замена каркаса 50/100 на 50/150 без утепления (+2000 р/м²)", price: 2000, type: "area", quantity: 0 },
        { id: "vent_gap", name: "Вентзазор (периметр * 2000 р)", price: 2000, type: "area", quantity: 0 },
        { id: "roof_overhangs", name: "Свесы на кровле до 30 см (периметр * 1200 р)", price: 1200, type: "area", quantity: 0 },

        { id: "generator_daily", name: "Генератор (сутки)", price: 2500, type: "quantity", quantity: 0 },
        { id: "material_carry", name: "Пронос материала свыше 20 м (за каждые 10 м)", price: 5000, type: "quantity", quantity: 0 },
        { id: "long_ladder", name: "Лестница на всю длину", price: 20000, type: "quantity", quantity: 0 }
    ];

    let activeConfig = [];
    let customRates = {
        rate_house_high: 12500,
        rate_house_low_osb: 9500,
        rate_house_low_lining: 10000,
        rate_cabin: 8000,
        rate_hozblok: 5500,
        rate_veranda: 7500,
        rate_ext_imitation: 250,
        rate_ext_blockhouse: 1000,
        rate_ext_proflist: 300,
        rate_ext_osb: 300,
        rate_int_osb: 300,
        rate_int_lining: 400,
        rate_int_mdf: 500,
        rate_int_pvc: 500,
        rate_ins_100: 550,
        rate_ins_150: 1000,
        rate_ins_200: 1500,
        rate_floor_osb12: 500,
        rate_floor_osb18: 700,
        rate_floor_tongue28: 1000,
        rate_floor_tongue36: 1250,
        rate_assembly: 1000,
        delivery_base_dist: 50,
        delivery_base_price: 12000,
        delivery_price_km: 200
    };
    
    function loadConfig() {
        const localData = localStorage.getItem('mobistroy_config');
        if (localData) {
            try {
                activeConfig = JSON.parse(localData);
            } catch (e) {
                activeConfig = JSON.parse(JSON.stringify(window.DEFAULT_CONFIG));
            }
        } else {
            activeConfig = JSON.parse(JSON.stringify(window.DEFAULT_CONFIG));
        }

        const localRates = localStorage.getItem('mobistroy_custom_rates');
        if (localRates) {
            try {
                customRates = { ...customRates, ...JSON.parse(localRates) };
            } catch (e) {}
        }

        // Apply block-container filtering and additions merging dynamically
        activeConfig = activeConfig.filter(model => !model.name.toLowerCase().includes("блок-контейнер"));
        
        activeConfig.forEach(model => {
            // Remove old additions that we are replacing/standardizing
            model.additions = model.additions.filter(add => {
                const nameLower = add.name.toLowerCase();
                if (nameLower.includes('окно') || nameLower.includes('пвх')) return false;
                if (nameLower.includes('сва') || nameLower.includes('сваи')) return false;
                if (nameLower.includes('металлочерепица')) return false;
                if (nameLower.includes('профлист')) return false;
                if (nameLower.includes('вентзазор')) return false;
                if (nameLower.includes('свесы')) return false;
                if (nameLower.includes('генератор')) return false;
                if (nameLower.includes('перенос материала') || nameLower.includes('пронос материала')) return false;
                if (nameLower.includes('лестница')) return false;
                return true;
            });
            // Prepend new shared additions
            model.additions = [...SHARED_ADDITIONS, ...model.additions];
            
            // Update PVC doors price
            model.additions.forEach(add => {
                const nameLower = add.name.toLowerCase();
                if (nameLower.includes('дверь') && nameLower.includes('пвх')) {
                    add.price = 35000;
                    add.name = "Дверь входная ПВХ (35 000 р)";
                }
            });

            // Update delivery rate
            if (model.delivery) {
                model.delivery.pricePerKm = 200;
                model.delivery.notes = `Доставка: до ${model.delivery.baseDistance} км = ${model.delivery.basePrice} р. свыше по 200 р/км`;
            }
        });
    }
    
    loadConfig();

    // Global Calculator State
    const state = {
        calculatorMode: 'custom', // 'custom' or 'standard'
        
        // Custom Mode params
        customType: 'house_high',
        customLength: 6.0,
        customWidth: 3.0,
        customHeight: 2.4,
        chkCustomVeranda: false,
        customVerandaWidth: 2.0,
        customVerandaType: 'freestanding',
        selCustomExterior: 'none',
        selCustomInterior: 'none',
        selCustomFloor: 'none',
        selCustomInsulation: '50',
        chkCustomAssembly: false,
        
        // Standard Mode params
        activeModelIdx: 0,
        selectedSizeId: '',
        selectedFinishIdx: 0,
        isAssemblyChecked: false,
        selectedFloorOptionIds: [],
        selectedInsulationIds: [],
        houseTypeRate: 12500,
        houseTypeHeight: 3.5,
        
        // Shared params
        additionQuantities: {}, // id -> quantity
        deliveryDistance: 0,
        isVatChecked: false,
        isDiscountChecked: false
    };

    // DOM Elements References
    const btnModeCustom = document.getElementById('btnModeCustom');
    const btnModeStandard = document.getElementById('btnModeStandard');
    const productTabs = document.getElementById('productTabs');
    const customConstructorArea = document.getElementById('customConstructorArea');
    const standardProjectsArea = document.getElementById('standardProjectsArea');
    
    // Custom Constructor DOM
    const customTypeSelector = document.getElementById('customTypeSelector');
    const customLengthSlider = document.getElementById('customLengthSlider');
    const lblCustomLength = document.getElementById('lblCustomLength');
    const customWidthSlider = document.getElementById('customWidthSlider');
    const lblCustomWidth = document.getElementById('lblCustomWidth');
    const customHeightSlider = document.getElementById('customHeightSlider');
    const lblCustomHeight = document.getElementById('lblCustomHeight');
    const chkCustomVeranda = document.getElementById('chkCustomVeranda');
    const lblCustomVerandaWidth = document.getElementById('lblCustomVerandaWidth');
    const customVerandaSliderWrap = document.getElementById('customVerandaSliderWrap');
    const customVerandaSlider = document.getElementById('customVerandaSlider');
    const customVerandaTypeWrap = document.getElementById('customVerandaTypeWrap');
    const selCustomVerandaType = document.getElementById('selCustomVerandaType');
    const selCustomExterior = document.getElementById('selCustomExterior');
    const selCustomInterior = document.getElementById('selCustomInterior');
    const selCustomFloor = document.getElementById('selCustomFloor');
    const selCustomInsulation = document.getElementById('selCustomInsulation');
    const chkCustomAssembly = document.getElementById('chkCustomAssembly');
    const lblCustomAssemblyPrice = document.getElementById('lblCustomAssemblyPrice');
    
    // Standard Mode DOM
    const sizesList = document.getElementById('sizesList');
    const finishesList = document.getElementById('finishesList');
    const houseTypeCard = document.getElementById('houseTypeCard');
    const assemblyRow = document.getElementById('assemblyRow');
    const optAssembly = document.getElementById('optAssembly');
    const assemblyPriceText = document.getElementById('assemblyPriceText');
    const floorOptionsContainer = document.getElementById('floorOptionsContainer');
    const insulationContainer = document.getElementById('insulationContainer');
    
    // Shared DOM
    const additionsList = document.getElementById('additionsList');
    const additionFilters = document.getElementById('additionFilters');
    const deliverySlider = document.getElementById('deliverySlider');
    const deliveryInput = document.getElementById('deliveryInput');
    const deliveryTerms = document.getElementById('deliveryTerms');
    const totalPriceText = document.getElementById('totalPriceText');
    const invoiceSummary = document.getElementById('invoiceSummary');
    const btnCopyClipboard = document.getElementById('btnCopyClipboard');
    
    // Admin Modal DOM
    const adminModal = document.getElementById('adminModal');
    const adminToggleBtn = document.getElementById('adminToggleBtn');
    const closeAdminBtn = document.getElementById('closeAdminBtn');
    const adminBadge = document.getElementById('adminBadge');
    const adminFormFields = document.getElementById('adminFormFields');
    const btnSaveConfig = document.getElementById('btnSaveConfig');
    const btnResetConfig = document.getElementById('btnResetConfig');
    const btnExportConfig = document.getElementById('btnExportConfig');
    const themeToggleBtn = document.getElementById('themeToggleBtn');

    let activeAdditionFilter = 'all';

    // 3. UI View Swapping Logic
    
    btnModeCustom.addEventListener('click', () => {
        state.calculatorMode = 'custom';
        btnModeCustom.classList.add('active');
        btnModeStandard.classList.remove('active');
        productTabs.style.display = 'none';
        customConstructorArea.style.display = 'block';
        standardProjectsArea.style.display = 'none';
        
        state.additionQuantities = {};
        state.deliveryDistance = 0;
        state.isVatChecked = false;
        state.isDiscountChecked = false;
        
        renderModelUI();
    });

    btnModeStandard.addEventListener('click', () => {
        state.calculatorMode = 'standard';
        btnModeStandard.classList.add('active');
        btnModeCustom.classList.remove('active');
        productTabs.style.display = 'grid';
        customConstructorArea.style.display = 'none';
        standardProjectsArea.style.display = 'block';
        
        state.additionQuantities = {};
        state.deliveryDistance = 0;
        state.isVatChecked = false;
        state.isDiscountChecked = false;
        
        // Reset sizes and selections to defaults of active tab
        const model = activeConfig[state.activeModelIdx];
        if (model) {
            const firstSize = model.sizes[0];
            state.selectedSizeId = firstSize ? firstSize.id : '';
            state.selectedFinishIdx = 0;
            state.isAssemblyChecked = false;
            state.selectedFloorOptionIds = [];
            state.selectedInsulationIds = [];
        }
        
        renderTabs();
        renderModelUI();
    });

    function renderTabs() {
        productTabs.innerHTML = '';
        activeConfig.forEach((model, idx) => {
            const btn = document.createElement('button');
            btn.className = `tab-btn ${idx === state.activeModelIdx ? 'active' : ''}`;
            btn.textContent = model.name;
            btn.addEventListener('click', () => {
                state.activeModelIdx = idx;
                const firstSize = model.sizes[0];
                state.selectedSizeId = firstSize ? firstSize.id : '';
                state.selectedFinishIdx = 0;
                state.isAssemblyChecked = false;
                state.selectedFloorOptionIds = [];
                state.selectedInsulationIds = [];
                state.additionQuantities = {};
                state.deliveryDistance = 0;
                state.isVatChecked = false;
                state.isDiscountChecked = false;
                
                renderTabs();
                renderModelUI();
            });
            productTabs.appendChild(btn);
        });
    }

    function getActiveModel() {
        if (state.calculatorMode === 'custom') {
            if (state.customType === 'house_high' || state.customType === 'house_low_osb' || state.customType === 'house_low_lining') {
                return activeConfig.find(m => m.name.includes("Дачный дом \"Каркасный\"")) || activeConfig[1];
            } else {
                return activeConfig.find(m => m.name.includes("Бытовка А. Корнилова")) || activeConfig.find(m => m.name.includes("Бытовка")) || activeConfig[0];
            }
        }
        return activeConfig[state.activeModelIdx] || activeConfig[0];
    }

    function updateCustomDropdowns() {
        const type = state.customType;
        
        // 1. Exterior Dropdown
        let extHTML = '';
        if (type === 'house_high') {
            extHTML = `
                <option value="none">Имитация бруса 'В' (базовая, включена)</option>
                <option value="osb">ОСБ 12 мм (+50 р/м²)</option>
                <option value="lining_a">Вагонка 'А' класс (+380 р/м²)</option>
                <option value="imitation_a">Имитация бруса 'А' (+150 р/м²)</option>
                <option value="blockhouse">Блок-хаус (+750 р/м²)</option>
            `;
        } else if (type === 'house_low_osb' || type === 'house_low_lining') {
            extHTML = `
                <option value="none">Вагонка 'ВС' (базовая, включена)</option>
                <option value="imitation">Имитация бруса (+250 р/м²)</option>
                <option value="blockhouse">Блок-хаус (+1000 р/м²)</option>
                <option value="proflist">Профлист цветной (+300 р/м²)</option>
                <option value="osb">ОСБ 12 мм (+300 р/м²)</option>
            `;
        } else { // cabin, hozblok
            extHTML = `
                <option value="none">Вагонка класса В (базовая, включена)</option>
                <option value="imitation">Имитация бруса (+250 р/м²)</option>
                <option value="blockhouse">Блок-хаус (+1000 р/м²)</option>
                <option value="proflist">Профлист цветной (+300 р/м²)</option>
                <option value="osb">ОСБ 12 мм (+300 р/м²)</option>
            `;
        }
        
        const prevExt = selCustomExterior.value;
        selCustomExterior.innerHTML = extHTML;
        if (selCustomExterior.querySelector(`option[value="${prevExt}"]`)) {
            selCustomExterior.value = prevExt;
        } else {
            selCustomExterior.value = 'none';
        }
        state.selCustomExterior = selCustomExterior.value;

        // 2. Interior Dropdown
        let intHTML = '';
        if (type === 'house_high') {
            intHTML = `
                <option value="none">Вагонка 'ВС' (базовая, включена)</option>
                <option value="imitation">Имитация бруса (+250 р/м²)</option>
            `;
        } else if (type === 'house_low_osb') {
            intHTML = `
                <option value="none">ОСБ 9 мм (базовая, включена)</option>
                <option value="lining">Вагонка 'ВС' (+500 р/м²)</option>
                <option value="imitation">Имитация бруса (+750 р/м²)</option>
            `;
        } else if (type === 'house_low_lining') {
            intHTML = `
                <option value="none">Вагонка 'ВС' (базовая, включена)</option>
                <option value="imitation">Имитация бруса (+250 р/м²)</option>
            `;
        } else { // cabin, hozblok
            intHTML = `
                <option value="none">ДВП (базовая, включена)</option>
                <option value="osb">ОСБ 9 мм (+300 р/м²)</option>
                <option value="lining">Вагонка класса В (+400 р/м²)</option>
                <option value="mdf">МДФ панели (+500 р/м²)</option>
                <option value="pvc">ПВХ панели (+500 р/м²)</option>
            `;
        }
        
        const prevInt = selCustomInterior.value;
        selCustomInterior.innerHTML = intHTML;
        if (selCustomInterior.querySelector(`option[value="${prevInt}"]`)) {
            selCustomInterior.value = prevInt;
        } else {
            selCustomInterior.value = 'none';
        }
        state.selCustomInterior = selCustomInterior.value;

        // 3. Insulation Dropdown
        let insHTML = '';
        if (type === 'house_high') {
            insHTML = `
                <option value="100">минеральная вата 100 мм (базовая)</option>
                <option value="izobel_100">100 мм базальтовая плита Izobel (+300 р/м²)</option>
                <option value="izobel_150">150 мм с заменой каркаса Izobel (+3500 р/м²)</option>
                <option value="izobel_200">200 мм с заменой каркаса (+4500 р/м²)</option>
                <option value="cold">Без утеплителя / холодный контур (ХК)</option>
            `;
        } else {
            insHTML = `
                <option value="50">50 мм (включено)</option>
                <option value="100">100 мм (+550 р/м²)</option>
                <option value="150">150 мм (+1000 р/м²)</option>
                <option value="200">200 мм (+1500 р/м²)</option>
                <option value="0">Без утеплителя</option>
            `;
        }
        
        const prevIns = selCustomInsulation.value;
        selCustomInsulation.innerHTML = insHTML;
        if (selCustomInsulation.querySelector(`option[value="${prevIns}"]`)) {
            selCustomInsulation.value = prevIns;
        } else {
            selCustomInsulation.value = type === 'house_high' ? '100' : '50';
        }
        state.selCustomInsulation = selCustomInsulation.value;

        // 4. Floor Dropdown
        let floorHTML = '';
        if (type === 'house_high' || type === 'house_low_osb' || type === 'house_low_lining') {
            floorHTML = `
                <option value="none">Обрезная доска 25мм (базовая)</option>
                <option value="osb12">ОСБ 12мм (+500 р/м²)</option>
                <option value="tongue28">Шпунтованная доска 28мм (+1000 р/м²)</option>
            `;
        } else {
            floorHTML = `
                <option value="none">Обрезная доска 25мм (базовая)</option>
                <option value="osb12">ОСБ 12мм (+500 р/м²)</option>
                <option value="tongue28">Шпунтованная доска 28мм (+1000 р/м²)</option>
            `;
        }
        
        const prevFloor = selCustomFloor.value;
        selCustomFloor.innerHTML = floorHTML;
        if (selCustomFloor.querySelector(`option[value="${prevFloor}"]`)) {
            selCustomFloor.value = prevFloor;
        } else {
            selCustomFloor.value = 'none';
        }
        state.selCustomFloor = selCustomFloor.value;
    }

    // 4. Model UI Rendering Engine
    function renderModelUI() {
        if (state.calculatorMode === 'custom') {
            // Render Custom Constructor sliders labels
            lblCustomLength.textContent = `${state.customLength.toFixed(1)} м`;
            lblCustomWidth.textContent = `${state.customWidth.toFixed(1)} м`;
            lblCustomHeight.textContent = `${state.customHeight.toFixed(1)} м`;
            lblCustomVerandaWidth.textContent = `${state.customVerandaWidth.toFixed(1)} м`;
            
            if (state.chkCustomVeranda) {
                lblCustomVerandaWidth.style.display = 'inline';
                customVerandaSliderWrap.style.display = 'flex';
                customVerandaTypeWrap.style.display = 'flex';
            } else {
                lblCustomVerandaWidth.style.display = 'none';
                customVerandaSliderWrap.style.display = 'none';
                customVerandaTypeWrap.style.display = 'none';
            }

            // Dynamically update exterior, interior, insulation, and floor dropdown options
            updateCustomDropdowns();

            // Assembly price update in UI
            const area = state.customLength * state.customWidth;
            let assemblyPrice = 0;
            if (state.customType !== 'house_high' && state.customType !== 'house_low_osb' && state.customType !== 'house_low_lining') {
                assemblyPrice = Math.round(area * customRates.rate_assembly);
            }
            lblCustomAssemblyPrice.textContent = `+${assemblyPrice.toLocaleString('ru-RU')} руб.`;
            
            // Render Additions and Delivery notes
            renderAdditions();
            deliveryTerms.textContent = `Доставка (бесплатно до ${customRates.delivery_base_dist} км, далее ${customRates.delivery_price_km} руб/км):`;
            
        } else {
            // Render Standard Excel sheet Mode
            const model = getActiveModel();
            if (!model) return;

            // Render houseType Selector for "Дачный дом \"Каркасный\""
            if (model.name.includes("Дачный дом \"Каркасный\"")) {
                houseTypeCard.style.display = 'block';
            } else {
                houseTypeCard.style.display = 'none';
            }

            // Render Sizes standard cards
            sizesList.innerHTML = '';
            model.sizes.forEach(size => {
                const area = size.length * size.width;
                const sizeCard = document.createElement('div');
                sizeCard.className = `selector-card ${size.id === state.selectedSizeId ? 'active' : ''}`;
                sizeCard.innerHTML = `
                    <div class="title">${size.name}</div>
                    <div class="sub">${area} кв.м</div>
                    <div class="sub">${size.length}м х ${size.width}м</div>
                `;
                sizeCard.addEventListener('click', () => {
                    state.selectedSizeId = size.id;
                    renderModelUI();
                });
                sizesList.appendChild(sizeCard);
            });

            // Render Finishes rows
            finishesList.innerHTML = '';
            model.finishes.forEach((fin, idx) => {
                const size = model.sizes.find(s => s.id === state.selectedSizeId);
                let price = 0;
                
                if (model.name.includes("Дачный дом \"Каркасный\"") && size) {
                    const area = size.length * size.width;
                    const perimeter = 2 * (size.length + size.width);
                    if (fin.name.includes("Вагонка 'ВС'")) {
                        price = area * state.houseTypeRate;
                    } else if (fin.name.includes("Имитация бруса")) {
                        const vagankaBase = area * state.houseTypeRate;
                        const wallArea = perimeter * state.houseTypeHeight;
                        price = vagankaBase + wallArea * 250;
                    } else {
                        price = fin.prices[state.selectedSizeId] || 0;
                    }
                } else {
                    price = fin.prices[state.selectedSizeId] || 0;
                }

                const activeClass = idx === state.selectedFinishIdx ? 'active' : '';
                const row = document.createElement('div');
                row.className = `option-row selector-card ${activeClass}`;
                row.style.flexDirection = 'row';
                row.style.justifyContent = 'space-between';
                row.style.textAlign = 'left';
                row.style.width = '100%';
                row.innerHTML = `
                    <div class="option-info">
                        <span class="option-label" style="font-weight:700;">${fin.name}</span>
                    </div>
                    <div class="option-price">${price.toLocaleString('ru-RU')} руб.</div>
                `;
                row.addEventListener('click', () => {
                    state.selectedFinishIdx = idx;
                    renderModelUI();
                });
                finishesList.appendChild(row);
            });

            // Standard Assembly
            const size = model.sizes.find(s => s.id === state.selectedSizeId);
            const finish = model.finishes[state.selectedFinishIdx];
            let assemblyPrice = 0;
            if (finish && size) {
                assemblyPrice = finish.assembly[size.id] || model.assembly?.[size.id] || 0;
            }
            
            if (assemblyPrice > 0) {
                assemblyRow.style.display = 'flex';
                assemblyPriceText.textContent = `${assemblyPrice.toLocaleString('ru-RU')} руб.`;
                optAssembly.checked = state.isAssemblyChecked;
            } else {
                assemblyRow.style.display = 'none';
                state.isAssemblyChecked = false;
            }

            // Floor Options
            floorOptionsContainer.innerHTML = '';
            if (model.floorOptions && model.floorOptions.length > 0) {
                const title = document.createElement('h3');
                title.textContent = 'Опции пола';
                title.style.fontSize = '14px';
                title.style.margin = '15px 0 5px';
                floorOptionsContainer.appendChild(title);
                
                model.floorOptions.forEach(opt => {
                    const price = opt.prices[state.selectedSizeId] || 0;
                    if (price > 0) {
                        const isChecked = state.selectedFloorOptionIds.includes(opt.id);
                        const row = document.createElement('div');
                        row.className = 'option-row';
                        row.innerHTML = `
                            <div class="option-info">
                                <input type="checkbox" id="fl_${opt.id}" ${isChecked ? 'checked' : ''}>
                                <label for="fl_${opt.id}" class="option-label" style="cursor:pointer;">${opt.name}</label>
                            </div>
                            <div class="option-price">${price.toLocaleString('ru-RU')} руб.</div>
                        `;
                        row.querySelector('input').addEventListener('change', (e) => {
                            if (e.target.checked) {
                                state.selectedFloorOptionIds.push(opt.id);
                            } else {
                                state.selectedFloorOptionIds = state.selectedFloorOptionIds.filter(id => id !== opt.id);
                            }
                            calculateBill();
                        });
                        floorOptionsContainer.appendChild(row);
                    }
                });
            }

            // Insulation Options
            insulationContainer.innerHTML = '';
            if (model.insulation && model.insulation.length > 0) {
                const title = document.createElement('h3');
                title.textContent = 'Опции утепления';
                title.style.fontSize = '14px';
                title.style.margin = '15px 0 5px';
                insulationContainer.appendChild(title);

                model.insulation.forEach(opt => {
                    const price = opt.prices[state.selectedSizeId] || 0;
                    const isChecked = state.selectedInsulationIds.includes(opt.id);
                    const row = document.createElement('div');
                    row.className = 'option-row';
                    row.innerHTML = `
                        <div class="option-info">
                            <input type="checkbox" id="ins_${opt.id}" ${isChecked ? 'checked' : ''}>
                            <label for="ins_${opt.id}" class="option-label" style="cursor:pointer;">${opt.name}</label>
                        </div>
                        <div class="option-price">${price > 0 ? price.toLocaleString('ru-RU') + ' руб.' : 'Включено'}</div>
                    `;
                    row.querySelector('input').addEventListener('change', (e) => {
                        if (e.target.checked) {
                            state.selectedInsulationIds.push(opt.id);
                        } else {
                            state.selectedInsulationIds = state.selectedInsulationIds.filter(id => id !== opt.id);
                        }
                        calculateBill();
                    });
                    insulationContainer.appendChild(row);
                });
            }

            renderAdditions();
            deliveryTerms.textContent = `${model.delivery.notes} (Введите расстояние):`;
        }

        deliverySlider.value = state.deliveryDistance;
        deliveryInput.value = state.deliveryDistance;
        calculateBill();
    }

    function renderAdditions() {
        const model = getActiveModel();
        if (!model) return;
        
        additionsList.innerHTML = '';
        
        let area = 0;
        let perimeter = 0;
        
        if (state.calculatorMode === 'custom') {
            area = state.customLength * state.customWidth;
            perimeter = 2 * (state.customLength + state.customWidth);
        } else {
            const size = model.sizes.find(s => s.id === state.selectedSizeId);
            area = size ? size.length * size.width : 0;
            perimeter = size ? 2 * (size.length + size.width) : 0;
        }

        model.additions.forEach(add => {
            // Apply filtering logic
            if (activeAdditionFilter !== 'all') {
                const nameLower = add.name.toLowerCase();
                if (activeAdditionFilter === 'windows') {
                    if (!nameLower.includes('окн')) return;
                } else if (activeAdditionFilter === 'doors') {
                    if (!nameLower.includes('двер')) return;
                } else if (activeAdditionFilter === 'area') {
                    if (add.type !== 'area' && !nameLower.includes('пол') && !nameLower.includes('ваг') && !nameLower.includes('осб') && !nameLower.includes('стена') && !nameLower.includes('покраск')) return;
                } else if (activeAdditionFilter === 'other') {
                    if (nameLower.includes('окн') || nameLower.includes('двер') || add.type === 'area' || nameLower.includes('пол') || nameLower.includes('ваг') || nameLower.includes('осб') || nameLower.includes('стена') || nameLower.includes('покраск')) return;
                }
            }

            const qty = state.additionQuantities[add.id] || 0;
            const price = add.price || 0;
            
            let recQty = 0;
            let recText = '';
            if (add.type === 'area') {
                const nameLower = add.name.toLowerCase();
                if (nameLower.includes('стена') || nameLower.includes('стен')) {
                    const height = (state.calculatorMode === 'custom') ? state.customHeight : ((model.name.includes("Дачный дом \"Каркасный\"")) ? state.houseTypeHeight : 2.2);
                    recQty = Math.ceil(perimeter * height);
                    recText = `Стены: ${recQty} м²`;
                } else if (nameLower.includes('периметр') || nameLower.includes('вентзазор') || nameLower.includes('свес') || nameLower.includes('обвязк')) {
                    recQty = Math.ceil(perimeter);
                    recText = `Периметр: ${recQty} м`;
                } else {
                    recQty = Math.ceil(area);
                    recText = `Площадь: ${recQty} м²`;
                }
            }

            const applyLink = recText ? ` <a href="#" class="apply-rec-btn" data-val="${recQty}" style="font-size:11px; color:var(--primary); text-decoration:underline; margin-left:8px; cursor:pointer;" title="Подставить площадь/периметр в количество">${recText}</a>` : '';

            const row = document.createElement('div');
            row.className = 'option-row';
            row.innerHTML = `
                <div class="option-info" style="max-width: 65%;">
                    <span class="option-label">${add.name} ${applyLink}</span>
                </div>
                <div style="display:flex; align-items:center; gap: 15px;">
                    <div class="option-price">${price.toLocaleString('ru-RU')} р.</div>
                    <div class="quantity-control">
                        <button class="qty-btn dec-btn">-</button>
                        <input type="number" class="qty-input" value="${qty}" min="0">
                        <button class="qty-btn inc-btn">+</button>
                    </div>
                </div>
            `;

            const input = row.querySelector('.qty-input');
            const decBtn = row.querySelector('.dec-btn');
            const incBtn = row.querySelector('.inc-btn');
            const applyBtn = row.querySelector('.apply-rec-btn');

            const updateQty = (newVal) => {
                newVal = Math.max(0, newVal);
                state.additionQuantities[add.id] = newVal;
                input.value = newVal;
                calculateBill();
            };

            input.addEventListener('change', (e) => {
                updateQty(parseInt(e.target.value) || 0);
            });

            decBtn.addEventListener('click', () => {
                updateQty((state.additionQuantities[add.id] || 0) - 1);
            });

            incBtn.addEventListener('click', () => {
                updateQty((state.additionQuantities[add.id] || 0) + 1);
            });

            if (applyBtn) {
                applyBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    updateQty(recQty);
                });
            }

            additionsList.appendChild(row);
        });

        if (additionsList.children.length === 0) {
            additionsList.innerHTML = `<div style="color:var(--text-muted); text-align:center; padding: 15px;">Нет подходящих опций в этой категории.</div>`;
        }
    }

    // 5. Calculation Core Engine
    function calculateBill() {
        let basePrice = 0;
        let assemblyPrice = 0;
        let floorSum = 0;
        let insulationSum = 0;
        let selectedFinishName = '';
        let sizeName = '';
        let area = 0;
        let perimeter = 0;

        const model = getActiveModel();

        if (state.calculatorMode === 'custom') {
            // 5.1 Custom Constructor Mode Calculations
            area = state.customLength * state.customWidth;
            perimeter = 2 * (state.customLength + state.customWidth);
            const wallArea = perimeter * state.customHeight;
            let extWallArea = wallArea;
            if (state.customType === 'house_high') {
                extWallArea = perimeter * 3.5;
            }
            
            sizeName = `${state.customLength}х${state.customWidth}м`;

            // Base rate lookup based on category type selection
            let baseRate = customRates[`rate_${state.customType}`] || 8000;
            if (state.customType === 'house_high' && state.selCustomInsulation === 'cold') {
                baseRate = 9500;
            }
            basePrice = area * baseRate;
            
            // Structure Label
            const structNames = {
                house_high: 'Дом высокий',
                house_low_osb: 'Дом низкий (ОСБ)',
                house_low_lining: 'Дом низкий (Вагонка)',
                cabin: 'Бытовка',
                hozblok: 'Хозблок'
            };
            selectedFinishName = structNames[state.customType] || 'Бытовка';

            // Veranda Cost
            let verandaCost = 0;
            if (state.chkCustomVeranda) {
                const verandaArea = state.customLength * state.customVerandaWidth;
                const vRate = state.customVerandaType === 'high_roof' ? 9500 : 7500;
                verandaCost = verandaArea * vRate;
                floorSum += verandaCost;
            }

            // Exterior Finish Upgrade
            let extCost = 0;
            if (state.selCustomExterior !== 'none') {
                let rate = 0;
                if (state.customType === 'house_high') {
                    const highExtRates = { osb: 50, lining_a: 380, imitation_a: 150, blockhouse: 750 };
                    rate = highExtRates[state.selCustomExterior] || 0;
                } else {
                    rate = customRates[`rate_ext_${state.selCustomExterior}`] || 0;
                }
                extCost = extWallArea * rate;
            }

            // Interior Finish Upgrade
            let intCost = 0;
            if (state.selCustomInterior !== 'none') {
                if (state.customType === 'house_high') {
                    if (state.selCustomInterior === 'imitation') {
                        const intArea = (perimeter * 2.5) + area;
                        intCost = intArea * 250;
                    }
                } else if (state.customType === 'house_low_osb') {
                    const intArea = (perimeter * state.customHeight) + area;
                    const rates = { lining: 500, imitation: 750 };
                    intCost = intArea * (rates[state.selCustomInterior] || 0);
                } else if (state.customType === 'house_low_lining') {
                    const intArea = (perimeter * state.customHeight) + area;
                    if (state.selCustomInterior === 'imitation') {
                        intCost = intArea * 250;
                    }
                } else {
                    const rate = customRates[`rate_int_${state.selCustomInterior}`] || 0;
                    intCost = wallArea * rate;
                }
            }
            floorSum += (extCost + intCost); // Group as finish upgrades

            // Floor material Upgrade
            let floorMatCost = 0;
            if (state.selCustomFloor !== 'none') {
                const rate = customRates[`rate_floor_${state.selCustomFloor}`] || 0;
                floorMatCost = area * rate;
                floorSum += floorMatCost;
            }

            // Insulation Upgrade
            if (state.customType === 'house_high') {
                const insRates = { 100: 0, izobel_100: 300, izobel_150: 3500, izobel_200: 4500, cold: 0 };
                const rate = insRates[state.selCustomInsulation] || 0;
                insulationSum = area * rate;
            } else {
                if (state.selCustomInsulation !== '50') {
                    if (state.selCustomInsulation !== '0') {
                        const rate = customRates[`rate_ins_${state.selCustomInsulation}`] || 0;
                        insulationSum = area * rate;
                    }
                }
            }

            // Assembly Cost
            if (state.chkCustomAssembly) {
                if (state.customType !== 'house_high' && state.customType !== 'house_low_osb' && state.customType !== 'house_low_lining') {
                    assemblyPrice = Math.round(area * customRates.rate_assembly);
                } else {
                    assemblyPrice = 0;
                }
            }

        } else {
            // 5.2 Predefined Excel Mode Calculations
            if (!model) return;
            const size = model.sizes.find(s => s.id === state.selectedSizeId);
            const finish = model.finishes[state.selectedFinishIdx];
            if (!size || !finish) return;

            area = size.length * size.width;
            perimeter = 2 * (size.length + size.width);
            sizeName = size.name;
            selectedFinishName = finish.name;

            // Base price lookup
            if (model.name.includes("Дачный дом \"Каркасный\"")) {
                if (finish.name.includes("Вагонка 'ВС'")) {
                    basePrice = area * state.houseTypeRate;
                } else if (finish.name.includes("Имитация бруса")) {
                    const vagankaBase = area * state.houseTypeRate;
                    const wallArea = perimeter * state.houseTypeHeight;
                    basePrice = vagankaBase + wallArea * 250;
                } else {
                    basePrice = finish.prices[size.id] || 0;
                }
            } else {
                basePrice = finish.prices[size.id] || 0;
            }

            // Assembly
            if (state.isAssemblyChecked) {
                assemblyPrice = finish.assembly[size.id] || model.assembly?.[size.id] || 0;
            }

            // Floor Options sum
            state.selectedFloorOptionIds.forEach(id => {
                const opt = model.floorOptions.find(o => o.id === id);
                if (opt) floorSum += (opt.prices[size.id] || 0);
            });

            // Insulation sum
            state.selectedInsulationIds.forEach(id => {
                const opt = model.insulation.find(o => o.id === id);
                if (opt) insulationSum += (opt.prices[size.id] || 0);
            });
        }

        // Subtotal (ИТОГО)
        const subtotal = basePrice + assemblyPrice + floorSum + insulationSum;

        // Additions sum
        let additionsSum = 0;
        const selectedAdditionsText = [];
        model.additions.forEach(add => {
            const qty = state.additionQuantities[add.id] || 0;
            if (qty > 0) {
                const total = qty * add.price;
                additionsSum += total;
                selectedAdditionsText.push({
                    name: add.name,
                    qty: qty,
                    price: add.price,
                    total: total
                });
            }
        });

        const rawTotal = subtotal + additionsSum;

        // Taxes & discounts
        let discountVal = state.isDiscountChecked ? Math.round(rawTotal * 0.1) : 0;
        let vatVal = state.isVatChecked ? Math.round((rawTotal - discountVal) * 0.2) : 0;

        // Delivery
        let deliveryPrice = 0;
        if (state.deliveryDistance > 0) {
            const baseDist = state.calculatorMode === 'custom' ? customRates.delivery_base_dist : model.delivery.baseDistance;
            const baseCost = state.calculatorMode === 'custom' ? customRates.delivery_base_price : model.delivery.basePrice;
            const kmRate = state.calculatorMode === 'custom' ? customRates.delivery_price_km : model.delivery.pricePerKm;
            
            if (state.deliveryDistance <= baseDist) {
                deliveryPrice = baseCost;
            } else {
                deliveryPrice = baseCost + (state.deliveryDistance - baseDist) * kmRate;
            }
        }

        const finalTotal = rawTotal - discountVal + vatVal + deliveryPrice;

        // Save to state for buildReportText() to consume
        state.basePrice = basePrice;
        state.assemblyPrice = assemblyPrice;
        state.floorSum = floorSum;
        state.insulationSum = insulationSum;
        state.additionsSum = additionsSum;
        state.deliveryPrice = deliveryPrice;
        state.discountVal = discountVal;
        state.vatVal = vatVal;
        state.finalTotal = finalTotal;
        state.selectedAdditionsText = selectedAdditionsText;
        state.calculatedArea = area;
        state.calculatedPerimeter = perimeter;
        state.calculatedSizeName = sizeName;
        state.calculatedStructName = selectedFinishName;

        // Update UI
        totalPriceText.textContent = `${finalTotal.toLocaleString('ru-RU')} руб.`;

        // Render Summary Sidebar Invoice
        invoiceSummary.innerHTML = `
            <div class="summary-item">
                <div>Режим расчета:</div>
                <div style="font-weight:700; color:var(--primary);">
                    ${state.calculatorMode === 'custom' ? '📐 Индивидуальный' : '📋 Стандартный'}
                </div>
            </div>
            <div class="summary-item">
                <div>Конструкция:</div>
                <div style="font-weight:600;">${selectedFinishName}</div>
            </div>
            <div class="summary-item">
                <div>Размеры:</div>
                <div style="font-weight:600;">${sizeName} (${area.toFixed(1)} м²)</div>
            </div>
            <div class="summary-item">
                <div>Базовая стоимость:</div>
                <div>${basePrice.toLocaleString('ru-RU')} р.</div>
            </div>
            ${assemblyPrice > 0 ? `
            <div class="summary-item">
                <div>Сборка на участке:</div>
                <div>${assemblyPrice.toLocaleString('ru-RU')} р.</div>
            </div>` : ''}
            ${floorSum > 0 ? `
            <div class="summary-item">
                <div>Материалы и отделка:</div>
                <div>${floorSum.toLocaleString('ru-RU')} р.</div>
            </div>` : ''}
            ${insulationSum > 0 ? `
            <div class="summary-item">
                <div>Опции утепления:</div>
                <div>${insulationSum.toLocaleString('ru-RU')} р.</div>
            </div>` : ''}
            <div class="summary-item bold" style="margin-top: 5px; padding-top: 5px; border-top: 1px solid var(--border-color);">
                <div>Промежуточный итог:</div>
                <div>${subtotal.toLocaleString('ru-RU')} р.</div>
            </div>
            ${additionsSum > 0 ? `
            <div class="summary-item bold" style="color:var(--primary); margin-top:5px;">
                <div>Доп. опции (${selectedAdditionsText.length} шт):</div>
                <div>${additionsSum.toLocaleString('ru-RU')} р.</div>
            </div>
            <div style="font-size:11px; color:var(--text-muted); padding-left: 10px; max-height:100px; overflow-y:auto; margin-bottom:5px;">
                ${selectedAdditionsText.map(item => `• ${item.name} (${item.qty} шт) - ${item.total.toLocaleString('ru-RU')} р.<br>`).join('')}
            </div>` : ''}
            
            <div class="summary-item" style="margin-top: 5px; padding-top: 5px; border-top: 1px dashed var(--border-color);">
                <div style="display:flex; align-items:center; gap:5px;">
                    <input type="checkbox" id="chkDiscount" ${state.isDiscountChecked ? 'checked' : ''}>
                    <label for="chkDiscount" style="cursor:pointer;">Скидка 10%:</label>
                </div>
                <div class="discount" style="font-weight:600;">${state.isDiscountChecked ? '-' + discountVal.toLocaleString('ru-RU') + ' р.' : '0 р.'}</div>
            </div>

            <div class="summary-item">
                <div style="display:flex; align-items:center; gap:5px;">
                    <input type="checkbox" id="chkVat" ${state.isVatChecked ? 'checked' : ''}>
                    <label for="chkVat" style="cursor:pointer;">НДС 20%:</label>
                </div>
                <div class="vat" style="font-weight:600;">${state.isVatChecked ? '+' + vatVal.toLocaleString('ru-RU') + ' р.' : '0 р.'}</div>
            </div>

            <div class="summary-item" style="margin-bottom: 5px;">
                <div>Доставка (${state.deliveryDistance} км):</div>
                <div style="font-weight:600;">${deliveryPrice > 0 ? deliveryPrice.toLocaleString('ru-RU') + ' р.' : 'Самовывоз / 0 р.'}</div>
            </div>
        `;

        // Event hooks for sidepanel calculations toggles
        document.getElementById('chkDiscount').addEventListener('change', (e) => {
            state.isDiscountChecked = e.target.checked;
            calculateBill();
        });
        document.getElementById('chkVat').addEventListener('change', (e) => {
            state.isVatChecked = e.target.checked;
            calculateBill();
        });
    }

    // 6. Text-based formatted сметы generator
    // 6. Text-based formatted сметы generator
    function buildReportText() {
        const area = state.calculatedArea || 0;
        const sizeName = state.calculatedSizeName || '';
        const structName = state.calculatedStructName || '';
        
        let text = `📄 РАСЧЕТ СТОИМОСТИ СТРОИТЕЛЬСТВА\n`;
        text += `------------------------------------\n`;
        text += `🏠 Конструкция: ${structName}\n`;
        text += `📐 Размеры: ${sizeName} (${area.toFixed(1)} кв.м)\n`;
        
        if (state.calculatorMode === 'custom') {
            text += `🧱 Материалы отделки:\n`;
            
            const extNames = {
                none: state.customType === 'house_high' ? 'Имитация бруса класса В' : 'Вагонка класса ВС',
                osb: 'ОСБ 12 мм',
                lining_a: 'Вагонка класса А',
                imitation_a: 'Имитация бруса класса А',
                blockhouse: 'Блок-хаус',
                proflist: 'Профлист цветной',
                imitation: 'Имитация бруса'
            };
            const intNames = {
                none: state.customType === 'house_high' ? 'Вагонка класса ВС' : (state.customType === 'house_low_osb' ? 'ОСБ 9 мм' : (state.customType === 'house_low_lining' ? 'Вагонка класса ВС' : 'ДВП')),
                osb: 'ОСБ 9 мм',
                lining: 'Вагонка класса В',
                mdf: 'МДФ панели',
                pvc: 'ПВХ панели',
                imitation: 'Имитация бруса'
            };
            const floorNames = {
                none: 'Обрезная доска 25мм',
                osb12: 'ОСБ 12мм',
                tongue28: 'Шпунтованная доска 28мм'
            };
            
            text += `  - Снаружи: ${extNames[state.selCustomExterior] || 'Базовая'}\n`;
            text += `  - Внутри: ${intNames[state.selCustomInterior] || 'Базовая'}\n`;
            text += `  - Утепление: ${state.selCustomInsulation === 'cold' ? 'Холодный контур' : (state.selCustomInsulation === '0' ? 'Без утепления' : state.selCustomInsulation + ' мм')}\n`;
            text += `  - Пол: ${floorNames[state.selCustomFloor] || 'Базовая'}\n`;
            
            if (state.chkCustomVeranda) {
                const verandaTypeNames = {
                    freestanding: 'Отдельностоящая / крыльцо',
                    high_roof: 'С высокой крышей'
                };
                text += `  - Веранда: ${verandaTypeNames[state.customVerandaType]} (${state.customVerandaWidth.toFixed(1)} м)\n`;
            }
        }

        text += `------------------------------------\n`;

        const basePrice = state.basePrice || 0;
        const assemblyPrice = state.assemblyPrice || 0;
        const floorSum = state.floorSum || 0;
        const insulationSum = state.insulationSum || 0;
        const additionsSum = state.additionsSum || 0;
        const deliveryPrice = state.deliveryPrice || 0;
        const discountVal = state.discountVal || 0;
        const vatVal = state.vatVal || 0;
        const finalTotal = state.finalTotal || 0;

        text += `• База: ${basePrice.toLocaleString('ru-RU')} руб.\n`;
        if (assemblyPrice > 0) text += `• Сборка: ${assemblyPrice.toLocaleString('ru-RU')} руб.\n`;
        if (floorSum > 0) text += `• Отделка и полы: ${floorSum.toLocaleString('ru-RU')} руб.\n`;
        if (insulationSum > 0) text += `• Утепление: ${insulationSum.toLocaleString('ru-RU')} руб.\n`;

        // Additions loop
        if (state.selectedAdditionsText && state.selectedAdditionsText.length > 0) {
            text += `➕ Доп. опции:\n`;
            state.selectedAdditionsText.forEach(item => {
                text += `  - ${item.name}: ${item.qty} шт. (${item.total.toLocaleString('ru-RU')} руб.)\n`;
            });
        }

        // Delivery
        if (deliveryPrice > 0) {
            text += `🚚 Доставка (${state.deliveryDistance} км): ${deliveryPrice.toLocaleString('ru-RU')} руб.\n`;
        } else {
            text += `🚚 Доставка: Самовывоз (0 руб.)\n`;
        }

        if (state.isDiscountChecked) {
            text += `🏷️ Скидка 10%: -${discountVal.toLocaleString('ru-RU')} руб.\n`;
        }
        if (state.isVatChecked) {
            text += `🏦 НДС 20%: +${vatVal.toLocaleString('ru-RU')} руб.\n`;
        }

        text += `------------------------------------\n`;
        text += `💰 ИТОГО К ОПЛАТЕ: ${finalTotal.toLocaleString('ru-RU')} руб.\n`;
        text += `------------------------------------\n`;
        text += `Расчет выполнен в калькуляторе Моби Строй`;

        return text;
    }

    // 7. Admin Editor Form Renderer
    function renderAdminForm() {
        adminFormFields.innerHTML = '';
        
        if (state.calculatorMode === 'custom') {
            // Render rates editor for Custom Mode
            adminFormFields.innerHTML = `<h3>Редактирование тарифов конструктора (руб. за м²)</h3>`;
            
            const fields = [
                { label: 'Тариф за Дом высокий (м² по полу)', key: 'rate_house_high', val: customRates.rate_house_high },
                { label: 'Тариф за Дом низкий (м² по полу)', key: 'rate_house_low', val: customRates.rate_house_low },
                { label: 'Тариф за Бытовку (м² по полу)', key: 'rate_cabin', val: customRates.rate_cabin },
                { label: 'Тариф за Хозблок (м² по полу)', key: 'rate_hozblok', val: customRates.rate_hozblok },
                { label: 'Тариф за Блок-контейнер (м² по полу)', key: 'rate_container', val: customRates.rate_container },
                { label: 'Стоимость веранды (м² веранды)', key: 'rate_veranda', val: customRates.rate_veranda },
                { label: 'Наружка: Имитация бруса (м² стен)', key: 'rate_ext_imitation', val: customRates.rate_ext_imitation },
                { label: 'Наружка: Блок-хаус (м² стен)', key: 'rate_ext_blockhouse', val: customRates.rate_ext_blockhouse },
                { label: 'Наружка: Профлист цветной (м² стен)', key: 'rate_ext_proflist', val: customRates.rate_ext_proflist },
                { label: 'Наружка: ОСБ 12 мм (м² стен)', key: 'rate_ext_osb', val: customRates.rate_ext_osb },
                { label: 'Внутрянка: ОСБ 9 мм (м² стен)', key: 'rate_int_osb', val: customRates.rate_int_osb },
                { label: 'Внутрянка: Вагонка В (м² стен)', key: 'rate_int_lining', val: customRates.rate_int_lining },
                { label: 'Внутрянка: МДФ панели (м² стен)', key: 'rate_int_mdf', val: customRates.rate_int_mdf },
                { label: 'Внутрянка: ПВХ панели (м² стен)', key: 'rate_int_pvc', val: customRates.rate_int_pvc },
                { label: 'Утепление 100 мм (м² пола)', key: 'rate_ins_100', val: customRates.rate_ins_100 },
                { label: 'Утепление 150 мм (м² пола)', key: 'rate_ins_150', val: customRates.rate_ins_150 },
                { label: 'Утепление 200 мм (м² пола)', key: 'rate_ins_200', val: customRates.rate_ins_200 },
                { label: 'Пол: ОСБ 12 мм (м² пола)', key: 'rate_floor_osb12', val: customRates.rate_floor_osb12 },
                { label: 'Пол: ОСБ 18 мм (м² пола)', key: 'rate_floor_osb18', val: customRates.rate_floor_osb18 },
                { label: 'Пол: Шпунт 28 мм (м² пола)', key: 'rate_floor_tongue28', val: customRates.rate_floor_tongue28 },
                { label: 'Пол: Шпунт 36 мм (м² пола)', key: 'rate_floor_tongue36', val: customRates.rate_floor_tongue36 },
                { label: 'Стоимость сборки (м² пола)', key: 'rate_assembly', val: customRates.rate_assembly },
                { label: 'Доставка: Лимит бесплатных км', key: 'delivery_base_dist', val: customRates.delivery_base_dist },
                { label: 'Доставка: Базовая цена (руб)', key: 'delivery_base_price', val: customRates.delivery_base_price },
                { label: 'Доставка: Цена за 1 км (руб)', key: 'delivery_price_km', val: customRates.delivery_price_km }
            ];

            fields.forEach(field => {
                const row = document.createElement('div');
                row.className = 'edit-row';
                row.innerHTML = `
                    <label>${field.label}</label>
                    <input type="number" class="admin-input-rate" data-key="${field.key}" value="${field.val}">
                `;
                adminFormFields.appendChild(row);
            });
        } else {
            // Render rates editor for Standard Sheets Mode
            const model = getActiveModel();
            if (!model) return;

            adminFormFields.innerHTML = `<h3>Редактирование цен для листа: ${model.name}</h3>`;
            const size = model.sizes.find(s => s.id === state.selectedSizeId);
            
            if (size) {
                const title = document.createElement('h4');
                title.textContent = `Базовые цены для размера ${size.name}:`;
                title.style.margin = '10px 0';
                adminFormFields.appendChild(title);

                model.finishes.forEach((fin, idx) => {
                    const price = fin.prices[size.id] || 0;
                    const row = document.createElement('div');
                    row.className = 'edit-row';
                    row.innerHTML = `
                        <label>${fin.name}</label>
                        <input type="number" class="admin-input-fin" data-fin-idx="${idx}" value="${price}">
                    `;
                    adminFormFields.appendChild(row);
                });

                const titleAsm = document.createElement('h4');
                titleAsm.textContent = `Сборка для размера ${size.name}:`;
                titleAsm.style.margin = '15px 0 5px';
                adminFormFields.appendChild(titleAsm);

                model.finishes.forEach((fin, idx) => {
                    const price = fin.assembly[size.id] || 0;
                    const row = document.createElement('div');
                    row.className = 'edit-row';
                    row.innerHTML = `
                        <label>Сборка: ${fin.name}</label>
                        <input type="number" class="admin-input-asm" data-fin-idx="${idx}" value="${price}">
                    `;
                    adminFormFields.appendChild(row);
                });
            }

            // Edit additions prices in standard sheet mode
            if (model.additions && model.additions.length > 0) {
                const titleAdds = document.createElement('h4');
                titleAdds.textContent = `Стоимость дополнительных опций (руб/ед.):`;
                titleAdds.style.margin = '15px 0 5px';
                adminFormFields.appendChild(titleAdds);

                model.additions.forEach(add => {
                    const row = document.createElement('div');
                    row.className = 'edit-row';
                    row.innerHTML = `
                        <label>${add.name}</label>
                        <input type="number" class="admin-input-add" data-add-id="${add.id}" value="${add.price}">
                    `;
                    adminFormFields.appendChild(row);
                });
            }
        }
    }

    function saveAdminForm() {
        if (state.calculatorMode === 'custom') {
            const inputs = adminFormFields.querySelectorAll('.admin-input-rate');
            inputs.forEach(input => {
                const key = input.getAttribute('data-key');
                const val = parseInt(input.value) || 0;
                customRates[key] = val;
            });
            localStorage.setItem('mobistroy_custom_rates', JSON.stringify(customRates));
        } else {
            const model = getActiveModel();
            if (!model) return;
            const size = model.sizes.find(s => s.id === state.selectedSizeId);

            // Save finishes prices
            const finInputs = adminFormFields.querySelectorAll('.admin-input-fin');
            finInputs.forEach(input => {
                const idx = parseInt(input.getAttribute('data-fin-idx'));
                const val = parseInt(input.value) || 0;
                if (size && model.finishes[idx]) {
                    model.finishes[idx].prices[size.id] = val;
                }
            });

            // Save assembly prices
            const asmInputs = adminFormFields.querySelectorAll('.admin-input-asm');
            asmInputs.forEach(input => {
                const idx = parseInt(input.getAttribute('data-fin-idx'));
                const val = parseInt(input.value) || 0;
                if (size && model.finishes[idx]) {
                    model.finishes[idx].assembly[size.id] = val;
                }
            });

            // Save additions
            const addInputs = adminFormFields.querySelectorAll('.admin-input-add');
            addInputs.forEach(input => {
                const id = input.getAttribute('data-add-id');
                const val = parseInt(input.value) || 0;
                const add = model.additions.find(a => a.id === id);
                if (add) add.price = val;
            });

            localStorage.setItem('mobistroy_config', JSON.stringify(activeConfig));
        }

        alert("Цены успешно сохранены!");
        adminModal.style.display = 'none';
        renderModelUI();
    }

    // 8. Event Controllers Hooks
    
    // Sliders hooks in Custom Constructor Mode
    customLengthSlider.addEventListener('input', (e) => {
        state.customLength = parseFloat(e.target.value) || 2;
        renderModelUI();
    });

    customWidthSlider.addEventListener('input', (e) => {
        state.customWidth = parseFloat(e.target.value) || 2;
        renderModelUI();
    });

    customHeightSlider.addEventListener('input', (e) => {
        state.customHeight = parseFloat(e.target.value) || 2;
        renderModelUI();
    });

    chkCustomVeranda.addEventListener('change', (e) => {
        state.chkCustomVeranda = e.target.checked;
        renderModelUI();
    });

    customVerandaSlider.addEventListener('input', (e) => {
        state.customVerandaWidth = parseFloat(e.target.value) || 1;
        renderModelUI();
    });

    // Custom Selects updates
    [selCustomExterior, selCustomInterior, selCustomFloor, selCustomInsulation].forEach(el => {
        el.addEventListener('change', (e) => {
            state[el.id] = e.target.value;
            calculateBill();
        });
    });

    selCustomVerandaType.addEventListener('change', (e) => {
        state.customVerandaType = e.target.value;
        calculateBill();
    });

    chkCustomAssembly.addEventListener('change', (e) => {
        state.chkCustomAssembly = e.target.checked;
        calculateBill();
    });

    // Custom Mode structure selector cards
    document.querySelectorAll('#customTypeSelector .selector-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('#customTypeSelector .selector-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            state.customType = card.getAttribute('data-type');
            
            // Auto default height based on type
            if (state.customType.includes('house')) {
                state.customHeight = 2.4;
                customHeightSlider.value = 2.4;
            } else {
                state.customHeight = 2.1;
                customHeightSlider.value = 2.1;
            }

            renderModelUI();
        });
    });

    // Theme Switcher Toggle
    themeToggleBtn.addEventListener('click', () => {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', nextTheme);
    });

    // Admin Toggle Dialog
    adminToggleBtn.addEventListener('click', () => {
        renderAdminForm();
        adminModal.style.display = 'flex';
    });

    closeAdminBtn.addEventListener('click', () => {
        adminModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === adminModal) {
            adminModal.style.display = 'none';
        }
    });

    btnSaveConfig.addEventListener('click', saveAdminForm);

    btnResetConfig.addEventListener('click', () => {
        if (confirm("Вы хотите сбросить ВСЕ цены к заводским?")) {
            if (state.calculatorMode === 'custom') {
                localStorage.removeItem('mobistroy_custom_rates');
                customRates = {
                    rate_house_high: 12500,
                    rate_house_low: 10000,
                    rate_cabin: 8000,
                    rate_hozblok: 5500,
                    rate_container: 9000,
                    rate_veranda: 7500,
                    rate_ext_imitation: 250,
                    rate_ext_blockhouse: 1000,
                    rate_ext_proflist: 300,
                    rate_ext_osb: 300,
                    rate_int_osb: 300,
                    rate_int_lining: 400,
                    rate_int_mdf: 500,
                    rate_int_pvc: 500,
                    rate_ins_100: 550,
                    rate_ins_150: 1000,
                    rate_ins_200: 1500,
                    rate_floor_osb12: 500,
                    rate_floor_osb18: 700,
                    rate_floor_tongue28: 1000,
                    rate_floor_tongue36: 1250,
                    rate_assembly: 1000,
                    delivery_base_dist: 50,
                    delivery_base_price: 12000,
                    delivery_price_km: 100
                };
            } else {
                localStorage.removeItem('mobistroy_config');
            }
            loadConfig();
            adminModal.style.display = 'none';
            alert("Цены успешно сброшены.");
            renderTabs();
            renderModelUI();
        }
    });

    // Export config files (Admin download config.js)
    btnExportConfig.addEventListener('click', () => {
        let jsContent = '';
        if (state.calculatorMode === 'custom') {
            jsContent = `// Скопируйте и вставьте в config.js на замену:\n// window.CUSTOM_RATES = ${JSON.stringify(customRates, null, 2)};`;
        } else {
            jsContent = `window.DEFAULT_CONFIG = ${JSON.stringify(activeConfig, null, 2)};`;
        }
        const blob = new Blob([jsContent], { type: 'text/javascript;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'config.js';
        a.click();
        URL.revokeObjectURL(url);
    });

    // Delivery Slider hooks
    deliverySlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value) || 0;
        state.deliveryDistance = val;
        deliveryInput.value = val;
        calculateBill();
    });

    deliveryInput.addEventListener('change', (e) => {
        const val = Math.max(0, parseInt(e.target.value) || 0);
        state.deliveryDistance = val;
        deliverySlider.value = val;
        calculateBill();
    });

    // Predefined Mode Assembly hook
    optAssembly.addEventListener('change', (e) => {
        state.isAssemblyChecked = e.target.checked;
        calculateBill();
    });

    // Addition filter tab selections
    additionFilters.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            additionFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeAdditionFilter = btn.getAttribute('data-filter');
            renderAdditions();
        });
    });

    // Sharing and Clipboard Copy actions
    btnCopyClipboard.addEventListener('click', () => {
        const report = buildReportText();
        if (navigator.clipboard) {
            navigator.clipboard.writeText(report).then(() => {
                alert("Смета скопирована в буфер обмена!");
            }).catch(() => {
                alert("Ошибка копирования.");
            });
        }
    });


    // Standard projects rate hooks (for Kornilov House)
    document.querySelectorAll('#houseTypeList .selector-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('#houseTypeList .selector-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            state.houseTypeRate = parseInt(card.getAttribute('data-rate'));
            state.houseTypeHeight = parseFloat(card.getAttribute('data-height') || 2.2);
            renderModelUI();
        });
    });

    // Startup bootstrap rendering
    renderTabs();
    if (activeConfig.length > 0) {
        state.selectedSizeId = activeConfig[0].sizes[0]?.id || '';
        renderModelUI();
    }
})();
