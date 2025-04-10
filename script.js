document.getElementById('fetch-btn').addEventListener('click', function() {
    const excelFileURL = 'https://jsw-my.sharepoint.com/:x:/g/personal/yamuna_m_jsw_in/EdBDMnPaaSlEiShVBfzFErIBHVbm_xAlvMbMoc9_pTCTow?e=I5Kbdg'; // Replace with your actual file URL

    fetch(excelFileURL)
        .then(response => response.arrayBuffer())  // Fetch as array buffer
        .then(data => {
            // Parse Excel file 
            const workbook = XLSX.read(data, { type: 'array' });

            // Get first sheet
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Convert sheet to JSON
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            
            console.log(jsonData); // Debugging: Verify data extraction

            if (jsonData.length === 0) {
                alert("No data found in the Excel file.");
                return;
            }

            // Get table reference
            const table = document.getElementById('data-table');
            const thead = table.querySelector('thead tr');
            const tbody = table.querySelector('tbody');

            // Clear previous data
            thead.innerHTML = "";
            tbody.innerHTML = "";

            // Create table headers dynamically
            const headers = Object.keys(jsonData[0]);
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                thead.appendChild(th);
            });

            // Populate table rows
            jsonData.forEach(row => {
                const tr = document.createElement('tr');
                headers.forEach(header => {
                    const td = document.createElement('td');
                    td.textContent = row[header] || ""; // Fill empty cells safely
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error("Error fetching or processing Excel file:", error);
            alert("Failed to load Excel file. Please check the URL or file format.");
        });
});

