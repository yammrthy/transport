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

    // Create a hidden download link
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.target = "_blank";
    link.download = "vehicle_data.csv"; // The name of the downloaded file

    // Trigger the download
    link.click();
});
