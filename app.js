// Unified Custom Constructor & Standard Sheets Calculator

(function () {
    // 1. Data & State Initialization
    let activeConfig = [];
    let customRates = {
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
    }
    
    loadConfig();

    // Global Calculator State
    const state = {
        calculatorMode: 'custom', // 'custom' or 'standard'
        
        // Custom Mode params
        customType: 'house_high', // 'house_high', 'house_low', 'cabin', 'hozblok', 'container'
        customLength: 6.0,
        customWidth: 3.0,
        customHeight: 2.4,
        chkCustomVeranda: false,
        customVerandaWidth: 2.0,
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
            if (state.customType === 'house_high' || state.customType === 'house_low') {
                return activeConfig.find(m => m.name.includes("Дачный дом \"Каркасный\"")) || activeConfig[1];
            } else if (state.customType === 'container') {
                return activeConfig.find(m => m.name.includes("Блок-контейнер \"Стандарт\"")) || activeConfig[4];
            } else {
                return activeConfig.find(m => m.name.includes("Бытовка \"Стандарт\"")) || activeConfig[2];
            }
        }
        return activeConfig[state.activeModelIdx] || activeConfig[0];
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
            } else {
                lblCustomVerandaWidth.style.display = 'none';
                customVerandaSliderWrap.style.display = 'none';
            }

            // Assembly price update in UI
            const area = state.customLength * state.customWidth;
            const assemblyPrice = Math.round(area * customRates.rate_assembly);
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

    // Render additions rows (for both modes)
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
                if (activeAdditionFilter === 'windows' && !nameLower.includes('окн')) return;
                if (activeAdditionFilter === 'doors' && !nameLower.includes('двер')) return;
                if (activeAdditionFilter === 'area' && !add.type === 'area' && !nameLower.includes('пол') && !nameLower.includes('ваг') && !nameLower.includes('осб') && !nameLower.includes('стена') && !nameLower.includes('покраск')) return;
                if (activeAdditionFilter === 'other' && (nameLower.includes('окн') || nameLower.includes('двер') || add.type === 'area')) return;
            }

            const qty = state.additionQuantities[add.id] || 0;
            const price = add.price || 0;
            const total = qty * price;
            
            let recQty = 0;
            let recText = '';
            if (add.type === 'area') {
                if (add.name.toLowerCase().includes('стена') || add.name.toLowerCase().includes('стен')) {
                    const height = (state.calculatorMode === 'custom') ? state.customHeight : ((model.name.includes("Дачный дом \"Каркасный\"")) ? state.houseTypeHeight : 2.2);
                    recQty = Math.ceil(perimeter * height);
                    recText = `Стены: ${recQty} м²`;
                } else {
                    recQty = Math.ceil(area);
                    recText = `Пол: ${recQty} м²`;
                }
            }

            const applyLink = recText ? ` <a href="#" class="apply-rec-btn" data-val="${recQty}" style="font-size:11px; color:var(--primary); text-decoration:underline; margin-left:8px; cursor:pointer;" title="Подставить площадь в количество">${recText}</a>` : '';

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
            
            sizeName = `${state.customLength}х${state.customWidth}м`;

            // Base rate lookup based on category type selection
            const baseRate = customRates[`rate_${state.customType}`] || 8000;
            basePrice = area * baseRate;
            
            // Structure Label
            const structNames = {
                house_high: 'Дом высокий',
                house_low: 'Дом низкий',
                cabin: 'Бытовка',
                hozblok: 'Хозблок',
                container: 'Блок-контейнер'
            };
            selectedFinishName = structNames[state.customType] || 'Бытовка';

            // Veranda Cost
            let verandaCost = 0;
            if (state.chkCustomVeranda) {
                const verandaArea = state.customLength * state.customVerandaWidth;
                verandaCost = verandaArea * customRates.rate_veranda;
                floorSum += verandaCost; // add to floor options category
            }

            // Exterior Finish Upgrade
            let extCost = 0;
            if (state.selCustomExterior !== 'none') {
                const rate = customRates[`rate_ext_${state.selCustomExterior}`] || 0;
                extCost = wallArea * rate;
            }

            // Interior Finish Upgrade
            let intCost = 0;
            if (state.selCustomInterior !== 'none') {
                const rate = customRates[`rate_int_${state.selCustomInterior}`] || 0;
                intCost = wallArea * rate;
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
            if (state.selCustomInsulation !== '50') {
                if (state.selCustomInsulation === '0') {
                    // No insulation: negative value or 0
                } else {
                    const rate = customRates[`rate_ins_${state.selCustomInsulation}`] || 0;
                    insulationSum = area * rate;
                }
            }

            // Assembly Cost
            if (state.chkCustomAssembly) {
                assemblyPrice = Math.round(area * customRates.rate_assembly);
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
    function buildReportText() {
        const model = getActiveModel();
        
        let area = 0;
        let perimeter = 0;
        let sizeName = '';
        let structName = '';
        
        if (state.calculatorMode === 'custom') {
            area = state.customLength * state.customWidth;
            perimeter = 2 * (state.customLength + state.customWidth);
            sizeName = `${state.customLength}х${state.customWidth}м (H=${state.customHeight}м)`;
            const structNames = {
                house_high: 'Дом высокий',
                house_low: 'Дом низкий',
                cabin: 'Бытовка',
                hozblok: 'Хозблок',
                container: 'Блок-контейнер'
            };
            structName = structNames[state.customType] || 'Бытовка';
        } else {
            const size = model.sizes.find(s => s.id === state.selectedSizeId);
            const finish = model.finishes[state.selectedFinishIdx];
            area = size ? size.length * size.width : 0;
            perimeter = size ? 2 * (size.length + size.width) : 0;
            sizeName = size ? size.name : '';
            structName = finish ? `${model.name} (${finish.name})` : model.name;
        }

        let text = `📄 РАСЧЕТ СТОИМОСТИ СТРОИТЕЛЬСТВА\n`;
        text += `------------------------------------\n`;
        text += `🏠 Конструкция: ${structName}\n`;
        text += `📐 Размеры: ${sizeName} (${area.toFixed(1)} кв.м)\n`;
        
        if (state.calculatorMode === 'custom') {
            text += `🧱 Материалы отделки:\n`;
            
            const extNames = {
                none: 'Вагонка класса В',
                imitation: 'Имитация бруса',
                blockhouse: 'Блок-хаус',
                proflist: 'Профлист цветной',
                osb: 'ОСБ 12 мм'
            };
            const intNames = {
                none: 'ДВП',
                osb: 'ОСБ 9 мм',
                lining: 'Вагонка класса В',
                mdf: 'МДФ панели',
                pvc: 'ПВХ панели'
            };
            const floorNames = {
                none: 'Обрезная доска 25мм',
                osb12: 'ОСБ 12мм',
                osb18: 'ОСБ 18мм',
                tongue28: 'Шпунтованная доска 28мм',
                tongue36: 'Шпунтованная доска 36мм'
            };
            
            text += `  - Снаружи: ${extNames[state.selCustomExterior]}\n`;
            text += `  - Внутри: ${intNames[state.selCustomInterior]}\n`;
            text += `  - Утепление: ${state.selCustomInsulation === '0' ? 'Без утепления' : state.selCustomInsulation + ' мм'}\n`;
            text += `  - Пол: ${floorNames[state.selCustomFloor]}\n`;
        }

        text += `------------------------------------\n`;

        // Recalculating subtotals for summary formatting
        let basePrice = 0;
        let assemblyPrice = 0;
        let floorSum = 0;
        let insulationSum = 0;

        if (state.calculatorMode === 'custom') {
            const baseRate = customRates[`rate_${state.customType}`] || 8000;
            basePrice = area * baseRate;
            
            if (state.chkCustomVeranda) {
                const verandaArea = state.customLength * state.customVerandaWidth;
                floorSum += verandaArea * customRates.rate_veranda;
            }
            
            const wallArea = perimeter * state.customHeight;
            if (state.selCustomExterior !== 'none') {
                floorSum += wallArea * (customRates[`rate_ext_${state.selCustomExterior}`] || 0);
            }
            if (state.selCustomInterior !== 'none') {
                floorSum += wallArea * (customRates[`rate_int_${state.selCustomInterior}`] || 0);
            }
            if (state.selCustomFloor !== 'none') {
                floorSum += area * (customRates[`rate_floor_${state.selCustomFloor}`] || 0);
            }
            if (state.selCustomInsulation !== '50' && state.selCustomInsulation !== '0') {
                insulationSum = area * (customRates[`rate_ins_${state.selCustomInsulation}`] || 0);
            }
            if (state.chkCustomAssembly) {
                assemblyPrice = Math.round(area * customRates.rate_assembly);
            }
        } else {
            const size = model.sizes.find(s => s.id === state.selectedSizeId);
            const finish = model.finishes[state.selectedFinishIdx];
            
            if (model.name.includes("Дачный дом \"Каркасный\"")) {
                if (finish.name.includes("Вагонка 'ВС'")) {
                    basePrice = area * state.houseTypeRate;
                } else if (finish.name.includes("Имитация бруса")) {
                    const wallArea = perimeter * state.houseTypeHeight;
                    basePrice = (area * state.houseTypeRate) + wallArea * 250;
                } else {
                    basePrice = finish.prices[size.id] || 0;
                }
            } else {
                basePrice = finish.prices[size.id] || 0;
            }

            if (state.isAssemblyChecked) {
                assemblyPrice = finish.assembly[size.id] || model.assembly?.[size.id] || 0;
            }

            state.selectedFloorOptionIds.forEach(id => {
                const opt = model.floorOptions.find(o => o.id === id);
                if (opt) floorSum += (opt.prices[size.id] || 0);
            });

            state.selectedInsulationIds.forEach(id => {
                const opt = model.insulation.find(o => o.id === id);
                if (opt) insulationSum += (opt.prices[size.id] || 0);
            });
        }

        text += `• База: ${basePrice.toLocaleString('ru-RU')} руб.\n`;
        if (assemblyPrice > 0) text += `• Сборка: ${assemblyPrice.toLocaleString('ru-RU')} руб.\n`;
        if (floorSum > 0) text += `• Отделка и полы: ${floorSum.toLocaleString('ru-RU')} руб.\n`;
        if (insulationSum > 0) text += `• Утепление: ${insulationSum.toLocaleString('ru-RU')} руб.\n`;

        // Additions loop
        let addsText = "";
        model.additions.forEach(add => {
            const qty = state.additionQuantities[add.id] || 0;
            if (qty > 0) {
                addsText += `  - ${add.name}: ${qty} шт. (${(qty * add.price).toLocaleString('ru-RU')} руб.)\n`;
            }
        });
        if (addsText) {
            text += `➕ Доп. опции:\n${addsText}`;
        }

        // Delivery
        if (state.deliveryDistance > 0) {
            const baseDist = state.calculatorMode === 'custom' ? customRates.delivery_base_dist : model.delivery.baseDistance;
            const baseCost = state.calculatorMode === 'custom' ? customRates.delivery_base_price : model.delivery.basePrice;
            const kmRate = state.calculatorMode === 'custom' ? customRates.delivery_price_km : model.delivery.pricePerKm;
            const delPrice = state.deliveryDistance <= baseDist ? baseCost : baseCost + (state.deliveryDistance - baseDist) * kmRate;
            text += `🚚 Доставка (${state.deliveryDistance} км): ${delPrice.toLocaleString('ru-RU')} руб.\n`;
        } else {
            text += `🚚 Доставка: Самовывоз (0 руб.)\n`;
        }

        // Discount & VAT
        const subtotal = basePrice + assemblyPrice + floorSum + insulationSum;
        let additionsSum = 0;
        model.additions.forEach(add => {
            const qty = state.additionQuantities[add.id] || 0;
            additionsSum += qty * add.price;
        });
        const rawTotal = subtotal + additionsSum;

        if (state.isDiscountChecked) {
            const disc = Math.round(rawTotal * 0.1);
            text += `🏷️ Скидка 10%: -${disc.toLocaleString('ru-RU')} руб.\n`;
        }
        if (state.isVatChecked) {
            const discVal = state.isDiscountChecked ? Math.round(rawTotal * 0.1) : 0;
            const vat = Math.round((rawTotal - discVal) * 0.2);
            text += `🏦 НДС 20%: +${vat.toLocaleString('ru-RU')} руб.\n`;
        }

        let deliveryPrice = 0;
        if (state.deliveryDistance > 0) {
            const baseDist = state.calculatorMode === 'custom' ? customRates.delivery_base_dist : model.delivery.baseDistance;
            const baseCost = state.calculatorMode === 'custom' ? customRates.delivery_base_price : model.delivery.basePrice;
            const kmRate = state.calculatorMode === 'custom' ? customRates.delivery_price_km : model.delivery.pricePerKm;
            deliveryPrice = state.deliveryDistance <= baseDist ? baseCost : baseCost + (state.deliveryDistance - baseDist) * kmRate;
        }

        const finalTotal = rawTotal - (state.isDiscountChecked ? Math.round(rawTotal * 0.1) : 0) + (state.isVatChecked ? Math.round((rawTotal - (state.isDiscountChecked ? Math.round(rawTotal * 0.1) : 0)) * 0.2) : 0) + deliveryPrice;

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
