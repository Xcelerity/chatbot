## How to Run

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd mern-chatbot
    ```

2.  **Configure Environment Variables:**
    * Create `python-service/.env` and add your Hugging Face key:
        `HUGGINGFACE_API_KEY=your_key_here`
    * Create `backend/.env` and add the Python service URL:
        `PYTHON_API_URL=http://127.0.0.1:8000`

3.  **Install Dependencies:**
    * **Python:**
        ```bash
        cd python-service
        python -m venv venv
        source venv/bin/activate  # On Windows use `venv\Scripts\activate`
        pip install -r requirements.txt
        cd ..
        ```
    * **Node.js (Root, Backend & Frontend):**
        ```bash
        npm install
        cd backend && npm install && cd ..
        cd frontend && npm install && cd ..
        ```

4.  **Start the Application:**
    From the root directory, run the `dev` script to start all services concurrently:
    ```bash
    npm run dev
    ```
    Navigate to the frontend URL shown in your terminal (e.g., `http://localhost:5173`).
