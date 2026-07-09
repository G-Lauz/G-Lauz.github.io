export type ActiveSection = "about" | "projects";

export interface Site {
    name: string;
    description: string;
}

export const site: Site = {
    name: "Gabriel Lauzier",
    description: "Gabriel Lauzier's personal website",
}

export const about = {
    firstname: "Gabriel",
    lastname: "Lauzier",
    title: "Ph.D. Student in Computer Engineering",
    affiliations: [
        {
            name: "Université de Sherbrooke",
            url: "https://www.usherbrooke.ca/",
        }
    ],
    email: "mailto:gabriel.lauzier@usherbrooke.ca",
    github: "https://github.com/G-Lauz",
    linkedin: "https://www.linkedin.com/in/gabriel-lauzier",
    bestWayToReach: "email",
    courses: [
        {
            name: "Lecturer in Probabilistic Artificial Intelligence",
            acronyms: [
                {
                    name: "GEI890",
                    url: "https://www.usherbrooke.ca/admission/fiches-cours/GEI890/"
                },
                {
                    name: "GEI895",
                    url: "https://www.usherbrooke.ca/admission/fiches-cours/GEI895/"
                }
            ]
        },
        {
            name: "Lecturer in Recurrent Neural Networks",
            acronyms: [
                {
                    name: "GEI722",
                    url: "https://www.usherbrooke.ca/admission/fiches-cours/GRO722"
                }
            ]
        }
    ],
    bio: "Guided by passion and a belief that every problem has a solution, I pursue research in collaboration with industry partners to achieve product-driven results. My goal is to seek projects that align with my interests, values and that will allow me to evolve with a team driven by diverse ideas.",
    research: "My research interests lie at the intersection of machine learning and control theory. Mainly, I focus on generative modeling applied to control problems. As part of my thesis, I’m exploring the application of diffusion models to imitation learning, with the aim of developing more efficient algorithms for learning from demonstrations. The applications of this work are directly relevant to the field of robotics, where defining a behavior or a reward function is often challenging in complex environments.",
    profilePicture: {
        path: "./src/assets/profile.jpg",
        alt: "Gabriel Lauzier's profile picture",
    }
}

export const navItems = [
    { label: "About", href: "/", key: "about" },
    { label: "Projects", href: "/projects", key: "projects" }
] satisfies Array<{ label: string; href: string; key: ActiveSection }>;

export const footerLinks = [
    { label: "GitHub", href: about.github },
    { label: "LinkedIn", href: about.linkedin },
    { label: "Contact", href: about.email }
];
