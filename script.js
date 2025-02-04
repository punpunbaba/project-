let playerCount = 0;
function openPopup() {
    document.getElementById('popup').style.display = 'block';
}
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
function previewImage() {
    const file = document.getElementById('image').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('imagePreview').src = e.target.result;
            document.getElementById('imagePreview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}
function addPlayer() {
    const name = document.getElementById('name').value;
    const idCard = document.getElementById('idCard').value;
    const dob = document.getElementById('dob').value;
    const jerseyNumber = document.getElementById('jerseyNumber').value;
    const position = document.getElementById('position').value;
    const imageFile = document.getElementById('image').files[0];

    if (!name || !idCard || !dob || !jerseyNumber || !position || !imageFile) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วนและอัปโหลดรูปภาพ");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        playerCount++;
        const table = document.getElementById('playerTable');
        const row = table.insertRow();
        row.insertCell(0).innerText = playerCount;
        row.insertCell(1).innerText = jerseyNumber;
        row.insertCell(2).innerText = name;
        row.insertCell(3).innerText = dob;
        row.insertCell(4).innerText = position;

        const imgCell = row.insertCell(5);
        const imgElement = document.createElement('img');
        imgElement.src = e.target.result;
        imgElement.style.maxWidth = '50px';
        imgElement.style.maxHeight = '50px';
        imgCell.appendChild(imgElement);

        const deleteCell = row.insertCell(6);
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'ลบ';
        deleteButton.classList.add('delete-btn');
        deleteButton.onclick = function () { row.remove(); updateRowNumbers(); };
        deleteCell.appendChild(deleteButton);

        deleteButton.innerText = 'ลบ';
            deleteButton.classList.add('delete-btn');
            deleteButton.onclick = function() { 
                row.remove(); 
                updateRowNumbers();
                card.remove(); // ลบออกจากแผงรูป
            };
            deleteCell.appendChild(deleteButton);
            
            // ✅ เพิ่มข้อมูลลงแผงรูป
            const grid = document.getElementById("playerGrid");
            const card = document.createElement("div");
            card.classList.add("player-card");
            card.innerHTML = `
                <img src="${e.target.result}" alt="Player Image">
                <p><strong>${name}</strong></p>
                <p>ตำแหน่ง: ${position}</p>
            `;
            grid.appendChild(card);
            

        closePopup();
    };
    reader.readAsDataURL(imageFile);
}
function searchTable() {
    const filter = document.getElementById('search').value.toLowerCase();
    const rows = document.getElementById('playerTable').getElementsByTagName('tr');
    for (let row of rows) {
        row.style.display = row.innerText.toLowerCase().includes(filter) ? '' : 'none';
    }
}
function updateRowNumbers() {
    playerCount = 0;
    document.querySelectorAll("#playerTable tr").forEach(row => {
        row.cells[0].innerText = ++playerCount;
    });
}
function showTable() {
    document.getElementById("playerTableContainer").style.display = "block";
    document.getElementById("playerGridContainer").style.display = "none";
}

function showGrid() {
    document.getElementById("playerTableContainer").style.display = "none";
    document.getElementById("playerGridContainer").style.display = "block";
}
