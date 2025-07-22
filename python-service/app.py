import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from huggingface_hub import InferenceClient
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  


client = None
try:
    API_KEY = os.getenv("HUGGINGFACE_API_KEY")
    if not API_KEY:
        print("Error: HUGGINGFACE_API_KEY not found in .env file or environment variables!")
    else:
        client = InferenceClient(
            provider="auto",
            api_key=API_KEY,
        )
except Exception as e:
    print(f"Error initializing InferenceClient: {e}")
    

@app.route("/")
def index():
    return jsonify({"status": "Python chatbot service is running"})

@app.route("/chat", methods=["POST"])
def chat():
    """
    Chat endpoint that receives a user message and returns the chatbot's response.
    """
    if client is None:
        return jsonify({"error": "Hugging Face client not initialized. Check API key and server logs."}), 500

    
    data = request.get_json()
    user_message = data.get("message")

    if not user_message:
        return jsonify({"error": "Message not provided"}), 400

    try:
        
        completion = client.chat.completions.create(
            model="google/gemma-3-27b-it", 
            messages=[
                {
                    "role": "user",
                    "content": user_message + "answer in a single paragraph in under 50 words"
                }
            ],
            max_tokens=2500, 
        )

        
        bot_response = completion.choices[0].message.content
        return jsonify({"response": bot_response})

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "Failed to get response from model"}), 500