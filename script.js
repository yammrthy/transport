async function fetchExcelData() {
  const fileLink = 'https://jsw-my.sharepoint.com/:x:/g/personal/yamuna_m_jsw_in/EdBDMnPaaSlEiShVBfzFErIBHVbm_xAlvMbMoc9_pTCTow?e=M4xUb7'; // Replace with OneDrive link
  try {
    const response = await fetch(fileLink);
    const data = await response.text(); // For .csv, you may need 'text()' instead
    // Example parsing logic (CSV data assumed):
    const rows = data.split('\n');
    const tableBody = document.getElementById('report').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear old data
    rows.forEach(row => {
      const cols = row.split(',');
      const tr = document.createElement('tr');
      cols.forEach(col => {
        const td = document.createElement('td');
        td.textContent = col;
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
