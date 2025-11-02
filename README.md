# Differential Diagnosis Assistant

A simple web application designed to assist newly graduated medical students in their first year of practice by providing a quick reference for differential diagnoses based on patient symptoms.

## Features

*   **Symptom Input with Autocomplete:** Easily enter patient symptoms with intelligent suggestions.
*   **Multi-Symptom Selection:** Add and remove symptoms using interactive tags for clear input.
*   **Differential Diagnosis List:** Get a ranked list of potential diagnoses based on the entered symptoms.
*   **Basic Diagnosis Information:** View concise summaries for each diagnosis, including:
    *   Brief description of the condition.
    *   Key associated symptoms.
    *   Common diagnostic tests.
    *   High-level management principles.
*   **Trusted Data Source:** Information is curated from official guidelines (e.g., NICE, WHO) with clear source citations.
*   **Disclaimer:** A prominent disclaimer emphasizes the app's educational and assistive purpose.

## Technology Stack

*   **Backend:** Python with Flask
*   **Frontend:** HTML, CSS, and Vanilla JavaScript
*   **Data Storage:** JSON file (`data.json`)

## Setup and Installation

To get this application up and running on your local machine, follow these steps:

### Prerequisites

*   Python 3.x installed on your system.
*   `pip` (Python package installer) – usually comes with Python.

### Installation

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone https://github.com/Modather22222/differential-diagnosis-app.git
    cd differential-diagnosis-app
    ```

2.  **Install Flask:**
    Open your terminal or command prompt, navigate to the `differential-diagnosis-app` directory, and run:
    ```powershell
    python -m pip install Flask
    ```

### Running the Application

1.  **Start the Flask server:**
    In the same terminal, execute:
    ```powershell
    python app.py
    ```
    The application will start, and you should see output indicating that the Flask development server is running, typically on `http://127.0.0.1:5000/`.

2.  **Access the App:**
    Open your web browser and go to `http://127.0.0.1:5000/`.

## Data Source

The medical data used in this application is manually curated from reputable official guidelines, including NICE (National Institute for Health and Care Excellence) and WHO (World Health Organization) guidelines, to ensure accuracy and reliability. Each diagnosis includes a citation to its source.

## Disclaimer

This application is intended for educational and assistive purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare professional for any health concerns or before making any decisions related to patient care.