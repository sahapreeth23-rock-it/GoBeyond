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
    resources={
        r"/api/*": {
            "origins": [
                "https://sahapreeth23-rock-it.github.io"
            ],
            "methods": [
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
            ],
            "allow_headers": [
                "Content-Type"
            ]
        }
    },
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
INDUSTRY_OPPORTUNITIES_FILE = os.path.join(
    DATA_DIR,
    "industry_opportunities.json"
)
APPLICATIONS_FILE = os.path.join(
    DATA_DIR,
    "applications.json"
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

with open(
    INDUSTRY_OPPORTUNITIES_FILE,
    "r",
    encoding="utf-8"
) as file:

    industry_opportunities = json.load(file)

with open(
    os.path.join(DATA_DIR, "students.json"),
    "r",
    encoding="utf-8"
) as file:

    students = json.load(file)

if not isinstance(students, list):
    students = [students]
with open(
    APPLICATIONS_FILE,
    "r",
    encoding="utf-8"
) as file:

    applications = json.load(file)
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
    "/api/industry/opportunities",
    methods=["POST"]
)
def create_industry_opportunity():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Invalid request."
        }), 400

    required_fields = [
        "company",
        "title",
        "type",
        "required_skills",
        "eligibility",
        "duration",
        "location"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({
                "success": False,
                "message": f"Missing field: {field}"
            }), 400

    new_id = (
        max(
            [
                opportunity.get("id", 0)
                for opportunity in industry_opportunities
            ],
            default=0
        ) + 1
    )

    new_opportunity = {
        "id": new_id,
        "company": data["company"],
        "title": data["title"],
        "type": data["type"],
        "required_skills": data["required_skills"],
        "eligibility": data["eligibility"],
        "duration": data["duration"],
        "location": data["location"]
    }

    industry_opportunities.append(
        new_opportunity
    )

    with open(
        INDUSTRY_OPPORTUNITIES_FILE,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            industry_opportunities,
            file,
            indent=4
        )

    return jsonify({
        "success": True,
        "message": "Opportunity posted successfully.",
        "opportunity": new_opportunity
    }), 201
@app.route(
    "/api/industry/opportunities",
    methods=["GET"]
)
def get_industry_opportunities():

    return jsonify({
        "success": True,
        "opportunities": industry_opportunities
    })
@app.route(
    "/api/industry/applications",
    methods=["POST"]
)
def create_application():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Invalid request."
        }), 400

    required_fields = [
        "opportunity_id",
        "student_id"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({
                "success": False,
                "message": f"Missing field: {field}"
            }), 400

    application = {
        "id": len(applications) + 1,
        "opportunity_id": data["opportunity_id"],
        "student_id": data["student_id"],
        "status": "Applied"
    }

    applications.append(application)

    with open(
        APPLICATIONS_FILE,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            applications,
            file,
            indent=4
        )

    return jsonify({
        "success": True,
        "message": "Application submitted successfully.",
        "application": application
    }), 201
@app.route(
    "/api/industry/applications/<int:opportunity_id>",
    methods=["GET"]
)
def get_applications(opportunity_id):

    opportunity_applications = []

    for application in applications:

        if application["opportunity_id"] == opportunity_id:

            student_id = application["student_id"]

            if (
                isinstance(student, dict)
                and student.get("student_id") == student_id
            ):
                opportunity_applications.append({
                    "application_id": application["id"],
                    "student_id": student["student_id"],
                    "candidate": student["name"],
                    "status": application["status"]
                })

    return jsonify({
        "success": True,
        "applications": opportunity_applications
    })
@app.route(
    "/api/industry/opportunities/<int:opportunity_id>/candidates",
    methods=["GET"]
)
def get_candidate_matches(opportunity_id):

    # Find the opportunity
    opportunity = None

    for item in industry_opportunities:
        if item.get("id") == opportunity_id:
            opportunity = item
            break

    if not opportunity:
        return jsonify({
            "success": False,
            "message": "Opportunity not found."
        }), 404

    required_skills = opportunity.get(
        "required_skills",
        []
    )

    candidates = []

    for application in applications:

        if application.get("opportunity_id") != opportunity_id:
            continue

        if (
            not isinstance(student, dict)
            or student.get("student_id") != application.get("student_id")
        ):
            continue

        student_skills = [
            skill.strip().lower()
            for skill in student.get("skills", [])
        ]

        student_interests = [
            interest.strip().lower()
            for interest in student.get("interests", [])
        ]

        matched_skills = []
        missing_skills = []

        for skill in required_skills:

            skill_lower = skill.strip().lower()

            if skill_lower in student_skills:
                matched_skills.append(skill)
            else:
                missing_skills.append(skill)

        # Skill match
        if required_skills:
            skill_match = (
                len(matched_skills)
                / len(required_skills)
            ) * 100
        else:
            skill_match = 0

        # Interest match
        interest_matches = []

        for skill in required_skills:

            if skill.strip().lower() in student_interests:
                interest_matches.append(skill)

        if required_skills:
            interest_match = (
                len(interest_matches)
                / len(required_skills)
            ) * 100
        else:
            interest_match = 0

        # Career match
        career_goal = (
            student.get("career_goal", "")
            .strip()
            .lower()
        )

        career_match = 0

        for skill in required_skills:

            if skill.strip().lower() in career_goal:
                career_match = 100
                break

        # Final score
        final_match = (
            skill_match * 0.50
            + interest_match * 0.25
            + career_match * 0.25
        )

        candidates.append({
            "application_id": application.get("id"),
            "student_id": student.get("student_id"),
            "candidate": student.get("name"),
            "skill_match": round(skill_match, 2),
            "interest_match": round(interest_match, 2),
            "career_match": round(career_match, 2),
            "overall_match": round(final_match, 2),
            "matched_skills": matched_skills,
            "missing_skills": missing_skills,
            "status": application.get("status")
        })

    return jsonify({
        "success": True,
        "opportunity_id": opportunity_id,
        "candidates": candidates
    })
@app.route(
    "/api/industry/applications/<int:application_id>/shortlist",
    methods=["POST"]
)
def shortlist_application(application_id):

    for application in applications:

        if application.get("id") == application_id:

            application["status"] = "Shortlisted"

            with open(
                APPLICATIONS_FILE,
                "w",
                encoding="utf-8"
            ) as file:

                json.dump(
                    applications,
                    file,
                    indent=4
                )

            return jsonify({
                "success": True,
                "message": "Candidate shortlisted successfully.",
                "application": application
            })

    return jsonify({
        "success": False,
        "message": "Application not found."
    }), 404
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

    data = request.get_json()

    if not data:
        return jsonify({
            "status": "error",
            "message": "No student data received."
        }), 400

    # Generate a new student ID
    existing_ids = []

    for item in students:
        student_id = item.get("student_id")

        if isinstance(student_id, str) and student_id.startswith("S"):
            try:
                existing_ids.append(
                    int(student_id[1:])
                )
            except ValueError:
                pass

    next_number = max(existing_ids, default=0) + 1
    new_student_id = f"S{next_number:03d}"

    # Convert onboarding data into the same structure
    # used by students.json
    new_student = {
        "student_id": new_student_id,
        "name": data.get("name", ""),
        "college": data.get("college", ""),
        "branch": data.get("branch", ""),
        "year": data.get("year", ""),
        "career_goal": data.get("careerGoal", ""),

        "skills": [
            skill.get("name", "")
            for skill in data.get("skills", [])
        ],

        "technical_skills": [
            skill.get("name", "")
            for skill in data.get("skills", [])
        ],

        "skill_level": (
            data.get("skills", [{}])[0].get(
                "proficiency", "Beginner"
            )
            if data.get("skills")
            else "Beginner"
        ),

        "interests": data.get("interests", []),

        "certifications": (
            [data.get("certifications")]
            if data.get("certifications")
            else []
        ),

        "projects": data.get("projects", ""),
        "experience": data.get("experience", ""),

        "assessed": True,
        "eligible": True,
        "internship_ready": False,
        "internship_completed": False,
        "seeking_internship": True,

        "company": None,
        "internship_role": None,
        "internship_duration": None
    }

    # Add the new student
    students.append(new_student)

    # Save the updated students list
    STUDENTS_FILE = os.path.join(
        DATA_DIR,
        "students.json"
    )

    with open(
        STUDENTS_FILE,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            students,
            file,
            indent=4
        )

    print("New student saved:", new_student)

    return jsonify({
        "status": "success",
        "message": "Student profile saved successfully.",
        "student": new_student
    }), 201



# ==================================================
# RUN SERVER
# ==================================================

if __name__ == "__main__":

    app.run(
        debug=True
    )
