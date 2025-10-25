from flask import Flask, request, jsonify
from keras.models import load_model
import numpy as np
import io
from preprocessing import preprocess_image
# from utils.lime_explainer import explain_prediction  # Optional

app = Flask(__name__)

# Load your model (train separately beforehand)
model = None
print("⚠️ No model loaded — placeholder mode active.")

@app.route("/check-image", methods=["POST"])
def check_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image_file = request.files['image']
    image_bytes = io.BytesIO(image_file.read())

    # Preprocess and predict
    processed = preprocess_image(image_bytes)
    prediction = model.predict(processed)
    ai_score = float(prediction[0][0])

    result = {
        "ai_score": ai_score,
        "ai_generated": ai_score > 0.5
    }

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)