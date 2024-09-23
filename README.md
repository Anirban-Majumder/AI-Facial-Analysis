# AI Facial Analysis App

A real-time web application that uses AI to detect facial expressions, age, and gender! This app runs directly in the browser using `face-api.js` and accesses your camera for facial analysis. No data is transmitted; everything is processed locally on your device.

## Demo

You can try a live version [here](ai-facial-analysis.vercel.app).

## Features

- **Facial Expression Detection**: Identifies emotions like happiness, sadness, surprise, and more.
- **Age & Gender Prediction**: Predicts the approximate age and gender of the person in front of the camera.
- **Real-time Processing**: All analysis is done live via webcam.
- **Data Privacy**: All processing is local; no data is sent to any server.

## Technologies Used

- **HTML/CSS**: For structure and styling of the webpage.
- **JavaScript**: Handles real-time face detection and interaction.
- **face-api.js**: A JavaScript library that runs deep learning models in the browser for facial analysis.

## Getting Started

To run the app locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-facial-analysis-app.git
   ```
   ```bash
    cd ai-facial-analysis-app
   ```
   Open index.html in your browser. No need for a server.

   Note: The app requires camera access. Ensure you grant permission when prompted.


How It Works

Load Models: On load, the app downloads pre-trained models provided by face-api.js.
Camera Setup: Once the models are loaded, you can start the camera.
Facial Analysis: The app will analyze your face in real-time, detecting emotions, age, and gender.


Disclaimer

This app uses your device's camera. All analysis is done locally, and no data is sent or stored externally.
Contributing

Contributions are welcome! Please submit a pull request or raise an issue to suggest features or improvements.
License

This project is licensed under the MIT License. See the LICENSE file for details.
