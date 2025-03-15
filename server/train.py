import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

file_path = "modified_dataset.csv" 
data = pd.read_csv(file_path)

label_encoders = {}
for column in ['Crop_Type', 'Fertilizer']:
    le = LabelEncoder()
    data[column] = le.fit_transform(data[column])
    label_encoders[column] = le

X = data[['Crop_Type', 'Nitrogen', 'Phosphorous', 'Potassium']]
y = data['Fertilizer']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(random_state=42, class_weight="balanced")
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

joblib.dump(model, "ferti_model.pkl") 
joblib.dump(label_encoders, "label_encoders.pkl") 

print("Model and encoders saved successfully.")
