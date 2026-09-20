/* =========================================================
   GOBEYOND CAREER MATCHING ENGINE
   Interest = PRIMARY FILTER
   Branch + Skills + Goal = Ranking
   ========================================================= */


/* ---------------------------------------------------------
   1. NORMALIZE TEXT
--------------------------------------------------------- */

function normalizeText(value) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
}


/* ---------------------------------------------------------
   2. CONVERT TEXT TO ARRAY
--------------------------------------------------------- */

function normalizeList(value) {

    if (Array.isArray(value)) {
        return value
            .map(item => normalizeText(item))
            .filter(Boolean);
    }

    return String(value || "")
        .split(",")
        .map(item => normalizeText(item))
        .filter(Boolean);
}


/* ---------------------------------------------------------
   3. INTEREST GROUPS
--------------------------------------------------------- */

const interestGroups = {

    web: [
        "web development",
        "web developer",
        "website development",
        "website",
        "frontend",
        "front end",
        "frontend development",
        "backend",
        "back end",
        "backend development",
        "full stack",
        "full stack development"
    ],

    software: [
        "software development",
        "software developer",
        "programming",
        "coding",
        "software",
        "application development",
        "app development"
    ],

    ai: [
        "artificial intelligence",
        "ai",
        "machine learning",
        "ml",
        "deep learning",
        "generative ai",
        "gen ai"
    ],

    data: [
        "data",
        "data science",
        "data analytics",
        "data analysis",
        "analytics",
        "statistics",
        "business analytics"
    ],

    cybersecurity: [
        "cybersecurity",
        "cyber security",
        "ethical hacking",
        "network security",
        "information security",
        "digital forensics",
        "security"
    ],

    cloud: [
        "cloud",
        "cloud computing",
        "devops",
        "infrastructure",
        "aws",
        "azure"
    ],

    electronics: [
        "electronics",
        "embedded",
        "embedded systems",
        "hardware",
        "vlsi",
        "chip design",
        "semiconductors",
        "iot",
        "internet of things"
    ],

    mechanical: [
        "mechanical",
        "mechanical engineering",
        "machines",
        "manufacturing",
        "automobile",
        "automotive",
        "cad",
        "product design"
    ],

    civil: [
        "civil",
        "civil engineering",
        "construction",
        "infrastructure",
        "structural engineering",
        "structures",
        "buildings",
        "bim"
    ],

    electrical: [
        "electrical",
        "electrical engineering",
        "power",
        "energy",
        "control systems",
        "automation"
    ],

    finance: [
        "finance",
        "financial analysis",
        "banking",
        "investment",
        "stock market",
        "markets",
        "accounting",
        "taxation"
    ],

    business: [
        "business",
        "management",
        "business analytics",
        "product management",
        "entrepreneurship",
        "startups",
        "marketing",
        "human resources"
    ],

    design: [
        "design",
        "ui design",
        "ux design",
        "ui ux",
        "graphic design",
        "graphics",
        "fashion",
        "creative"
    ],

    healthcare: [
        "healthcare",
        "health",
        "medicine",
        "medical",
        "nursing",
        "patient care",
        "pharmacy",
        "physiotherapy"
    ],

    science: [
        "science",
        "research",
        "physics",
        "chemistry",
        "biology",
        "biotechnology",
        "laboratory"
    ],

    education: [
        "education",
        "teaching",
        "teacher",
        "learning",
        "training"
    ],

    media: [
        "media",
        "journalism",
        "writing",
        "content",
        "content creation",
        "storytelling"
    ],

    government: [
        "government",
        "public service",
        "civil services",
        "public administration",
        "policy"
    ],

    environment: [
        "environment",
        "environmental",
        "sustainability",
        "climate",
        "green technology"
    ],

    agriculture: [
        "agriculture",
        "farming",
        "agricultural technology",
        "rural development"
    ],

    aviation: [
        "aviation",
        "aerospace",
        "aircraft",
        "aeronautical",
        "space"
    ],

    hospitality: [
        "hospitality",
        "hotel management",
        "tourism",
        "travel",
        "events",
        "customer service"
    ],

    sports: [
        "sports",
        "fitness",
        "athletics",
        "physical education",
        "training"
    ]
};


/* ---------------------------------------------------------
   4. FIND INTEREST GROUPS SELECTED BY STUDENT
--------------------------------------------------------- */

function getStudentInterestGroups(interests) {

    const studentInterests =
        normalizeList(interests);

    const groups = [];

    studentInterests.forEach(studentInterest => {

        Object.entries(interestGroups).forEach(
            ([groupName, aliases]) => {

                const matched = aliases.some(alias => {

                    const a = normalizeText(alias);
                    const b = normalizeText(studentInterest);

                    return (
                        b === a ||
                        b.includes(a) ||
                        a.includes(b)
                    );
                });

                if (
                    matched &&
                    !groups.includes(groupName)
                ) {
                    groups.push(groupName);
                }
            }
        );
    });

    return groups;
}


/* ---------------------------------------------------------
   5. CHECK CAREER AGAINST INTEREST
--------------------------------------------------------- */

function isCareerRelevantToInterest(
    career,
    studentInterests
) {

    const groups =
        getStudentInterestGroups(
            studentInterests
        );

    if (groups.length === 0) {
        return false;
    }

    const careerText = [

        career.name || "",

        career.domain || "",

        ...(career.interests || [])

    ]
        .map(normalizeText)
        .join(" ");


    return groups.some(group => {

        return interestGroups[group].some(
            keyword => {

                return careerText.includes(
                    normalizeText(keyword)
                );

            }
        );

    });
}


/* ---------------------------------------------------------
   6. BRANCH MATCH
--------------------------------------------------------- */

function getBranchScore(
    studentBranch,
    career
) {

    const branch =
        normalizeText(studentBranch);

    if (!branch) {
        return 0;
    }

    const careerBranches =
        (career.branches || [])
            .map(normalizeText);

    if (
        careerBranches.includes("any")
    ) {
        return 60;
    }

    const matched =
        careerBranches.some(
            careerBranch => {

                return (
                    branch === careerBranch ||
                    branch.includes(careerBranch) ||
                    careerBranch.includes(branch)
                );

            }
        );

    return matched ? 100 : 0;
}


/* ---------------------------------------------------------
   7. SKILL MATCH
--------------------------------------------------------- */

function getSkillResult(
    studentSkills,
    career
) {

    const skills =
        normalizeList(studentSkills);

    const requiredSkills =
        career.skills || [];

    const matchedSkills = [];
    const missingSkills = [];


    requiredSkills.forEach(
        requiredSkill => {

            const required =
                normalizeText(requiredSkill);

            const matched =
                skills.some(
                    studentSkill => {

                        const student =
                            normalizeText(
                                studentSkill
                            );

                        return (
                            student === required ||
                            student.includes(required) ||
                            required.includes(student)
                        );

                    }
                );


            if (matched) {

                matchedSkills.push(
                    requiredSkill
                );

            } else {

                missingSkills.push(
                    requiredSkill
                );

            }

        }
    );


    const score =
        requiredSkills.length === 0

            ? 0

            : Math.round(
                (
                    matchedSkills.length /
                    requiredSkills.length
                ) * 100
            );


    return {
        score,
        matchedSkills,
        missingSkills
    };
}


/* ---------------------------------------------------------
   8. CAREER GOAL MATCH
--------------------------------------------------------- */

function getGoalScore(
    careerGoal,
    career
) {

    const goal =
        normalizeText(careerGoal);

    if (!goal) {
        return 0;
    }

    const name =
        normalizeText(career.name);

    const domain =
        normalizeText(career.domain);


    if (
        name.includes(goal) ||
        goal.includes(name)
    ) {
        return 100;
    }


    if (
        domain.includes(goal) ||
        goal.includes(domain)
    ) {
        return 80;
    }


    return 0;
}


/* ---------------------------------------------------------
   9. CALCULATE CAREER MATCH
--------------------------------------------------------- */

function calculateCareerMatch(
    profile,
    career
) {

    const interests =
        normalizeList(profile.interests);

    /* -------------------------------------------
       MOST IMPORTANT RULE:
       Career must be related to interest.
    ------------------------------------------- */

    if (
        !isCareerRelevantToInterest(
            career,
            interests
        )
    ) {
        return null;
    }


    const branchScore =
        getBranchScore(
            profile.branch,
            career
        );


    const skillResult =
        getSkillResult(
            profile.skills,
            career
        );


    const goalScore =
        getGoalScore(
            profile.careerGoal,
            career
        );


    /*
       FINAL WEIGHT

       Interest = 50%
       Skills   = 25%
       Branch   = 15%
       Goal     = 10%
    */

    const interestScore = 100;


    const finalScore =
        Math.round(

            (interestScore * 0.50) +

            (skillResult.score * 0.25) +

            (branchScore * 0.15) +

            (goalScore * 0.10)

        );


    return {

        career,

        score: finalScore,

        interestScore,

        branchScore,

        skillScore:
            skillResult.score,

        goalScore,

        matchedSkills:
            skillResult.matchedSkills,

        missingSkills:
            skillResult.missingSkills

    };
}


/* ---------------------------------------------------------
   10. GET RECOMMENDED CAREERS
--------------------------------------------------------- */

function getRecommendedCareers(
    profile,
    limit = 6
) {

    const results = careerData

        .map(career =>
            calculateCareerMatch(
                profile,
                career
            )
        )

        /* Remove unrelated careers */
        .filter(result =>
            result !== null
        )

        /* Highest match first */
        .sort((a, b) => {

            if (
                b.score !== a.score
            ) {
                return (
                    b.score - a.score
                );
            }


            return (
                b.matchedSkills.length -
                a.matchedSkills.length
            );

        });


    return results.slice(
        0,
        limit
    );
}


/* ---------------------------------------------------------
   11. FIND ONE CAREER
--------------------------------------------------------- */

function getCareerById(id) {

    return careerData.find(
        career =>
            career.id === id
    );
}


/* ---------------------------------------------------------
   12. GET PROFILE FROM DASHBOARD
--------------------------------------------------------- */

function createCareerProfile() {

    return {

        name:
            document.getElementById(
                "studentName"
            )?.value || "",

        branch:
            document.getElementById(
                "branch"
            )?.value || "",

        year:
            document.getElementById(
                "year"
            )?.value || "",

        careerGoal:
            document.getElementById(
                "careerGoal"
            )?.value || "",

        skills:
            document.getElementById(
                "skills"
            )?.value || "",

        interests:
            document.getElementById(
                "interests"
            )?.value || ""

    };
}


/* ---------------------------------------------------------
   13. SAVE PROFILE
--------------------------------------------------------- */

function saveCareerProfile() {

    const profile =
        createCareerProfile();

    localStorage.setItem(
        "goBeyondProfile",
        JSON.stringify(profile)
    );

    return profile;
}


/* ---------------------------------------------------------
   14. LOAD PROFILE
--------------------------------------------------------- */

function loadCareerProfile() {

    try {

        const saved =
            localStorage.getItem(
                "goBeyondProfile"
            );

        if (!saved) {
            return null;
        }

        return JSON.parse(saved);

    } catch (error) {

        console.error(
            "Profile loading error:",
            error
        );

        return null;
    }
}


/* ---------------------------------------------------------
   15. CURRENT PROFILE
--------------------------------------------------------- */

function getCurrentCareerProfile() {

    const saved =
        loadCareerProfile();

    if (saved) {
        return saved;
    }

    return createCareerProfile();
}


/* ---------------------------------------------------------
   16. DEBUG
--------------------------------------------------------- */

console.log(
    "GoBeyond Career Engine Loaded:",
    careerData.length,
    "careers"
);