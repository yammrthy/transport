// Handle the download as Excel button (same as before)
document.getElementById('download-btn').addEventListener('click', function () {
    const data = [
        ['Vehicle ID No.', 'Type of Equipment', 'Category of Equipment', 'Year of Purchase', 'Age of Vehicle', 'Vehicle Registration No.', 'Vehicle Make', 'Model', 'Emission Norm', 'Engine No.', 'Chassis No.', 'Breakdown History'],
        ['CR-11', 'MOBILE CRANES', 'MAINTENANCE & SERVICE EQUIPMENTS', '2020', '4 years', 'KA-34 P2279', 'TIL', 'RT 740B', 'BS4', '699836/1', 'TLB00740NKXB18335', 'No major breakdowns, routine maintenance performed every 6 months.']
    ];

    let csvContent = "data:text/csv;charset=utf-8,";
    data.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n"; // Adding a newline after each row
    });

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.target = "_blank";
    link.download = "vehicle_data.csv"; // The name of the downloaded file

    // Trigger the download
    link.click();
});

// Handle the Fetch Excel Button click
document.getElementById('fetch-btn').addEventListener('click', function () {
    const excelUrl = 'https://jsw-my.sharepoint.com/:x:/g/personal/yamuna_m_jsw_in/EdBDMnPaaSlEiShVBfzFErIBHVbm_xAlvMbMoc9_pTCTow?e=AgK2QY'; // URL to your Excel file

    // Fetch the Excel file from the URL
    fetch(excelUrl)
        .then(response => response.arrayBuffer()) // Get the file as an ArrayBuffer
        .then(data => {
            // Parse the data using SheetJS
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0]; // Assuming we're working with the first sheet
            const worksheet = workbook.Sheets[sheetName];
            
            // Convert the worksheet to JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            // Update the vehicle cards with the new data
            updateVehicleCards(jsonData);
        })
        .catch(error => {
            console.error('Error fetching or processing the Excel file:', error);
        });
});

// Function to update the vehicle cards with data from the Excel file
function updateVehicleCards(data) {
    // Clear the existing cards
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    // Loop through the data and create new cards
    data.forEach(vehicle => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        card.innerHTML = `
            <h2>Vehicle ID: ${vehicle['Vehicle ID No.']}</h2>
            <p><strong>Type of Equipment:</strong> ${vehicle['Type of Equipment']}</p>
            <p><strong>Category of Equipment:</strong> ${vehicle['Category of Equipment']}</p>
            <p><strong>Year of Purchase:</strong> ${vehicle['Year of Purchase']}</p>
            <p><strong>Age of Vehicle:</strong> ${vehicle['Age of Vehicle']}</p>
            <p><strong>Vehicle Registration No.:</strong> ${vehicle['Vehicle Registration No.']}</p>
            <p><strong>Vehicle Make:</strong> ${vehicle['Vehicle Make']}</p>
            <p><strong>Model:</strong> ${vehicle['Model']}</p>
            <p><strong>Emission Norm:</strong> ${vehicle['Emission Norm']}</p>
            <p><strong>Engine No.:</strong> ${vehicle['Engine No.']}</p>
            <p><strong>Chassis No.:</strong> ${vehicle['Chassis No.']}</p>
            <p><strong>Breakdown History:</strong> ${vehicle['Breakdown History']}</p>
        `;

        cardContainer.appendChild(card);
    });
}
