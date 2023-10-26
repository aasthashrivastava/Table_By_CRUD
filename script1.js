const tableBody = document.getElementById('tableBody');
const form = document.getElementById('form');

let data = JSON.parse(localStorage.getItem('storeTableData')) || [];
let currentId = parseInt(localStorage.getItem('dataId')) || generateRandomID();


function generateRandomID() {
    return Math.floor(Math.random() * 100);
}


form.addEventListener('submit', (event) => {
    event.preventDefault();

    const editId = document.getElementById('edit-id').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    if (name && age) {
        if (editId) {
            updateTable(editId, name, age)

        } else {
            createTable(name, age)
        }
        readTable();
        form.reset();
    }
})


function createTable(name, age) {
    const id = generateRandomID();
    data.push({ id, name, age })
    saveLocalStorage()
}

function readTable() {
    tableBody.innerHTML = "";
    data.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>
         <button onclick="updateData(${item.id})">Edit</button>
         <button onclick="deleteData(${item.id})">Delete</button>
         </td>
         `
        tableBody.appendChild(row);
    })
}

function deleteData(id) {
    const index = data.findIndex(elem => elem.id === id);
    if (index !== -1) {
        data.splice(index, 1);
        readTable();
        saveLocalStorage()
    }
}

function updateTable(id, newName, newAge) {
    const editData = data.find(elem => elem.id === id);
    if (editData) {
        editData.name = newName;
        editData.age = newAge;
        saveLocalStorage();
    }
    console.log(editData)
}


function saveLocalStorage() {
    localStorage.setItem('storeTableData', JSON.stringify(data));
    localStorage.setItem('dataId', generateRandomID());
}
readTable()

function updateData(id) {
    const editData = data.find(item => item.id === id);
    if (editData) {
        document.getElementById('updateForm').style.display = 'block';
        document.getElementById('updateName').value = editData.name;
        document.getElementById('updateAge').value = editData.age;
        document.getElementById('updateForm').onsubmit = function () {

            let newObj;
            const updatedName = document.getElementById('updateName').value;
            const updatedAge = document.getElementById('updateAge').value;
            newObj = {
                id: editData.id,
                name: updatedName,
                age: updatedAge
            }

            const storageList = JSON.parse(localStorage.getItem('storeTableData'));
            for (var i = 0; i < storageList.length; i++) {
                if (storageList[i].id == newObj.id) {
                    storageList.splice(i, 1);
                }
            }
            const storageLists = localStorage.setItem('storeTableData', JSON.stringify([...storageList, newObj]));
            readTable();
            CloseInput();
        }
    };
}
function CloseInput() {
    document.getElementById("updateForm").style.display = 'none';
}