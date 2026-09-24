export type Skill = {
  name: string;
  /** Slugs of projects (see lib/data/projects.ts) that demonstrate this skill. */
  projects?: string[];
};

export type SkillCategory = {
  label: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    label: "Cloud & Infrastructure",
    skills: [
      { name: "Linux", projects: ["aws-log-monitoring"] },
      { name: "AWS", projects: ["aws-log-monitoring"] },
      { name: "EC2", projects: ["aws-log-monitoring"] },
      { name: "S3", projects: ["aws-log-monitoring"] },
      { name: "IAM", projects: ["aws-log-monitoring"] },
      { name: "Networking" },
      { name: "Nginx" },
    ],
  },
  {
    label: "DevOps & Automation",
    skills: [
      { name: "Docker", projects: ["stranger-club", "deployment-portal", "aws-log-monitoring"] },
      { name: "Docker Compose", projects: ["deployment-portal"] },
      { name: "GitHub Actions", projects: ["aws-log-monitoring"] },
      { name: "CI/CD", projects: ["aws-log-monitoring"] },
      { name: "Bash" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Python", projects: ["stranger-club", "deployment-portal", "aws-log-monitoring"] },
      { name: "FastAPI", projects: ["stranger-club", "deployment-portal"] },
      { name: "REST APIs", projects: ["stranger-club", "deployment-portal"] },
      { name: "PostgreSQL", projects: ["deployment-portal"] },
      { name: "SQLite", projects: ["stranger-club"] },
      { name: "SQLAlchemy", projects: ["stranger-club", "deployment-portal"] },
      { name: "Alembic", projects: ["deployment-portal"] },
    ],
  },
  {
    label: "Tools",
    skills: [{ name: "Git" }, { name: "GitHub" }, { name: "AWS CLI" }, { name: "Docker CLI" }, { name: "Postman" }],
  },
];
