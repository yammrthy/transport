document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('data-table');

    const excelFileURL = 'https://jsw-my.sharepoint.com/:x:/g/personal/cmd_conference_jsw_in/EU85s2VCAKBFmNOABnW3fCgBWjjqTCBaFJdRNH3gpX4btQ?e=e1Wnsz'; 

    // Fetching Excel file
    fetch(excelFileURL)
        .then(response => response.arrayBuffer())  // Fetch as array buffer
        .then(data => {
            // Parse Excel file 
            const workbook = XLSX.read(data, { type: 'array' });

            // To get first sheet
            const sheetName = workbook.SheetNames[0];  // Assuming you want the first sheet
            const sheet = workbook.Sheets[sheetName];

            // To Convert as Json
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            // If the sheet has data, render it
            if (jsonData.length > 0) {
                const headers = Object.keys(jsonData[0]); // Get headers from the first row

                // Creating headers for the table
                const thead = table.querySelector('thead tr');
                headers.forEach(header => {
                    const th = document.createElement('th');
                    th.textContent = header;
                    thead.appendChild(th);
                });

                // Creating rows for the table
                const tbody = table.querySelector('tbody');
                jsonData.forEach(row => {
                    const tr = document.createElement('tr');
                    headers.forEach(header => {
                        const td = document.createElement('td');
                        td.textContent = row[header];
                        tr.appendChild(td);
                    });
                    tbody.appendChild(tr);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching or processing Excel file:', error);
        });
});
