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
    fetch("http://127.0.0.1:5000/api/student", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(studentProfile)
    })
    .then(response => response.json())
    .then(data => {
    console.log("Student profile sent to backend:", data);
    })
    .catch(error => {
    console.error("Backend profile upload failed:", error);
    });

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
    updatePriorities(profile.careerGoal);
    updateOpportunities(profile.careerGoal);
    console.log("Opportunity update:", profile.careerGoal);

}

// ================================
// DYNAMIC PRIORITIES
// ================================

const priorityData = {

    "AI/ML Engineer": {
        priority1: {
            tag: "Deadline Soon",
            icon: "🔴",
            title: "AI/ML Internship",
            description: "You have a 75% match. Improve your SQL and Machine Learning skills."
        },
        priority2: {
            tag: "Skill Gap",
            icon: "🧠",
            title: "Learn SQL",
            description: "SQL is required for your recommended AI/ML opportunities."
        },
        priority3: {
            tag: "Recommended",
            icon: "⭐",
            title: "Python & AI Workshop",
            description: "This workshop matches your interests in Artificial Intelligence."
        }
    },

    "Web Developer": {
        priority1: {
            tag: "Deadline Soon",
            icon: "🔴",
            title: "Web Development Internship",
            description: "You have a strong match. Strengthen your JavaScript and React skills."
        },
        priority2: {
            tag: "Skill Gap",
            icon: "🧠",
            title: "Learn React",
            description: "React is an important skill for your recommended web development opportunities."
        },
        priority3: {
            tag: "Recommended",
            icon: "⭐",
            title: "Web Development Hackathon",
            description: "This hackathon matches your interest in building web applications."
        }
    },

    "Data Scientist": {
        priority1: {
            tag: "Deadline Soon",
            icon: "🔴",
            title: "Data Science Internship",
            description: "You have a strong match. Improve your Statistics and Data Analysis skills."
        },
        priority2: {
            tag: "Skill Gap",
            icon: "🧠",
            title: "Learn Statistics",
            description: "Statistics is required for your recommended Data Science opportunities."
        },
        priority3: {
            tag: "Recommended",
            icon: "⭐",
            title: "Data Science Workshop",
            description: "This workshop matches your interest in Data Science and Machine Learning."
        }
    },

    "Cybersecurity Engineer": {
        priority1: {
            tag: "Deadline Soon",
            icon: "🔴",
            title: "Cybersecurity Internship",
            description: "You have a strong match. Strengthen your Networking and Linux skills."
        },
        priority2: {
            tag: "Skill Gap",
            icon: "🧠",
            title: "Learn Networking",
            description: "Networking is an important skill for your recommended cybersecurity opportunities."
        },
        priority3: {
            tag: "Recommended",
            icon: "⭐",
            title: "Cybersecurity Workshop",
            description: "This workshop matches your interest in cybersecurity and security tools."
        }
    }
};


function updatePriorities(careerGoal) {

    const priorities = priorityData[careerGoal];

    if (!priorities) return;

    Object.keys(priorities).forEach(priorityId => {

        const card = document.getElementById(priorityId);

        if (!card) return;

        const data = priorities[priorityId];

        const tag = card.querySelector(".tag");
        const icon = card.querySelector(".priority-top span:last-child");
        const title = card.querySelector("h3");
        const description = card.querySelector("p");

        if (tag) {
            tag.textContent = data.tag;
        }

        if (icon) {
            icon.textContent = data.icon;
        }

        if (title) {
            title.textContent = data.title;
        }

        if (description) {
            description.textContent = data.description;
        }
    });
}
// ==================function updateDashboard(profile)==============
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
    const roadmapTitle = document.getElementById("careerRoadmapTitle");

if (roadmapTitle) {
    const roadmapTitles = {
        "AI/ML Engineer": "AI/ML Career Roadmap",
        "Web Developer": "Web Development Career Roadmap",
        "Data Scientist": "Data Science Career Roadmap",
        "Cybersecurity Engineer": "Cybersecurity Career Roadmap",
        "Java Backend Developer": "Java Backend Development Career Roadmap"
    };

    roadmapTitle.textContent =
        roadmapTitles[careerGoal] || "Career Roadmap";
}

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
async function updateOpportunities(careerGoal) {

    const opportunityGrid = document.getElementById("opportunityGrid");

    if (!opportunityGrid) return;

    try {

    const response = await fetch(
    `http://127.0.0.1:5000/api/personalized-opportunities/${encodeURIComponent(careerGoal)}`
);

        if (!response.ok) {
            throw new Error("Failed to fetch personalized opportunities");
        }

        const data = await response.json();

        const opportunities = data.opportunities || [];

        const savedProfile = JSON.parse(
            localStorage.getItem("goBeyondProfile")
        );

        const studentSkills = savedProfile
            ? savedProfile.skills
            : [];

        opportunityGrid.innerHTML = "";

        opportunities.forEach((opportunity) => {

            const calculatedMatch = calculateSkillMatch(
                studentSkills,
                opportunity.requiredSkills
            );

            const skillGaps = findSkillGaps(
                studentSkills,
                opportunity.requiredSkills
            );

            const learningRecommendations = skillGaps
                .map(skill => getLearningRecommendation(skill))
                .join(", ");

            const card = document.createElement("div");

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

                ${
                    skillGaps.length > 0
                    ? `
                    <div class="skill-gap">
                        <strong>Skill Gap:</strong>
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

    } catch (error) {

        console.error(
            "Error loading personalized opportunities:",
            error
        );

    }
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

    const normalizedStudentSkills = studentSkills.map(skill =>
        skill.toLowerCase().trim()
    );

    const safeRequiredSkills = requiredSkills || [];

    return safeRequiredSkills.filter(skill =>
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
// ================================
// BACKEND CONNECTION TEST
// ================================

fetch("http://127.0.0.1:5000/api/health")
    .then(response => response.json())
    .then(data => {
        console.log("Backend connected:", data);
    })
    .catch(error => {
        console.error("Backend connection failed:", error);
    });
    // ===============================
// JOURNAL & NOTES
// ===============================

const journalTitle = document.getElementById("journalTitle");
const journalText = document.getElementById("journalText");
const saveJournalBtn = document.getElementById("saveJournalBtn");
const journalEntriesList = document.getElementById("journalEntriesList");

// Get saved journal entries
let journalEntries = JSON.parse(
    localStorage.getItem("goBeyondJournal")
) || [];


// Save a new journal entry
saveJournalBtn.addEventListener("click", function () {

    const title = journalTitle.value.trim();
    const text = journalText.value.trim();

    // Prevent empty entries
    if (title === "" || text === "") {
        alert("Please enter a title and your thoughts before saving.");
        return;
    }

    const entry = {
        id: Date.now(),
        title: title,
        text: text,
        date: new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        })
    };

    journalEntries.unshift(entry);

    // Save to localStorage
    localStorage.setItem(
        "goBeyondJournal",
        JSON.stringify(journalEntries)
    );

    // Clear input fields
    journalTitle.value = "";
    journalText.value = "";

    // Display entries
    displayJournalEntries();

    alert("Journal entry saved successfully! 📝");
});


// Display saved journal entries
function displayJournalEntries() {

    if (journalEntries.length === 0) {
        journalEntriesList.innerHTML = `
            <p class="empty-journal">
                Your saved entries will appear here.
            </p>
        `;
        return;
    }

    journalEntriesList.innerHTML = "";

    journalEntries.forEach(function (entry) {

        const entryCard = document.createElement("div");

        entryCard.className = "journal-entry";

        entryCard.innerHTML = `
            <div class="journal-entry-header">
                <div>
                    <h4>${entry.title}</h4>
                    <small>${entry.date}</small>
                </div>

                <button
                    class="delete-journal-btn"
                    onclick="deleteJournalEntry(${entry.id})"
                >
                    Delete
                </button>
            </div>

            <p>${entry.text}</p>
        `;

        journalEntriesList.appendChild(entryCard);
    });
}


// Delete a journal entry
function deleteJournalEntry(id) {

    journalEntries = journalEntries.filter(function (entry) {
        return entry.id !== id;
    });

    localStorage.setItem(
        "goBeyondJournal",
        JSON.stringify(journalEntries)
    );

    displayJournalEntries();
}


// Load entries when the page opens
displayJournalEntries();
// ===============================
// DAILY MOOD CHECK
// ===============================

const moodOptions = document.querySelectorAll(".mood-option");
const selectedMood = document.getElementById("selectedMood");

let currentMood = localStorage.getItem("goBeyondMood");


// Select a mood
moodOptions.forEach(function (button) {

    button.addEventListener("click", function () {

        const mood = button.dataset.mood;

        // Remove previous selection
        moodOptions.forEach(function (option) {
            option.classList.remove("selected");
        });

        // Highlight selected mood
        button.classList.add("selected");

        // Save mood
        currentMood = mood;

        localStorage.setItem(
            "goBeyondMood",
            mood
        );

        // Show confirmation
        selectedMood.textContent =
            `You're feeling "${mood}" today 💗`;

        selectedMood.style.display = "block";
    });

});


// Restore saved mood when page loads
if (currentMood) {

    moodOptions.forEach(function (button) {

        if (button.dataset.mood === currentMood) {

            button.classList.add("selected");

            selectedMood.textContent =
                `You're feeling "${currentMood}" today 💗`;

            selectedMood.style.display = "block";
        }

    });

}
// ===============================
// ⭐🔥 GO-BEYOND PROGRESS
// Stars & Streak
// ===============================

const starCountElement = document.getElementById("starCount");
const streakCountElement = document.getElementById("streakCount");

// Get saved progress
let goBeyondStars = parseInt(
    localStorage.getItem("goBeyondStars")
) || 0;

let goBeyondStreak = parseInt(
    localStorage.getItem("goBeyondStreak")
) || 0;


// Display saved progress
function updateProgressDisplay() {

    if (starCountElement) {
        starCountElement.textContent = goBeyondStars;
    }

    if (streakCountElement) {
        streakCountElement.textContent = goBeyondStreak;
    }
}


// Load progress when page opens
updateProgressDisplay();
// =========================================
// 🎯 DAILY GO-BEYOND ACTION
// Career-based personalization
// =========================================

const dailyActionTitle =
    document.getElementById("dailyActionTitle");

const dailyActionDescription =
    document.getElementById("dailyActionDescription");

const dailyActionReason =
    document.getElementById("dailyActionReason");


const dailyActions = {

    "AI/ML Engineer": {
        title: "Complete 30 minutes of SQL practice",
        description:
            "Practice SQL for 30 minutes to strengthen an important skill for your AI/ML journey.",
        reason:
            "💡 Based on your AI/ML career roadmap"
    },

    "Web Developer": {
        title: "Build a small responsive webpage",
        description:
            "Spend 30 minutes improving your HTML, CSS, or JavaScript skills by building something practical.",
        reason:
            "💡 Based on your Web Development career roadmap"
    },

    "Data Scientist": {
        title: "Practice Python data analysis",
        description:
            "Spend 30 minutes working with Python and exploring a small dataset.",
        reason:
            "💡 Based on your Data Science career roadmap"
    },

    "Cybersecurity Engineer": {
        title: "Learn one cybersecurity concept",
        description:
            "Spend 30 minutes learning and taking notes on a cybersecurity concept such as networking, threats, or security fundamentals.",
        reason:
            "💡 Based on your Cybersecurity career roadmap"
    }

};


function updateDailyAction() {

    const careerGoal =
        document.getElementById("careerGoal")?.value;

    const action =
        dailyActions[careerGoal];

    if (!action) return;

    if (dailyActionTitle) {
        dailyActionTitle.textContent =
            action.title;
    }

    if (dailyActionDescription) {
        dailyActionDescription.textContent =
            action.description;
    }

    if (dailyActionReason) {
        dailyActionReason.textContent =
            action.reason;
    }
}


// Update when the page loads
updateDailyAction();


// Update when career goal changes
const careerGoalSelect =
    document.getElementById("careerGoal");

if (careerGoalSelect) {

    careerGoalSelect.addEventListener(
        "change",
        updateDailyAction
    );

}
// =========================================
// 📝 LEARNING REFLECTION + ⭐ REWARD
// =========================================

const learningReflection =
    document.getElementById("learningReflection");

const completeLearningBtn =
    document.getElementById("completeLearningBtn");

const learningCompletionMessage =
    document.getElementById("learningCompletionMessage");


completeLearningBtn.addEventListener("click", function () {

    const reflection =
        learningReflection.value.trim();

    // Don't allow empty reflection
    if (reflection === "") {

        learningCompletionMessage.textContent =
            "Write a little about what you learned first. 💭";

        learningReflection.focus();

        return;
    }


    // Check today's completion
    const today =
        new Date().toISOString().split("T")[0];

    const completedToday =
        localStorage.getItem("learningCompletedDate");


    // Prevent duplicate reward
    if (completedToday === today) {

        learningCompletionMessage.textContent =
            "You've already earned today's star! ⭐";

        return;
    }


    // Award one star
    goBeyondStars += 1;

    localStorage.setItem(
        "goBeyondStars",
        goBeyondStars
    );


    // Update streak
    const previousDate =
        localStorage.getItem("learningCompletedDate");

    const yesterdayDate = new Date();

    yesterdayDate.setDate(
        yesterdayDate.getDate() - 1
    );

    const yesterday =
        yesterdayDate.toISOString().split("T")[0];


    if (previousDate === yesterday) {

        goBeyondStreak += 1;

    } else {

        goBeyondStreak = 1;

    }


    localStorage.setItem(
        "goBeyondStreak",
        goBeyondStreak
    );


    // Save completion date
    localStorage.setItem(
        "learningCompletedDate",
        today
    );


    // Save reflection
    localStorage.setItem(
        "learningReflection",
        reflection
    );


    // Update top counters
    updateProgressDisplay();


    // Update button
    completeLearningBtn.textContent =
        "Completed! ⭐";

    completeLearningBtn.classList.add(
        "completed"
    );

    completeLearningBtn.disabled = true;


    // Success message
    learningCompletionMessage.textContent =
        "Beautiful! You reflected on your learning and earned +1 ⭐";


});