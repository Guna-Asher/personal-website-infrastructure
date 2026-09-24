export type ProjectStage = "MVP" | "Shipped";

export type EngineeringDecision = {
  title: string;
  decision: string;
  reason: string;
  tradeoff?: string;
};

export type FailureRecoveryEntry = {
  symptom: string;
  cause: string;
  fix: string;
  lesson: string;
};

export type ProjectCaseStudy = {
  slug: string;
  title: string;
  type: string;
  stage: ProjectStage;
  oneLiner: string;
  stack: string[];
  github: string;
  problem: string;
  architecture: {
    summary: string;
    diagram: string;
  };
  decisions: EngineeringDecision[];
  deployment: string;
  constraints?: string[];
  failureRecovery?: FailureRecoveryEntry[];
  result: string;
  lessons: string;
};

export const projects: ProjectCaseStudy[] = [
  {
    slug: "stranger-club",
    title: "Stranger Club",
    type: "Product — Full-Stack Application",
    stage: "MVP",
    oneLiner:
      "A cricket-match registration platform that replaced a Google Form, a UPI QR code, and WhatsApp screenshots with one system — live slot availability, a FIFO waitlist, and organiser-reviewed payments.",
    stack: ["React", "Vite", "FastAPI", "Python", "SQLite", "SQLAlchemy", "Server-Sent Events", "Docker"],
    github: "https://github.com/Guna-Asher/Stranger-Club",
    problem:
      "Weekly cricket matches were being organised through a Google Form for registration, a UPI QR code for payment, a manual screenshot as proof, and WhatsApp messages to confirm who actually made it in. Every step depended on someone manually cross-referencing a spreadsheet against a chat thread, and there was no real way to enforce a fair waitlist once a match filled up. Stranger Club replaces that chain with one system: players register and pay through it, the organiser reviews and confirms from one dashboard, and slot availability is accurate in real time for everyone looking at it.",
    architecture: {
      summary:
        "A Vite-built React frontend talks to a single FastAPI backend over two API surfaces — a public one that needs no account, and a protected one behind organiser authentication. Both sit in front of the same SQLite database. State changes are published to any browser tab currently viewing that event over Server-Sent Events, so slot counts update live without polling.",
      diagram: `Player (no account)          Organiser (session + CSRF)
      │                              │
      ▼                              ▼
  Public API                   Protected API
      │                              │
      └──────────────┬───────────────┘
                      ▼
                   FastAPI
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
     Events     Registrations    Payments
        │             │             │
        └─────────────┼─────────────┘
                       ▼
                    SQLite
         (BEGIN IMMEDIATE on capacity-
          sensitive writes — see below)
                       │
                       ▼
              Domain state change
                       │
                       ▼
                      SSE
                       │
                       ▼
             Connected browser tabs`,
    },
    decisions: [
      {
        title: "SQLite, not PostgreSQL",
        decision: "The application runs on SQLite for this MVP.",
        reason:
          "The real load is one organiser running weekly events at a fixed capacity — nowhere near what would justify operating a separate database service.",
        tradeoff:
          "The code marks the exact swap point on purpose: a comment next to the capacity-check transaction notes that PostgreSQL's SELECT ... FOR UPDATE would replace SQLite's BEGIN IMMEDIATE without changing anything else in the service layer. This was a scoped decision with an exit path already written in, not a limitation discovered later.",
      },
      {
        title: "Concurrency: BEGIN IMMEDIATE on capacity-sensitive writes",
        decision:
          "Registering a player, confirming a payment, and promoting a waitlisted player each open their transaction with BEGIN IMMEDIATE, taking SQLite's write lock up front instead of discovering a conflict after the fact.",
        reason:
          "Without it, two players could both be confirmed into the same last open slot if their requests landed close together.",
        tradeoff:
          "This isn't a performance choice — it's the one place in the system where correctness, never overselling a match, depends entirely on write ordering.",
      },
      {
        title: "Registration and payment as two separate state machines",
        decision:
          "A registration's status and its payment's status are tracked independently rather than collapsed into one \"booking status\" field.",
        reason:
          "A player is validly registered before they've paid, and a payment can be rejected without unregistering them — forcing both into a single status would mean representing states that don't actually make sense together.",
      },
      {
        title: "FIFO waitlist, enforced server-side",
        decision:
          "Promoting a waitlisted player checks that they're genuinely first in the queue by creation time, and re-checks capacity at the moment of promotion, not just at the moment they registered.",
        reason:
          "A payment can arrive late, after the event has already filled from other confirmed players. When that happens, the registration is demoted to waitlisted rather than double-booking the event or silently discarding the payment — a real, exercised code path, not a hypothetical edge case.",
      },
      {
        title: "Session-cookie authentication, not JWT",
        decision:
          "The organiser — the only role that ever authenticates — gets a server-side session with an httpOnly cookie, a CSRF token required on every mutating request, Argon2-hashed passwords, and login rate limiting.",
        reason:
          "There's exactly one class of authenticated user, and no third-party or mobile client consuming the API. A server-side session is simpler to reason about and revoke than a token scheme built for an audience this project doesn't have. Players never authenticate at all — registering by phone number, not an account, is deliberate.",
      },
      {
        title: "What \"payments\" actually means here",
        decision:
          "There is no payment gateway integration. A player pays the organiser directly by UPI, uploads a screenshot as proof, and the organiser confirms or rejects it from the dashboard.",
        reason: "The system's job is tracking and verifying that proof correctly, not processing money.",
      },
    ],
    deployment:
      "A single Docker container, built from the repo's own Dockerfile, with a named volume mounting /data for the SQLite database file and uploaded payment screenshots so both survive a container restart. /health and /ready endpoints exist for exactly the kind of external check a reverse proxy or process supervisor would run.",
    constraints: [
      "Single organiser login model — no multi-organiser support.",
      "No player accounts — registration is per-event, by phone number.",
      "No payment gateway — proof-of-payment review only.",
      "These are stated as deliberate MVP scope in the project's own roadmap, not gaps discovered after the fact.",
    ],
    result:
      "Built and validated end to end, including a run against a real cricket match — registration, waitlist handling, and payment verification were all exercised with real players, not only local test fixtures. It has not been operated as a continuously running service beyond that one validated run. It should be described as built and proven, not as an actively used, regularly operating platform.",
    lessons:
      "The most reusable idea here isn't a library choice — it's making the SQLite-vs-Postgres decision reversible on purpose, by leaving the exact swap point documented in the code, instead of treating the database as a decision made once and never revisited. A next version would extend that same discipline to the payment flow: proof-of-payment review is honest and workable at one-organiser, weekly-event volume, but it doesn't scale past that without a real payment integration — a known boundary, not a surprise.",
  },
  {
    slug: "deployment-portal",
    title: "Self-Service Deployment Portal",
    type: "Platform — Internal Tooling",
    stage: "Shipped",
    oneLiner:
      "An internal dashboard for deploying Dockerized applications without SSH access — register a version, click deploy, and roll back safely if it fails.",
    stack: ["FastAPI", "Python", "PostgreSQL", "SQLAlchemy", "Alembic", "JWT", "bcrypt", "Docker", "Docker Compose"],
    github: "https://github.com/Guna-Asher/Self-Service-Deployment-Portal",
    problem:
      "A common small-team deployment pattern is SSHing into a server, pulling the latest code, and running docker build / docker run by hand. It works until it doesn't: mistakes happen under manual steps, everyone needs shared server access, there's no record of who deployed what or when, and rolling back means remembering the previous image tag correctly under pressure. This platform replaces that with a web dashboard: register an application, register a Docker image version, click deploy — no SSH access required for the person deploying.",
    architecture: {
      summary:
        "A FastAPI backend is the orchestration layer for everything: authentication, the application/version registry, deployment execution, and audit logging. PostgreSQL is the source of truth for deployment history. The backend never touches containers directly — every container operation is delegated to the Docker CLI, invoked through a wrapper the backend calls as a background task so the API responds immediately while the deployment runs.",
      diagram: `Developer (JWT session)
        │
        ▼
   Web Dashboard
        │
        ▼
  FastAPI Backend ────────────► PostgreSQL
        │                     (users, apps, versions,
        │                      deployments, logs)
        ▼
  Background Task
        │
        ▼
  Docker CLI (subprocess)
        │
        ▼
   Docker Daemon
        │
        ▼
  Application container`,
    },
    decisions: [
      {
        title: "Docker SDK → Docker CLI",
        decision:
          "Every container operation — pull, stop, remove, run, inspect — was rewritten to invoke the Docker CLI directly through a subprocess wrapper instead of the official Docker SDK.",
        reason:
          "The Docker SDK for Python (docker.from_env()) threw \"Not supported URL scheme http+docker\" inconsistently across environments during testing, traced to an incompatibility between the SDK and the host Docker daemon, not a bug in the application code calling it.",
        tradeoff:
          "This is less elegant than SDK calls and requires the Docker binary to be present wherever the API runs — accepted in exchange for reliability and much easier debugging across different Docker versions.",
      },
      {
        title: "bcrypt / passlib 72-byte limit",
        decision: "Dropped passlib and hashed passwords directly with the bcrypt library instead of going through its wrapper.",
        reason: "passlib's bcrypt backend rejected some passwords with \"password cannot be longer than 72 bytes.\"",
      },
      {
        title: "Docker CLI flag mismatch",
        decision: "Switched from docker create --detach to docker run --detach.",
        reason:
          "docker create --detach errored with \"unknown flag --detach.\" Small, but a real example of the CLI-wrapping approach requiring exact command shapes, not approximations.",
      },
      {
        title: "Rollback lineage and audit logging",
        decision:
          "Deployments maintain a relationship to the deployment they replaced, and a separate deployment-log model records each step of a deployment — image pull, container stop, container removal, container start, and any error.",
        reason:
          "This is what makes rollback traceable rather than a blind \"run the old image again,\" and gives real visibility into what happened during a failed deployment, not just its final status. Both are implemented, not aspirational.",
      },
    ],
    deployment:
      "Docker Compose runs the API and PostgreSQL as two services. Schema changes go through Alembic migrations, run explicitly (alembic upgrade head) rather than automatically on boot.",
    constraints: [
      "Single-host deployments — no Kubernetes, no multi-host orchestration.",
      "No role-based access control — every authenticated user currently has the same capabilities. Stated directly in the project's own documentation as a known gap.",
      "CI/CD integration and health-check-based auto-rollback are listed as in progress in the project's own roadmap, not finished.",
    ],
    failureRecovery: [
      {
        symptom: "Not supported URL scheme http+docker",
        cause: "Docker SDK for Python incompatible with the host Docker daemon across environments.",
        fix: "Replaced all container operations with direct Docker CLI invocations via subprocess.",
        lesson: "The \"proper\" SDK wasn't the safer choice here — the CLI, wrapped carefully, was more portable and easier to debug.",
      },
      {
        symptom: "password cannot be longer than 72 bytes",
        cause: "passlib's bcrypt backend enforcing a length limit unexpectedly.",
        fix: "Dropped passlib, hashed passwords directly with the bcrypt library.",
        lesson: "A wrapper library around a well-understood primitive can introduce its own failure mode.",
      },
      {
        symptom: "unknown flag --detach on docker create",
        cause: "Incorrect assumption about which Docker CLI subcommand accepts which flags.",
        fix: "Switched to docker run --detach.",
        lesson: "CLI-wrapping requires exact command shapes — there's no compiler to catch a wrong flag ahead of time.",
      },
    ],
    result:
      "Functions end to end as an internal tool: registering an application, registering a version, deploying it, and rolling it back all work through the dashboard, with every step logged. It has not been used as the deployment path for a team with multiple concurrent users — it's been built and exercised by one person, thoroughly, not operated at team scale.",
    lessons:
      "The Docker SDK failure is the clearest lesson in the project: reaching for the \"proper\" SDK wasn't actually the safer choice here. The CLI, wrapped carefully through subprocess calls, turned out more portable across Docker versions and far easier to debug when something went wrong. The project's own honesty about what it doesn't have yet — no RBAC, CI/CD still in progress — is worth carrying forward as a habit, not just a one-time disclosure.",
  },
  {
    slug: "aws-log-monitoring",
    title: "AWS Log Monitoring & Archival System",
    type: "Automation — Cloud Pipeline",
    stage: "Shipped",
    oneLiner:
      "A small scheduled pipeline that pulls error lines out of an EC2 application log and archives them to S3 every hour, authenticated through an IAM instance role instead of stored keys.",
    stack: ["Python", "Docker", "AWS EC2", "AWS S3", "AWS IAM", "cron", "GitHub Actions"],
    github: "https://github.com/Guna-Asher/aws-log-monitoring-project",
    problem:
      "Finding error signals in application logs on an EC2 instance usually means someone SSHing in and grepping through a file by hand — manual, easy to forget, and the log itself is ephemeral if the instance is ever replaced. This project automates that one task: pull out error lines and archive them somewhere durable, on a schedule, without a person doing it.",
    architecture: {
      summary:
        "A single Python script reads the local application log, keeps only lines containing ERROR, and uploads them to S3 as a timestamped object so nothing gets overwritten. It runs inside a Docker container for environment parity between a laptop and the EC2 host, and cron triggers it hourly. A GitHub Actions workflow validates that the Docker image still builds on every push.",
      diagram: `EC2 instance
    │
    ▼
 app.log (local)
    │
    ▼
 monitor.py — filters lines containing "ERROR"
    │
    ▼
 boto3 put_object() — credentials from IAM instance role
    │
    ▼
 S3 bucket (errors_<timestamp>.log)

Trigger: cron, hourly
Build check: GitHub Actions, on every push`,
    },
    decisions: [
      {
        title: "IAM instance role instead of static credentials",
        decision:
          "The EC2 instance carries an IAM role scoped to s3:PutObject on exactly one bucket. boto3 picks up temporary credentials automatically from the instance metadata service.",
        reason:
          "There is no AWS access key anywhere in the code, the environment, or a credentials file — real least-privilege practice on a project small enough that it would have been easy to skip and just hardcode a key. It wasn't skipped.",
      },
    ],
    deployment:
      "A Docker image built from the repo's Dockerfile, run on the EC2 host and scheduled hourly via a cron entry. GitHub Actions validates the Docker build on every push, independent of the runtime schedule.",
    result:
      "Runs the intended loop successfully: filters error lines, uploads a timestamped archive to S3, on schedule, with no credential ever touching the code or the instance's filesystem. It has not been extended past that one loop — one log file, one bucket, substring matching rather than structured log parsing, and no retry or alerting if an individual upload fails.",
    lessons:
      "The habit worth keeping and repeating elsewhere: default to an IAM role instead of a static key, even on something this small. The project didn't need to be a bigger system to be a security decision made correctly.",
  },
];
