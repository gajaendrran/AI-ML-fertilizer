import sys
import json
import joblib
import pandas as pd

model = joblib.load('ferti_model.pkl') 
label_encoders = joblib.load('label_encoders.pkl') 

def predict_fertilizer(crop_type, nitrogen, phosphorus, potassium):
    try:
        crop_encoded = label_encoders['Crop_Type'].transform([crop_type])[0]

        input_data = pd.DataFrame([[crop_encoded, nitrogen, phosphorus, potassium]], 
                                  columns=['Crop_Type', 'Nitrogen', 'Phosphorous', 'Potassium'])

        predicted_fertilizer_encoded = model.predict(input_data)[0]
        predicted_fertilizer = label_encoders['Fertilizer'].inverse_transform([predicted_fertilizer_encoded])[0]

        return predicted_fertilizer
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == '__main__':
    while True:
        try:
            input_json = sys.stdin.readline().strip()
            if not input_json:
                continue

            input_data = json.loads(input_json)  

            crop_type = input_data['cropType']
            nitrogen = float(input_data['nitrogen'])
            phosphorus = float(input_data['phosphorus'])
            potassium = float(input_data['potassium'])

            predicted_fertilizer = predict_fertilizer(crop_type, nitrogen, phosphorus, potassium)

            print(predicted_fertilizer, flush=True)

        except Exception as e:
            print(f"Error: {str(e)}", flush=True)
