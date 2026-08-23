from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
with open("../Data/opportunities.json", "r") as file:
    opportunities = json.load(file)

career_interest_map = {
    "AI/ML Engineer": [
        "Artificial Intelligence",
        "Machine Learning"
    ],
    "Web Developer": [
        "Web Development"
    ],
    "Data Scientist": [
        "Data Science",
        "Machine Learning"
    ],
    "Cybersecurity Engineer": [
        "Cybersecurity"
    ]
}

def get_personalized_opportunities(career_goal):
    relevant_interests = career_interest_map.get(career_goal, [])

    if not relevant_interests:
        return []

    personalized = []

    for opportunity in opportunities:
        opportunity_interests = opportunity.get("interests", [])

        if any(
            interest.strip().lower() in [
                item.strip().lower()
                for item in relevant_interests
            ]
            for interest in opportunity_interests
        ):
            personalized.append(opportunity)

    return personalized

@app.route("/api/health")
def health():
    return {"status": "GoBeyond backend is running"}

@app.route("/api/opportunities")
def get_opportunities():
    return opportunities

@app.route("/api/personalized-opportunities/<path:career_goal>")
def personalized_opportunities(career_goal):
    results = get_personalized_opportunities(career_goal)

    return {
        "career_goal": career_goal,
        "opportunities": results
    }
    
@app.route("/api/student", methods=["POST"])
def receive_student():
    student = request.get_json()

    print("Received student data:")
    print(student)

    return {
        "status": "success",
        "message": "Student data received",
        "student": student
    }

if __name__ == "__main__":
    app.run(debug=True)