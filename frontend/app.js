// Function to update the displayed selected languages
function updateSelectedLanguages() {
    const selectedLanguages = Array.from(document.getElementById('language').selectedOptions)
        .map(option => option.text); // Get the text of the selected options
    document.getElementById('selectedLanguages').textContent = selectedLanguages.length > 0
        ? selectedLanguages.join(', ')
        : 'None'; // Show 'None' if no languages are selected
}

document.getElementById('language').addEventListener('change', updateSelectedLanguages);

document.getElementById('translateForm').onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById('translateForm'));

    // Get the selected languages
    const selectedLanguages = Array.from(document.getElementById('language').selectedOptions)
        .map(option => option.value);

    // Manually append the selected languages array to form data
    formData.append('languages', JSON.stringify(selectedLanguages));

    try {
        const response = await fetch('https://kendrick.ngrok.app/translate', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'translated_files.zip';  // Download the zip file
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.getElementById('result').textContent = 'Files translated successfully. Download starting...';
        } else {
            const error = await response.json();
            document.getElementById('result').textContent = 'Error: ' + error.error;
        }
    } catch (err) {
        document.getElementById('result').textContent = 'Error uploading file.';
    }
};
