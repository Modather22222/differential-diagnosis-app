document.addEventListener('DOMContentLoaded', () => {
    const symptomInput = document.getElementById('symptom-input');
    const searchButton = document.getElementById('search-button');
    const symptomSuggestions = document.createElement('div');
    symptomSuggestions.id = 'symptom-suggestions';
    symptomInput.parentNode.insertBefore(symptomSuggestions, symptomInput.nextSibling);
    const selectedSymptomsContainer = document.getElementById('selected-symptoms');
    const diagnosisList = document.getElementById('diagnosis-list');
    const diagnosisDetails = document.getElementById('diagnosis-details');

    let medicalData = [];
    let allSymptoms = [];
    let selectedSymptoms = [];

    // Fetch medical data from the backend
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            medicalData = data;
            // Extract all unique symptoms for autocomplete
            const symptomSet = new Set();
            medicalData.forEach(diagnosis => {
                diagnosis.symptoms.forEach(symptom => symptomSet.add(symptom));
            });
            allSymptoms = Array.from(symptomSet).sort();
            console.log('Medical data loaded:', medicalData);
            console.log('All symptoms for autocomplete:', allSymptoms);
        })
        .catch(error => console.error('Error fetching medical data:', error));

    symptomInput.addEventListener('input', () => {
        const inputValue = symptomInput.value.toLowerCase();
        displaySymptomSuggestions(inputValue);
    });

    function displaySymptomSuggestions(inputValue) {
        symptomSuggestions.innerHTML = '';
        if (inputValue.length === 0) {
            return;
        }

        const filteredSuggestions = allSymptoms.filter(symptom =>
            symptom.startsWith(inputValue) && !selectedSymptoms.includes(symptom)
        );

        filteredSuggestions.forEach(symptom => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.textContent = symptom;
            suggestionItem.addEventListener('click', () => {
                addSymptomTag(symptom);
                symptomInput.value = '';
                symptomSuggestions.innerHTML = ''; // Clear suggestions after selection
            });
            symptomSuggestions.appendChild(suggestionItem);
        });
    }

    function addSymptomTag(symptom) {
        if (!selectedSymptoms.includes(symptom)) {
            selectedSymptoms.push(symptom);
            renderSelectedSymptoms();
        }
    }

    function removeSymptomTag(symptomToRemove) {
        selectedSymptoms = selectedSymptoms.filter(symptom => symptom !== symptomToRemove);
        renderSelectedSymptoms();
    }

    function renderSelectedSymptoms() {
        selectedSymptomsContainer.innerHTML = '';
        selectedSymptoms.forEach(symptom => {
            const tag = document.createElement('span');
            tag.classList.add('symptom-tag');
            tag.textContent = symptom;
            const removeBtn = document.createElement('span');
            removeBtn.classList.add('remove-tag');
            removeBtn.textContent = 'x';
            removeBtn.addEventListener('click', () => removeSymptomTag(symptom));
            tag.appendChild(removeBtn);
            selectedSymptomsContainer.appendChild(tag);
        });
    }

    searchButton.addEventListener('click', () => {
        displayDiagnoses(selectedSymptoms);
    });

    function displayDiagnoses(inputSymptoms) {
        diagnosisList.innerHTML = '';
        diagnosisDetails.innerHTML = '';

        if (inputSymptoms.length === 0) {
            diagnosisList.innerHTML = '<li>Please enter some symptoms.</li>';
            return;
        }

        const scoredDiagnoses = medicalData.map(diagnosis => {
            let matchScore = 0;
            inputSymptoms.forEach(inputSymptom => {
                if (diagnosis.symptoms.includes(inputSymptom)) {
                    matchScore++;
                }
            });
            return { ...diagnosis, matchScore };
        });

        const relevantDiagnoses = scoredDiagnoses
            .filter(diagnosis => diagnosis.matchScore > 0) // Only show diagnoses with at least one matching symptom
            .sort((a, b) => b.matchScore - a.matchScore); // Sort by match score descending

        if (relevantDiagnoses.length === 0) {
            diagnosisList.innerHTML = '<li>No diagnoses found for the given symptoms.</li>';
            return;
        }

        relevantDiagnoses.forEach(diagnosis => {
            const listItem = document.createElement('li');
            listItem.textContent = diagnosis.name;
            listItem.addEventListener('click', () => showDiagnosisDetails(diagnosis));
            diagnosisList.appendChild(listItem);
        });
    }

    function showDiagnosisDetails(diagnosis) {
        diagnosisDetails.innerHTML = `
            <h3>${diagnosis.name}</h3>
            <p><strong>Description:</strong> ${diagnosis.description}</p>
            <p><strong>Key Symptoms:</strong> ${diagnosis.symptoms.join(', ')}</p>
            <p><strong>Common Tests:</strong> ${diagnosis.tests.join(', ')}</p>
            <p><strong>Management:</strong> ${diagnosis.management.join(', ')}</p>
            <p><strong>Source:</strong> ${diagnosis.source}</p>
        `;
    }
});