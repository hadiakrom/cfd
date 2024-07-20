document.addEventListener('DOMContentLoaded', function () {
    // Handle logout functionality
    const logoutBtn = document.getElementById('btn-logout');
  
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        sessionStorage.removeItem('loginToken');
        sessionStorage.removeItem('loginTimestamp');
        window.location.href = 'login.html';
      });
    }
  
    // Fetch data from the database and populate the table
    fetch('https://exquisite-kitsune-4fc1cd.netlify.app/services')
      .then(response => response.json())
      .then(data => {
        const tbody = document.getElementById('dataServiceAlat');
        tbody.innerHTML = ''; // Clear any existing data
  
        data.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td><h6 class="mb-0 text-sm">${item.namaAlat}</h6></td>
            <td><p class="text-sm font-weight-bold mb-0">${item.merekAlat}</p></td>
            <td><span class="text-xs font-weight-bold">${item.pemilik}</span></td>
            <td class="align-middle text-center"><span class="me-2 text-xs font-weight-bold">${item.tglDiterima}</span></td>
            <td><span class="me-2 text-xs font-weight-bold">${item.keluhan}</span></td>
            <td><span class="me-2 text-xs font-weight-bold">${item.status}</span></td>
            <td class="align-middle text-center"><span class="me-2 text-xs font-weight-bold">${item.teknisi}</span></td>
            <td class="align-middle">
              <button class="btn btn-link text-secondary mb-0" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa fa-ellipsis-v text-xs"></i>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Edit</a></li>
                <li><a class="dropdown-item" href="#">Delete</a></li>
              </ul>
            </td>
          `;
          tbody.appendChild(row);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  
    // Handle form submission to add new data
    document.getElementById('tambahDataForm').addEventListener('submit', function(event) {
      event.preventDefault();
  
      const namaAlat = document.getElementById('namaAlat').value;
      const merekAlat = document.getElementById('merekAlat').value;
      const pemilik = document.getElementById('pemilik').value;
      const tglDiterima = document.getElementById('tglDiterima').value;
      const keluhan = document.getElementById('keluhan').value;
      const statusPengerjaan = document.getElementById('statusPengerjaan').value;
      const teknisi = document.getElementById('teknisi').value;
  
      const newData = {
        namaAlat: namaAlat,
        merekAlat: merekAlat,
        pemilik: pemilik,
        tglDiterima: tglDiterima,
        keluhan: keluhan,
        status: statusPengerjaan,
        teknisi: teknisi
      };
  
      fetch('https://exquisite-kitsune-4fc1cd.netlify.app/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      })
      .then(response => response.json())
      .then(data => {
        // Close the modal after saving the data
        const modal = bootstrap.Modal.getInstance(document.getElementById('tambahDataModal'));
        modal.hide();
  
        // Add the new data to the table dynamically
        const newRow = `
          <tr>
            <td><h6 class="mb-0 text-sm">${data.namaAlat}</h6></td>
            <td><p class="text-sm font-weight-bold mb-0">${data.merekAlat}</p></td>
            <td><span class="text-xs font-weight-bold">${data.pemilik}</span></td>
            <td class="align-middle text-center"><span class="me-2 text-xs font-weight-bold">${data.tglDiterima}</span></td>
            <td><span class="me-2 text-xs font-weight-bold">${data.keluhan}</span></td>
            <td><span class="me-2 text-xs font-weight-bold">${data.status}</span></td>
            <td class="align-middle text-center"><span class="me-2 text-xs font-weight-bold">${data.teknisi}</span></td>
            <td class="align-middle">
              <button class="btn btn-link text-secondary mb-0" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa fa-ellipsis-v text-xs"></i>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Edit</a></li>
                <li><a class="dropdown-item" href="#">Delete</a></li>
              </ul>
            </td>
          </tr>
        `;
        document.getElementById('dataServiceAlat').insertAdjacentHTML('beforeend', newRow);
  
        // Clear the form
        document.getElementById('tambahDataForm').reset();
      })
      .catch(error => console.error('Error saving data:', error));
    });
  });
