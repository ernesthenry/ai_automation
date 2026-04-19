import type { TodoItem } from "cursor/canvas";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  H1,
  H2,
  Link,
  Pill,
  Row,
  Spacer,
  Stack,
  Stat,
  Table,
  Text,
  TodoListCard,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

const DEFAULT_PREP_TODOS: TodoItem[] = [
  {
    id: "site",
    content: "Skim pairsoftware.io: product, customers, tone (3 bullets)",
    status: "pending",
  },
  {
    id: "stories",
    content: "Memorize 3 stories: AutoDoc/MCP, multi-agent, RAG triage lesson",
    status: "pending",
  },
  {
    id: "scenarios",
    content: "Read MVP pipeline + service registry paragraphs out loud once",
    status: "pending",
  },
  {
    id: "gaps",
    content: "Prepare honest bridge: MySQL at scale, DSPy interest, AWS staging mental model",
    status: "pending",
  },
  {
    id: "questions",
    content: "Pick 4 questions from bottom section to ask them",
    status: "pending",
  },
];

export default function PairSoftwareAiAutomationPortfolio() {
  const { tokens: t } = useHostTheme();
  const [prepTodos, setPrepTodos] = useCanvasState<TodoItem[]>(
    "pair-prep-checklist",
    DEFAULT_PREP_TODOS
  );

  return (
    <Stack gap={24} style={{ maxWidth: 980, margin: "0 auto" }}>
      <Stack gap={8}>
        <H1>AI automation portfolio</H1>
        <Text tone="secondary">
          Interview prep for Pair Software: automation, microservices, AWS
          staging, and AI-assisted engineering. Map your shipped work to their
          problems before the call.
        </Text>
        <Row gap={8} wrap>
          <Pill>Kato Ernest Henry</Pill>
          <Pill>Senior AI / full stack</Pill>
          <Pill>BPOSeats, Headstarter, CIM</Pill>
        </Row>
      </Stack>

      <Grid columns={3} gap={16}>
        <Stat value="5+" label="Years shipping web + AI systems" />
        <Stat value="4" label="Agents in production content pipeline" />
        <Stat value="1" label="MCP + RAG stack you can describe end-to-end" />
      </Grid>

      <Card>
        <CardHeader trailing={<Pill tone="info">30 seconds</Pill>}>
          Elevator line
        </CardHeader>
        <CardBody>
          <Text>
            I build automation that turns code and tickets into reliable
            workflows: RAG and MCP for developer context, multi-agent pipelines
            with logging and cost controls, and microservice-style backends in
            TypeScript and Python. I am strongest where ambiguity meets
            shipping, I start with a thin vertical slice, hard guardrails, and
            observable metrics, then expand scope.
          </Text>
        </CardBody>
      </Card>

      <Stack gap={12}>
        <H2>Their focus to your proof</H2>
        <Text tone="secondary" size="small">
          Lead with outcomes, then name the stack. Tie every example to less
          manual work or safer change.
        </Text>
        <Table
          headers={["They want", "You point to", "Outcome to quote"]}
          rows={[
            [
              "Console auto-registers new microservices",
              "Microservices at BPOSeats, MCP server exposing semantic code search and tooling",
              "Less tribal knowledge; faster integration paths",
            ],
            [
              "Self-healing bugs: ingest, classify, fix, PR",
              "Multi-agent pipeline (Research to Publisher) + RAG accuracy lesson + QA on model output",
              "Human-in-loop automation; measurable quality gains you already cited",
            ],
            [
              "MVP to production on AWS",
              "Headstarter rapid deploys; CIM payment stack; disciplined staging mindset",
              "Ship fast, then harden: tests, observability, contracts",
            ],
            [
              "Automated QA, LLM-generated tests",
              "MCP for tests and quality analysis; prompt QA loops at BPOSeats",
              "Generated checks where valuable; never skip the safety net",
            ],
          ]}
        />
      </Stack>

      <Divider />

      <Grid columns="1fr 1fr" gap={16}>
        <Card>
          <CardHeader>Flagship story: AutoDoc and MCP</CardHeader>
          <CardBody>
            <Stack gap={10}>
              <Text>
                Problem: API docs and onboarding guides drifted from code;
                repeated questions burned engineering time.
              </Text>
              <Text>
                Ship: layered AutoDoc (OpenAPI from code, RAG-enhanced
                explanations, assistant-facing surface) plus MCP integration for
                self-documenting guides with Claude/OpenAI.
              </Text>
              <Text weight="medium">
                After: faster onboarding and fewer clarification loops; use the
                60 percent onboarding improvement only if you can defend it in
                detail.
              </Text>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>Flagship story: multi-agent production pipeline</CardHeader>
          <CardBody>
            <Stack gap={10}>
              <Text>
                Problem: manual content cycle across research, writing, review,
                publish.
              </Text>
              <Text>
                Ship: Crew-style handoffs with logging and cost or performance
                monitoring from day one.
              </Text>
              <Text weight="medium">
                Bridge to their bug system: same pattern as issue ingest,
                classify, tool-augmented fix, verify, open PR, human merge.
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Card>
        <CardHeader>RAG and triage lesson (one sentence)</CardHeader>
        <CardBody>
          <Text>
            At BPOSeats the first retrieval step set the ceiling for everything
            downstream; I invested in chunking, embeddings, and evaluation
            before widening autonomy. That is the same discipline I would apply
            to ticket classification and code context retrieval for fixes.
          </Text>
        </CardBody>
      </Card>

      <Divider />

      <Stack gap={12}>
        <H2>If they steer to scenario (b): MVP to production</H2>
        <Text>
          I would treat the rough MVP as an asset, not a spec. Week one: freeze
          a minimal service boundary, add a Dockerfile and a single CI path that
          builds and runs tests on every push, and wire a staging deploy on AWS
          that mirrors production constraints. Week two: extract configuration,
          secrets, and feature flags; add structured logging, health checks, and a
          basic metrics dashboard; define API contracts the sales prototype
          implied but never wrote down. Early version looks boring on purpose: a
          repeatable pipeline and a green build, then incremental refactors
          behind tests. Only after that would I layer LLM-assisted test
          generation for edge cases the MVP skipped, always gated by the existing
          suite.
        </Text>
      </Stack>

      <Stack gap={12}>
        <H2>If they steer to scenario (c): service registry console</H2>
        <Text>
          I would start by inventorying how services already authenticate to AWS
          and how routes are exposed today, because the registry has to match
          reality, not an ideal diagram. An early version is a small control plane
          service plus a database table of service name, repo, owner, health
          URL, and OpenAPI or gRPC descriptor location, populated by a CI step
          that runs on merge to main. The console becomes read-only first so
          teams trust the index, then add write paths: scaffolded registration
          from a cookiecutter template and automatic verification that staging
          answers health checks before the entry goes live.
        </Text>
      </Stack>

      <Divider />

      <Stack gap={12}>
        <H2>AI direction (include DSPy)</H2>
        <Text>
          Pair mentioned DSPy. Position it as structured prompt and pipeline
          optimization over ad hoc strings: declarative modules, evaluation
          loops, composure with retrieval and tools. Your near-term experiments
          fit: multi-agent orchestration with CrewAI and LangChain, MCP as a
          stable context boundary for assistants. Two-year view: more end-to-end
          agentic subtasks with humans on architecture, risk review, and
          evaluation design, not on repetitive implementation.
        </Text>
      </Stack>

      <Card style={{ borderLeft: `3px solid ${t.accent.primary}` }}>
        <CardHeader>Gaps to address plainly</CardHeader>
        <CardBody>
          <Stack gap={8}>
            <Text>
              MySQL at their scale: highlight PostgreSQL, Sequelize, and data
              modeling discipline, then commit to learning their schemas and
              migration patterns in the first sprint.
            </Text>
            <Text>
              DSPy: honest curiosity plus a concrete plan (small benchmark task,
              compare baseline prompts to optimized programs, measure regression
              on a fixed eval set).
            </Text>
            <Text tone="secondary" size="small">
              Avoid overstating metrics in live conversation unless you can
              explain measurement method and baseline.
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Divider />

      <Stack gap={12}>
        <H2>Questions that signal fit</H2>
        <Stack gap={6}>
          <Text>
            How do you define done for a microservice before it leaves staging?
          </Text>
          <Text>What is the hardest part of service discovery today?</Text>
          <Text>
            Which incidents taught you the most about automation guardrails?
          </Text>
          <Text>
            How do you balance sales-led MVPs with long-term platform
            consistency?
          </Text>
        </Stack>
      </Stack>

      <TodoListCard
        defaultExpanded
        todos={prepTodos}
        onTodoClick={(todo) =>
          setPrepTodos((prev) =>
            prev.map((item) =>
              item.id === todo.id
                ? {
                    ...item,
                    status:
                      item.status === "completed" ? "pending" : "completed",
                  }
                : item
            )
          )
        }
      />

      <Row gap={12} align="center" style={{ paddingBottom: 16 }}>
        <Text size="small" tone="secondary">
          Profile links (keep visible in follow-ups):
        </Text>
        <Link href="https://www.linkedin.com/in/keh95/">LinkedIn</Link>
        <Text tone="tertiary">|</Text>
        <Link href="https://github.com/ernesthenry">GitHub</Link>
        <Spacer />
        <Text size="small" tone="tertiary">
          Tunga: align profile with AWS, microservices, automation, AI-assisted
          workflows.
        </Text>
      </Row>
    </Stack>
  );
}
