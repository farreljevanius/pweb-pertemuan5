// Data untuk autocomplete
const studentNames = [
    'Ahmad Rizki Pratama', 'Siti Nurhaliza', 'Budi Santoso', 'Dewi Sartika',
    'Muhammad Fadlan', 'Aisyah Putri', 'Rudi Hermawan', 'Maya Sari',
    'Dian Sastrowardoyo', 'Fikri Alamsyah', 'Nurul Hidayah', 'Bayu Skak',
    'Citra Kirana', 'Dimas Anggara', 'Putri Marino'
];

const subjects = [
    'Pemrograman Web', 'Basis Data', 'Struktur Data', 'Algoritma Pemrograman',
    'Sistem Operasi', 'Jaringan Komputer', 'Rekayasa Perangkat Lunak',
    'Matematika Diskrit', 'Statistika', 'Machine Learning', 'Artificial Intelligence',
    'Mobile Programming', 'Game Development', 'Computer Graphics'
];

const lecturers = [
    'Dr. Ir. Bambang Suryanto, M.Kom', 'Prof. Dr. Siti Aminah, S.T., M.T.',
    'Drs. Ahmad Fauzi, M.Kom', 'Dr. Eng. Rini Suwandani, S.T., M.T.',
    'Ir. Budi Raharjo, M.Sc', 'Dr. Maya Lonika, S.Kom., M.T.',
    'Prof. Ir. Hadi Sutopo, Ph.D', 'Dr. Rina Firliana, S.Kom., M.Kom',
    'Drs. Agus Salim, M.T.', 'Dr. Lina Marlina, S.T., M.Kom'
];

// Data untuk dropdown dinamis
const deviceData = {
    laptop: {
        asus: {
            models: ['ROG Strix G15', 'ZenBook 14', 'VivoBook S15', 'TUF Gaming A15'],
            info: 'ASUS adalah brand laptop gaming dan productivity terpercaya'
        },
        lenovo: {
            models: ['ThinkPad X1 Carbon', 'IdeaPad Gaming 3', 'Legion 5', 'Yoga Slim 7'],
            info: 'Lenovo terkenal dengan laptop bisnis ThinkPad dan gaming Legion'
        },
        hp: {
            models: ['Pavilion 15', 'Envy x360', 'Omen 15', 'EliteBook 840'],
            info: 'HP menawarkan berbagai laptop untuk kebutuhan personal dan bisnis'
        },
        dell: {
            models: ['XPS 13', 'Inspiron 15', 'Alienware m15', 'Latitude 7420'],
            info: 'Dell dikenal dengan laptop premium XPS dan gaming Alienware'
        }
    },
    smartphone: {
        samsung: {
            models: ['Galaxy S24', 'Galaxy A54', 'Galaxy Note 20', 'Galaxy Z Fold 5'],
            info: 'Samsung adalah pemimpin pasar smartphone Android dengan berbagai seri'
        },
        xiaomi: {
            models: ['Redmi Note 13', 'POCO X5 Pro', 'Mi 13', 'Redmi 12'],
            info: 'Xiaomi menawarkan smartphone dengan spesifikasi tinggi harga terjangkau'
        },
        oppo: {
            models: ['Reno 10', 'A78', 'Find X6', 'A18'],
            info: 'OPPO fokus pada fotografi dan desain smartphone yang stylish'
        },
        vivo: {
            models: ['V29', 'Y27', 'X90', 'Y17s'],
            info: 'Vivo terkenal dengan teknologi kamera selfie dan fast charging'
        }
    },
    desktop: {
        intel: {
            models: ['Core i9-13900K', 'Core i7-13700K', 'Core i5-13600K', 'Core i3-13100'],
            info: 'Intel processor untuk desktop dengan performa tinggi'
        },
        amd: {
            models: ['Ryzen 9 7900X', 'Ryzen 7 7700X', 'Ryzen 5 7600X', 'Ryzen 3 7300X'],
            info: 'AMD Ryzen menawarkan multi-core performance yang excellent'
        },
        nvidia: {
            models: ['RTX 4090', 'RTX 4080', 'RTX 4070', 'GTX 1660 Super'],
            info: 'NVIDIA GPU untuk gaming dan content creation'
        },
        custom: {
            models: ['Gaming PC Build', 'Workstation Build', 'Budget Build', 'Mini ITX Build'],
            info: 'Custom PC build sesuai kebutuhan dan budget'
        }
    }
};

// Fungsi untuk menampilkan alert
function showAlert(elementId, message, type = 'info') {
    const alertElement = document.getElementById(elementId);
    alertElement.textContent = message;
    alertElement.className = `alert ${type}`;
    alertElement.style.display = 'block';
    
    // Hide alert after 5 seconds
    setTimeout(() => {
        alertElement.style.display = 'none';
    }, 5000);
}

// Fungsi autocomplete
function setupAutocomplete(inputId, data, listId) {
    const input = document.getElementById(inputId);
    const list = document.getElementById(listId);
    let currentIndex = -1;

    input.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        list.innerHTML = '';
        currentIndex = -1;

        if (value.length === 0) {
            list.style.display = 'none';
            return;
        }

        const matches = data.filter(item => 
            item.toLowerCase().includes(value)
        ).slice(0, 5); // Limit to 5 results

        if (matches.length === 0) {
            list.style.display = 'none';
            return;
        }

        matches.forEach((match, index) => {
            const div = document.createElement('div');
            div.className = 'autocomplete-item';
            div.textContent = match;
            div.addEventListener('click', function() {
                input.value = match;
                list.style.display = 'none';
            });
            list.appendChild(div);
        });

        list.style.display = 'block';
    });

    // Keyboard navigation
    input.addEventListener('keydown', function(e) {
        const items = list.querySelectorAll('.autocomplete-item');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            currentIndex = Math.min(currentIndex + 1, items.length - 1);
            updateActiveItem(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            currentIndex = Math.max(currentIndex - 1, -1);
            updateActiveItem(items);
        } else if (e.key === 'Enter' && currentIndex >= 0) {
            e.preventDefault();
            items[currentIndex].click();
        } else if (e.key === 'Escape') {
            list.style.display = 'none';
            currentIndex = -1;
        }
    });

    function updateActiveItem(items) {
        items.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Hide list when clicking outside
    document.addEventListener('click', function(e) {
        if (!input.contains(e.target) && !list.contains(e.target)) {
            list.style.display = 'none';
        }
    });
}

// Setup autocomplete untuk semua field
setupAutocomplete('studentName', studentNames, 'nameAutocomplete');
setupAutocomplete('subject', subjects, 'subjectAutocomplete');
setupAutocomplete('lecturer', lecturers, 'lecturerAutocomplete');

// Form Registration Handler
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        studentName: document.getElementById('studentName').value.trim(),
        nim: document.getElementById('nim').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        lecturer: document.getElementById('lecturer').value.trim()
    };

    // Validation
    const emptyFields = [];
    for (const [key, value] of Object.entries(formData)) {
        if (!value) {
            emptyFields.push(key);
        }
    }

    if (emptyFields.length > 0) {
        const fieldNames = {
            studentName: 'Nama Mahasiswa',
            nim: 'NIM',
            subject: 'Mata Kuliah',
            lecturer: 'Dosen'
        };
        
        const emptyFieldNames = emptyFields.map(field => fieldNames[field]).join(', ');
        showAlert('registrationAlert', `Field berikut harus diisi: ${emptyFieldNames}`, 'error');
        return;
    }

    // Success message
    showAlert('registrationAlert', 
        `Registrasi berhasil! Mahasiswa ${formData.studentName} (${formData.nim}) 
         telah terdaftar untuk mata kuliah ${formData.subject} dengan dosen ${formData.lecturer}.`, 
        'success'
    );
    
    // Reset form
    this.reset();
});

// ===== KODE POS SEARCH - BERDASARKAN LOGIKA TEMAN ANDA =====
let provinsi = document.getElementById("provinsi")
let kabupaten = document.getElementById("kabupaten") 
let kecamatan = document.getElementById("kecamatan")
let kodepos = document.getElementById("kodepos")

async function updateKodePos() {
    let api_query = kecamatan.value + " " + kabupaten.value + " " + provinsi.value
    if (api_query.trim() === "") {
        kodepos.value = ""
        return
    }
    try {
        let response = await fetch("https://kodepos.vercel.app/search/?q=" + api_query)
        let result = await response.json()
        if (result.data) {
            if (!(provinsi.value === "" || kabupaten.value === "" || kecamatan.value === "")) {
                if (result.data[0]) {
                    kodepos.value = result.data[0].code
                } else {
                    kodepos.value = "Kode pos tidak dapat ditemukan."
                }
            } else {
                kodepos.value = ""
            }
        } else {
            kodepos.value = "Kode pos tidak dapat ditemukan."
        }
    } catch (err) {
        kodepos.value = "Kode pos tidak dapat ditemukan."
    }
}

// Fungsi untuk clear form
function clearForm() {
    provinsi.value = ""
    kabupaten.value = ""
    kecamatan.value = ""
    kodepos.value = ""
}

// Event listeners untuk auto-update kode pos
provinsi.addEventListener('input', updateKodePos)
kabupaten.addEventListener('input', updateKodePos)
kecamatan.addEventListener('input', updateKodePos)

// Prevent form submission
document.getElementById('postalCodeForm').addEventListener('submit', function(e) {
    e.preventDefault()
})

// ===== DYNAMIC DROPDOWN SETUP =====
const deviceTypeSelect = document.getElementById('deviceType');
const deviceBrandSelect = document.getElementById('deviceBrand');
const deviceModelSelect = document.getElementById('deviceModel');
const deviceInfoDiv = document.getElementById('deviceInfo');

deviceTypeSelect.addEventListener('change', function() {
    const selectedType = this.value;
    
    // Reset dependent dropdowns
    deviceBrandSelect.innerHTML = '<option value="">-- Pilih Brand --</option>';
    deviceModelSelect.innerHTML = '<option value="">-- Pilih Model --</option>';
    deviceInfoDiv.style.display = 'none';
    
    if (!selectedType) {
        deviceBrandSelect.disabled = true;
        deviceModelSelect.disabled = true;
        return;
    }
    
    // Populate brands
    const brands = Object.keys(deviceData[selectedType]);
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand.charAt(0).toUpperCase() + brand.slice(1);
        deviceBrandSelect.appendChild(option);
    });
    
    deviceBrandSelect.disabled = false;
    deviceModelSelect.disabled = true;
});

deviceBrandSelect.addEventListener('change', function() {
    const selectedType = deviceTypeSelect.value;
    const selectedBrand = this.value;
    
    deviceModelSelect.innerHTML = '<option value="">-- Pilih Model --</option>';
    deviceInfoDiv.style.display = 'none';
    
    if (!selectedBrand) {
        deviceModelSelect.disabled = true;
        return;
    }
    
    // Populate models
    const models = deviceData[selectedType][selectedBrand].models;
    models.forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        deviceModelSelect.appendChild(option);
    });
    
    deviceModelSelect.disabled = false;
});

deviceModelSelect.addEventListener('change', function() {
    const selectedType = deviceTypeSelect.value;
    const selectedBrand = deviceBrandSelect.value;
    const selectedModel = this.value;
    
    if (!selectedModel) {
        deviceInfoDiv.style.display = 'none';
        return;
    }
    
    // Show device info
    const info = deviceData[selectedType][selectedBrand].info;
    deviceInfoDiv.innerHTML = `
        <h4>Informasi Device</h4>
        <p><strong>Jenis:</strong> ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}</p>
        <p><strong>Brand:</strong> ${selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)}</p>
        <p><strong>Model:</strong> ${selectedModel}</p>
        <p><strong>Deskripsi:</strong> ${info}</p>
    `;
    deviceInfoDiv.style.display = 'block';
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Form Registrasi Mahasiswa loaded successfully!');
    
    // Set focus to first input
    document.getElementById('studentName').focus();
});