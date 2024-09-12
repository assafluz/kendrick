document.getElementById('translateForm').onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById('translateForm'));

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
            a.download = 'translated_file.strings';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.getElementById('result').textContent = 'File translated successfully. Download starting...';
        } else {
            const error = await response.json();
            document.getElementById('result').textContent = 'Error: ' + error.error;
        }
    } catch (err) {
        document.getElementById('result').textContent = 'Error uploading file.';
    }
};
