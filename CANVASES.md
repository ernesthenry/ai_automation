# Interview & learning prep (Markdown)

Single **readable** document for GitHub and any editor: Pair / Tunga, STAR stories, and lab ideas. There are **no** `.canvas.tsx` sources in this repo anymore—edit this file directly.

**Index:** **[docs/PREPARATION.md](docs/PREPARATION.md)** links here, runnable `projects/` demos, and the short `canvases/README.md` pointer.

**Table of contents**

1. [AI automation portfolio (interview prep)](#1-ai-automation-portfolio-interview-prep) — includes Tunga thread + Pair client brief
2. [STAR stories](#2-star-stories)
3. [Hands-on automation learning portfolio](#3-hands-on-automation-learning-portfolio)

---

## 1. AI automation portfolio (interview prep)

Interview prep for **Pair Software** (via **Tunga**): automation, microservices, AWS staging, and AI-assisted engineering. Map shipped work to their problems before the call.

### Recruiter thread (Virtuous Tunga, Slack)

Keep the relationship warm and responsive; she is coordinating the client.

| When | Who | Note |
|------|-----|------|
| (earlier) | You | "Okay" — acknowledge updates quickly |
| | Virtuous | "I'll keep you posted" — expect follow-ups from her |
| | Virtuous | Call **rescheduled** ("minutes from now" in thread — confirm **current** time in your calendar so you are not late) |
| | You | "Alright" / "Thank you for sharing" — short confirmations are fine |
| 1:22 PM | Virtuous | [pairsoftware.io](https://www.pairsoftware.io/) + full client brief below |

If anything shifts again, reply on the same thread so the audit trail stays clear.

### Client brief — Pair Software (from Tunga, use as ground truth)

**Who they are**

Fast-moving **SaaS**, **automation-first** engineering culture. **Sales** rapidly prototype with clients; once approved, **MVPs become production-ready microservices**. **Everything goes through AWS staging** before live. They build systems that **reduce manual work**, including **their own engineering process**.

**What you would work on**

1. **Service console automation** — how new **microservices are registered and exposed** on the internal platform console  
2. **Self-healing bugs** — pull issues, **categorise**, **apply fixes automatically** where possible  
3. **MVP → production pipeline** — take **rough MVP code** and **structure it for production** on **AWS**  
4. **Automated QA** — across services, **potentially LLMs for test generation**

**Their stack:** AWS · Microservices · **MySQL** · AI/LLMs · **DSPy** (emerging interest)

**What they value:** **Shipping over perfection**, **independent thinking**, **practical outcomes**. You will **not** get a full spec — you take **ambiguous problems** and turn them into **working systems**.

**They want you to think about (explicit prep list)**

- Examples of **automation that removed repetitive work**  
- How you took **rough or unclear requirements** and **shipped** something  
- **AI-assisted development** and **agentic workflows** (experience or interest)

**Tags:** Kato Ernest Henry · Senior AI / full stack · BPOSeats, Headstarter, CIM

| Stat | Label |
|------|--------|
| 5+ | Years shipping web + AI systems |
| 4 | Agents in production content pipeline |
| 1 | MCP + RAG stack you can describe end-to-end |

### Elevator line (about 30 seconds)

I build automation that turns code and tickets into reliable workflows: RAG and MCP for developer context, multi-agent pipelines with logging and cost controls, and microservice-style backends in TypeScript and Python. I am strongest where ambiguity meets shipping: I start with a thin vertical slice, hard guardrails, and observable metrics, then expand scope.

### Their focus to your proof

Lead with outcomes, then name the stack. Tie every example to less manual work or safer change.

| They want | You point to | Outcome to quote |
|-----------|----------------|------------------|
| Console auto-registers new microservices | Microservices at BPOSeats, MCP server exposing semantic code search and tooling | Less tribal knowledge; faster integration paths |
| Self-healing bugs: ingest, classify, fix, PR | Multi-agent pipeline (Research to Publisher) + RAG accuracy lesson + QA on model output | Human-in-loop automation; measurable quality gains you already cited |
| MVP to production on AWS | Headstarter rapid deploys; CIM payment stack; disciplined staging mindset | Ship fast, then harden: tests, observability, contracts |
| Automated QA, LLM-generated tests | MCP for tests and quality analysis; prompt QA loops at BPOSeats | Generated checks where valuable; never skip the safety net |

### Flagship story: AutoDoc and MCP

- **Problem:** API docs and onboarding guides drifted from code; repeated questions burned engineering time.
- **Ship:** Layered AutoDoc (OpenAPI from code, RAG-enhanced explanations, assistant-facing surface) plus MCP integration for self-documenting guides with Claude/OpenAI.
- **After:** Faster onboarding and fewer clarification loops; use the 60 percent onboarding improvement only if you can defend it in detail.

### Flagship story: multi-agent production pipeline

- **Problem:** Manual content cycle across research, writing, review, publish.
- **Ship:** Crew-style handoffs with logging and cost or performance monitoring from day one.
- **Bridge to their bug system:** Same pattern as issue ingest, classify, tool-augmented fix, verify, open PR, human merge.

### RAG and triage lesson (one sentence)

At BPOSeats the first retrieval step set the ceiling for everything downstream; I invested in chunking, embeddings, and evaluation before widening autonomy. That is the same discipline I would apply to ticket classification and code context retrieval for fixes.

### If they steer to scenario (b): MVP to production

I would treat the rough MVP as an asset, not a spec. **Week one:** freeze a minimal service boundary, add a Dockerfile and a single CI path that builds and runs tests on every push, and wire a staging deploy on AWS that mirrors production constraints. **Week two:** extract configuration, secrets, and feature flags; add structured logging, health checks, and a basic metrics dashboard; define API contracts the sales prototype implied but never wrote down. An early version looks boring on purpose: a repeatable pipeline and a green build, then incremental refactors behind tests. Only after that would I layer LLM-assisted test generation for edge cases the MVP skipped, always gated by the existing suite.

### If they steer to scenario (c): service registry console

I would start by inventorying how services already authenticate to AWS and how routes are exposed today, because the registry has to match reality, not an ideal diagram. An early version is a small control plane service plus a database table of service name, repo, owner, health URL, and OpenAPI or gRPC descriptor location, populated by a CI step that runs on merge to main. The console becomes read-only first so teams trust the index, then add write paths: scaffolded registration from a cookiecutter template and automatic verification that staging answers health checks before the entry goes live.

### AI direction (include DSPy)

Pair mentioned DSPy. Position it as structured prompt and pipeline optimization over ad hoc strings: declarative modules, evaluation loops, composition with retrieval and tools. Near-term experiments fit: multi-agent orchestration with CrewAI and LangChain, MCP as a stable context boundary for assistants. **Two-year view:** more end-to-end agentic subtasks with humans on architecture, risk review, and evaluation design, not on repetitive implementation.

### Gaps to address plainly

- **MySQL at their scale:** highlight PostgreSQL, Sequelize, and data modeling discipline, then commit to learning their schemas and migration patterns in the first sprint.
- **DSPy:** honest curiosity plus a concrete plan (small benchmark task, compare baseline prompts to optimized programs, measure regression on a fixed eval set).
- Avoid overstating metrics in live conversation unless you can explain measurement method and baseline.

### Questions that signal fit

- How do you define done for a microservice before it leaves staging?
- What is the hardest part of service discovery today?
- Which incidents taught you the most about automation guardrails?
- How do you balance sales-led MVPs with long-term platform consistency?

### Prep checklist (tick boxes in GitHub by editing the file, or copy into your notes app)

- [ ] Confirm **calendar time** for the rescheduled Tunga / Pair call (thread said "minutes from now" — verify **now** in your calendar app)
- [ ] Skim [pairsoftware.io](https://www.pairsoftware.io/): product, customers, tone (**3 bullets** to say aloud)
- [ ] Memorize **their four work streams** + **stack** + **three prep themes** (automation, ambiguous reqs, agentic AI) from the brief above
- [ ] Memorize 3 stories: AutoDoc/MCP, multi-agent, RAG triage lesson
- [ ] Read MVP pipeline + service registry paragraphs out loud once
- [ ] Prepare honest bridge: **MySQL**, **DSPy** interest, **AWS staging** mental model
- [ ] Pick 4 questions from bottom section to ask them
- [ ] After the call: **keep Virtuous posted** if you agreed to updates (short thank-you + one-line outcome)

**Profile links:** [LinkedIn](https://www.linkedin.com/in/keh95/) · [GitHub](https://github.com/ernesthenry)

*Tunga: align Tunga Works / profile with AWS, microservices, automation, AI-assisted workflows.*

---

## 2. STAR stories

Three rehearsed arcs: same facts as your CV, framed so you always land on Situation, Task, Action, Result. Speak each story in under 90 seconds unless they dig in.

**Tags:** BPOSeats · Automation + AI

| Stat | Label |
|------|--------|
| 3 | Stories below |
| STAR | Structure every answer |
| 90s | Default time box |

| Story | Use when they ask about |
|-------|-------------------------|
| AutoDoc + MCP | Removing repetitive work, onboarding, internal platforms, developer tooling |
| Multi-agent pipeline | Agentic workflows, self-healing or triage systems, guardrails, observability |
| RAG over documents / APIs | Classification, retrieval quality, evaluation before scaling autonomy |

### Story 1: AutoDoc and MCP onboarding

| STAR | Content |
|------|---------|
| **Situation** | API documentation and onboarding knowledge lived in Slack and tribal memory. Django and DRF microservices changed often; OpenAPI drifted from real behavior, and new engineers waited on seniors for the same explanations. |
| **Task** | Make accurate API knowledge and codebase orientation available without a manual rewrite every sprint, and integrate with how teams already used AI assistants. |
| **Action** | Built AutoDoc in layers: derive OpenAPI from routes, types, and docstrings; run a RAG + LLM pass to enrich specs and support natural language questions; ship an assistant-friendly surface. Extended with MCP so Claude and OpenAI could pull repo context to generate onboarding guides and explanations tied to real code. |
| **Result** | Fewer back-and-forth questions between frontend and backend, faster time to first meaningful contribution for new hires. If you mention a percentage improvement, pair it with how you measured it (e.g., survey, time to first PR, ticket volume). |

**Say first (15 seconds):** We had the classic docs debt problem at microservice speed. I automated the boring parts, code to spec to assistant context, so humans stopped repeating themselves.

### Story 2: Multi-agent content pipeline (Researcher to Publisher)

| STAR | Content |
|------|---------|
| **Situation** | Technical content went through a heavy manual chain: research, draft, edit, proof, publish, with inconsistent quality and long cycle times. |
| **Task** | Automate the pipeline end to end while keeping quality and cost predictable, not a black box that teams distrust. |
| **Action** | Designed a production multi-agent flow with explicit roles (Researcher, Writer, Proofreader, Publisher), structured handoffs, logging, and cost or performance monitoring from the first deploy. Humans stayed in the loop where decisions were consequential. |
| **Result** | Shorter content cycle and more consistent output; the architecture maps directly to bug triage, fix generation, test run, and PR for a self-healing system they described. |

**Say first (15 seconds):** I treat agent systems like services: contracts between steps, observability, and kill switches. This pipeline was my template for trustworthy automation.

### Story 3: RAG system over large corpora (Mistral, embeddings, Weaviate)

| STAR | Content |
|------|---------|
| **Situation** | The business needed semantic search and grounded answers over a large document corpus; naive chunking and generic prompts gave weak retrieval and hallucination risk. |
| **Task** | Improve retrieval accuracy and response consistency so downstream product and QA could trust the system. |
| **Action** | Implemented a RAG stack with Mistral 7B, HuggingFace embeddings, and Weaviate; tuned chunking and prompt templates; ran QA passes on model output and iterated on prompts and retrieval parameters. |
| **Result** | Better-grounded answers and higher trust in automation; the lesson you stress in interview: the first retrieval step sets the ceiling, so you evaluate before widening scope, same mindset as classifying issues before auto-fix. |

**Say first (15 seconds):** I did not optimize the prettiest demo; I optimized the retrieval boundary. Everything downstream, including any auto-fix agent, only works if step one is measured and solid.

### 60-second flow (if they stay high level)

One sentence each, in order.

I have shipped three kinds of automation they care about: docs and onboarding tied to real code through AutoDoc and MCP; multi-agent pipelines with logging and cost controls that mirror a self-healing bug loop; and RAG where I proved quality at the retrieval layer before expanding autonomy. I default to thin vertical slices with clear paths, tests, and observability, then add LLMs where they multiply leverage, not where they replace judgment.

---

## 3. Hands-on automation learning portfolio

Curated build ideas to speak confidently about AWS, DSPy, RAG, MCP, n8n, and Zapier-style bridging. Pick two or three before your interview, ship a thin vertical slice, and keep notes on what broke and how you measured quality.

**Tags:** Pair-style themes · No production claims without metrics

| Stat | Label |
|------|--------|
| 22+ | Project ideas below |
| 2 to 3 | Build before the call |
| 1 week | Per thin slice target |
| Eval first | DSPy and RAG habit |

### How to use this list

Each row is a self-contained lab, not a startup. Goal is muscle memory: IAM boundaries, one observable metric, one rollback path. Official references are linked at the bottom; n8n documents AWS Lambda and S3 nodes for workflow automation, and industry writeups describe Zapier-style handoff from SaaS triggers to Lambda.

**Difficulty:** L1 quick script, L2 multi-service, L3 production-shaped guardrails.

### Consultancy delivery mirror (strategy through leverage)

These labs mirror a typical client journey: where AI creates value, bespoke tools with strong context, integration into daily operations, and fast prototypes that later harden for production. Archetypes echo common industry patterns such as operational plus domain RAG, qualitative research at scale, and digitized regulated workflows, without copying any proprietary engagement.

| Service lens | Archetype | Project | Stack | First milestone | Lv |
|--------------|-----------|---------|-------|-----------------|-----|
| 01 AI strategy | Value map | AI opportunity matrix for one vertical | Spreadsheet or lightweight app, rubric for data readiness, risk tier, rough ROI band | Ten use cases ranked; top three have explicit data sources and owners | L1 |
| 01 AI strategy | Stakeholder synthesis | Discovery notes to decision memo | LLM summarization with strict outline; human edits tracked in Git or Notion history | One-page memo with assumptions flagged and kill criteria for pilot | L1 |
| 02 AI development | Ops plus domain RAG | ERP-like tables plus unstructured domain playbooks | S3 CSV plus PDFs, chunking that preserves row keys, pgvector or OpenSearch, citations in output schema | Answer cites both a row id and a document span for the same user question | L3 |
| 02 AI development | Qual insight extraction | Interview chunks to framework-aligned JSON | DSPy signatures matching a versioned JSON schema, reviewer queue in Streamlit or Retool | Twenty gold segments; measure schema validity plus human agreement on labels | L3 |
| 02 AI development | Context engineering product | Versioned system prompts, tools, and eval in CI | Git-based prompt packs, pytest or DSPy Evaluate on fixed devset, artifact to S3 | PR fails if faithfulness metric regresses beyond threshold | L2 |
| 03 AI implementation | Regulated workflow digitization | Loan-style state machine from intake to repayment | API Gateway, Lambda, DynamoDB status transitions, audit trail stream to S3, CloudWatch stage timers | Happy path plus one rejection path with immutable audit event | L3 |
| 03 AI implementation | Adoption surface | Slack or Teams slash command to grounded assistant | Bolt-on OAuth stub, session scoped to org, responses logged with trace id | Pilot group of three users; weekly error budget dashboard | L2 |
| 03 AI implementation | Shadow rollout | Dual path compare legacy vs AI assist | Feature flag, same inputs mirrored to both paths, diff latency and escalation rate | Two-week report with sample diffs reviewed by you | L2 |
| 04 AI tool leveraging | Prototype to handoff spec | Same story in n8n then in IaC | n8n graph for demo day, companion Markdown spec for Lambda, queues, and IAM | Checklist signed by you: idempotency, DLQ, secrets, alarms | L2 |
| 04 AI tool leveraging | Rapid client demo | Form to grounded brief in under a day | Vercel or API Gateway, Bedrock or OpenAI, hard token budget, PDF or email output | Cost alarm in CloudWatch or provider dashboard before sharing externally | L2 |

### How to talk about these on a client call

Tie each lab to business language: risk reduction, time to insight, auditability, and change management. For RAG, lead with grounded answers over model size. For extraction pipelines, lead with schema alignment and reviewer throughput. For workflow digitization, lead with stage-time metrics and field-team friction removed.

If asked for references, describe your own build and metrics, not the client’s unpublished work.

### AWS plus DSPy (systems, not prompts)

DSPy is a declarative framework for modular LLM programs: signatures, composed modules, and optimizers so you iterate in code instead of brittle prompt strings. Official tutorials include RAG patterns.

| Project | You will own | Stack | First milestone | Lv |
|---------|--------------|-------|-----------------|-----|
| DSPy RAG on your PDFs in AWS | Retrieval boundary, small devset, one metric before tuning | S3, Lambda or Fargate, Amazon OpenSearch Serverless or RDS pgvector, DSPy signatures plus retriever module | Ten-chunk corpus, baseline answer_exact_match or LLM-as-judge rubric, then MIPROv2 or BootstrapFewShot on a fixed eval set | L3 |
| Ticket classifier to structured JSON | Typed outputs and regression tests on labels | Lambda + API Gateway, DynamoDB for examples, DSPy Predict with constrained fields | 50 labeled tickets from public datasets or synthetic, export `dspy.save` artifact to S3 | L2 |
| Bedrock or OpenAI behind one DSPy program | Provider swap without rewriting business logic | DSPy `LM` configuration, Secrets Manager, CloudWatch structured logs | Same signature runs against two models; diff token cost in CloudWatch metric filter | L2 |

### RAG (retrieval as a product surface)

| Project | You will own | Stack | First milestone | Lv |
|---------|--------------|-------|-----------------|-----|
| Chunk-and-embed pipeline | Idempotent ingestion and bad-chunk detection | S3 event notification, SQS, Lambda, Titan or external embeddings, vector store | One bucket prefix, deterministic chunk IDs, replay from DLQ | L2 |
| RAG evaluation harness | Answer faithfulness vs latency tradeoffs | Python offline job, ragas or custom rubric, results in S3 as JSON lines | Twenty question gold set with citations required in output schema | L2 |
| Hybrid search micro-lab | Keyword plus vector recall | OpenSearch kNN plus text fields, or Postgres with tsvector and pgvector | Compare recall@k with and without BM25 side by side | L3 |

### MCP (Model Context Protocol)

MCP standardizes how assistants discover tools and context: one server process, typed capabilities, stdio or HTTP transport.

| Project | You will own | Stack | First milestone | Lv |
|---------|--------------|-------|-----------------|-----|
| Runbook plus metrics MCP server | Safe read-only tools with rate limits | TypeScript or Python MCP SDK, CloudWatch Logs Insights queries as tools, local stdio then SSE behind ALB | Three tools: list_recent_errors, get_trace_id, link_to_dashboard | L2 |
| Repo-aware doc search MCP | Context packaging for assistants | Clone small repo, tool `search_symbols`, tool `read_file_range`, Weaviate or Chroma local | Cursor or Claude Desktop connects; document one failure mode you handled | L2 |
| MCP to Lambda adapter | Bridging protocol to your AWS APIs | API Gateway HTTP API, Lambda authorizer, JSON-RPC mapping to internal REST | One tool maps to one Lambda; IAM least privilege per route | L3 |

### n8n (workflow automation, self-hostable)

n8n ships first-class nodes for AWS Lambda and S3 so you can orchestrate file and function workflows visually, then export JSON for review in PRs.

| Project | You will own | Stack | First milestone | Lv |
|---------|--------------|-------|-----------------|-----|
| S3 drop to Slack alert | Event shape discipline and retries | n8n S3 trigger or schedule, Lambda invoke node, Slack node | New object under `incoming/` posts thread with key and size only | L1 |
| PR webhook to triage labels | Low-code glue with an escape hatch to code | GitHub webhook, n8n Function node, HTTP to Lambda doing DSPy classify | Dry-run mode writes classification to Dynamo without mutating GitHub | L2 |
| n8n on EC2 or Docker with IAM role | No long-lived access keys on disk | EC2 instance profile or ECS task role, n8n credentials from Secrets Manager | Rotate keys via role assumption only; document in README | L2 |

### Zapier (SaaS glue, delegate heavy logic to Lambda)

Common pattern: Zapier catches a business trigger, then calls API Gateway to run Lambda for custom auth, transforms, or multi-AWS writes. At scale, providers isolate customer logic in many small Lambda functions with automated runtime upgrades, which is a useful mental model for platform engineering conversations.

| Project | You will own | Stack | First milestone | Lv |
|---------|--------------|-------|-----------------|-----|
| Form to AWS row | Idempotency keys and duplicate suppression | Typeform or Google Forms, Zapier, Webhooks by Zapier, API Gateway, Lambda, DynamoDB | Same submission twice yields one logical record | L2 |
| CRM note to S3 archive | Audit trail for non-technical teams | Zapier Salesforce or HubSpot trigger, Lambda writes canonical JSON to S3 with SSE-KMS | Object key includes external id and timestamp | L2 |
| Scheduled reconcile job | Cost awareness across two billing models | Zapier Schedule, Lambda pulls SaaS API pages, CloudWatch metric for duration and errors | Cap pages per run; alert if partial sync | L2 |

### More automation worth building (search-backed themes)

| Project | You will own | Stack | First milestone | Lv |
|---------|--------------|-------|-----------------|-----|
| GitHub Actions OIDC deploy to AWS | Keyless CI and least privilege deploy role | OIDC provider on IAM, GitHub environment, SAM or Terraform apply | One Lambda or static site published from main only | L2 |
| EventBridge bus fan-out | Domain events as contracts | Custom event bus, rules to SQS and Lambda, DLQ alarms | Schema registry or JSONSchema in repo for one event type | L2 |
| Step Functions human approval | Safe automation with explicit gates | Task Token wait for Slack approval callback, resume to Dynamo update | Happy path plus timeout path both tested | L3 |
| Windmill or Make as Zapier alternative | When to pick open vs SaaS orchestration | Self-host Windmill on a small VM or use Make scenario mirroring your n8n graph | Same business story implemented twice; compare ops burden | L2 |
| Browser E2E smoke after deploy | Post-deploy confidence without manual clicks | Playwright in GitHub Action after OIDC deploy, artifact traces to S3 | One critical path login and list load | L2 |

### Official and reference links

- [DSPy home](https://dspy.ai/) · [DSPy tutorials](https://dspy.ai/tutorials/)
- [MCP specification](https://modelcontextprotocol.io/)
- [n8n AWS Lambda](https://n8n.io/integrations/aws-lambda/) · [n8n AWS S3](https://n8n.io/integrations/s3/) · [n8n documentation](https://docs.n8n.io/)
- [Zapier on AWS Marketplace](https://zapier.com/blog/zapier-aws-marketplace/)
- [AWS Architecture: Zapier and Lambda at scale](https://aws.amazon.com/blogs/architecture/how-zapier-runs-isolated-tasks-on-aws-lambda-and-upgrades-functions-at-scale/)

This list synthesizes public documentation and architecture articles; verify service limits and pricing in your own account before demos.
