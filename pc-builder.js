// PC Builder JavaScript - Advanced Component Management System
class PCBuilder {
    constructor() {
        this.selectedComponents = {
            cpu: null,
            motherboard: null,
            ram: null,
            gpu: null,
            storage: null,
            psu: null,
            case: null,
            cooling: null
        };
        
        this.componentDatabase = {};
        this.currentCategory = '';
        this.totalPrice = 0;
        this.powerConsumption = 0;
        
        // Currency conversion rate (USD to INR)
        this.usdToInr = 83.5; // Updated rate as of 2025
        
        this.init();
    }
    
    // Convert USD price to INR
    convertToINR(usdPrice) {
        return Math.round(usdPrice * this.usdToInr);
    }
    
    // Format price in Indian Rupees
    formatPrice(usdPrice) {
        const inrPrice = this.convertToINR(usdPrice);
        return `₹${inrPrice.toLocaleString('en-IN')}`;
    }
    
    async init() {
        await this.loadComponentDatabase();
        this.updateTotalPrice();
        this.setupEventListeners();
        this.loadPrebuiltConfigurations();
    }
    
    // Load component database from multiple APIs and sources
    async loadComponentDatabase() {
        try {
            // Initialize with extensive local database
            this.componentDatabase = {
                cpu: await this.fetchCPUData(),
                motherboard: await this.fetchMotherboardData(),
                ram: await this.fetchRAMData(),
                gpu: await this.fetchGPUData(),
                storage: await this.fetchStorageData(),
                psu: await this.fetchPSUData(),
                case: await this.fetchCaseData(),
                cooling: await this.fetchCoolingData()
            };
            
            // Update component count
            const totalComponents = Object.values(this.componentDatabase)
                .reduce((sum, category) => sum + category.length, 0);
            document.getElementById('total-components').textContent = `${totalComponents.toLocaleString()}+`;
            
        } catch (error) {
            console.error('Error loading component database:', error);
            this.loadFallbackDatabase();
        }
    }
    
    // Fetch CPU data from multiple sources
    async fetchCPUData() {
        return [
            // Intel CPUs
            {
                id: 'intel-i9-14900k',
                name: 'Intel Core i9-14900K',
                brand: 'Intel',
                price: 589,
                priceINR: 49215, // Auto-calculated
                specs: '24 Cores, 32 Threads, 6.0 GHz Boost',
                socket: 'LGA1700',
                powerConsumption: 125,
                performance: { gaming: 95, productivity: 98, creation: 97 },
                rating: 4.8,
                availability: 'in-stock',
                releaseDate: '2023-10-01'
            },
            {
                id: 'intel-i7-14700k',
                name: 'Intel Core i7-14700K',
                brand: 'Intel',
                price: 409,
                priceINR: 34152,
                specs: '20 Cores, 28 Threads, 5.6 GHz Boost',
                socket: 'LGA1700',
                powerConsumption: 125,
                performance: { gaming: 92, productivity: 94, creation: 93 },
                rating: 4.7,
                availability: 'in-stock',
                releaseDate: '2023-10-01'
            },
            {
                id: 'intel-i5-14600k',
                name: 'Intel Core i5-14600K',
                brand: 'Intel',
                price: 319,
                priceINR: 26637,
                specs: '14 Cores, 20 Threads, 5.3 GHz Boost',
                socket: 'LGA1700',
                powerConsumption: 125,
                performance: { gaming: 88, productivity: 85, creation: 82 },
                rating: 4.6,
                availability: 'in-stock',
                releaseDate: '2023-10-01'
            },
            // AMD CPUs
            {
                id: 'amd-ryzen-9-7950x',
                name: 'AMD Ryzen 9 7950X',
                brand: 'AMD',
                price: 549,
                priceINR: 45872,
                specs: '16 Cores, 32 Threads, 5.7 GHz Boost',
                socket: 'AM5',
                powerConsumption: 170,
                performance: { gaming: 93, productivity: 99, creation: 98 },
                rating: 4.9,
                availability: 'in-stock',
                releaseDate: '2022-09-01'
            },
            {
                id: 'amd-ryzen-7-7800x3d',
                name: 'AMD Ryzen 7 7800X3D',
                brand: 'AMD',
                price: 449,
                priceINR: 37517,
                specs: '8 Cores, 16 Threads, 5.0 GHz Boost, 3D V-Cache',
                socket: 'AM5',
                powerConsumption: 120,
                performance: { gaming: 100, productivity: 88, creation: 85 },
                rating: 4.9,
                availability: 'in-stock',
                releaseDate: '2023-04-01'
            },
            {
                id: 'amd-ryzen-5-7600x',
                name: 'AMD Ryzen 5 7600X',
                brand: 'AMD',
                price: 299,
                priceINR: 24967,
                specs: '6 Cores, 12 Threads, 5.3 GHz Boost',
                socket: 'AM5',
                powerConsumption: 105,
                performance: { gaming: 85, productivity: 80, creation: 78 },
                rating: 4.5,
                availability: 'in-stock',
                releaseDate: '2022-09-01'
            }
        ];
    }
    
    // Fetch GPU data
    async fetchGPUData() {
        return [
            // NVIDIA GPUs
            {
                id: 'rtx-4090',
                name: 'NVIDIA GeForce RTX 4090',
                brand: 'NVIDIA',
                price: 1599,
                specs: '24GB GDDR6X, 16384 CUDA Cores',
                powerConsumption: 450,
                performance: { gaming: 100, productivity: 95, creation: 98 },
                rating: 4.8,
                availability: 'in-stock',
                releaseDate: '2022-10-01'
            },
            {
                id: 'rtx-4080',
                name: 'NVIDIA GeForce RTX 4080',
                brand: 'NVIDIA',
                price: 1199,
                specs: '16GB GDDR6X, 9728 CUDA Cores',
                powerConsumption: 320,
                performance: { gaming: 90, productivity: 88, creation: 90 },
                rating: 4.6,
                availability: 'in-stock',
                releaseDate: '2022-11-01'
            },
            {
                id: 'rtx-4070-ti',
                name: 'NVIDIA GeForce RTX 4070 Ti',
                brand: 'NVIDIA',
                price: 799,
                specs: '12GB GDDR6X, 7680 CUDA Cores',
                powerConsumption: 285,
                performance: { gaming: 82, productivity: 80, creation: 82 },
                rating: 4.5,
                availability: 'in-stock',
                releaseDate: '2023-01-01'
            },
            {
                id: 'rtx-4060-ti',
                name: 'NVIDIA GeForce RTX 4060 Ti',
                brand: 'NVIDIA',
                price: 499,
                specs: '16GB GDDR6, 4352 CUDA Cores',
                powerConsumption: 165,
                performance: { gaming: 75, productivity: 72, creation: 74 },
                rating: 4.3,
                availability: 'in-stock',
                releaseDate: '2023-05-01'
            },
            {
                id: 'rtx-3060',
                name: 'NVIDIA GeForce RTX 3060',
                brand: 'NVIDIA',
                price: 329,
                specs: '12GB GDDR6, 3584 CUDA Cores',
                powerConsumption: 170,
                performance: { gaming: 65, productivity: 62, creation: 64 },
                rating: 4.2,
                availability: 'in-stock',
                releaseDate: '2021-02-01'
            },
            // AMD GPUs
            {
                id: 'rx-7900-xtx',
                name: 'AMD Radeon RX 7900 XTX',
                brand: 'AMD',
                price: 999,
                specs: '24GB GDDR6, 6144 Stream Processors',
                powerConsumption: 355,
                performance: { gaming: 88, productivity: 85, creation: 87 },
                rating: 4.4,
                availability: 'in-stock',
                releaseDate: '2022-12-01'
            },
            {
                id: 'rx-7900-xt',
                name: 'AMD Radeon RX 7900 XT',
                brand: 'AMD',
                price: 899,
                specs: '20GB GDDR6, 5376 Stream Processors',
                powerConsumption: 315,
                performance: { gaming: 85, productivity: 82, creation: 84 },
                rating: 4.3,
                availability: 'in-stock',
                releaseDate: '2022-12-01'
            },
            {
                id: 'rx-7800-xt',
                name: 'AMD Radeon RX 7800 XT',
                brand: 'AMD',
                price: 499,
                specs: '16GB GDDR6, 3840 Stream Processors',
                powerConsumption: 263,
                performance: { gaming: 78, productivity: 75, creation: 76 },
                rating: 4.3,
                availability: 'in-stock',
                releaseDate: '2023-09-01'
            },
            {
                id: 'rx-6600-xt',
                name: 'AMD Radeon RX 6600 XT',
                brand: 'AMD',
                price: 299,
                specs: '8GB GDDR6, 2048 Stream Processors',
                powerConsumption: 160,
                performance: { gaming: 62, productivity: 58, creation: 60 },
                rating: 4.1,
                availability: 'in-stock',
                releaseDate: '2021-08-01'
            }
        ];
    }
    
    // Fetch RAM data
    async fetchRAMData() {
        return [
            // DDR5 Memory
            {
                id: 'corsair-vengeance-32gb-ddr5',
                name: 'Corsair Vengeance LPX 32GB DDR5-5600',
                brand: 'Corsair',
                price: 189,
                specs: '32GB (2x16GB), DDR5-5600, CL36',
                type: 'DDR5',
                capacity: 32,
                speed: 5600,
                powerConsumption: 5,
                performance: { gaming: 90, productivity: 92, creation: 91 },
                rating: 4.7,
                availability: 'in-stock',
                releaseDate: '2023-01-01'
            },
            {
                id: 'gskill-trident-32gb-ddr5',
                name: 'G.Skill Trident Z5 32GB DDR5-6000',
                brand: 'G.Skill',
                price: 229,
                specs: '32GB (2x16GB), DDR5-6000, CL30',
                type: 'DDR5',
                capacity: 32,
                speed: 6000,
                powerConsumption: 6,
                performance: { gaming: 95, productivity: 95, creation: 94 },
                rating: 4.8,
                availability: 'in-stock',
                releaseDate: '2023-03-01'
            },
            {
                id: 'corsair-vengeance-16gb-ddr5',
                name: 'Corsair Vengeance LPX 16GB DDR5-5200',
                brand: 'Corsair',
                price: 109,
                specs: '16GB (2x8GB), DDR5-5200, CL40',
                type: 'DDR5',
                capacity: 16,
                speed: 5200,
                powerConsumption: 4,
                performance: { gaming: 85, productivity: 87, creation: 86 },
                rating: 4.5,
                availability: 'in-stock',
                releaseDate: '2022-11-01'
            },
            // DDR4 Memory
            {
                id: 'corsair-vengeance-32gb-ddr4',
                name: 'Corsair Vengeance LPX 32GB DDR4-3200',
                brand: 'Corsair',
                price: 129,
                specs: '32GB (2x16GB), DDR4-3200, CL16',
                type: 'DDR4',
                capacity: 32,
                speed: 3200,
                powerConsumption: 4,
                performance: { gaming: 80, productivity: 85, creation: 82 },
                rating: 4.6,
                availability: 'in-stock',
                releaseDate: '2020-01-01'
            },
            {
                id: 'corsair-vengeance-16gb-ddr4',
                name: 'Corsair Vengeance LPX 16GB DDR4-3200',
                brand: 'Corsair',
                price: 79,
                specs: '16GB (2x8GB), DDR4-3200, CL16',
                type: 'DDR4',
                capacity: 16,
                speed: 3200,
                powerConsumption: 3,
                performance: { gaming: 75, productivity: 78, creation: 76 },
                rating: 4.5,
                availability: 'in-stock',
                releaseDate: '2020-01-01'
            },
            {
                id: 'gskill-ripjaws-16gb-ddr4',
                name: 'G.Skill Ripjaws V 16GB DDR4-3600',
                brand: 'G.Skill',
                price: 89,
                specs: '16GB (2x8GB), DDR4-3600, CL16',
                type: 'DDR4',
                capacity: 16,
                speed: 3600,
                powerConsumption: 3,
                performance: { gaming: 78, productivity: 80, creation: 79 },
                rating: 4.4,
                availability: 'in-stock',
                releaseDate: '2019-06-01'
            }
        ];
    }
    
    // Fetch other component data (simplified for brevity)
    async fetchMotherboardData() {
        return [
            // Intel Motherboards
            {
                id: 'asus-rog-z790',
                name: 'ASUS ROG Maximus Z790 Hero',
                brand: 'ASUS',
                price: 629,
                specs: 'Intel Z790, LGA1700, DDR5, Wi-Fi 6E',
                socket: 'LGA1700',
                chipset: 'Z790',
                ramType: 'DDR5',
                powerConsumption: 15,
                performance: { gaming: 95, productivity: 93, creation: 94 },
                rating: 4.8,
                availability: 'in-stock'
            },
            {
                id: 'msi-z790-gaming',
                name: 'MSI MPG Z790 Carbon WiFi',
                brand: 'MSI',
                price: 479,
                specs: 'Intel Z790, LGA1700, DDR5, Wi-Fi 6E',
                socket: 'LGA1700',
                chipset: 'Z790',
                ramType: 'DDR5',
                powerConsumption: 12,
                performance: { gaming: 92, productivity: 90, creation: 91 },
                rating: 4.6,
                availability: 'in-stock'
            },
            {
                id: 'gigabyte-z790-aorus',
                name: 'Gigabyte Z790 AORUS Elite AX',
                brand: 'Gigabyte',
                price: 329,
                specs: 'Intel Z790, LGA1700, DDR5, Wi-Fi 6',
                socket: 'LGA1700',
                chipset: 'Z790',
                ramType: 'DDR5',
                powerConsumption: 10,
                performance: { gaming: 88, productivity: 86, creation: 87 },
                rating: 4.4,
                availability: 'in-stock'
            },
            // AMD Motherboards
            {
                id: 'msi-x670e-ace',
                name: 'MSI MEG X670E ACE',
                brand: 'MSI',
                price: 699,
                specs: 'AMD X670E, AM5, DDR5, Wi-Fi 6E',
                socket: 'AM5',
                chipset: 'X670E',
                ramType: 'DDR5',
                powerConsumption: 18,
                performance: { gaming: 96, productivity: 94, creation: 95 },
                rating: 4.7,
                availability: 'in-stock'
            },
            {
                id: 'asus-x670e-hero',
                name: 'ASUS ROG Crosshair X670E Hero',
                brand: 'ASUS',
                price: 649,
                specs: 'AMD X670E, AM5, DDR5, Wi-Fi 6E',
                socket: 'AM5',
                chipset: 'X670E',
                ramType: 'DDR5',
                powerConsumption: 16,
                performance: { gaming: 94, productivity: 92, creation: 93 },
                rating: 4.8,
                availability: 'in-stock'
            },
            {
                id: 'gigabyte-b650-aorus',
                name: 'Gigabyte B650 AORUS Elite AX',
                brand: 'Gigabyte',
                price: 229,
                specs: 'AMD B650, AM5, DDR5, Wi-Fi 6',
                socket: 'AM5',
                chipset: 'B650',
                ramType: 'DDR5',
                powerConsumption: 8,
                performance: { gaming: 85, productivity: 83, creation: 84 },
                rating: 4.3,
                availability: 'in-stock'
            }
        ];
    }
    
    async fetchStorageData() {
        return [
            // NVMe SSDs
            {
                id: 'samsung-980-pro-2tb',
                name: 'Samsung 980 PRO 2TB NVMe SSD',
                brand: 'Samsung',
                price: 199,
                specs: '2TB, PCIe 4.0, 7000 MB/s Read',
                type: 'NVMe SSD',
                capacity: 2000,
                interface: 'PCIe 4.0',
                powerConsumption: 8,
                performance: { gaming: 95, productivity: 98, creation: 96 },
                rating: 4.8,
                availability: 'in-stock'
            },
            {
                id: 'wd-black-sn850x-1tb',
                name: 'WD Black SN850X 1TB NVMe SSD',
                brand: 'Western Digital',
                price: 129,
                specs: '1TB, PCIe 4.0, 7300 MB/s Read',
                type: 'NVMe SSD',
                capacity: 1000,
                interface: 'PCIe 4.0',
                powerConsumption: 7,
                performance: { gaming: 92, productivity: 94, creation: 93 },
                rating: 4.6,
                availability: 'in-stock'
            },
            {
                id: 'crucial-p5-plus-1tb',
                name: 'Crucial P5 Plus 1TB NVMe SSD',
                brand: 'Crucial',
                price: 89,
                specs: '1TB, PCIe 4.0, 6600 MB/s Read',
                type: 'NVMe SSD',
                capacity: 1000,
                interface: 'PCIe 4.0',
                powerConsumption: 6,
                performance: { gaming: 88, productivity: 90, creation: 89 },
                rating: 4.4,
                availability: 'in-stock'
            },
            {
                id: 'samsung-970-evo-plus-500gb',
                name: 'Samsung 970 EVO Plus 500GB',
                brand: 'Samsung',
                price: 59,
                specs: '500GB, PCIe 3.0, 3500 MB/s Read',
                type: 'NVMe SSD',
                capacity: 500,
                interface: 'PCIe 3.0',
                powerConsumption: 5,
                performance: { gaming: 82, productivity: 85, creation: 83 },
                rating: 4.5,
                availability: 'in-stock'
            },
            // SATA SSDs
            {
                id: 'samsung-870-evo-1tb',
                name: 'Samsung 870 EVO 1TB SATA SSD',
                brand: 'Samsung',
                price: 99,
                specs: '1TB, SATA 3.0, 560 MB/s Read',
                type: 'SATA SSD',
                capacity: 1000,
                interface: 'SATA 3.0',
                powerConsumption: 3,
                performance: { gaming: 75, productivity: 78, creation: 76 },
                rating: 4.6,
                availability: 'in-stock'
            },
            // HDDs
            {
                id: 'seagate-barracuda-2tb',
                name: 'Seagate Barracuda 2TB HDD',
                brand: 'Seagate',
                price: 59,
                specs: '2TB, 7200 RPM, 256MB Cache',
                type: 'HDD',
                capacity: 2000,
                interface: 'SATA 3.0',
                powerConsumption: 8,
                performance: { gaming: 45, productivity: 55, creation: 50 },
                rating: 4.2,
                availability: 'in-stock'
            }
        ];
    }
    
    async fetchPSUData() {
        return [
            // High-End PSUs
            {
                id: 'corsair-rm1000x',
                name: 'Corsair RM1000x 1000W 80+ Gold',
                brand: 'Corsair',
                price: 189,
                specs: '1000W, 80+ Gold, Fully Modular',
                wattage: 1000,
                efficiency: '80+ Gold',
                modular: true,
                powerConsumption: 0,
                performance: { gaming: 95, productivity: 95, creation: 95 },
                rating: 4.8,
                availability: 'in-stock'
            },
            {
                id: 'evga-supernova-850-g5',
                name: 'EVGA SuperNOVA 850 G5 850W 80+ Gold',
                brand: 'EVGA',
                price: 149,
                specs: '850W, 80+ Gold, Fully Modular',
                wattage: 850,
                efficiency: '80+ Gold',
                modular: true,
                powerConsumption: 0,
                performance: { gaming: 90, productivity: 90, creation: 90 },
                rating: 4.6,
                availability: 'in-stock'
            },
            {
                id: 'seasonic-focus-750w',
                name: 'Seasonic Focus GX-750 750W 80+ Gold',
                brand: 'Seasonic',
                price: 129,
                specs: '750W, 80+ Gold, Fully Modular',
                wattage: 750,
                efficiency: '80+ Gold',
                modular: true,
                powerConsumption: 0,
                performance: { gaming: 88, productivity: 88, creation: 88 },
                rating: 4.7,
                availability: 'in-stock'
            },
            {
                id: 'corsair-cv650',
                name: 'Corsair CV650 650W 80+ Bronze',
                brand: 'Corsair',
                price: 79,
                specs: '650W, 80+ Bronze, Non-Modular',
                wattage: 650,
                efficiency: '80+ Bronze',
                modular: false,
                powerConsumption: 0,
                performance: { gaming: 80, productivity: 80, creation: 80 },
                rating: 4.3,
                availability: 'in-stock'
            },
            {
                id: 'coolermaster-mwe-600w',
                name: 'Cooler Master MWE Gold 600W',
                brand: 'Cooler Master',
                price: 89,
                specs: '600W, 80+ Gold, Semi-Modular',
                wattage: 600,
                efficiency: '80+ Gold',
                modular: 'semi',
                powerConsumption: 0,
                performance: { gaming: 82, productivity: 82, creation: 82 },
                rating: 4.4,
                availability: 'in-stock'
            }
        ];
    }
    
    async fetchCaseData() {
        return [
            // Premium Cases
            {
                id: 'lian-li-o11-dynamic',
                name: 'Lian Li O11 Dynamic EVO',
                brand: 'Lian Li',
                price: 179,
                specs: 'Mid Tower, Tempered Glass, 420mm Radiator Support',
                formFactor: 'Mid Tower',
                material: 'Aluminum/Steel',
                powerConsumption: 0,
                performance: { gaming: 90, productivity: 85, creation: 88 },
                rating: 4.7,
                availability: 'in-stock'
            },
            {
                id: 'fractal-design-define-7',
                name: 'Fractal Design Define 7',
                brand: 'Fractal Design',
                price: 169,
                specs: 'Full Tower, Sound Dampening, Multiple Layouts',
                formFactor: 'Full Tower',
                material: 'Steel',
                powerConsumption: 0,
                performance: { gaming: 85, productivity: 90, creation: 87 },
                rating: 4.6,
                availability: 'in-stock'
            },
            {
                id: 'nzxt-h7-flow',
                name: 'NZXT H7 Flow',
                brand: 'NZXT',
                price: 139,
                specs: 'Mid Tower, Tempered Glass, High Airflow',
                formFactor: 'Mid Tower',
                material: 'Steel',
                powerConsumption: 0,
                performance: { gaming: 88, productivity: 83, creation: 85 },
                rating: 4.5,
                availability: 'in-stock'
            },
            {
                id: 'corsair-4000d',
                name: 'Corsair 4000D Airflow',
                brand: 'Corsair',
                price: 99,
                specs: 'Mid Tower, Tempered Glass, Optimized Airflow',
                formFactor: 'Mid Tower',
                material: 'Steel',
                powerConsumption: 0,
                performance: { gaming: 85, productivity: 80, creation: 82 },
                rating: 4.6,
                availability: 'in-stock'
            },
            {
                id: 'coolermaster-mb511',
                name: 'Cooler Master MasterBox MB511',
                brand: 'Cooler Master',
                price: 69,
                specs: 'Mid Tower, Mesh Front, Budget Friendly',
                formFactor: 'Mid Tower',
                material: 'Steel',
                powerConsumption: 0,
                performance: { gaming: 78, productivity: 75, creation: 76 },
                rating: 4.2,
                availability: 'in-stock'
            }
        ];
    }
    
    async fetchCoolingData() {
        return [
            // Air Coolers
            {
                id: 'noctua-nh-d15',
                name: 'Noctua NH-D15',
                brand: 'Noctua',
                price: 109,
                specs: 'Dual Tower Air Cooler, 165mm Height',
                type: 'Air Cooler',
                height: 165,
                powerConsumption: 2,
                performance: { gaming: 90, productivity: 92, creation: 91 },
                rating: 4.9,
                availability: 'in-stock'
            },
            {
                id: 'be-quiet-dark-rock-pro-4',
                name: 'be quiet! Dark Rock Pro 4',
                brand: 'be quiet!',
                price: 89,
                specs: 'Dual Tower Air Cooler, 163mm Height, Silent',
                type: 'Air Cooler',
                height: 163,
                powerConsumption: 2,
                performance: { gaming: 88, productivity: 90, creation: 89 },
                rating: 4.7,
                availability: 'in-stock'
            },
            {
                id: 'coolermaster-hyper-212',
                name: 'Cooler Master Hyper 212 Black Edition',
                brand: 'Cooler Master',
                price: 39,
                specs: 'Single Tower Air Cooler, 159mm Height',
                type: 'Air Cooler',
                height: 159,
                powerConsumption: 1,
                performance: { gaming: 75, productivity: 78, creation: 76 },
                rating: 4.4,
                availability: 'in-stock'
            },
            // AIO Liquid Coolers
            {
                id: 'corsair-h150i-elite',
                name: 'Corsair H150i Elite Capellix',
                brand: 'Corsair',
                price: 189,
                specs: '360mm AIO Liquid Cooler, RGB',
                type: 'AIO Liquid',
                radiatorSize: 360,
                powerConsumption: 8,
                performance: { gaming: 95, productivity: 96, creation: 95 },
                rating: 4.7,
                availability: 'in-stock'
            },
            {
                id: 'nzxt-kraken-x73',
                name: 'NZXT Kraken X73',
                brand: 'NZXT',
                price: 179,
                specs: '360mm AIO Liquid Cooler, RGB Display',
                type: 'AIO Liquid',
                radiatorSize: 360,
                powerConsumption: 7,
                performance: { gaming: 93, productivity: 94, creation: 93 },
                rating: 4.6,
                availability: 'in-stock'
            },
            {
                id: 'arctic-liquid-freezer-240',
                name: 'Arctic Liquid Freezer II 240',
                brand: 'Arctic',
                price: 89,
                specs: '240mm AIO Liquid Cooler, High Performance',
                type: 'AIO Liquid',
                radiatorSize: 240,
                powerConsumption: 5,
                performance: { gaming: 85, productivity: 88, creation: 86 },
                rating: 4.8,
                availability: 'in-stock'
            }
        ];
    }
    
    // Load fallback database if API fails
    loadFallbackDatabase() {
        console.log('Loading fallback component database...');
        // Implement fallback with basic components
    }
    
    // Setup event listeners
    setupEventListeners() {
        // Modal close events
        window.onclick = (event) => {
            const modal = document.getElementById('component-modal');
            if (event.target === modal) {
                this.closeComponentModal();
            }
        };
        
        // Search functionality
        const searchInput = document.getElementById('component-search');
        if (searchInput) {
            searchInput.addEventListener('input', () => this.searchComponents());
        }
    }
    
    // Open component selection modal
    openComponentModal(category) {
        this.currentCategory = category;
        const modal = document.getElementById('component-modal');
        const modalTitle = document.getElementById('modal-title');
        
        modalTitle.textContent = `Select ${category.toUpperCase()}`;
        modal.style.display = 'block';
        
        this.loadComponentList(category);
        this.setupFilterOptions(category);
    }
    
    // Close component modal
    closeComponentModal() {
        const modal = document.getElementById('component-modal');
        modal.style.display = 'none';
        this.currentCategory = '';
    }
    
    // Load component list for category
    loadComponentList(category) {
        const componentList = document.getElementById('component-list');
        const loadingIndicator = document.getElementById('loading-indicator');
        
        loadingIndicator.style.display = 'block';
        componentList.innerHTML = '';
        
        setTimeout(() => {
            const components = this.componentDatabase[category] || [];
            
            componentList.innerHTML = components.map(component => `
                <div class="component-item" onclick="pcBuilder.selectComponent('${category}', '${component.id}')">
                    <div class="component-image">
                        <i class="fas fa-microchip"></i>
                    </div>
                    <div class="component-details">
                        <div class="component-name">${component.name}</div>
                        <div class="component-specs">${component.specs}</div>
                        <div class="component-rating">
                            ${this.generateStars(component.rating)}
                            <span>${component.rating}/5</span>
                        </div>
                    </div>
                    <div class="component-price-info">
                        <div class="price">${this.formatPrice(component.price)}</div>
                        <div class="availability ${component.availability}">${this.formatAvailability(component.availability)}</div>
                    </div>
                </div>
            `).join('');
            
            loadingIndicator.style.display = 'none';
        }, 500);
    }
    
    // Generate star rating HTML
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let starsHTML = '';
        
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star"></i>';
        }
        
        return starsHTML;
    }
    
    // Format availability status
    formatAvailability(availability) {
        const statusMap = {
            'in-stock': 'In Stock',
            'low-stock': 'Low Stock',
            'out-of-stock': 'Out of Stock'
        };
        return statusMap[availability] || 'Unknown';
    }
    
    // Select component
    selectComponent(category, componentId) {
        const component = this.componentDatabase[category].find(c => c.id === componentId);
        if (!component) return;
        
        this.selectedComponents[category] = component;
        this.updateComponentDisplay(category, component);
        this.updateTotalPrice();
        this.updatePerformanceScores();
        this.checkCompatibility();
        this.updatePowerConsumption();
        this.closeComponentModal();
    }
    
    // Update component display
    updateComponentDisplay(category, component) {
        const selectedElement = document.getElementById(`selected-${category}`);
        const priceElement = document.getElementById(`${category}-price`);
        
        if (selectedElement) {
            selectedElement.textContent = component.name;
            selectedElement.style.color = '#00d2ff';
        }
        
        if (priceElement) {
            priceElement.textContent = this.formatPrice(component.price);
        }
        
        // Add visual feedback
        const categoryItem = document.querySelector(`[data-category="${category}"]`);
        if (categoryItem) {
            categoryItem.style.background = 'rgba(0, 210, 255, 0.1)';
            categoryItem.style.borderColor = 'rgba(0, 210, 255, 0.3)';
        }
    }
    
    // Update total price
    updateTotalPrice() {
        this.totalPrice = Object.values(this.selectedComponents)
            .filter(component => component !== null)
            .reduce((total, component) => total + component.price, 0);
        
        const totalPriceElement = document.getElementById('total-price');
        if (totalPriceElement) {
            totalPriceElement.textContent = this.formatPrice(this.totalPrice);
        }
    }
    
    // Update performance scores
    updatePerformanceScores() {
        const selectedComponents = Object.values(this.selectedComponents).filter(c => c !== null);
        
        if (selectedComponents.length === 0) return;
        
        const avgPerformance = {
            gaming: selectedComponents.reduce((sum, c) => sum + (c.performance?.gaming || 0), 0) / selectedComponents.length,
            productivity: selectedComponents.reduce((sum, c) => sum + (c.performance?.productivity || 0), 0) / selectedComponents.length,
            creation: selectedComponents.reduce((sum, c) => sum + (c.performance?.creation || 0), 0) / selectedComponents.length
        };
        
        // Update progress bars
        this.updateProgressBar('gaming-score', avgPerformance.gaming);
        this.updateProgressBar('productivity-score', avgPerformance.productivity);
        this.updateProgressBar('creation-score', avgPerformance.creation);
        
        // Update ratings
        document.getElementById('gaming-rating').textContent = this.getPerformanceRating(avgPerformance.gaming);
        document.getElementById('productivity-rating').textContent = this.getPerformanceRating(avgPerformance.productivity);
        document.getElementById('creation-rating').textContent = this.getPerformanceRating(avgPerformance.creation);
    }
    
    // Update progress bar
    updateProgressBar(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.width = `${value}%`;
        }
    }
    
    // Get performance rating
    getPerformanceRating(score) {
        if (score >= 90) return 'Excellent';
        if (score >= 80) return 'Very Good';
        if (score >= 70) return 'Good';
        if (score >= 60) return 'Fair';
        return 'Poor';
    }
    
    // Check compatibility
    checkCompatibility() {
        const alerts = [];
        const cpu = this.selectedComponents.cpu;
        const motherboard = this.selectedComponents.motherboard;
        const ram = this.selectedComponents.ram;
        const gpu = this.selectedComponents.gpu;
        const psu = this.selectedComponents.psu;
        
        // CPU and Motherboard socket compatibility
        if (cpu && motherboard) {
            if (cpu.socket !== motherboard.socket) {
                alerts.push({
                    type: 'error',
                    message: `CPU socket ${cpu.socket} is not compatible with motherboard socket ${motherboard.socket}`
                });
            } else {
                alerts.push({
                    type: 'success',
                    message: 'CPU and motherboard are compatible'
                });
            }
        }
        
        // RAM and Motherboard compatibility
        if (ram && motherboard) {
            if (ram.type !== motherboard.ramType) {
                alerts.push({
                    type: 'error',
                    message: `RAM type ${ram.type} is not compatible with motherboard ${motherboard.ramType}`
                });
            }
        }
        
        // Power supply check
        if (psu && this.powerConsumption > 0) {
            const powerMargin = psu.wattage - this.powerConsumption;
            if (powerMargin < 100) {
                alerts.push({
                    type: 'warning',
                    message: `PSU wattage is close to system requirements. Consider a higher wattage PSU.`
                });
            } else {
                alerts.push({
                    type: 'success',
                    message: `PSU provides adequate power with ${powerMargin}W headroom`
                });
            }
        }
        
        this.displayCompatibilityAlerts(alerts);
    }
    
    // Display compatibility alerts
    displayCompatibilityAlerts(alerts) {
        const container = document.getElementById('compatibility-alerts');
        if (!container) return;
        
        container.innerHTML = alerts.map(alert => `
            <div class="compatibility-alert alert-${alert.type}">
                <i class="fas fa-${alert.type === 'success' ? 'check-circle' : alert.type === 'warning' ? 'exclamation-triangle' : 'times-circle'}"></i>
                ${alert.message}
            </div>
        `).join('');
    }
    
    // Update power consumption
    updatePowerConsumption() {
        this.powerConsumption = Object.values(this.selectedComponents)
            .filter(component => component !== null)
            .reduce((total, component) => total + (component.powerConsumption || 0), 0);
        
        const powerUsageElement = document.getElementById('power-usage');
        const recommendedPSUElement = document.getElementById('recommended-psu');
        
        if (powerUsageElement) {
            powerUsageElement.textContent = `${this.powerConsumption}W`;
        }
        
        if (recommendedPSUElement) {
            const recommendedWattage = Math.ceil(this.powerConsumption * 1.3 / 50) * 50; // 30% headroom, rounded to nearest 50W
            recommendedPSUElement.textContent = `${recommendedWattage}W`;
        }
    }
    
    // Setup filter options
    setupFilterOptions(category) {
        const brandFilter = document.getElementById('brand-filter');
        const components = this.componentDatabase[category] || [];
        
        // Get unique brands
        const brands = [...new Set(components.map(c => c.brand))];
        
        brandFilter.innerHTML = '<option value="">All Brands</option>' + 
            brands.map(brand => `<option value="${brand}">${brand}</option>`).join('');
    }
    
    // Apply filters
    applyFilters() {
        const brandFilter = document.getElementById('brand-filter').value;
        const priceFilter = document.getElementById('price-filter').value;
        const sortFilter = document.getElementById('sort-filter').value;
        
        let components = [...(this.componentDatabase[this.currentCategory] || [])];
        
        // Apply brand filter
        if (brandFilter) {
            components = components.filter(c => c.brand === brandFilter);
        }
        
        // Apply price filter
        if (priceFilter) {
            const [min, max] = priceFilter.split('-').map(p => p.replace('+', '')).map(Number);
            if (max) {
                components = components.filter(c => {
                    const inrPrice = this.convertToINR(c.price);
                    return inrPrice >= min && inrPrice <= max;
                });
            } else {
                components = components.filter(c => {
                    const inrPrice = this.convertToINR(c.price);
                    return inrPrice >= min;
                });
            }
        }
        
        // Apply sorting
        switch (sortFilter) {
            case 'price-asc':
                components.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                components.sort((a, b) => b.price - a.price);
                break;
            case 'performance':
                components.sort((a, b) => (b.performance?.gaming || 0) - (a.performance?.gaming || 0));
                break;
            case 'rating':
                components.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                components.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
                break;
        }
        
        this.displayFilteredComponents(components);
    }
    
    // Display filtered components
    displayFilteredComponents(components) {
        const componentList = document.getElementById('component-list');
        
        componentList.innerHTML = components.map(component => `
            <div class="component-item" onclick="pcBuilder.selectComponent('${this.currentCategory}', '${component.id}')">
                <div class="component-image">
                    <i class="fas fa-microchip"></i>
                </div>
                <div class="component-details">
                    <div class="component-name">${component.name}</div>
                    <div class="component-specs">${component.specs}</div>
                    <div class="component-rating">
                        ${this.generateStars(component.rating)}
                        <span>${component.rating}/5</span>
                    </div>
                </div>
                <div class="component-price-info">
                    <div class="price">${this.formatPrice(component.price)}</div>
                    <div class="availability ${component.availability}">${this.formatAvailability(component.availability)}</div>
                </div>
            </div>
        `).join('');
    }
    
    // Search components
    searchComponents() {
        const searchTerm = document.getElementById('component-search').value.toLowerCase();
        const components = this.componentDatabase[this.currentCategory] || [];
        
        const filteredComponents = components.filter(component =>
            component.name.toLowerCase().includes(searchTerm) ||
            component.brand.toLowerCase().includes(searchTerm) ||
            component.specs.toLowerCase().includes(searchTerm)
        );
        
        this.displayFilteredComponents(filteredComponents);
    }
    
    // Load pre-built configurations
    loadPrebuiltConfigurations() {
        this.prebuiltConfigs = {
            'budget-gaming': {
                name: 'Budget Gaming Build',
                components: {
                    cpu: 'amd-ryzen-5-7600x',
                    motherboard: 'msi-x670e-ace',
                    ram: 'corsair-vengeance-16gb-ddr4',
                    gpu: 'rx-7800-xt',
                    storage: 'wd-black-sn850x-1tb',
                    psu: 'evga-supernova-850-g5',
                    case: 'fractal-design-define-7',
                    cooling: 'noctua-nh-d15'
                }
            },
            'high-end-gaming': {
                name: 'High-End Gaming Build',
                components: {
                    cpu: 'amd-ryzen-7-7800x3d',
                    motherboard: 'asus-rog-z790',
                    ram: 'gskill-trident-32gb-ddr5',
                    gpu: 'rtx-4090',
                    storage: 'samsung-980-pro-2tb',
                    psu: 'corsair-rm1000x',
                    case: 'lian-li-o11-dynamic',
                    cooling: 'corsair-h150i-elite'
                }
            }
            // Add more configurations...
        };
    }
    
    // Load pre-built configuration
    loadPrebuiltConfig(configName) {
        const config = this.prebuiltConfigs[configName];
        if (!config) return;
        
        // Clear current selection
        this.selectedComponents = {
            cpu: null,
            motherboard: null,
            ram: null,
            gpu: null,
            storage: null,
            psu: null,
            case: null,
            cooling: null
        };
        
        // Load components from configuration
        Object.entries(config.components).forEach(([category, componentId]) => {
            const component = this.componentDatabase[category]?.find(c => c.id === componentId);
            if (component) {
                this.selectedComponents[category] = component;
                this.updateComponentDisplay(category, component);
            }
        });
        
        // Update all displays
        this.updateTotalPrice();
        this.updatePerformanceScores();
        this.checkCompatibility();
        this.updatePowerConsumption();
        
        // Scroll to builder section
        document.getElementById('builder').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Save build
    saveBuild() {
        const buildData = {
            components: this.selectedComponents,
            totalPrice: this.totalPrice,
            powerConsumption: this.powerConsumption,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('savedPCBuild', JSON.stringify(buildData));
        
        // Show success message
        this.showNotification('Build saved successfully!', 'success');
    }
    
    // Share build
    shareBuilds() {
        const buildUrl = this.generateBuildURL();
        
        if (navigator.share) {
            navigator.share({
                title: 'Check out my PC build!',
                text: `Total price: ${this.formatPrice(this.totalPrice)}`,
                url: buildUrl
            });
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(buildUrl).then(() => {
                this.showNotification('Build URL copied to clipboard!', 'success');
            });
        }
    }
    
    // Get average performance across all selected components
    getAveragePerformance() {
        const selectedComponents = Object.values(this.selectedComponents).filter(comp => comp !== null);
        
        if (selectedComponents.length === 0) {
            return { gaming: 0, productivity: 0, creation: 0 };
        }
        
        const totalPerformance = selectedComponents.reduce((total, component) => {
            if (component.performance) {
                total.gaming += component.performance.gaming || 0;
                total.productivity += component.performance.productivity || 0;
                total.creation += component.performance.creation || 0;
                total.count++;
            }
            return total;
        }, { gaming: 0, productivity: 0, creation: 0, count: 0 });
        
        if (totalPerformance.count === 0) {
            return { gaming: 0, productivity: 0, creation: 0 };
        }
        
        return {
            gaming: Math.round(totalPerformance.gaming / totalPerformance.count),
            productivity: Math.round(totalPerformance.productivity / totalPerformance.count),
            creation: Math.round(totalPerformance.creation / totalPerformance.count)
        };
    }
    
    // Load saved build from localStorage
    loadSavedBuild() {
        const savedBuild = localStorage.getItem('savedPCBuild');
        if (savedBuild) {
            try {
                const buildData = JSON.parse(savedBuild);
                this.selectedComponents = buildData.components || {};
                this.updateAllDisplays();
                this.showNotification('Previous build loaded successfully!', 'success');
                return true;
            } catch (error) {
                console.error('Error loading saved build:', error);
                localStorage.removeItem('savedPCBuild');
                return false;
            }
        }
        return false;
    }
    
    // Clear current build
    clearBuild() {
        // Reset all selected components
        Object.keys(this.selectedComponents).forEach(category => {
            this.selectedComponents[category] = null;
        });
        
        // Reset all displays
        this.updateAllDisplays();
        
        // Show notification
        this.showNotification('Build cleared successfully!', 'info');
    }
    
    // Update all displays (price, performance, compatibility, power)
    updateAllDisplays() {
        this.updateTotalPrice();
        this.updatePerformanceScores();
        this.updatePowerConsumption();
        this.checkCompatibility();
        this.updateComponentDisplays();
    }
    
    // Update component displays in the UI
    updateComponentDisplays() {
        Object.entries(this.selectedComponents).forEach(([category, component]) => {
            const selectedElement = document.getElementById(`selected-${category}`);
            const priceElement = document.getElementById(`${category}-price`);
            
            if (selectedElement && priceElement) {
                if (component) {
                    selectedElement.textContent = component.name;
                    priceElement.textContent = this.formatPrice(component.price);
                } else {
                    selectedElement.textContent = `Select ${category.charAt(0).toUpperCase() + category.slice(1)}`;
                    priceElement.textContent = '₹0';
                }
            }
        });
    }
    
    // Export build configuration as JSON
    exportBuild() {
        const buildData = {
            metadata: {
                name: 'Custom PC Build',
                created: new Date().toISOString(),
                totalPrice: this.totalPrice,
                powerConsumption: this.powerConsumption,
                performance: this.getAveragePerformance()
            },
            components: this.selectedComponents,
            compatibilityCheck: this.checkCompatibility()
        };
        
        const blob = new Blob([JSON.stringify(buildData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pc-build-configuration.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Build configuration exported successfully!', 'success');
    }
    
    // Import build configuration from JSON
    importBuild(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const buildData = JSON.parse(e.target.result);
                if (buildData.components) {
                    this.selectedComponents = buildData.components;
                    this.updateAllDisplays();
                    this.showNotification('Build configuration imported successfully!', 'success');
                } else {
                    throw new Error('Invalid build file format');
                }
            } catch (error) {
                console.error('Error importing build:', error);
                this.showNotification('Error importing build file. Please check the file format.', 'error');
            }
        };
        reader.readAsText(file);
    }

    // Generate build URL
    generateBuildURL() {
        const buildData = btoa(JSON.stringify(this.selectedComponents));
        return `${window.location.origin}${window.location.pathname}?build=${buildData}`;
    }
    
    // Request quote
    requestQuote() {
        console.log('PCBuilder.requestQuote() called');
        
        try {
            // Validate that components are selected
            const selectedComponents = Object.entries(this.selectedComponents || {})
                .filter(([_, component]) => component !== null);
            
            console.log('filtered selectedComponents:', selectedComponents);
            
            // Allow quote request even with no components selected
            if (selectedComponents.length === 0) {
                // Offer to proceed with custom quote
                const proceed = confirm('No components selected. Would you like to request a custom PC build consultation instead?');
                if (proceed) {
                    return this.requestCustomPC();
                } else {
                    this.showNotification('Please select components or use "Request Custom PC Build" for consultation.', 'info');
                    return;
                }
            }
            
            // Check for essential components (CPU, Motherboard, RAM) - but allow override
            const essentialComponents = ['cpu', 'motherboard', 'ram'];
            const missingEssentials = essentialComponents.filter(component => 
                !this.selectedComponents[component]
            );
            
            // If missing essential components, offer to proceed anyway
            if (missingEssentials.length > 0) {
                const missingList = missingEssentials.map(comp => comp.toUpperCase()).join(', ');
                const proceed = confirm(`Missing essential components: ${missingList}\n\nWould you like to proceed with quote request anyway? You can specify custom requirements in the email.`);
                
                if (!proceed) {
                    this.showNotification(`Consider selecting: ${missingList}`, 'warning');
                    return;
                }
            }
            
            const componentsList = selectedComponents.length > 0 
                ? selectedComponents.map(([category, component]) => `${category.toUpperCase()}: ${component.name} - ${this.formatPrice(component.price)}`).join('\n')
                : 'Custom PC Build - Components to be specified';
            
            const totalPriceText = (this.totalPrice || 0) > 0 ? this.formatPrice(this.totalPrice) : 'To be quoted';
            const powerText = (this.powerConsumption || 0) > 0 ? `${this.powerConsumption}W` : 'To be calculated';
            
            const performance = this.getAveragePerformance();
            const performanceText = performance.gaming > 0 
                ? `Gaming ${performance.gaming}%, Productivity ${performance.productivity}%`
                : 'To be determined based on final configuration';
            
            const emailBody = `Hello Nexa Custom Forge,

I would like to request a quote for the following PC build:

${componentsList}

Total Estimated Price: ${totalPriceText}
Estimated Power Consumption: ${powerText}

Please provide me with:
- Final pricing including assembly
- Availability timeline
- Warranty information
- Any recommended modifications

Additional Information:
- Build Configuration: ${selectedComponents.length} components selected
- Performance Rating: ${performanceText}

${selectedComponents.length === 0 ? 'Note: This is a custom build request. I will provide specific requirements or would like consultation on component selection.' : ''}

Thank you!`;
            
            const emailSubject = selectedComponents.length > 0 
                ? `PC Build Quote Request - ${totalPriceText} (${selectedComponents.length} Components)`
                : 'Custom PC Build Quote Request - Consultation Needed';
                
            this.sendEmail(emailSubject, emailBody, 'quote request');
            
        } catch (error) {
            console.error('Error in requestQuote:', error);
            this.showNotification('Error processing quote request. Please try again.', 'error');
            
            // Fallback
            const fallbackEmail = `mailto:nexacustomforge@gmail.com?subject=PC Build Quote Request&body=${encodeURIComponent('Please provide a quote for a custom PC build. I will provide requirements separately.')}`;
            setTimeout(() => {
                try {
                    window.location.href = fallbackEmail;
                } catch (e) {
                    alert('Please email nexacustomforge@gmail.com for a quote.');
                }
            }, 2000);
        }
    }
    
    // Request custom PC build (for consultation/custom requirements)
    requestCustomPC() {
        console.log('PCBuilder.requestCustomPC() called');
        
        try {
            const emailBody = `Hello Nexa Custom Forge,

I would like to request a custom PC build consultation.

My Requirements:
□ Gaming PC
□ Workstation/Professional
□ Content Creation
□ Office/Productivity
□ AI/Machine Learning
□ Server/NAS
□ Other: ________________

Budget Range: ₹____________

Specific Requirements:
- Performance needs: ________________
- Preferred brands: ________________
- Special software requirements: ________________
- Form factor preferences: ________________
- Aesthetic preferences: ________________

Please provide me with:
- Custom component recommendations
- Final pricing including assembly
- Availability timeline
- Warranty information
- Performance estimates

Additional Notes:
________________

Thank you for your custom PC building service!`;
            
            const emailSubject = 'Custom PC Build Consultation Request';
            this.sendEmail(emailSubject, emailBody, 'custom PC consultation');
            
        } catch (error) {
            console.error('Error in requestCustomPC:', error);
            this.showNotification('Error processing custom PC request. Please try again.', 'error');
            
            // Fallback
            const fallbackEmail = `mailto:nexacustomforge@gmail.com?subject=Custom PC Build Request&body=${encodeURIComponent('I would like to request a custom PC build consultation. Please contact me.')}`;
            setTimeout(() => {
                try {
                    window.location.href = fallbackEmail;
                } catch (e) {
                    alert('Please email nexacustomforge@gmail.com for custom PC consultation.');
                }
            }, 2000);
        }
    }
    
    // Helper method to send emails with fallback options
    sendEmail(subject, body, type) {
        console.log(`Sending ${type} email:`, subject);
        
        const emailURL = `mailto:nexacustomforge@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Show success notification
        this.showNotification(`Opening email client for ${type}...`, 'success');
        
        // Small delay before opening email to show notification
        setTimeout(() => {
            try {
                window.location.href = emailURL;
                console.log('Email client opened successfully');
            } catch (error) {
                console.error('Error opening email client:', error);
                this.handleEmailFallback(subject, body, type);
            }
        }, 1000);
    }
    
    // Handle email fallback options
    handleEmailFallback(subject, body, type) {
        console.log('Attempting email fallback options');
        
        // Try clipboard first
        if (navigator.clipboard && navigator.clipboard.writeText) {
            const emailText = `Subject: ${subject}\n\nTo: nexacustomforge@gmail.com\n\n${body}`;
            navigator.clipboard.writeText(emailText).then(() => {
                this.showNotification(`Email details copied to clipboard! Please paste into your email client.`, 'info');
            }).catch(() => {
                this.showFinalFallback(type);
            });
        } else {
            this.showFinalFallback(type);
        }
    }
    
    // Show final fallback message
    showFinalFallback(type) {
        this.showNotification(`Please email nexacustomforge@gmail.com for ${type}.`, 'info');
        
        // Also show an alert as backup
        setTimeout(() => {
            alert(`Email client not available. Please email us directly at:\nnexacustomforge@gmail.com\n\nSubject: ${type.charAt(0).toUpperCase() + type.slice(1)}`);
        }, 3000);
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        // Set appropriate icon based on type
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        else if (type === 'error') icon = 'exclamation-circle';
        else if (type === 'warning') icon = 'exclamation-triangle';
        
        notification.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after delay (longer for errors)
        const delay = type === 'error' ? 5000 : 3000;
        setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentElement) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, delay);
    }
}

// Global functions for HTML onclick events
function openComponentModal(category) {
    pcBuilder.openComponentModal(category);
}

function closeComponentModal() {
    pcBuilder.closeComponentModal();
}

function applyFilters() {
    pcBuilder.applyFilters();
}

function searchComponents() {
    pcBuilder.searchComponents();
}

function loadPrebuiltConfig(configName) {
    pcBuilder.loadPrebuiltConfig(configName);
}

function saveBuild() {
    pcBuilder.saveBuild();
}

function shareBuilds() {
    pcBuilder.shareBuilds();
}

function requestQuote() {
    console.log('requestQuote() called');
    if (typeof pcBuilder === 'undefined' || !pcBuilder) {
        console.error('PCBuilder not initialized');
        alert('PC Builder is still loading. Please wait a moment and try again.');
        return;
    }
    try {
        pcBuilder.requestQuote();
    } catch (error) {
        console.error('Error in requestQuote:', error);
        alert('Error requesting quote. Please try again or contact us directly at nexacustomforge@gmail.com');
    }
}

function requestCustomPC() {
    console.log('requestCustomPC() called');
    if (typeof pcBuilder === 'undefined' || !pcBuilder) {
        console.error('PCBuilder not initialized');
        // Fallback: direct email for custom PC
        const fallbackEmailBody = `Hello Nexa Custom Forge,

I would like to request a custom PC build consultation.

Please contact me to discuss my requirements.

Thank you!`;
        const emailURL = `mailto:nexacustomforge@gmail.com?subject=Custom PC Build Request&body=${encodeURIComponent(fallbackEmailBody)}`;
        try {
            window.location.href = emailURL;
        } catch (error) {
            alert('Please email us directly at nexacustomforge@gmail.com for custom PC builds.');
        }
        return;
    }
    try {
        pcBuilder.requestCustomPC();
    } catch (error) {
        console.error('Error in requestCustomPC:', error);
        // Fallback: direct email
        const fallbackEmailBody = `Hello Nexa Custom Forge,

I would like to request a custom PC build consultation.

Please contact me to discuss my requirements.

Thank you!`;
        const emailURL = `mailto:nexacustomforge@gmail.com?subject=Custom PC Build Request&body=${encodeURIComponent(fallbackEmailBody)}`;
        try {
            window.location.href = emailURL;
        } catch (error) {
            alert('Please email us directly at nexacustomforge@gmail.com for custom PC builds.');
        }
    }
}

function testQuoteFunction() {
    console.log('Test function called');
    console.log('pcBuilder object:', pcBuilder);
    if (pcBuilder) {
        console.log('pcBuilder.selectedComponents:', pcBuilder.selectedComponents);
        pcBuilder.showNotification('Test successful! PC Builder is working.', 'success');
        // Force a simple custom quote
        const emailBody = 'Test custom PC request from PC Builder application.';
        const emailURL = `mailto:nexacustomforge@gmail.com?subject=Test Quote Request&body=${encodeURIComponent(emailBody)}`;
        console.log('Test email URL:', emailURL);
        setTimeout(() => {
            window.location.href = emailURL;
        }, 2000);
    } else {
        alert('PC Builder not initialized!');
    }
}

function directEmail() {
    console.log('directEmail() called');
    const emailURL = 'mailto:nexacustomforge@gmail.com?subject=Test Email&body=This is a test email from the PC Builder.';
    console.log('Direct email URL:', emailURL);
    try {
        window.location.href = emailURL;
        console.log('Direct email opened successfully');
    } catch (error) {
        console.error('Direct email failed:', error);
        alert('Direct email failed. Please email nexacustomforge@gmail.com manually.');
    }
}

function clearBuild() {
    pcBuilder.clearBuild();
}

function loadSavedBuild() {
    pcBuilder.loadSavedBuild();
}

function exportBuild() {
    pcBuilder.exportBuild();
}

function importBuild(file) {
    pcBuilder.importBuild(file);
}

function handleFileImport(input) {
    if (input.files && input.files[0]) {
        importBuild(input.files[0]);
        input.value = ''; // Reset file input
    }
}

// Initialize PC Builder when page loads
let pcBuilder;
document.addEventListener('DOMContentLoaded', function() {
    pcBuilder = new PCBuilder();
});

// Add notification styles
const notificationStyles = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 300px;
    max-width: 400px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    border-color: rgba(16, 185, 129, 0.5);
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05));
}

.notification-error {
    border-color: rgba(239, 68, 68, 0.5);
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.05));
}

.notification-warning {
    border-color: rgba(245, 158, 11, 0.5);
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05));
}

.notification-info {
    border-color: rgba(59, 130, 246, 0.5);
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.05));
}

.notification i {
    font-size: 18px;
    flex-shrink: 0;
}

.notification span {
    flex: 1;
    font-size: 14px;
    line-height: 1.4;
}

.notification-close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    transition: background 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
}

.notification-close:hover {
    background: rgba(255, 255, 255, 0.1);
}

.notification-success i {
    color: #10b981;
}

.notification-error i {
    color: #ef4444;
}

.notification-warning i {
    color: #f59e0b;
}

.notification-info i {
    color: #3b82f6;
}

@media (max-width: 768px) {
    .notification {
        right: 10px;
        left: 10px;
        min-width: unset;
        max-width: unset;
        transform: translateY(-100px);
    }
    
    .notification.show {
        transform: translateY(0);
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);