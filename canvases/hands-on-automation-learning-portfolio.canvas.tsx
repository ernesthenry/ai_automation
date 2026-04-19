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
  Stack,
  Stat,
  Table,
  Text,
  useHostTheme,
} from "cursor/canvas";

export default function HandsOnAutomationLearningPortfolio() {
  const { tokens: t } = useHostTheme();

  return (
    <Stack gap={22} style={{ maxWidth: 1080, margin: "0 auto" }}>
      <Stack gap={8}>
        <H1>Hands-on automation learning portfolio</H1>
        <Text tone="secondary">
          Curated build ideas so you can speak confidently about AWS, DSPy,
          RAG, MCP, n8n, and Zapier-style bridging. Pick two or three before
          your interview, ship a thin vertical slice, and keep notes on what
          broke and how you measured quality.
        </Text>
        <Row gap={8} wrap>
          <Pill>Pair-style themes</Pill>
          <Pill>No production claims without metrics</Pill>
        </Row>
      </Stack>

      <Grid columns={4} gap={14}>
        <Stat value="22+" label="Project ideas below" />
        <Stat value="2 to 3" label="Build before the call" />
        <Stat value="1 week" label="Per thin slice target" />
        <Stat value="Eval first" label="DSPy and RAG habit" />
      </Grid>

      <Card>
        <CardHeader>How to use this list</CardHeader>
        <CardBody>
          <Stack gap={8}>
            <Text>
              Each row is a self-contained lab, not a startup. Goal is muscle
              memory: IAM boundaries, one observable metric, one rollback path.
              Official references are linked at the bottom; n8n documents AWS
              Lambda and S3 nodes for workflow automation, and industry writeups
              describe Zapier-style handoff from SaaS triggers to Lambda.
            </Text>
            <Text tone="secondary" size="small">
              Difficulty: L1 quick script, L2 multi-service, L3 production-shaped
              guardrails.
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Divider />

      <H2>Consultancy delivery mirror (strategy through leverage)</H2>
      <Text tone="secondary" size="small">
        These labs mirror a typical client journey: where AI creates value,
        bespoke tools with strong context, integration into daily operations,
        and fast prototypes that later harden for production. Archetypes echo
        common industry patterns such as operational plus domain RAG, qualitative
        research at scale, and digitized regulated workflows, without copying
        any proprietary engagement.
      </Text>

      <Table
        headers={[
          "Service lens",
          "Archetype",
          "Project",
          "Stack",
          "First milestone",
          "Lv",
        ]}
        rows={[
          [
            "01 AI strategy",
            "Value map",
            "AI opportunity matrix for one vertical",
            "Spreadsheet or lightweight app, rubric for data readiness, risk tier, rough ROI band",
            "Ten use cases ranked; top three have explicit data sources and owners",
            "L1",
          ],
          [
            "01 AI strategy",
            "Stakeholder synthesis",
            "Discovery notes to decision memo",
            "LLM summarization with strict outline; human edits tracked in Git or Notion history",
            "One-page memo with assumptions flagged and kill criteria for pilot",
            "L1",
          ],
          [
            "02 AI development",
            "Ops plus domain RAG",
            "ERP-like tables plus unstructured domain playbooks",
            "S3 CSV plus PDFs, chunking that preserves row keys, pgvector or OpenSearch, citations in output schema",
            "Answer cites both a row id and a document span for the same user question",
            "L3",
          ],
          [
            "02 AI development",
            "Qual insight extraction",
            "Interview chunks to framework-aligned JSON",
            "DSPy signatures matching a versioned JSON schema, reviewer queue in Streamlit or Retool",
            "Twenty gold segments; measure schema validity plus human agreement on labels",
            "L3",
          ],
          [
            "02 AI development",
            "Context engineering product",
            "Versioned system prompts, tools, and eval in CI",
            "Git-based prompt packs, pytest or DSPy Evaluate on fixed devset, artifact to S3",
            "PR fails if faithfulness metric regresses beyond threshold",
            "L2",
          ],
          [
            "03 AI implementation",
            "Regulated workflow digitization",
            "Loan-style state machine from intake to repayment",
            "API Gateway, Lambda, DynamoDB status transitions, audit trail stream to S3, CloudWatch stage timers",
            "Happy path plus one rejection path with immutable audit event",
            "L3",
          ],
          [
            "03 AI implementation",
            "Adoption surface",
            "Slack or Teams slash command to grounded assistant",
            "Bolt-on OAuth stub, session scoped to org, responses logged with trace id",
            "Pilot group of three users; weekly error budget dashboard",
            "L2",
          ],
          [
            "03 AI implementation",
            "Shadow rollout",
            "Dual path compare legacy vs AI assist",
            "Feature flag, same inputs mirrored to both paths, diff latency and escalation rate",
            "Two-week report with sample diffs reviewed by you",
            "L2",
          ],
          [
            "04 AI tool leveraging",
            "Prototype to handoff spec",
            "Same story in n8n then in IaC",
            "n8n graph for demo day, companion Markdown spec for Lambda, queues, and IAM",
            "Checklist signed by you: idempotency, DLQ, secrets, alarms",
            "L2",
          ],
          [
            "04 AI tool leveraging",
            "Rapid client demo",
            "Form to grounded brief in under a day",
            "Vercel or API Gateway, Bedrock or OpenAI, hard token budget, PDF or email output",
            "Cost alarm in CloudWatch or provider dashboard before sharing externally",
            "L2",
          ],
        ]}
      />

      <Card>
        <CardHeader>How to talk about these on a client call</CardHeader>
        <CardBody>
          <Stack gap={8}>
            <Text>
              Tie each lab to business language: risk reduction, time to insight,
              auditability, and change management. For RAG, lead with grounded
              answers over model size. For extraction pipelines, lead with schema
              alignment and reviewer throughput. For workflow digitization, lead
              with stage-time metrics and field-team friction removed.
            </Text>
            <Text tone="secondary" size="small">
              If asked for references, describe your own build and metrics, not
              the client’s unpublished work.
            </Text>
          </Stack>
        </CardBody>
      </Card>

      <Divider />

      <H2>AWS plus DSPy (systems, not prompts)</H2>
      <Text tone="secondary" size="small">
        DSPy is a declarative framework for modular LLM programs: signatures,
        composed modules, and optimizers so you iterate in code instead of
        brittle prompt strings. Official tutorials include RAG patterns.
      </Text>
      <Table
        headers={[
          "Project",
          "You will own",
          "Stack",
          "First milestone",
          "Lv",
        ]}
        rows={[
          [
            "DSPy RAG on your PDFs in AWS",
            "Retrieval boundary, small devset, one metric before tuning",
            "S3, Lambda or Fargate, Amazon OpenSearch Serverless or RDS pgvector, DSPy signatures plus retriever module",
            "Ten-chunk corpus, baseline answer_exact_match or LLM-as-judge rubric, then MIPROv2 or BootstrapFewShot on a fixed eval set",
            "L3",
          ],
          [
            "Ticket classifier to structured JSON",
            "Typed outputs and regression tests on labels",
            "Lambda + API Gateway, DynamoDB for examples, DSPy Predict with constrained fields",
            "50 labeled tickets from public datasets or synthetic, export `dspy.save` artifact to S3",
            "L2",
          ],
          [
            "Bedrock or OpenAI behind one DSPy program",
            "Provider swap without rewriting business logic",
            "DSPy `LM` configuration, Secrets Manager, CloudWatch structured logs",
            "Same signature runs against two models; diff token cost in CloudWatch metric filter",
            "L2",
          ],
        ]}
      />

      <Divider />

      <H2>RAG (retrieval as a product surface)</H2>
      <Table
        headers={["Project", "You will own", "Stack", "First milestone", "Lv"]}
        rows={[
          [
            "Chunk-and-embed pipeline",
            "Idempotent ingestion and bad-chunk detection",
            "S3 event notification, SQS, Lambda, Titan or external embeddings, vector store",
            "One bucket prefix, deterministic chunk IDs, replay from DLQ",
            "L2",
          ],
          [
            "RAG evaluation harness",
            "Answer faithfulness vs latency tradeoffs",
            "Python offline job, ragas or custom rubric, results in S3 as JSON lines",
            "Twenty question gold set with citations required in output schema",
            "L2",
          ],
          [
            "Hybrid search micro-lab",
            "Keyword plus vector recall",
            "OpenSearch kNN plus text fields, or Postgres with tsvector and pgvector",
            "Compare recall@k with and without BM25 side by side",
            "L3",
          ],
        ]}
      />

      <Divider />

      <H2>MCP (Model Context Protocol)</H2>
      <Text tone="secondary" size="small">
        MCP standardizes how assistants discover tools and context: one server
        process, typed capabilities, stdio or HTTP transport.
      </Text>
      <Table
        headers={["Project", "You will own", "Stack", "First milestone", "Lv"]}
        rows={[
          [
            "Runbook plus metrics MCP server",
            "Safe read-only tools with rate limits",
            "TypeScript or Python MCP SDK, CloudWatch Logs Insights queries as tools, local stdio then SSE behind ALB",
            "Three tools: list_recent_errors, get_trace_id, link_to_dashboard",
            "L2",
          ],
          [
            "Repo-aware doc search MCP",
            "Context packaging for assistants",
            "Clone small repo, tool `search_symbols`, tool `read_file_range`, Weaviate or Chroma local",
            "Cursor or Claude Desktop connects; document one failure mode you handled",
            "L2",
          ],
          [
            "MCP to Lambda adapter",
            "Bridging protocol to your AWS APIs",
            "API Gateway HTTP API, Lambda authorizer, JSON-RPC mapping to internal REST",
            "One tool maps to one Lambda; IAM least privilege per route",
            "L3",
          ],
        ]}
      />

      <Divider />

      <H2>n8n (workflow automation, self-hostable)</H2>
      <Text tone="secondary" size="small">
        n8n ships first-class nodes for AWS Lambda and S3 so you can orchestrate
        file and function workflows visually, then export JSON for review in PRs.
      </Text>
      <Table
        headers={["Project", "You will own", "Stack", "First milestone", "Lv"]}
        rows={[
          [
            "S3 drop to Slack alert",
            "Event shape discipline and retries",
            "n8n S3 trigger or schedule, Lambda invoke node, Slack node",
            "New object under `incoming/` posts thread with key and size only",
            "L1",
          ],
          [
            "PR webhook to triage labels",
            "Low-code glue with an escape hatch to code",
            "GitHub webhook, n8n Function node, HTTP to Lambda doing DSPy classify",
            "Dry-run mode writes classification to Dynamo without mutating GitHub",
            "L2",
          ],
          [
            "n8n on EC2 or Docker with IAM role",
            "No long-lived access keys on disk",
            "EC2 instance profile or ECS task role, n8n credentials from Secrets Manager",
            "Rotate keys via role assumption only; document in README",
            "L2",
          ],
        ]}
      />

      <Divider />

      <H2>Zapier (SaaS glue, delegate heavy logic to Lambda)</H2>
      <Text tone="secondary" size="small">
        Common pattern: Zapier catches a business trigger, then calls API Gateway
        to run Lambda for custom auth, transforms, or multi-AWS writes. At scale,
        providers isolate customer logic in many small Lambda functions with
        automated runtime upgrades, which is a useful mental model for platform
        engineering conversations.
      </Text>
      <Table
        headers={["Project", "You will own", "Stack", "First milestone", "Lv"]}
        rows={[
          [
            "Form to AWS row",
            "Idempotency keys and duplicate suppression",
            "Typeform or Google Forms, Zapier, Webhooks by Zapier, API Gateway, Lambda, DynamoDB",
            "Same submission twice yields one logical record",
            "L2",
          ],
          [
            "CRM note to S3 archive",
            "Audit trail for non-technical teams",
            "Zapier Salesforce or HubSpot trigger, Lambda writes canonical JSON to S3 with SSE-KMS",
            "Object key includes external id and timestamp",
            "L2",
          ],
          [
            "Scheduled reconcile job",
            "Cost awareness across two billing models",
            "Zapier Schedule, Lambda pulls SaaS API pages, CloudWatch metric for duration and errors",
            "Cap pages per run; alert if partial sync",
            "L2",
          ],
        ]}
      />

      <Divider />

      <H2>More automation worth building (search-backed themes)</H2>
      <Table
        headers={["Project", "You will own", "Stack", "First milestone", "Lv"]}
        rows={[
          [
            "GitHub Actions OIDC deploy to AWS",
            "Keyless CI and least privilege deploy role",
            "OIDC provider on IAM, GitHub environment, SAM or Terraform apply",
            "One Lambda or static site published from main only",
            "L2",
          ],
          [
            "EventBridge bus fan-out",
            "Domain events as contracts",
            "Custom event bus, rules to SQS and Lambda, DLQ alarms",
            "Schema registry or JSONSchema in repo for one event type",
            "L2",
          ],
          [
            "Step Functions human approval",
            "Safe automation with explicit gates",
            "Task Token wait for Slack approval callback, resume to Dynamo update",
            "Happy path plus timeout path both tested",
            "L3",
          ],
          [
            "Windmill or Make as Zapier alternative",
            "When to pick open vs SaaS orchestration",
            "Self-host Windmill on a small VM or use Make scenario mirroring your n8n graph",
            "Same business story implemented twice; compare ops burden",
            "L2",
          ],
          [
            "Browser E2E smoke after deploy",
            "Post-deploy confidence without manual clicks",
            "Playwright in GitHub Action after OIDC deploy, artifact traces to S3",
            "One critical path login and list load",
            "L2",
          ],
        ]}
      />

      <Divider />

      <Card style={{ background: t.fill.secondary }}>
        <CardHeader>Official and reference links</CardHeader>
        <CardBody>
          <Stack gap={6}>
            <Row gap={12} wrap>
              <Link href="https://dspy.ai/">DSPy home</Link>
              <Link href="https://dspy.ai/tutorials/">DSPy tutorials</Link>
              <Link href="https://modelcontextprotocol.io/">MCP specification</Link>
            </Row>
            <Row gap={12} wrap>
              <Link href="https://n8n.io/integrations/aws-lambda/">n8n AWS Lambda</Link>
              <Link href="https://n8n.io/integrations/s3/">n8n AWS S3</Link>
              <Link href="https://docs.n8n.io/">n8n documentation</Link>
            </Row>
            <Row gap={12} wrap>
              <Link href="https://zapier.com/blog/zapier-aws-marketplace/">
                Zapier on AWS Marketplace
              </Link>
              <Link href="https://aws.amazon.com/blogs/architecture/how-zapier-runs-isolated-tasks-on-aws-lambda-and-upgrades-functions-at-scale/">
                AWS Architecture: Zapier and Lambda at scale
              </Link>
            </Row>
          </Stack>
        </CardBody>
      </Card>

      <Text size="small" tone="tertiary">
        This list synthesizes public documentation and architecture articles;
        verify service limits and pricing in your own account before demos.
      </Text>
    </Stack>
  );
}
