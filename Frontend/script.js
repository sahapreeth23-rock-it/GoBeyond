// ================================
// GO BEYOND - MATCH MODAL
// ================================

const matchModal = document.getElementById("matchModal");
const closeModal = document.getElementById("closeModal");

const viewMatchButtons = document.querySelectorAll(
    ".priority-card button"
);

viewMatchButtons.forEach((button) => {

    if (button.textContent.includes("View Match")) {

        button.addEventListener("click", () => {

            matchModal.classList.add("active");

        });

    }

});


// Close using X button

closeModal.addEventListener("click", () => {

    matchModal.classList.remove("active");

});


// Close when clicking outside the popup

matchModal.addEventListener("click", (event) => {

    if (event.target === matchModal) {

        matchModal.classList.remove("active");

    }

});


// Start Learning button

const startLearning =
    document.getElementById("startLearning");

startLearning.addEventListener("click", () => {

    alert(
        "Your 7-day learning plan for SQL and Machine Learning will be created here."
    );

});
// ================================
// STUDENT PROFILE
// ================================

const profileForm = document.getElementById("profileForm");

profileForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const studentProfile = {
        name: document.getElementById("studentName").value,
        branch: document.getElementById("branch").value,
        year: document.getElementById("year").value,
        careerGoal: document.getElementById("careerGoal").value,

        skills: document
            .getElementById("skills")
            .value
            .split(",")
            .map(skill => skill.trim())
            .filter(skill => skill !== ""),

        interests: document
            .getElementById("interests")
            .value
            .split(",")
            .map(interest => interest.trim())
            .filter(interest => interest !== "")
    };

    // Save profile in browser
    localStorage.setItem(
        "goBeyondProfile",
        JSON.stringify(studentProfile)
    );

    // Update dashboard immediately with the new profile
    updateDashboard(studentProfile);

    alert(
        "Profile saved successfully! 🎉\n\n" +
        "Career Goal: " +
        studentProfile.careerGoal
    );

});
// ================================
// UPDATE DASHBOARD FROM PROFILE
// ================================

function updateDashboard(profile) {

    // Update student name
    const welcomeName = document.querySelector(".welcome h1 span");

    if (welcomeName) {
        welcomeName.textContent = profile.name;
    }


    // Update branch and year
    const studentBadge = document.querySelector(".student-badge");

    if (studentBadge) {

        studentBadge.innerHTML = `
            <strong>${profile.branch === "Computer Science" ? "CSE" : profile.branch.substring(0, 3).toUpperCase()}</strong>
            <span>${profile.year}</span>
        `;

    }


    // Update career goal stat
    const statCards = document.querySelectorAll(".stat-card");

    if (statCards.length > 0) {

        const careerGoalHeading =
            statCards[0].querySelector("h3");

        if (careerGoalHeading) {
            careerGoalHeading.textContent =
                profile.careerGoal;
        }

    }
    updateCareerRoadmap(profile.careerGoal);
    updateOpportunities(profile.careerGoal);
    console.log("Opportunity update:", profile.careerGoal);

}


// ================================
// DYNAMIC CAREER ROADMAP
// ================================

const careerPaths = {

    "AI/ML Engineer": [
        "Python",
        "SQL",
        "Machine Learning",
        "AI/ML Projects",
        "Internship",
        "AI/ML Engineer"
    ],

    "Web Developer": [
        "HTML & CSS",
        "JavaScript",
        "React",
        "Frontend Projects",
        "Internship",
        "Web Developer"
    ],

    "Data Scientist": [
        "Python",
        "Statistics",
        "SQL",
        "Data Analysis",
        "Machine Learning",
        "Data Scientist"
    ],

    "Cybersecurity Engineer": [
        "Networking",
        "Linux",
        "Cybersecurity Fundamentals",
        "Security Tools",
        "Security Projects",
        "Cybersecurity Engineer"
    ]

};


function updateCareerRoadmap(careerGoal) {

    const roadmap =
        document.getElementById("careerRoadmap");

    if (!roadmap) return;

    const steps = careerPaths[careerGoal];

    if (!steps) return;

    roadmap.innerHTML = "";

    steps.forEach((step, index) => {

        const stepElement =
            document.createElement("div");

        stepElement.className = "roadmap-step";

        if (index === 0) {
            stepElement.classList.add("completed");
        }

        if (index === 1) {
            stepElement.classList.add("current");
        }

        let status = "Upcoming";

        if (index === 0) {
            status = "Starting Point";
        }

        if (index === 1) {
            status = "Current Focus";
        }

        if (index === steps.length - 1) {
            status = "Career Goal";
        }

        stepElement.innerHTML = `
            <span>
                ${index === 0 ? "✓" : index + 1}
            </span>

            <strong>${step}</strong>

            <small>${status}</small>
        `;

        roadmap.appendChild(stepElement);


        // Add connecting line except after last step

        if (index < steps.length - 1) {

            const line =
                document.createElement("div");

            line.className = "roadmap-line";

            roadmap.appendChild(line);

        }

    });

}

// ================================
// CAREER-SPECIFIC OPPORTUNITIES
// ================================
const careerOpportunities = {
    "AI/ML Engineer": [
        {
            title: "AI/ML Internship",
            organization: "TechNova",
            type: "Internship",
            match: 75,
            deadline: "Closes in 5 days",
            requiredSkills: [
                "Python",
                "Machine Learning",
                "SQL"
            ]
        },
        {
            title: "Generative AI Workshop",
            organization: "AI Innovation Club",
            type: "Workshop",
            match: 88,
            deadline: "This Saturday",
            requiredSkills: [
                "Python",
                "AI"
            ]
        },
        {
            title: "AI Hackathon 2026",
            organization: "Tech Community",
            type: "Hackathon",
            match: 82,
            deadline: "Closes in 8 days",
            requiredSkills: [
                "Python",
                "Machine Learning"
            ]
        }
    ],


    "Web Developer": [
        {
            title: "Frontend Development Internship",
            organization: "WebWorks",
            type: "Internship",
            match: 90,
            deadline: "Closes in 4 days",
            requiredSkills: [
                "HTML",
                "CSS",
                "JavaScript"
            ]
        },
        {
            title: "React Development Workshop",
            organization: "Developer Community",
            type: "Workshop",
            match: 85,
            deadline: "This Friday",
            requiredSkills: [
                "JavaScript",
                "React"
            ]
        },
        {
            title: "Frontend Hackathon",
            organization: "CodeFest",
            type: "Hackathon",
            match: 78,
            deadline: "Closes in 7 days",
            requiredSkills: [
                "HTML",
                "CSS",
                "JavaScript"
            ]
        }
    ],


    "Data Scientist": [
        {
            title: "Data Science Internship",
            organization: "DataLabs",
            type: "Internship",
            match: 84,
            deadline: "Closes in 6 days",
            requiredSkills: [
                "Python",
                "SQL",
                "Statistics"
            ]
        },
        {
            title: "Data Analytics Workshop",
            organization: "Analytics Club",
            type: "Workshop",
            match: 80,
            deadline: "This Saturday",
            requiredSkills: [
                "Python",
                "Data Analysis"
            ]
        },
        {
            title: "Data Science Challenge",
            organization: "Tech Community",
            type: "Hackathon",
            match: 76,
            deadline: "Closes in 10 days",
            requiredSkills: [
                "Python",
                "Statistics"
            ]
        }
    ],


    "Cybersecurity Engineer": [
        {
            title: "Cybersecurity Internship",
            organization: "SecureNet",
            type: "Internship",
            match: 81,
            deadline: "Closes in 5 days",
            requiredSkills: [
                "Networking",
                "Linux",
                "Cybersecurity"
            ]
        },
        {
            title: "Ethical Hacking Workshop",
            organization: "Cyber Club",
            type: "Workshop",
            match: 87,
            deadline: "This Friday",
            requiredSkills: [
                "Linux",
                "Cybersecurity"
            ]
        },
        {
            title: "Cybersecurity Hackathon",
            organization: "Security Community",
            type: "Hackathon",
            match: 79,
            deadline: "Closes in 9 days",
            requiredSkills: [
                "Networking",
                "Linux"
            ]
        }
    ],
    "Java Backend Developer": [
    {
        title: "Java Backend Internship",
        organization: "CodeForge",
        type: "Internship",
        match: 89,
        deadline: "Closes in 7 days",
        requiredSkills: ["Java", "SQL", "Spring Boot"]
    },
    {
        title: "Backend Development Hackathon",
        organization: "DevCommunity",
        type: "Hackathon",
        match: 86,
        deadline: "Registration closes in 5 days",
        requiredSkills: ["Java", "APIs", "SQL"]
    }
],

};
// ================================
// UPDATE OPPORTUNITIES
// ================================

function updateOpportunities(careerGoal) {

    const opportunityGrid =
        document.getElementById("opportunityGrid");

    if (!opportunityGrid) return;

    const opportunities =
        careerOpportunities[careerGoal];
    const savedProfile =
    JSON.parse(localStorage.getItem("goBeyondProfile"));

    const studentSkills =
    savedProfile ? savedProfile.skills : [];

    if (!opportunities) return;

    opportunityGrid.innerHTML = "";

    opportunities.forEach((opportunity) => {
        const calculatedMatch =
            calculateSkillMatch(
               studentSkills,
               opportunity.requiredSkills
        );
        const skillGaps =
        findSkillGaps(
            studentSkills,
            opportunity.requiredSkills
        );

        const card =
            document.createElement("div");

        card.className = "opportunity-card";

        card.innerHTML = `
            <div class="opportunity-header">

                <span class="tag blue">
                    ${opportunity.type}
                </span>

                <span class="match">
                    ${calculatedMatch}% Match
                </span>

            </div>
            ${skillGaps.length > 0
    ? `
        <div class="skill-gap">
            <strong>⚠️ Skill Gap:</strong>
            ${learningRecommendations}
        </div>
      `
    : `
        <div class="skill-gap">
            <strong>✅ Skills Matched!</strong>
        </div>
      `
}
            <h3>${opportunity.title}</h3>

            <p class="organization">
                ${opportunity.organization}
            </p>

            <p>
                Recommended for your
                ${careerGoal} journey.
            </p>

            <p class="deadline">
                ⏰ ${opportunity.deadline}
            </p>

            <button class="opportunity-action">
                View Opportunity →
            </button>
        `;

        opportunityGrid.appendChild(card);

    });

}
// ================================
// PERSONALIZED SKILL MATCH
// ================================

function calculateSkillMatch(studentSkills, requiredSkills) {

    if (!requiredSkills || requiredSkills.length === 0) {
        return 0;
    }

    const normalizedStudentSkills =
        studentSkills.map(skill => skill.toLowerCase().trim());

    const matchedSkills =
        requiredSkills.filter(skill =>
            normalizedStudentSkills.includes(
                skill.toLowerCase().trim()
            )
        );

    return Math.round(
        (matchedSkills.length / requiredSkills.length) * 100
    );
}
// ================================
// SKILL GAP DETECTION
// ================================

function findSkillGaps(studentSkills, requiredSkills) {

    const normalizedStudentSkills =
        studentSkills.map(skill =>
            skill.toLowerCase().trim()
        );

    return requiredSkills.filter(skill =>
        !normalizedStudentSkills.includes(
            skill.toLowerCase().trim()
        )
    );
}
// ================================
// LEARNING RECOMMENDATION
// ================================

function getLearningRecommendation(skill) {

    const recommendations = {
        "HTML": "Learn HTML fundamentals",
        "CSS": "Practice CSS and responsive design",
        "JavaScript": "Learn JavaScript fundamentals",
        "React": "Learn React fundamentals",
        "Python": "Strengthen Python programming",
        "SQL": "Practice SQL and database queries",
        "Statistics": "Study statistics for data science",
        "Java": "Strengthen Java programming",
        "Spring Boot": "Learn Spring Boot fundamentals",
        "Networking": "Learn computer networking fundamentals",
        "Linux": "Practice Linux fundamentals",
        "Cybersecurity": "Study cybersecurity fundamentals"
    };

    return recommendations[skill] ||
           `Learn ${skill} fundamentals`;
}
// Load saved profile when website opens

const savedProfile =
    localStorage.getItem("goBeyondProfile");

if (savedProfile) {

    const profile =
        JSON.parse(savedProfile);

    updateDashboard(profile);

}