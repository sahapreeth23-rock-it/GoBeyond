// ================================
// GO BEYOND - MATCH MODAL
// ================================

const matchModal =
    document.getElementById("matchModal");

const closeModal =
    document.getElementById("closeModal");

const viewMatchButtons =
    document.querySelectorAll(
        ".priority-card button"
    );


if (matchModal && closeModal) {

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


    // Close when clicking outside popup
    matchModal.addEventListener("click", (event) => {

        if (event.target === matchModal) {

            matchModal.classList.remove("active");

        }

    });

}
// =====================================================
// 7-DAY PERSONALIZED LEARNING PLAN
// =====================================================

const learningPlans = {

    "Machine Learning": [
        ["Day 1", "ML Fundamentals", "Learn supervised vs unsupervised learning."],
        ["Day 2", "Data Preparation", "Clean, transform and explore a dataset."],
        ["Day 3", "Regression", "Build a simple regression model."],
        ["Day 4", "Classification", "Build a basic classification model."],
        ["Day 5", "Model Evaluation", "Learn accuracy, precision, recall and F1-score."],
        ["Day 6", "Mini Project", "Build a small ML prediction project."],
        ["Day 7", "Reassess", "Test yourself and review what you learned."]
    ],

    "SQL": [
        ["Day 1", "SQL Fundamentals", "Learn SELECT, WHERE, ORDER BY and LIMIT."],
        ["Day 2", "Filtering & Functions", "Practice conditions and SQL functions."],
        ["Day 3", "Joins", "Learn INNER, LEFT and RIGHT JOIN."],
        ["Day 4", "Aggregation", "Practice GROUP BY, HAVING and aggregate functions."],
        ["Day 5", "Subqueries", "Solve problems using nested queries."],
        ["Day 6", "Mini Project", "Analyse a real dataset using SQL."],
        ["Day 7", "Reassess", "Solve a short SQL challenge set."]
    ],

    "Statistics": [
        ["Day 1", "Statistics Basics", "Review mean, median, mode and variance."],
        ["Day 2", "Probability", "Practice basic probability concepts."],
        ["Day 3", "Distributions", "Understand common probability distributions."],
        ["Day 4", "Correlation", "Learn correlation and covariance."],
        ["Day 5", "Data Interpretation", "Interpret statistics from a real dataset."],
        ["Day 6", "Mini Project", "Perform statistical analysis on a dataset."],
        ["Day 7", "Reassess", "Review concepts and test yourself."]
    ],

    "React": [
        ["Day 1", "React Fundamentals", "Learn JSX, components and the React structure."],
        ["Day 2", "Components & Props", "Build reusable components using props."],
        ["Day 3", "State", "Learn useState and manage component state."],
        ["Day 4", "Events & Forms", "Build interactive forms and event handlers."],
        ["Day 5", "API Integration", "Fetch and display data from an API."],
        ["Day 6", "Mini Project", "Build a small React application."],
        ["Day 7", "Reassess", "Review React concepts and improve your project."]
    ],

    "JavaScript": [
        ["Day 1", "JavaScript Basics", "Review variables, data types and operators."],
        ["Day 2", "Functions", "Practice functions, parameters and return values."],
        ["Day 3", "Arrays & Objects", "Work with common JavaScript data structures."],
        ["Day 4", "DOM", "Manipulate HTML elements using JavaScript."],
        ["Day 5", "Events & Async", "Practise events, promises and async functions."],
        ["Day 6", "Mini Project", "Build an interactive JavaScript feature."],
        ["Day 7", "Reassess", "Solve JavaScript challenges and review."]
    ],

    "Node.js": [
        ["Day 1", "Node Fundamentals", "Understand Node.js and its runtime."],
        ["Day 2", "Modules", "Learn modules, npm and package management."],
        ["Day 3", "Express", "Create a basic Express server."],
        ["Day 4", "REST APIs", "Build GET and POST API endpoints."],
        ["Day 5", "Database", "Connect an application to a database."],
        ["Day 6", "Mini Project", "Build a small REST API."],
        ["Day 7", "Reassess", "Test your API and review backend concepts."]
    ],

    "Networking": [
        ["Day 1", "Networking Basics", "Learn OSI and TCP/IP models."],
        ["Day 2", "IP Addressing", "Understand IPv4, IPv6 and subnetting."],
        ["Day 3", "Protocols", "Study HTTP, DNS, TCP and UDP."],
        ["Day 4", "Network Security", "Understand common network attacks."],
        ["Day 5", "Tools", "Practise basic networking diagnostic tools."],
        ["Day 6", "Mini Project", "Analyse a small network scenario."],
        ["Day 7", "Reassess", "Review networking fundamentals."]
    ],

    "Linux": [
        ["Day 1", "Linux Basics", "Learn the terminal and basic commands."],
        ["Day 2", "Files & Directories", "Practise navigation, permissions and file operations."],
        ["Day 3", "Processes", "Learn processes and system monitoring."],
        ["Day 4", "Users & Permissions", "Practise users, groups and permissions."],
        ["Day 5", "Networking", "Use Linux networking commands."],
        ["Day 6", "Mini Project", "Complete a basic Linux administration task."],
        ["Day 7", "Reassess", "Review commands and practise independently."]
    ],

    "Cybersecurity": [
        ["Day 1", "Security Fundamentals", "Learn CIA triad and common threats."],
        ["Day 2", "Threats", "Study phishing, malware and social engineering."],
        ["Day 3", "Authentication", "Understand passwords, MFA and access control."],
        ["Day 4", "Network Security", "Learn firewalls and secure communication."],
        ["Day 5", "Security Tools", "Explore basic defensive security tools."],
        ["Day 6", "Mini Project", "Analyse a simple security scenario."],
        ["Day 7", "Reassess", "Review concepts and test yourself."]
    ]

};
// =====================================================
// OPEN / CLOSE LEARNING PLAN
// =====================================================

const learningPlanModal =
    document.getElementById(
        "learningPlanModal"
    );

const learningPlanDays =
    document.getElementById(
        "learningPlanDays"
    );

const learningPlanTitle =
    document.getElementById(
        "learningPlanTitle"
    );

const learningPlanSubtitle =
    document.getElementById(
        "learningPlanSubtitle"
    );

const learningPlanProgressText =
    document.getElementById(
        "learningPlanProgressText"
    );

const learningPlanProgressFill =
    document.getElementById(
        "learningPlanProgressFill"
    );

const learningPlanMessage =
    document.getElementById(
        "learningPlanMessage"
    );


// Current selected learning skill
let currentLearningSkill = "";


// Open the plan
function openLearningPlan(skill, careerGoal) {

    if (!learningPlanModal) return;

    currentLearningSkill = skill;

    const plan =
        learningPlans[skill];

    if (!plan) {

        alert(
            `A personalized plan for ${skill} is coming soon.`
        );

        return;
    }


    learningPlanTitle.textContent =
        `7-Day ${skill} Learning Plan`;

    learningPlanSubtitle.textContent =
        `Personalized for your ${careerGoal} goal.`;


    const storageKey =
        `goBeyondLearning_${skill}`;

    let completedDays = [];

    try {

        completedDays =
            JSON.parse(
                localStorage.getItem(
                    storageKey
                )
            ) || [];

    } catch (error) {

        completedDays = [];

    }


    learningPlanDays.innerHTML =
        plan.map(
            (day, index) => {

                const isCompleted =
                    completedDays.includes(index);

                return `

                    <div
                        class="learning-day ${
                            isCompleted
                                ? "completed"
                                : ""
                        }"
                        data-day-index="${index}"
                    >

                        <input
                            type="checkbox"
                            class="learning-day-checkbox"
                            data-day="${index}"
                            ${
                                isCompleted
                                    ? "checked"
                                    : ""
                            }
                        >

                        <div class="learning-day-content">

                            <span class="learning-day-number">
                                ${day[0]}
                            </span>

                            <h4>
                                ${day[1]}
                            </h4>

                            <p>
                                ${day[2]}
                            </p>

                        </div>

                    </div>

                `;

            }
        ).join("");


    updateLearningPlanProgress(
        completedDays,
        plan.length
    );


    learningPlanModal.classList.add(
        "active"
    );


    // Add checkbox listeners
    document
        .querySelectorAll(
            ".learning-day-checkbox"
        )
        .forEach(
            checkbox => {

                checkbox.addEventListener(
                    "change",
                    function () {

                        const dayIndex =
                            Number(
                                this.dataset.day
                            );

                        let savedDays =
                            JSON.parse(
                                localStorage.getItem(
                                    storageKey
                                )
                            ) || [];


                        if (this.checked) {

                            if (
                                !savedDays.includes(
                                    dayIndex
                                )
                            ) {

                                savedDays.push(
                                    dayIndex
                                );

                            }

                        } else {

                            savedDays =
                                savedDays.filter(
                                    day =>
                                        day !==
                                        dayIndex
                                );

                        }


                        localStorage.setItem(
                            storageKey,
                            JSON.stringify(
                                savedDays
                            )
                        );


                        const dayCard =
                            this.closest(
                                ".learning-day"
                            );

                        if (dayCard) {

                            dayCard.classList.toggle(
                                "completed",
                                this.checked
                            );

                        }


                        updateLearningPlanProgress(
                            savedDays,
                            plan.length
                        );

                    }
                );

            }
        );

}


// Update progress
function updateLearningPlanProgress(
    completedDays,
    totalDays
) {

    const completed =
        completedDays.length;

    const percentage =
        Math.round(
            (completed / totalDays) * 100
        );


    if (learningPlanProgressText) {

        learningPlanProgressText.textContent =
            `${completed} / ${totalDays} days`;

    }


    if (learningPlanProgressFill) {

        learningPlanProgressFill.style.width =
            `${percentage}%`;

    }


    if (learningPlanMessage) {

        if (completed === totalDays) {

            learningPlanMessage.textContent =
                "🎉 Plan completed! You're ready to reassess this skill.";

        } else if (completed > 0) {

            learningPlanMessage.textContent =
                `${completed} day${completed > 1 ? "s" : ""} completed. Keep going!`;

        } else {

            learningPlanMessage.textContent =
                "Complete each day to strengthen this skill.";

        }

    }

}


// Close buttons
function closeLearningPlan() {

    if (learningPlanModal) {

        learningPlanModal.classList.remove(
            "active"
        );

    }

}


const closeLearningPlanButton =
    document.getElementById(
        "closeLearningPlan"
    );

const closeLearningPlanBottom =
    document.getElementById(
        "closeLearningPlanBottom"
    );


if (closeLearningPlanButton) {

    closeLearningPlanButton.addEventListener(
        "click",
        closeLearningPlan
    );

}


if (closeLearningPlanBottom) {

    closeLearningPlanBottom.addEventListener(
        "click",
        closeLearningPlan
    );

}


if (learningPlanModal) {

    learningPlanModal.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                learningPlanModal
            ) {

                closeLearningPlan();

            }

        }
    );

}

// ================================
// STUDENT PROFILE
// ================================

const profileForm = document.getElementById("profileForm");

if (profileForm) {

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


        fetch("https://gobeyond-3xld.onrender.com/api/student", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(studentProfile)

        })

        .then(response => response.json())

        .then(data => {

            console.log(
                "Student profile sent to backend:",
                data
            );

        })

        .catch(error => {

            console.error(
                "Backend profile upload failed:",
                error
            );

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

}


// ================================
// UPDATE DASHBOARD FROM PROFILE
// ================================

function updateDashboard(profile) {

    // Update student name
    const welcomeName =
        document.querySelector(".welcome h1 span");

    if (welcomeName) {

        welcomeName.textContent =
            profile.name;

    }


    // Update branch and year
    const studentBadge =
        document.querySelector(".student-badge");

    if (studentBadge) {

        studentBadge.innerHTML = `
            <strong>
                ${
                    profile.branch === "Computer Science"
                    ? "CSE"
                    : profile.branch.substring(0, 3).toUpperCase()
                }
            </strong>

            <span>
                ${profile.year}
            </span>
        `;

    }


    // Update career goal stat
    const statCards =
        document.querySelectorAll(".stat-card");

    if (statCards.length > 0) {

        const careerGoalHeading =
            statCards[0].querySelector("h3");

        if (careerGoalHeading) {

            careerGoalHeading.textContent =
                profile.careerGoal;

        }

    }

updateCareerRoadmap(
    profile.careerGoal,
    profile.skills || []
);

updateSkillGapAnalysis(profile);

updatePriorities(profile.careerGoal);

updateOpportunities(profile.careerGoal);

    console.log(
        "Opportunity update:",
        profile.careerGoal
    );

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

            description:
                "You have a 75% match. Improve your SQL and Machine Learning skills."

        },

        priority2: {

            tag: "Skill Gap",

            icon: "🧠",

            title: "Learn SQL",

            description:
                "SQL is required for your recommended AI/ML opportunities."

        },

        priority3: {

            tag: "Recommended",

            icon: "⭐",

            title: "Python & AI Workshop",

            description:
                "This workshop matches your interests in Artificial Intelligence."

        }

    },


    "Web Developer": {

        priority1: {

            tag: "Deadline Soon",

            icon: "🔴",

            title: "Web Development Internship",

            description:
                "You have a strong match. Strengthen your JavaScript and React skills."

        },

        priority2: {

            tag: "Skill Gap",

            icon: "🧠",

            title: "Learn React",

            description:
                "React is an important skill for your recommended web development opportunities."

        },

        priority3: {

            tag: "Recommended",

            icon: "⭐",

            title: "Web Development Hackathon",

            description:
                "This hackathon matches your interest in building web applications."

        }

    },


    "Data Scientist": {

        priority1: {

            tag: "Deadline Soon",

            icon: "🔴",

            title: "Data Science Internship",

            description:
                "You have a strong match. Improve your Statistics and Data Analysis skills."

        },

        priority2: {

            tag: "Skill Gap",

            icon: "🧠",

            title: "Learn Statistics",

            description:
                "Statistics is required for your recommended Data Science opportunities."

        },

        priority3: {

            tag: "Recommended",

            icon: "⭐",

            title: "Data Science Workshop",

            description:
                "This workshop matches your interest in Data Science and Machine Learning."

        }

    },


    "Cybersecurity Engineer": {

        priority1: {

            tag: "Deadline Soon",

            icon: "🔴",

            title: "Cybersecurity Internship",

            description:
                "You have a strong match. Strengthen your Networking and Linux skills."

        },

        priority2: {

            tag: "Skill Gap",

            icon: "🧠",

            title: "Learn Networking",

            description:
                "Networking is an important skill for your recommended cybersecurity opportunities."

        },

        priority3: {

            tag: "Recommended",

            icon: "⭐",

            title: "Cybersecurity Workshop",

            description:
                "This workshop matches your interest in cybersecurity and security tools."

        }

    }

};


function updatePriorities(careerGoal) {

    const priorities =
        priorityData[careerGoal];

    if (!priorities) return;


    Object.keys(priorities).forEach(priorityId => {

        const card =
            document.getElementById(priorityId);

        if (!card) return;


        const data =
            priorities[priorityId];


        const tag =
            card.querySelector(".tag");

        const icon =
            card.querySelector(
                ".priority-top span:last-child"
            );

        const title =
            card.querySelector("h3");

        const description =
            card.querySelector("p");


        if (tag) {

            tag.textContent =
                data.tag;

        }


        if (icon) {

            icon.textContent =
                data.icon;

        }


        if (title) {

            title.textContent =
                data.title;

        }


        if (description) {

            description.textContent =
                data.description;

        }

    });

}
// ================================
// DYNAMIC SKILL GAP ANALYSIS
// SLIDE 5
// ================================

const skillGapData = {

    "AI/ML Engineer": [

        {
            skill: "Machine Learning",
            current: "Beginner",
            required: "Intermediate",
            priority: "HIGH",
            priorityClass: "high",
            demand: "Very High",
            opportunities: 6,
            reason:
                "Machine Learning is a core requirement for AI/ML roles and many relevant opportunities.",
            action:
                "Start with supervised learning, model evaluation and practical ML projects."
        },

        {
            skill: "SQL",
            current: "Beginner",
            required: "Intermediate",
            priority: "MEDIUM",
            priorityClass: "medium",
            demand: "High",
            opportunities: 4,
            reason:
                "SQL is frequently required for working with datasets and real-world AI applications.",
            action:
                "Practice SELECT, JOIN, GROUP BY and subqueries using real datasets."
        },

        {
            skill: "Statistics",
            current: "Beginner",
            required: "Intermediate",
            priority: "MEDIUM",
            priorityClass: "medium",
            demand: "High",
            opportunities: 4,
            reason:
                "Statistics helps you understand datasets, evaluate models and interpret results.",
            action:
                "Learn probability, distributions, mean, variance and basic hypothesis testing."
        }

    ],


    "Web Developer": [

        {
            skill: "React.js",
            current: "Beginner",
            required: "Intermediate",
            priority: "HIGH",
            priorityClass: "high",
            demand: "Very High",
            opportunities: 7,
            reason:
                "React is widely used for building modern frontend applications.",
            action:
                "Learn components, props, state, hooks and build a small React project."
        },

        {
            skill: "JavaScript",
            current: "Intermediate",
            required: "Advanced",
            priority: "HIGH",
            priorityClass: "high",
            demand: "Very High",
            opportunities: 8,
            reason:
                "Strong JavaScript fundamentals are essential for modern web development.",
            action:
                "Practice DOM manipulation, APIs, asynchronous JavaScript and ES6+."
        },

        {
            skill: "Node.js",
            current: "Beginner",
            required: "Intermediate",
            priority: "MEDIUM",
            priorityClass: "medium",
            demand: "High",
            opportunities: 5,
            reason:
                "Node.js allows you to build backend APIs and full-stack applications.",
            action:
                "Learn Node.js, Express.js and build a REST API."
        }

    ],


    "Data Scientist": [

        {
            skill: "Statistics",
            current: "Beginner",
            required: "Intermediate",
            priority: "HIGH",
            priorityClass: "high",
            demand: "Very High",
            opportunities: 7,
            reason:
                "Statistics is fundamental for analysing data and interpreting results.",
            action:
                "Practice probability, distributions, hypothesis testing and statistical analysis."
        },

        {
            skill: "SQL",
            current: "Beginner",
            required: "Intermediate",
            priority: "HIGH",
            priorityClass: "high",
            demand: "High",
            opportunities: 6,
            reason:
                "Data scientists regularly use SQL to retrieve and analyse data.",
            action:
                "Practice joins, aggregation, subqueries and analytical queries."
        },

        {
            skill: "Machine Learning",
            current: "Beginner",
            required: "Intermediate",
            priority: "MEDIUM",
            priorityClass: "medium",
            demand: "Very High",
            opportunities: 6,
            reason:
                "Machine Learning is an important part of many modern Data Science roles.",
            action:
                "Learn regression, classification, model evaluation and feature engineering."
        }

    ],


    "Cybersecurity Engineer": [

        {
            skill: "Networking",
            current: "Beginner",
            required: "Intermediate",
            priority: "HIGH",
            priorityClass: "high",
            demand: "Very High",
            opportunities: 6,
            reason:
                "Networking knowledge is essential for understanding attacks, traffic and security systems.",
            action:
                "Learn TCP/IP, HTTP, DNS, ports, protocols and network troubleshooting."
        },

        {
            skill: "Linux",
            current: "Beginner",
            required: "Intermediate",
            priority: "MEDIUM",
            priorityClass: "medium",
            demand: "High",
            opportunities: 5,
            reason:
                "Linux is widely used in security environments and penetration testing.",
            action:
                "Practice Linux commands, permissions, processes and basic shell scripting."
        },

        {
            skill: "Security Tools",
            current: "Beginner",
            required: "Intermediate",
            priority: "MEDIUM",
            priorityClass: "medium",
            demand: "High",
            opportunities: 4,
            reason:
                "Hands-on security tools help convert cybersecurity concepts into practical skills.",
            action:
                "Practice with tools such as Wireshark, Nmap and basic security labs."
        }

    ]

};


// ================================
// UPDATE SKILL GAP ANALYSIS
// ================================

function updateSkillGapAnalysis(profile) {

    const gaps =
        skillGapData[profile.careerGoal] ||
        skillGapData["AI/ML Engineer"];


    const studentSkills =
        profile.skills.map(skill =>
            skill.toLowerCase().trim()
        );


    let criticalCount = 0;
    let mediumCount = 0;
    let lowCount = 0;


    gaps.forEach(gap => {

        if (gap.priority === "HIGH") {
            criticalCount++;
        }

        else if (gap.priority === "MEDIUM") {
            mediumCount++;
        }

        else {
            lowCount++;
        }

    });


    // Update gap counts if elements exist
    const criticalElement =
        document.getElementById("criticalGapCount");

    const mediumElement =
        document.getElementById("mediumGapCount");

    const lowElement =
        document.getElementById("lowGapCount");


    if (criticalElement) {
        criticalElement.textContent =
            criticalCount;
    }

    if (mediumElement) {
        mediumElement.textContent =
            mediumCount;
    }

    if (lowElement) {
        lowElement.textContent =
            lowCount;
    }


    // Update individual skill gaps
    gaps.forEach((gap, index) => {

        const card =
            document.querySelector(
                `[data-skill-gap="${index}"]`
            );


        if (!card) return;


        const title =
            card.querySelector(".skill-gap-name");

        const current =
            card.querySelector(".skill-gap-current");

        const required =
            card.querySelector(".skill-gap-required");

        const priority =
            card.querySelector(".skill-gap-priority");

        const demand =
            card.querySelector(".skill-gap-demand");

        const opportunities =
            card.querySelector(".skill-gap-opportunities");

        const reason =
            card.querySelector(".skill-gap-reason");

        const action =
            card.querySelector(".skill-gap-action");


        if (title) {
            title.textContent =
                gap.skill;
        }


        if (current) {
            current.textContent =
                gap.current;
        }


        if (required) {
            required.textContent =
                gap.required;
        }


        if (priority) {
            priority.textContent =
                gap.priority;

            priority.className =
                `skill-gap-priority ${gap.priorityClass}`;
        }


        if (demand) {
            demand.textContent =
                gap.demand;
        }


        if (opportunities) {
            opportunities.textContent =
                `${gap.opportunities} matched opportunities`;
        }


        if (reason) {
            reason.textContent =
                gap.reason;
        }


        if (action) {
            action.textContent =
                gap.action;
        }

    });


    // ================================
    // NEXT BEST ACTION
    // ================================

    const highestPriorityGap =
        gaps.find(
            gap => gap.priority === "HIGH"
        ) || gaps[0];


    const nextActionTitle =
        document.getElementById(
            "nextActionTitle"
        );

    const nextActionText =
        document.getElementById(
            "nextActionText"
        );

    const nextActionTag =
        document.getElementById(
            "nextActionTag"
        );


    if (nextActionTitle) {

        nextActionTitle.textContent =
            `Strengthen your ${highestPriorityGap.skill} skills`;

    }


    if (nextActionText) {

        nextActionText.textContent =
            highestPriorityGap.reason +
            " Start by following a focused learning plan and building a practical project.";

    }


    if (nextActionTag) {

        nextActionTag.textContent =
            `${highestPriorityGap.priority} PRIORITY`;

    }

}
// =========================================
// START LEARNING BUTTON
// Connects Next Best Action to 7-Day Plan
// =========================================

const nextStartLearning =
    document.getElementById("nextStartLearning");

if (nextStartLearning) {

    nextStartLearning.addEventListener(
        "click",
        function () {

            const savedProfile =
                localStorage.getItem("goBeyondProfile");

            if (!savedProfile) {
                alert("Please save your profile first.");
                return;
            }

            const profile =
                JSON.parse(savedProfile);

            const gaps =
                skillGapData[profile.careerGoal] ||
                skillGapData["AI/ML Engineer"];

            const highestPriorityGap =
                gaps.find(
                    gap => gap.priority === "HIGH"
                ) || gaps[0];

            const learningSkillMap = {
                "React.js": "React",
                "Security Tools": "Cybersecurity"
            };

            const learningSkill =
                learningSkillMap[
                    highestPriorityGap.skill
                ] || highestPriorityGap.skill;

            openLearningPlan(
                learningSkill,
                profile.careerGoal
            );

        }
    );

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


function updateCareerRoadmap(careerGoal, studentSkills = []) {

    const roadmap =
        document.getElementById("careerRoadmap");

    if (!roadmap) return;

    const steps =
        careerPaths[careerGoal];

    if (!steps) return;


    // -----------------------------------------
    // ROADMAP TITLE
    // -----------------------------------------

    const roadmapTitle =
        document.getElementById(
            "careerRoadmapTitle"
        );

    if (roadmapTitle) {

        const roadmapTitles = {

            "AI/ML Engineer":
                "AI/ML Career Roadmap",

            "Web Developer":
                "Web Development Career Roadmap",

            "Data Scientist":
                "Data Science Career Roadmap",

            "Cybersecurity Engineer":
                "Cybersecurity Career Roadmap",

            "Java Backend Developer":
                "Java Backend Development Career Roadmap"

        };

        roadmapTitle.textContent =
            roadmapTitles[careerGoal] ||
            "Career Roadmap";
    }


    // -----------------------------------------
    // NORMALIZE STUDENT SKILLS
    // -----------------------------------------

    const normalizedSkills =
        studentSkills.map(skill =>
            skill
                .toLowerCase()
                .trim()
        );


    // -----------------------------------------
    // CHECK WHETHER A ROADMAP SKILL IS KNOWN
    // -----------------------------------------

    function hasSkill(step) {

        const skillAliases = {

            "HTML & CSS": [
                "html",
                "css",
                "html & css"
            ],

            "JavaScript": [
                "javascript",
                "js"
            ],

            "React": [
                "react",
                "react.js",
                "reactjs"
            ],

            "Python": [
                "python"
            ],

            "SQL": [
                "sql"
            ],

            "Machine Learning": [
                "machine learning",
                "ml"
            ],

            "Statistics": [
                "statistics",
                "statistics & probability"
            ],

            "Data Analysis": [
                "data analysis",
                "pandas",
                "numpy"
            ],

            "Networking": [
                "networking",
                "computer networks"
            ],

            "Linux": [
                "linux"
            ],

            "Cybersecurity Fundamentals": [
                "cybersecurity",
                "cybersecurity fundamentals"
            ],

            "Java": [
                "java"
            ],

            "Spring Boot": [
                "spring boot"
            ]

        };


        const aliases =
            skillAliases[step] || [
                step.toLowerCase()
            ];


        return aliases.some(alias =>
            normalizedSkills.includes(alias)
        );

    }


    // -----------------------------------------
    // FIND CURRENT FOCUS
    // -----------------------------------------

    let currentFocusFound = false;


    roadmap.innerHTML = "";


    steps.forEach((step, index) => {

        const isCareerGoal =
            index === steps.length - 1;


        let status =
            "Upcoming";

        let statusClass =
            "";


        // Career goal
        if (isCareerGoal) {

            status =
                "Career Goal";

        }


        // Skill already known
        else if (hasSkill(step)) {

            status =
                "Completed";

            statusClass =
                "completed";

        }


        // First missing skill
        else if (!currentFocusFound) {

            status =
                "Current Focus";

            statusClass =
                "current";

            currentFocusFound = true;

        }


        // Create roadmap step
        const stepElement =
            document.createElement("div");

        stepElement.className =
            "roadmap-step";


        if (statusClass) {

            stepElement.classList.add(
                statusClass
            );

        }


        let icon =
            index + 1;


        if (status === "Completed") {

            icon = "✓";

        }


        if (status === "Career Goal") {

            icon = "🎯";

        }


        stepElement.innerHTML = `

            <span>
                ${icon}
            </span>

            <strong>
                ${step}
            </strong>

            <small>
                ${status}
            </small>

        `;


        roadmap.appendChild(
            stepElement
        );


        // Connecting line
        if (
            index <
            steps.length - 1
        ) {

            const line =
                document.createElement(
                    "div"
                );

            line.className =
                "roadmap-line";

            roadmap.appendChild(
                line
            );

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
            requiredSkills: [
                "Java",
                "SQL",
                "Spring Boot"
            ]
        },

        {
            title: "Backend Development Hackathon",
            organization: "DevCommunity",
            type: "Hackathon",
            match: 86,
            deadline: "Registration closes in 5 days",
            requiredSkills: [
                "Java",
                "APIs",
                "SQL"
            ]
        }

    ]

};


// ================================
// UPDATE OPPORTUNITIES
// ================================

async function updateOpportunities(careerGoal) {

    const opportunityGrid =
        document.getElementById(
            "opportunityGrid"
        );

    if (!opportunityGrid) return;


    try {

       const response =
    await fetch(
        `https://gobeyond-3xld.onrender.com/api/personalized-opportunities/${encodeURIComponent(careerGoal)}`
    );


        if (!response.ok) {

            throw new Error(
                "Failed to fetch personalized opportunities"
            );

        }


        const data =
            await response.json();


        const opportunities =
            data.opportunities || [];


        const savedProfile =
            JSON.parse(
                localStorage.getItem(
                    "goBeyondProfile"
                )
            );


        const studentSkills =
            savedProfile
            ? savedProfile.skills
            : [];


        opportunityGrid.innerHTML =
            "";


        opportunities.forEach(
            (opportunity) => {

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


                const learningRecommendations =
                    skillGaps
                        .map(
                            skill =>
                                getLearningRecommendation(
                                    skill
                                )
                        )
                        .join(", ");


                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "opportunity-card";


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

                            <strong>
                                Skill Gap:
                            </strong>

                            ${learningRecommendations}

                        </div>

                        `

                        : `

                        <div class="skill-gap">

                            <strong>
                                ✅ Skills Matched!
                            </strong>

                        </div>

                        `
                    }

                    <h3>
                        ${opportunity.title}
                    </h3>

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


                opportunityGrid.appendChild(
                    card
                );

            }
        );


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

function calculateSkillMatch(
    studentSkills,
    requiredSkills
) {

    if (
        !requiredSkills ||
        requiredSkills.length === 0
    ) {

        return 0;

    }


    const normalizedStudentSkills =
        studentSkills.map(
            skill =>
                skill.toLowerCase().trim()
        );


    const matchedSkills =
        requiredSkills.filter(
            skill =>
                normalizedStudentSkills.includes(
                    skill.toLowerCase().trim()
                )
        );


    return Math.round(
        (
            matchedSkills.length /
            requiredSkills.length
        ) * 100
    );

}


// ================================
// SKILL GAP DETECTION
// ================================

function findSkillGaps(
    studentSkills,
    requiredSkills
) {

    const normalizedStudentSkills =
        studentSkills.map(
            skill =>
                skill.toLowerCase().trim()
        );


    const safeRequiredSkills =
        requiredSkills || [];


    return safeRequiredSkills.filter(
        skill =>
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

        "HTML":
            "Learn HTML fundamentals",

        "CSS":
            "Practice CSS and responsive design",

        "JavaScript":
            "Learn JavaScript fundamentals",

        "React":
            "Learn React fundamentals",

        "Python":
            "Strengthen Python programming",

        "SQL":
            "Practice SQL and database queries",

        "Statistics":
            "Study statistics for data science",

        "Java":
            "Strengthen Java programming",

        "Spring Boot":
            "Learn Spring Boot fundamentals",

        "Networking":
            "Learn computer networking fundamentals",

        "Linux":
            "Practice Linux fundamentals",

        "Cybersecurity":
            "Study cybersecurity fundamentals"

    };


    return recommendations[skill] ||
        `Learn ${skill} fundamentals`;

}


// Load saved profile when website opens
const savedProfile =
    localStorage.getItem(
        "goBeyondProfile"
    );


if (savedProfile) {

    const profile =
        JSON.parse(savedProfile);

    updateDashboard(profile);

}


// ================================
// BACKEND CONNECTION TEST
// ================================

fetch(
    "https://gobeyond-3xld.onrender.com/api/health"
)

    .then(
        response =>
            response.json()
    )

    .then(
        data => {

            console.log(
                "Backend connected:",
                data
            );

        }
    )

    .catch(
        error => {

            console.error(
                "Backend connection failed:",
                error
            );

        }
    );


// ===============================
// JOURNAL & NOTES
// ===============================

const journalTitle =
    document.getElementById(
        "journalTitle"
    );

const journalText =
    document.getElementById(
        "journalText"
    );

const saveJournalBtn =
    document.getElementById(
        "saveJournalBtn"
    );

const journalEntriesList =
    document.getElementById(
        "journalEntriesList"
    );


let journalEntries =
    JSON.parse(
        localStorage.getItem(
            "goBeyondJournal"
        )
    ) || [];


if (
    journalTitle &&
    journalText &&
    saveJournalBtn &&
    journalEntriesList
) {

    saveJournalBtn.addEventListener(
        "click",
        function () {

            const title =
                journalTitle.value.trim();


            const text =
                journalText.value.trim();


            if (
                title === "" ||
                text === ""
            ) {

                alert(
                    "Please enter a title and your thoughts before saving."
                );

                return;

            }


            const entry = {

                id: Date.now(),

                title: title,

                text: text,

                date:
                    new Date().toLocaleDateString(
                        "en-IN",
                        {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                        }
                    )

            };


            journalEntries.unshift(
                entry
            );


            localStorage.setItem(
                "goBeyondJournal",
                JSON.stringify(
                    journalEntries
                )
            );


            journalTitle.value =
                "";

            journalText.value =
                "";


            displayJournalEntries();


            alert(
                "Journal entry saved successfully! 📝"
            );

        }
    );


    function displayJournalEntries() {

        if (
            journalEntries.length === 0
        ) {

            journalEntriesList.innerHTML = `

                <p class="empty-journal">
                    Your saved entries will appear here.
                </p>

            `;

            return;

        }


        journalEntriesList.innerHTML =
            "";


        journalEntries.forEach(
            function (entry) {

                const entryCard =
                    document.createElement(
                        "div"
                    );


                entryCard.className =
                    "journal-entry";


                entryCard.innerHTML = `

                    <div class="journal-entry-header">

                        <div>

                            <h4>
                                ${entry.title}
                            </h4>

                            <small>
                                ${entry.date}
                            </small>

                        </div>

                        <button
                            class="delete-journal-btn"
                            onclick="deleteJournalEntry(${entry.id})"
                        >
                            Delete
                        </button>

                    </div>

                    <p>
                        ${entry.text}
                    </p>

                `;


                journalEntriesList.appendChild(
                    entryCard
                );

            }
        );

    }


    window.deleteJournalEntry =
        function (id) {

            journalEntries =
                journalEntries.filter(
                    function (entry) {

                        return entry.id !== id;

                    }
                );


            localStorage.setItem(
                "goBeyondJournal",
                JSON.stringify(
                    journalEntries
                )
            );


            displayJournalEntries();

        };


    displayJournalEntries();

}
// ===============================
// ⭐🔥 GO-BEYOND PROGRESS
// Stars & Streak
// ===============================

const starCountElement =
    document.getElementById("starCount");

const streakCountElement =
    document.getElementById("streakCount");


// Get saved progress
let goBeyondStars =
    parseInt(
        localStorage.getItem(
            "goBeyondStars"
        )
    ) || 0;


let goBeyondStreak =
    parseInt(
        localStorage.getItem(
            "goBeyondStreak"
        )
    ) || 0;


// Display saved progress
function updateProgressDisplay() {

    if (starCountElement) {

        starCountElement.textContent =
            goBeyondStars;

    }


    if (streakCountElement) {

        streakCountElement.textContent =
            goBeyondStreak;

    }

}


// Load progress when page opens
updateProgressDisplay();


// =========================================
// 🎯 DAILY GO-BEYOND ACTION
// Career-based personalization
// =========================================

const dailyActionTitle =
    document.getElementById(
        "dailyActionTitle"
    );


const dailyActionDescription =
    document.getElementById(
        "dailyActionDescription"
    );


const dailyActionReason =
    document.getElementById(
        "dailyActionReason"
    );


const dailyActions = {

    "AI/ML Engineer": {

        title:
            "Complete 30 minutes of SQL practice",

        description:
            "Practice SQL for 30 minutes to strengthen an important skill for your AI/ML journey.",

        reason:
            "💡 Based on your AI/ML career roadmap"

    },


    "Web Developer": {

        title:
            "Build a small responsive webpage",

        description:
            "Spend 30 minutes improving your HTML, CSS, or JavaScript skills by building something practical.",

        reason:
            "💡 Based on your Web Development career roadmap"

    },


    "Data Scientist": {

        title:
            "Practice Python data analysis",

        description:
            "Spend 30 minutes working with Python and exploring a small dataset.",

        reason:
            "💡 Based on your Data Science career roadmap"

    },


    "Cybersecurity Engineer": {

        title:
            "Learn one cybersecurity concept",

        description:
            "Spend 30 minutes learning and taking notes on a cybersecurity concept such as networking, threats, or security fundamentals.",

        reason:
            "💡 Based on your Cybersecurity career roadmap"

    }

};


function updateDailyAction() {

    const careerGoal =
        document.getElementById(
            "careerGoal"
        )?.value;


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


// Update when page loads
updateDailyAction();


// Update when career goal changes
const careerGoalSelect =
    document.getElementById(
        "careerGoal"
    );


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
    document.getElementById(
        "learningReflection"
    );


const completeLearningBtn =
    document.getElementById(
        "completeLearningBtn"
    );


const learningCompletionMessage =
    document.getElementById(
        "learningCompletionMessage"
    );


if (
    completeLearningBtn &&
    learningReflection &&
    learningCompletionMessage
) {

    completeLearningBtn.addEventListener(
        "click",
        function () {

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
                new Date()
                    .toISOString()
                    .split("T")[0];


            const completedToday =
                localStorage.getItem(
                    "learningCompletedDate"
                );


            // Prevent duplicate reward
            if (
                completedToday === today
            ) {

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
                localStorage.getItem(
                    "learningCompletedDate"
                );


            const yesterdayDate =
                new Date();


            yesterdayDate.setDate(
                yesterdayDate.getDate() - 1
            );


            const yesterday =
                yesterdayDate
                    .toISOString()
                    .split("T")[0];


            if (
                previousDate === yesterday
            ) {

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


            completeLearningBtn.disabled =
                true;


            // Success message
            learningCompletionMessage.textContent =
                "Beautiful! You reflected on your learning and earned +1 ⭐";

        }
    );

}


// =========================================
// 🗺️ INDUSTRY SKILL MAP
// =========================================

console.log(
    "SKILL MAP JS LOADED"
);


const skillMapPage =
    document.querySelector(
        ".skill-map-page"
    );


if (skillMapPage) {

    const skillData = {

        "Artificial Intelligence": [

            "Python",
            "Machine Learning",
            "Data Science",
            "Statistics",
            "SQL"

        ],


        "Web Development": [

            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Git"

        ],


        "Data Science": [

            "Python",
            "SQL",
            "Statistics",
            "Pandas",
            "Machine Learning"

        ],


        "Cybersecurity": [

            "Networking",
            "Linux",
            "Python",
            "Cryptography",
            "Security Fundamentals"

        ]

    };


    const roleSelect =
        document.getElementById(
            "role"
        );


    const domainSelect =
        document.getElementById(
            "domain"
        );


    function updateSkillMap() {

        const domain =
            domainSelect.value;


        const requiredSkills =
            skillData[domain] || [];


        const savedProfile =
            JSON.parse(
                localStorage.getItem(
                    "goBeyondProfile"
                )
            );


        const studentSkills =
            savedProfile?.skills?.map(
                skill => {

                    // Handles onboarding skill objects
                    if (
                        typeof skill === "object"
                    ) {

                        return skill.name
                            .toLowerCase()
                            .trim();

                    }


                    // Handles older string format
                    return skill
                        .toLowerCase()
                        .trim();

                }
            ) || [];


        const matchedSkills =
            requiredSkills.filter(
                skill =>

                    studentSkills.includes(
                        skill
                            .toLowerCase()
                            .trim()
                    )

            );


        const gapSkills =
            requiredSkills.filter(
                skill =>

                    !studentSkills.includes(
                        skill
                            .toLowerCase()
                            .trim()
                    )

            );


        updateSkillNodes(
            requiredSkills,
            matchedSkills
        );


        const matchedCount =
            document.getElementById(
                "matchedCount"
            );


        const requiredCount =
            document.getElementById(
                "requiredCount"
            );


        const gapCount =
            document.getElementById(
                "gapCount"
            );


        if (matchedCount) {

            matchedCount.textContent =
                matchedSkills.length;

        }


        if (requiredCount) {

            requiredCount.textContent =
                requiredSkills.length;

        }


        if (gapCount) {

            gapCount.textContent =
                gapSkills.length;

        }

    }


    function updateSkillNodes(
        requiredSkills,
        matchedSkills
    ) {

        const nodeMap = {

            "Python":
                document.getElementById(
                    "skill-python"
                ),

            "Git":
                document.getElementById(
                    "skill-git"
                ),

            "Data Science":
                document.getElementById(
                    "skill-data"
                ),

            "Machine Learning":
                document.getElementById(
                    "skill-ml"
                ),

            "SQL":
                document.getElementById(
                    "skill-sql"
                ),

            "Statistics":
                document.getElementById(
                    "skill-statistics"
                )

        };


        Object.values(nodeMap).forEach(
            node => {

                if (node) {

                    node.style.display =
                        "none";

                }

            }
        );


        requiredSkills.forEach(
            skill => {

                const node =
                    nodeMap[skill];


                if (!node) return;


                node.style.display =
                    "block";


                const matched =
                    matchedSkills.includes(
                        skill
                    );


                node.classList.remove(
                    "matched",
                    "developing",
                    "gap"
                );


                node.classList.add(

                    matched
                        ? "matched"
                        : "gap"

                );


                node.innerHTML = `

                    ${skill}

                    <small>

                        ${
                            matched
                                ? "Matched"
                                : "Skill Gap"
                        }

                    </small>

                `;

            }
        );

    }


    const roleDomainMap = {

        "AI/ML Engineer":
            "Artificial Intelligence",

        "Data Scientist":
            "Data Science",

        "Web Developer":
            "Web Development",

        "Cybersecurity Engineer":
            "Cybersecurity"

    };


    const mapRoleLabel =
        document.querySelector(
            ".map-heading > span"
        );


    if (domainSelect) {

        domainSelect.addEventListener(
            "change",
            updateSkillMap
        );

    }


    if (roleSelect) {

        roleSelect.addEventListener(
            "change",
            function () {

                const selectedRole =
                    roleSelect.value;


                const matchingDomain =
                    roleDomainMap[
                        selectedRole
                    ];


                if (
                    domainSelect &&
                    matchingDomain
                ) {

                    domainSelect.value =
                        matchingDomain;

                }


                if (mapRoleLabel) {

                    mapRoleLabel.textContent =
                        selectedRole;

                }


                updateSkillMap();

            }
        );

    }


    if (
        mapRoleLabel &&
        roleSelect
    ) {

        mapRoleLabel.textContent =
            roleSelect.value;

    }


    updateSkillMap();

}
// =====================================================
// GO BEYOND - SLIDE 5: DYNAMIC SKILL GAP ANALYSIS
// =====================================================

const slide5SkillGapData = {

    "AI/ML Engineer": [
        {
            skill: "Machine Learning",
            required: "Intermediate",
            priority: "HIGH",
            demand: "Very High",
            opportunities: 6,
            why: "Machine Learning is a core requirement for AI/ML roles.",
            action: "Complete ML fundamentals and build one practical ML project."
        },
        {
            skill: "Python",
            required: "Intermediate",
            priority: "HIGH",
            demand: "Very High",
            opportunities: 7,
            why: "Python is the primary language used to build and deploy AI/ML systems.",
            action: "Sharpen Python fundamentals and the core data/ML libraries."
        },
        {
            skill: "SQL",
            required: "Intermediate",
            priority: "MEDIUM",
            demand: "High",
            opportunities: 4,
            why: "SQL is commonly required for working with datasets and ML pipelines.",
            action: "Practice SQL queries and work with a real dataset."
        },
        {
            skill: "Statistics",
            required: "Intermediate",
            priority: "MEDIUM",
            demand: "High",
            opportunities: 4,
            why: "Statistics helps you understand data, models and evaluation metrics.",
            action: "Strengthen probability, statistics and model evaluation."
        },
        {
            skill: "Deep Learning",
            required: "Beginner",
            priority: "MEDIUM",
            demand: "High",
            opportunities: 3,
            why: "Deep Learning powers many modern AI applications and is increasingly expected.",
            action: "Learn neural network basics and build one small deep learning demo."
        },
        {
            skill: "Git",
            required: "Beginner",
            priority: "LOW",
            demand: "Moderate",
            opportunities: 3,
            why: "Version control is expected for collaborating on any real engineering project.",
            action: "Practice Git workflows: commits, branches and pull requests."
        }
    ],

    "Web Developer": [
        {
            skill: "React",
            required: "Intermediate",
            priority: "HIGH",
            demand: "Very High",
            opportunities: 7,
            why: "React is widely used for modern frontend development.",
            action: "Learn React fundamentals and build a responsive application."
        },
        {
            skill: "JavaScript",
            required: "Intermediate",
            priority: "HIGH",
            demand: "Very High",
            opportunities: 8,
            why: "JavaScript is fundamental to modern web development.",
            action: "Practice JavaScript and build interactive web features."
        },
        {
            skill: "Node.js",
            required: "Beginner",
            priority: "MEDIUM",
            demand: "High",
            opportunities: 5,
            why: "Node.js helps you move from frontend development toward full-stack development.",
            action: "Learn Node.js and build a simple REST API."
        },
        {
            skill: "CSS",
            required: "Intermediate",
            priority: "MEDIUM",
            demand: "High",
            opportunities: 4,
            why: "Solid CSS skills are needed to build clean, responsive interfaces.",
            action: "Practice layout systems like Flexbox and Grid on a real page."
        },
        {
            skill: "HTML",
            required: "Beginner",
            priority: "LOW",
            demand: "Moderate",
            opportunities: 3,
            why: "Semantic HTML is the foundation every web application is built on.",
            action: "Review semantic HTML and accessibility basics."
        },
        {
            skill: "Git",
            required: "Beginner",
            priority: "LOW",
            demand: "Moderate",
            opportunities: 3,
            why: "Version control is expected for collaborating on any real engineering project.",
            action: "Practice Git workflows: commits, branches and pull requests."
        }
    ],

    "Data Scientist": [
        {
            skill: "Statistics",
            required: "Intermediate",
            priority: "HIGH",
            demand: "Very High",
            opportunities: 6,
            why: "Statistics is essential for analysing data and interpreting models.",
            action: "Strengthen statistics and apply it to real datasets."
        },
        {
            skill: "SQL",
            required: "Intermediate",
            priority: "HIGH",
            demand: "Very High",
            opportunities: 7,
            why: "SQL is one of the most important skills for extracting and analysing data.",
            action: "Practice SQL using real-world datasets."
        },
        {
            skill: "Python",
            required: "Intermediate",
            priority: "MEDIUM",
            demand: "Very High",
            opportunities: 6,
            why: "Python is the standard language for data analysis and modelling.",
            action: "Practice data manipulation and analysis using Python."
        },
        {
            skill: "Machine Learning",
            required: "Intermediate",
            priority: "MEDIUM",
            demand: "High",
            opportunities: 5,
            why: "Machine Learning helps data scientists build predictive models.",
            action: "Learn supervised learning and build a prediction project."
        },
        {
            skill: "Data Visualization",
            required: "Beginner",
            priority: "MEDIUM",
            demand: "High",
            opportunities: 4,
            why: "Communicating insights clearly through visuals is a core data science skill.",
            action: "Build a dashboard or chart set that tells a clear data story."
        },
        {
            skill: "Excel",
            required: "Beginner",
            priority: "LOW",
            demand: "Moderate",
            opportunities: 2,
            why: "Excel remains a common tool for quick data exploration in many teams.",
            action: "Practice pivot tables, formulas and quick data summaries."
        }
    ],

    "Cybersecurity Engineer": [
        {
            skill: "Networking",
            required: "Intermediate",
            priority: "HIGH",
            demand: "Very High",
            opportunities: 6,
            why: "Networking fundamentals are essential for understanding security threats.",
            action: "Learn networking fundamentals and practise with security scenarios."
        },
        {
            skill: "Linux",
            required: "Intermediate",
            priority: "HIGH",
            demand: "High",
            opportunities: 5,
            why: "Linux is widely used in cybersecurity environments.",
            action: "Practise Linux commands, permissions and system administration."
        },
        {
            skill: "Cybersecurity",
            required: "Intermediate",
            priority: "MEDIUM",
            demand: "High",
            opportunities: 5,
            why: "Security fundamentals are required to analyse and prevent attacks.",
            action: "Study cybersecurity fundamentals and practise security tools."
        },
        {
            skill: "Security Tools",
            required: "Beginner",
            priority: "MEDIUM",
            demand: "High",
            opportunities: 4,
            why: "Hands-on tools turn security concepts into practical, employable skills.",
            action: "Get hands-on with tools such as Wireshark and Nmap."
        },
        {
            skill: "Python",
            required: "Beginner",
            priority: "LOW",
            demand: "Moderate",
            opportunities: 3,
            why: "Scripting helps automate scans, log analysis and repetitive security tasks.",
            action: "Learn basic Python scripting for security automation."
        },
        {
            skill: "Cryptography",
            required: "Beginner",
            priority: "LOW",
            demand: "Moderate",
            opportunities: 2,
            why: "Understanding encryption is important for securing data and communications.",
            action: "Review core cryptography concepts: hashing, encryption and keys."
        }
    ]
};


// =====================================================
// NORMALIZE STUDENT SKILLS
// =====================================================

function getStudentSkillData(profile) {

    const skillMap = {};

    if (!profile || !Array.isArray(profile.skills)) {
        return skillMap;
    }

    profile.skills.forEach(skill => {

        if (typeof skill === "string") {

            const name = skill
                .trim()
                .toLowerCase();

            if (name) {
                skillMap[name] = "Beginner";
            }

        } else if (typeof skill === "object" && skill !== null) {

            const name = String(
                skill.name || ""
            )
                .trim()
                .toLowerCase();

            const level =
                skill.level ||
                skill.proficiency ||
                "Beginner";

            if (name) {
                skillMap[name] = level;
            }
        }
    });

    return skillMap;
}


// =====================================================
// CHECK WHETHER STUDENT HAS A SKILL
// =====================================================

function findStudentSkill(skillMap, skillName) {

    const target = skillName
        .toLowerCase()
        .trim();

    const aliases = {

        "machine learning": [
            "machine learning",
            "ml"
        ],

        "javascript": [
            "javascript",
            "js"
        ],

        "react": [
            "react",
            "react.js",
            "reactjs"
        ],

        "node.js": [
            "node.js",
            "nodejs",
            "node"
        ],

        "sql": [
            "sql",
            "mysql",
            "postgresql"
        ],

        "statistics": [
            "statistics",
            "stat"
        ],

        "networking": [
            "networking",
            "computer networks"
        ],

        "linux": [
            "linux"
        ],

        "cybersecurity": [
            "cybersecurity",
            "cyber security",
            "security"
        ],

        "python": [
            "python",
            "python3"
        ],

        "git": [
            "git",
            "github",
            "version control"
        ],

        "deep learning": [
            "deep learning",
            "dl",
            "neural networks"
        ],

        "html": [
            "html",
            "html5"
        ],

        "css": [
            "css",
            "css3"
        ],

        "data visualization": [
            "data visualization",
            "data viz",
            "tableau",
            "power bi"
        ],

        "excel": [
            "excel",
            "ms excel",
            "spreadsheets"
        ],

        "security tools": [
            "security tools",
            "wireshark",
            "nmap"
        ],

        "cryptography": [
            "cryptography",
            "crypto",
            "encryption"
        ]
    };

    const possibleNames =
        aliases[target] || [target];

    for (const name of possibleNames) {

        if (skillMap[name]) {
            return skillMap[name];
        }
    }

    return null;
}


// =====================================================
// INDUSTRY SKILL CATALOG ANALYSIS
// Single source of truth for Industry Readiness Score,
// Industry Skill Coverage and Top Skill Gaps. Recomputed
// any time skills, interests or career goal change.
// =====================================================

const priorityWeight = {
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1
};

const careerInterestKeywords = {

    "AI/ML Engineer": [
        "ai", "artificial intelligence", "machine learning",
        "ml", "deep learning", "data science", "robotics", "neural"
    ],

    "Web Developer": [
        "web", "frontend", "front-end", "backend", "back-end",
        "full stack", "fullstack", "ui", "ux", "design"
    ],

    "Data Scientist": [
        "data", "analytics", "statistics", "visualization",
        "ai", "machine learning"
    ],

    "Cybersecurity Engineer": [
        "security", "cyber", "privacy", "networking",
        "hacking", "infosec"
    ]

};


// Work out which industry skills are covered/missing,
// and calculate a weighted readiness score (with a small
// bonus for interests that align with the career goal).
function analyzeIndustrySkills(profile) {

    const careerGoal =
        (profile && profile.careerGoal) || "AI/ML Engineer";

    const catalog =
        slide5SkillGapData[careerGoal] ||
        slide5SkillGapData["AI/ML Engineer"];

    const studentSkills =
        getStudentSkillData(profile);

    const analyzed = catalog.map(item => ({
        ...item,
        covered: !!findStudentSkill(studentSkills, item.skill)
    }));

    const missing = analyzed
        .filter(item => !item.covered)
        .sort((a, b) =>
            (priorityWeight[b.priority] || 0) -
            (priorityWeight[a.priority] || 0)
        );

    const coveredCount =
        analyzed.length - missing.length;

    const totalCount =
        analyzed.length;

    const totalWeight = catalog.reduce(
        (sum, item) => sum + (priorityWeight[item.priority] || 1),
        0
    );

    const coveredWeight = analyzed
        .filter(item => item.covered)
        .reduce(
            (sum, item) => sum + (priorityWeight[item.priority] || 1),
            0
        );

    const baseScore =
        totalWeight
            ? (coveredWeight / totalWeight) * 100
            : 0;

    const interestKeywords =
        careerInterestKeywords[careerGoal] || [];

    const interests =
        (profile && profile.interests) || [];

    const interestMatches = interests.filter(interest =>
        interestKeywords.some(keyword =>
            interest.toLowerCase().includes(keyword)
        )
    ).length;

    // Up to +10 for having interests that align with the career goal
    const interestBonus =
        Math.min(interestMatches * 3, 10);

    const readinessScore = Math.max(
        0,
        Math.min(100, Math.round(baseScore + interestBonus))
    );

    return {
        careerGoal,
        catalog,
        analyzed,
        missing,
        coveredCount,
        totalCount,
        readinessScore,
        interestBonus
    };

}


function getReadinessLabel(score) {

    if (score >= 80) return "READY";
    if (score >= 50) return "BUILDING";
    return "GETTING STARTED";

}


// =====================================================
// UPDATE INDUSTRY READINESS SCORE + SKILL COVERAGE
// =====================================================

function updateIndustryReadiness(profile) {

    const analysis =
        analyzeIndustrySkills(profile);

    // ---- Industry Readiness Score card ----
    const readinessScoreEl =
        document.getElementById("readinessScore");

    const readinessLabelEl =
        document.getElementById("readinessLabel") ||
        document.querySelector(".readiness-score span");

    if (readinessScoreEl) {
        readinessScoreEl.textContent =
            `${analysis.readinessScore}%`;
    }

    if (readinessLabelEl) {
        readinessLabelEl.textContent =
            getReadinessLabel(analysis.readinessScore);
    }


    // ---- Quick Stats ----
    const skillsCoveredEl =
        document.getElementById("skillsCovered");

    const criticalGapsEl =
        document.getElementById("criticalGaps");

    const placementReadinessEl =
        document.getElementById("placementReadiness");

    if (skillsCoveredEl) {
        skillsCoveredEl.textContent =
            analysis.coveredCount;
    }

    if (criticalGapsEl) {
        criticalGapsEl.textContent =
            analysis.missing.filter(
                item => item.priority === "HIGH"
            ).length;
    }

    if (placementReadinessEl) {
        placementReadinessEl.textContent =
            `${analysis.readinessScore}%`;
    }


    // ---- Industry Skill Coverage card ----
    const coverageCountEl =
        document.getElementById("coverageCount");

    const coverageProgressEl =
        document.querySelector(".coverage-progress");

    const skillStatusListEl =
        document.getElementById("skillStatusList");

    if (coverageProgressEl) {

    const coverageBar = coverageProgressEl.parentElement;

    if (analysis.totalCount === 0) {
        coverageBar.style.display = "none";
    } else {
        coverageBar.style.display = "block";

        const coveragePercent =
            Math.round(
                (analysis.coveredCount / analysis.totalCount) * 100
            );

        coverageProgressEl.style.width =
            `${coveragePercent}%`;
    }
}

    if (skillStatusListEl) {

        skillStatusListEl.innerHTML = analysis.analyzed.map(item => `
            <div class="skill-status-item ${item.covered ? "covered" : "not-covered"}"
                style="display:flex;align-items:center;justify-content:space-between;
                padding:10px 0;border-bottom:1px solid rgba(0,0,0,0.08);">
                <span>${item.covered ? "✅" : "⭕"} ${item.skill}</span>
                <span style="font-size:12px;font-weight:600;
                    color:${item.covered ? "#16a34a" : "#dc2626"};">
                    ${item.covered ? "Covered" : `${item.priority} priority`}
                </span>
            </div>
        `).join("");

    }

    return analysis;

}


// =====================================================
// RENDER SLIDE 5 (Top 3 Skill Gaps + Next Best Action)
// =====================================================

function renderSlide5SkillGaps(profile) {

    if (!profile) return;

    // Recompute readiness score + skill coverage first,
    // then reuse the same analysis for the top gaps below.
    const analysis =
        updateIndustryReadiness(profile);

    const careerGoal =
        analysis.careerGoal;

    const gaps =
        analysis.missing.slice(0, 3);

    const gapList =
        document.querySelector(".gap-list");


    // -----------------------------------------------
    // UPDATE TOP 3 GAP CARDS
    // -----------------------------------------------

    if (gapList) {

        if (gaps.length === 0) {

            gapList.innerHTML = `
                <div class="gap-item">
                    <div class="gap-content">
                        <strong>🎉 You're covering all core skills for ${careerGoal}!</strong>
                        <p>Keep sharpening these skills and explore advanced or stretch topics to stay ahead.</p>
                    </div>
                </div>
            `;

        } else {

            gapList.innerHTML = gaps.map((gap) => {

                const currentLevel =
                    findStudentSkill(
                        getStudentSkillData(profile),
                        gap.skill
                    ) || "Not Started";

                const priorityClass =
                    gap.priority === "HIGH"
                    ? "high"
                    : gap.priority === "MEDIUM"
                    ? "medium"
                    : "low";

                const priorityBadge =
                    gap.priority === "HIGH"
                    ? "priority-high"
                    : gap.priority === "MEDIUM"
                    ? "priority-medium"
                    : "priority-low";

                return `

                    <div class="gap-item">

                        <div class="gap-icon ${priorityClass}">
                            ${gap.priority === "HIGH" ? "!" : "•"}
                        </div>

                        <div class="gap-content">

                            <div class="gap-title">

                                <strong>
                                    ${gap.skill}
                                </strong>

                                <span class="${priorityBadge}">
                                    ${gap.priority}
                                </span>

                            </div>

                            <p>
                                ${currentLevel}
                                →
                                ${gap.required}
                            </p>

                            <div class="slide5-gap-details">

                                <span>
                                    📈 Demand:
                                    <strong>${gap.demand}</strong>
                                </span>

                                <span>
                                    🎯
                                    ${gap.opportunities}
                                    matched opportunities
                                </span>

                            </div>

                            <small class="slide5-gap-why">
                                ${gap.why}
                            </small>

                            <div class="gap-path">

                                <span>Learn</span>
                                <b>→</b>

                                <span>Practice</span>
                                <b>→</b>

                                <span>Build Project</span>
                                <b>→</b>

                                <span>Reassess</span>

                            </div>

                            <div class="slide5-gap-action">

                                <strong>
                                    Next:
                                </strong>

                                ${gap.action}

                            </div>

                        </div>

                    </div>
                `;

            }).join("");

        }

    }


    // -----------------------------------------------
    // UPDATE "NEXT BEST ACTION"
    // -----------------------------------------------

    const nextAction =
        document.querySelector(
            ".next-action-card"
        );

    if (nextAction) {

        const heading =
            nextAction.querySelector(
                ".next-action-content h2"
            );

        const description =
            nextAction.querySelector(
                ".next-action-content p"
            );

        const tag =
            nextAction.querySelector(
                ".action-tag"
            );

        const button =
            nextAction.querySelector(
                "button"
            );

        if (gaps.length === 0) {

            if (heading) {
                heading.textContent =
                    `Great work — keep building on ${careerGoal}!`;
            }

            if (description) {
                description.textContent =
                    `You're covering all core industry skills for ${careerGoal}. Deepen your expertise with an advanced project or explore a new stretch skill.`;
            }

            if (tag) {
                tag.textContent =
                    "ON TRACK";
            }

            if (button) {

                button.textContent =
                    "Explore Advanced Topics →";

                button.onclick = function () {

                    alert(
                        "Nice work! Check the Opportunities and Roadmap sections for advanced next steps."
                    );

                };

            }

        } else {

            const highestPriority =
                gaps[0];

            if (heading) {
                heading.textContent =
                    `Strengthen your ${highestPriority.skill} skills`;
            }

            if (description) {
                description.textContent =
                    `${highestPriority.skill} is one of your highest-priority skill gaps for the ${careerGoal} role. ${highestPriority.action}`;
            }

            if (tag) {
                tag.textContent =
                    `${highestPriority.priority} PRIORITY`;
            }

            if (button) {

                button.textContent =
                    `Start ${highestPriority.skill} Plan →`;

                button.onclick = function () {

                    openLearningPlan(
                        highestPriority.skill,
                        careerGoal
                    );

                };

            }

        }

    }


    // -----------------------------------------------
    // UPDATE SLIDE 5 SUMMARY COUNTS
    // -----------------------------------------------

    const criticalCount =
        document.getElementById("criticalGapCount");

    const mediumCount =
        document.getElementById("mediumGapCount");

    const lowCount =
        document.getElementById("lowGapCount");

    if (criticalCount) {
        criticalCount.textContent =
            analysis.missing.filter(
                gap => gap.priority === "HIGH"
            ).length;
    }

    if (mediumCount) {
        mediumCount.textContent =
            analysis.missing.filter(
                gap => gap.priority === "MEDIUM"
            ).length;
    }

    if (lowCount) {
        lowCount.textContent =
            analysis.missing.filter(
                gap => gap.priority === "LOW"
            ).length;
    }

}

    

// =====================================================
// CONNECT SLIDE 5 TO EXISTING DASHBOARD
// =====================================================

// Keep your existing updateDashboard()
// and add Slide 5 behaviour to it.

const originalGoBeyondUpdateDashboard =
    updateDashboard;

updateDashboard = function(profile) {

    originalGoBeyondUpdateDashboard(profile);

    renderSlide5SkillGaps(profile);

};


// Render immediately if a profile already exists.

const slide5SavedProfile =
    localStorage.getItem(
        "goBeyondProfile"
    );

if (slide5SavedProfile) {

    try {

        const slide5Profile =
            JSON.parse(
                slide5SavedProfile
            );

        renderSlide5SkillGaps(
            slide5Profile
        );

    } catch (error) {

        console.error(
            "Slide 5 profile error:",
            error
        );

    }
}
// =====================================================
// LIVE PROFILE UPDATES
// =====================================================

const liveCareerGoal =
    document.getElementById("careerGoal");

const liveStudentName =
    document.getElementById("studentName");

const liveBranch =
    document.getElementById("branch");

const liveYear =
    document.getElementById("year");

const liveSkills =
    document.getElementById("skills");

const liveInterests =
    document.getElementById("interests");


// Create the current profile directly from the form
function getLiveProfile() {

    return {

        name:
            liveStudentName
                ? liveStudentName.value.trim()
                : "Student",

        branch:
            liveBranch
                ? liveBranch.value
                : "Computer Science",

        year:
            liveYear
                ? liveYear.value
                : "1st Year",

        careerGoal:
            liveCareerGoal
                ? liveCareerGoal.value
                : "AI/ML Engineer",

        skills:
            liveSkills
                ? liveSkills.value
                    .split(",")
                    .map(skill => skill.trim())
                    .filter(Boolean)
                : [],

        interests:
            liveInterests
                ? liveInterests.value
                    .split(",")
                    .map(interest => interest.trim())
                    .filter(Boolean)
                : []

    };
}


// -----------------------------------------------------
// CAREER GOAL CHANGE
// -----------------------------------------------------

if (liveCareerGoal) {

    liveCareerGoal.addEventListener(
        "change",
        function () {

            const profile =
                getLiveProfile();

            console.log(
                "Career changed to:",
                profile.careerGoal
            );

            updateDashboard(profile);

        }
    );

}


// -----------------------------------------------------
// NAME CHANGE
// -----------------------------------------------------

if (liveStudentName) {

    liveStudentName.addEventListener(
        "input",
        function () {

            const welcomeName =
                document.querySelector(
                    ".welcome h1 span"
                );

            if (welcomeName) {

                welcomeName.textContent =
                    liveStudentName.value.trim()
                    || "Student";

            }

        }
    );

}


// -----------------------------------------------------
// BRANCH / YEAR CHANGE
// -----------------------------------------------------

if (liveBranch) {

    liveBranch.addEventListener(
        "change",
        function () {

            const profile =
                getLiveProfile();

            updateDashboard(profile);

        }
    );

}

if (liveYear) {

    liveYear.addEventListener(
        "change",
        function () {

            const profile =
                getLiveProfile();

            updateDashboard(profile);

        }
    );

}


// -----------------------------------------------------
// SKILLS / INTERESTS CHANGE
// (live update: Industry Readiness Score, Industry Skill
// Coverage and Top 3 Skill Gaps update as you type)
// -----------------------------------------------------

function debounce(fn, delay) {

    let timer;

    return function (...args) {

        clearTimeout(timer);

        timer = setTimeout(
            () => fn.apply(this, args),
            delay
        );

    };

}

const liveSkillsInterestsUpdate = debounce(function () {

    const profile =
        getLiveProfile();

    updateDashboard(profile);

}, 400);

if (liveSkills) {

    liveSkills.addEventListener(
        "input",
        liveSkillsInterestsUpdate
    );

}

if (liveInterests) {

    liveInterests.addEventListener(
        "input",
        liveSkillsInterestsUpdate
    );

}
