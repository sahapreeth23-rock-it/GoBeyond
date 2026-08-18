import json
# Load career paths
with open("../data/career_paths.json", "r") as file:
    career_paths = json.load(file)

#Loading learning resources
with open("../data/learning_resources.json","r") as file:
    learning_resources = json.load(file)

# Load student data
with open("../data/students.json", "r") as file:
    student = json.load(file)

# Load opportunity data
with open("../data/opportunities.json", "r") as file:
    opportunities = json.load(file)

print("Student:")
print(student["name"])

print("\nOpportunities:")
for opportunity in opportunities:
    print(opportunity["title"])
print("\nSkill Match:")

for opportunity in opportunities:
    required_skills = opportunity["required_skills"]
    student_skills = student["skills"]

    matched_skills = []

    for skill in required_skills:
        if skill in student_skills:
            matched_skills.append(skill)

    match_percentage = (len(matched_skills) / len(required_skills)) * 100

    print("\n" + opportunity["title"])
    print("Matched skills:", matched_skills)
    print("Skill match:", match_percentage, "%")
    print("\nFinal Match:")

for opportunity in opportunities:
    required_skills = opportunity["required_skills"]
    student_skills = student["skills"]

    matched_skills = []

    for skill in required_skills:
        if skill in student_skills:
            matched_skills.append(skill)

    skill_match = (len(matched_skills) / len(required_skills)) * 100

    opportunity_interests = opportunity["interests"]
    student_interests = student["interests"]

    matched_interests = []

    for interest in opportunity_interests:
        if interest in student_interests:
            matched_interests.append(interest)

    if len(opportunity_interests) > 0:
        interest_match = (
            len(matched_interests) / len(opportunity_interests)
        ) * 100
    else:
        interest_match = 0

    final_match = (skill_match * 0.7) + (interest_match * 0.3)

    print("\n" + opportunity["title"])
    print("Skill Match:", skill_match, "%")
    print("Interest Match:", interest_match, "%")
    print("Final Match:", final_match, "%")
    print("\nPersonalized Match:")

for opportunity in opportunities:
    required_skills = opportunity["required_skills"]
    student_skills = student["skills"]

    matched_skills = []

    for skill in required_skills:
        if skill in student_skills:
            matched_skills.append(skill)

    skill_match = (len(matched_skills) / len(required_skills)) * 100

    opportunity_interests = opportunity["interests"]
    student_interests = student["interests"]

    matched_interests = []

    for interest in opportunity_interests:
        if interest in student_interests:
            matched_interests.append(interest)

    if len(opportunity_interests) > 0:
        interest_match = (
            len(matched_interests) / len(opportunity_interests)
        ) * 100
    else:
        interest_match = 0

    career_match = 0

    career_goal = student["career_goal"].lower()

    for interest in opportunity_interests:
        if interest.lower() in career_goal:
            career_match = 100

    final_match = (
        skill_match * 0.50
        + interest_match * 0.25
        + career_match * 0.25
    )

    print("\n" + opportunity["title"])
    print("Skill Match:", skill_match, "%")
    print("Interest Match:", interest_match, "%")
    print("Career Match:", career_match, "%")
    print("Final Match:", final_match, "%")
    print("\nSkill Gap Analysis:")

for opportunity in opportunities:
    required_skills = opportunity["required_skills"]
    student_skills = student["skills"]

    matched_skills = []
    missing_skills = []

    for skill in required_skills:
        if skill in student_skills:
            matched_skills.append(skill)
        else:
            missing_skills.append(skill)

    print("\n" + opportunity["title"])
    print("Matched Skills:", matched_skills)
    print("Missing Skills:", missing_skills)
    print("\nRecommended Actions:")

for opportunity in opportunities:
    required_skills = opportunity["required_skills"]
    student_skills = student["skills"]

    missing_skills = []

    for skill in required_skills:
        if skill not in student_skills:
            missing_skills.append(skill)

    print("\n" + opportunity["title"])

    if len(missing_skills) == 0:
        print("You have all the required skills!")

    else:
        print("Recommended actions:")

        for missing_skill in missing_skills:
            for resource in learning_resources:
                if resource["skill"] == missing_skill:
                    print(
                        "-",
                        resource["resource"],
                        "|",
                        resource["duration"],
                        "|",
                        resource["action"]
                    )
                    print("\nCareer Roadmap:")

career_goal = student["career_goal"]

for path in career_paths:
    if path["career"].lower() == career_goal.lower():

        print("\nCareer Goal:", path["career"])
        print("Roadmap:")

        for index, step in enumerate(path["steps"], start=1):
            print(f"{index}. {step}")
