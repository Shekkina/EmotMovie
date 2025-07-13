from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import cv2
import numpy as np
import base64

app = Flask(__name__)
CORS(app)

MONGO_URI = "mongodb+srv://shekkina:shekki545@cluster0.0zraa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client["emotion_movies"]
movies_collection = db["movies"]

# Load Haar cascades
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
smile_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_smile.xml")

def detect_emotion(face_img_gray, face_img_color):
    h, w = face_img_gray.shape

    # Focus on bottom 1/3 of the face (mouth region)
    mouth_region_gray = face_img_gray[int(h*0.65):h, int(w*0.2):int(w*0.8)]
    mouth_region_color = face_img_color[int(h*0.65):h, int(w*0.2):int(w*0.8)]

    # 1. Detect smile → happy
    smiles = smile_cascade.detectMultiScale(
        mouth_region_gray,
        scaleFactor=1.7,
        minNeighbors=20,
        minSize=(25, 25)
    )
    if len(smiles) > 0:
        return "happy"

    # 2. Check mouth openness → sad
    _, thresholded = cv2.threshold(mouth_region_gray, 50, 255, cv2.THRESH_BINARY_INV)
    contours, _ = cv2.findContours(thresholded, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    for cnt in contours:
        x, y, cw, ch = cv2.boundingRect(cnt)
        if ch > 10 and cw > 10 and ch > cw:
            return "sad"

    # 3. Default → neutral
    return "neutral"

@app.route('/detect_emotion', methods=['POST'])
def detect_emotion_route():
    data = request.get_json()
    if not data or 'image' not in data:
        return jsonify({"error": "No image provided"}), 400

    try:
        img_data = base64.b64decode(data['image'])
        np_arr = np.frombuffer(img_data, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if img is None:
            return jsonify({"error": "Invalid image data"}), 400

        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=8, minSize=(100, 100))

        results = []
        for (x, y, w, h) in faces:
            face_gray = gray[y:y+h, x:x+w]
            face_color = img[y:y+h, x:x+w]
            emotion = detect_emotion(face_gray, face_color)

            movie_recs = list(movies_collection.find({"emotion": emotion}, {"_id": 0}))

            results.append({
                "x": int(x),
                "y": int(y),
                "width": int(w),
                "height": int(h),
                "emotion": emotion,
                "recommendations": movie_recs
            })

        return jsonify({"results": results})

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Failed to process image"}), 500

if __name__ == "__main__":
    app.run(debug=True)
