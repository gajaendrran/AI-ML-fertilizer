import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load Dataset
file_path = "modified_dataset.csv"  # Make sure the file exists in the same folder
data = pd.read_csv(file_path)

# Encode Categorical Features
label_encoders = {}
for column in ['Crop_Type', 'Fertilizer']:
    le = LabelEncoder()
    data[column] = le.fit_transform(data[column])
    label_encoders[column] = le

# Feature Selection (Including NPK)
X = data[['Crop_Type', 'Nitrogen', 'Phosphorous', 'Potassium']]
y = data['Fertilizer']

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model Training
model = RandomForestClassifier(random_state=42, class_weight="balanced")
model.fit(X_train, y_train)

# Evaluate Model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Save Model & Label Encoders
joblib.dump(model, "ferti_model.pkl")  # Save inside server folder
joblib.dump(label_encoders, "label_encoders.pkl")  # Save inside server folder

print("Model and encoders saved successfully.")
