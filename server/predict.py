import sys
import json
import joblib
import pandas as pd

# Load the saved model and label encoders
model = joblib.load('ferti_model.pkl')  # Load the trained model
label_encoders = joblib.load('label_encoders.pkl')  # Load the label encoders

# Function to make predictions
def predict_fertilizer(temperature, soil_type, crop_type, nitrogen, phosphorous, potassium):
    try:
        # Encode categorical values
        soil_encoded = label_encoders['Soil Type'].transform([soil_type])[0]
        crop_encoded = label_encoders['Crop Type'].transform([crop_type])[0]

        # Prepare the input data for prediction
        input_data = [[temperature, soil_encoded, crop_encoded, nitrogen, phosphorous, potassium]]

        # Make the prediction
        predicted_fertilizer_encoded = model.predict(input_data)[0]
        predicted_fertilizer = label_encoders['Fertilizer Name'].inverse_transform([predicted_fertilizer_encoded])[0]

        return predicted_fertilizer
    except Exception as e:
        return f"Error: {str(e)}"

# Main entry point when running the script
if __name__ == '__main__':
    try:
        # Read input data from stdin
        input_json = sys.stdin.read()
        input_data = json.loads(input_json)  # Convert JSON string to dictionary

        # Extract input features
        temperature = float(input_data['temperature'])
        soil_type = input_data['soilType']
        crop_type = input_data['cropType']
        nitrogen = float(input_data['nitrogen'])
        phosphorus = float(input_data['phosphorus'])  

        potassium = float(input_data['potassium'])

        # Get the predicted fertilizer
        predicted_fertilizer = predict_fertilizer(temperature, soil_type, crop_type, nitrogen, phosphorus, potassium)

        # Print the result (this is sent back to the Node.js server)
        print(predicted_fertilizer)
    
    except Exception as e:
        print(f"Error: {str(e)}")
