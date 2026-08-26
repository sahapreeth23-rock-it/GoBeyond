from flask import Flask, request, jsonify, session
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import json
import os


app = Flask(__name__)

# --------------------------------------------------
# APP / SESSION CONFIGURATION
# --------------------------------------------------

app.secret_key = "gobeyond-sih-demo-secret-key"

CORS(
    app,
    supports_credentials=True
)


# --------------------------------------------------
# DATA PATHS
# --------------------------------------------------

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

DATA_DIR = os.path.join(
    BASE_DIR,
    "..",
    "Data"
)

OPPORTUNITIES_FILE = os.path.join(
    DATA_DIR,
    "opportunities.json"
)
INTERNSHIPS_FILE = os.path.join(
    DATA_DIR,
    "internships.json"
)
WORKSHOPS_FILE = os.path.join(
    DATA_DIR,
    "workshops.json"
)

USERS_FILE = os.path.join(
    DATA_DIR,
    "users.json"
)


# --------------------------------------------------
# LOAD OPPORTUNITIES
# --------------------------------------------------

with open(
    OPPORTUNITIES_FILE,
    "r",
    encoding="utf-8"
) as file:

    opportunities = json.load(file)
# -----------------------------
# LOAD INTERNSHIPS
# -----------------------------

with open(
    INTERNSHIPS_FILE,
    "r",
    encoding="utf-8"
) as file:

    internships = json.load(file)

# -----------------------------
# LOAD WORKSHOPS
# -----------------------------

with open(
    WORKSHOPS_FILE,
    "r",
    encoding="utf-8"
) as file:

    workshops = json.load(file)



# --------------------------------------------------
# USER STORAGE
# --------------------------------------------------

def load_users():

    if not os.path.exists(USERS_FILE):

        return {}

    try:

        with open(
            USERS_FILE,
            "r",
            encoding="utf-8"
        ) as file:

            return json.load(file)

    except (json.JSONDecodeError, FileNotFoundError):

        return {}


def save_users(users):

    with open(
        USERS_FILE,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            users,
            file,
            indent=4
        )


# --------------------------------------------------
# CAREER INTEREST MAP
# --------------------------------------------------

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
    ],

    "Java Backend Developer": [
        "Java",
        "Backend Development"
    ]

}


# ==================================================
# AUTHENTICATION
# ==================================================


# --------------------------------------------------
# REGISTER
# --------------------------------------------------

@app.route(
    "/api/register",
    methods=["POST"]
)
def register():

    data = request.get_json()

    if not data:

        return jsonify({
            "success": False,
            "message": "Invalid request."
        }), 400


    email = (
        data.get("email") or ""
    ).strip().lower()

    password = (
        data.get("password") or ""
    )


    # Basic validation
    if not email or not password:

        return jsonify({
            "success": False,
            "message": "Email and password are required."
        }), 400


    if len(password) < 8:

        return jsonify({
            "success": False,
            "message":
                "Password must be at least 8 characters."
        }), 400


    users = load_users()


    # Prevent duplicate account
    if email in users:

        return jsonify({
            "success": False,
            "message":
                "An account with this email already exists."
        }), 409


    # IMPORTANT:
    # Never store the plain password.
    password_hash = generate_password_hash(
        password
    )


    users[email] = {

        "email": email,

        "password_hash": password_hash

    }


    save_users(users)


    return jsonify({

        "success": True,

        "message":
            "Account created successfully."

    }), 201


# --------------------------------------------------
# LOGIN
# --------------------------------------------------

@app.route(
    "/api/login",
    methods=["POST"]
)
def login():

    data = request.get_json()

    if not data:

        return jsonify({
            "success": False,
            "message": "Invalid request."
        }), 400


    email = (
        data.get("email") or ""
    ).strip().lower()

    password = (
        data.get("password") or ""
    )


    if not email or not password:

        return jsonify({
            "success": False,
            "message":
                "Email and password are required."
        }), 400


    users = load_users()

    user = users.get(email)


    # Same response for unknown email
    # and wrong password.
    if (
        not user
        or not check_password_hash(
            user["password_hash"],
            password
        )
    ):

        return jsonify({
            "success": False,
            "message":
                "Incorrect email or password."
        }), 401


    # Store authenticated user in session
    session["user_email"] = email


    return jsonify({

        "success": True,

        "message":
            "Login successful.",

        "user": {
            "email": email
        }

    })


# --------------------------------------------------
# CHECK CURRENT SESSION
# --------------------------------------------------

@app.route(
    "/api/session",
    methods=["GET"]
)
def get_session():

    email = session.get("user_email")


    if not email:

        return jsonify({
            "authenticated": False
        })


    return jsonify({

        "authenticated": True,

        "user": {
            "email": email
        }

    })


# --------------------------------------------------
# LOGOUT
# --------------------------------------------------

@app.route(
    "/api/logout",
    methods=["POST"]
)
def logout():

    session.clear()

    return jsonify({

        "success": True,

        "message":
            "Logged out successfully."

    })


# ==================================================
# OPPORTUNITY APIs
# ==================================================


def get_personalized_opportunities(
    career_goal
):

    relevant_interests = \
        career_interest_map.get(
            career_goal,
            []
        )


    if not relevant_interests:

        return []


    personalized = []


    for opportunity in opportunities:

        opportunity_interests = \
            opportunity.get(
                "interests",
                []
            )


        if any(

            interest.strip().lower()
            in [
                item.strip().lower()
                for item in opportunity_interests
            ]

            for interest
            in relevant_interests

        ):

            personalized.append(
                opportunity
            )


    return personalized


@app.route(
    "/api/health"
)
def health():

    return {
        "status":
            "GoBeyond backend is running"
    }


@app.route(
    "/api/opportunities"
)
def get_opportunities():

    return opportunities

@app.route(
    "/api/internships"
)
def get_internships():

    return internships

@app.route(
    "/api/workshops"
)
def get_workshops():

    return workshops


@app.route(
    "/api/personalized-opportunities/<path:career_goal>"
)
def personalized_opportunities(
    career_goal
):

    results = get_personalized_opportunities(
            career_goal
        )


    return {

        "career_goal":
            career_goal,

        "opportunities":
            results

    }


@app.route(
    "/api/student",
    methods=["POST"]
)
def receive_student():

    student = request.get_json()


    print(
        "Received student data:"
    )

    print(student)


    return {

        "status":
            "success",

        "message":
            "Student data received",

        "student":
            student

    }


# ==================================================
# RUN SERVER
# ==================================================

if __name__ == "__main__":

    app.run(
        debug=True
    )