import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  H1,
  H2,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  useHostTheme,
} from "cursor/canvas";

function StarBlock({
  label,
  children,
}: Readonly<{
  label: string;
  children: string;
}>) {
  const { tokens: t } = useHostTheme();
  return (
    <Stack gap={4}>
      <Text
        size="small"
        weight="semibold"
        style={{ color: t.accent.primary }}
      >
        {label}
      </Text>
      <Text>{children}</Text>
    </Stack>
  );
}

export default function PairSoftwareStarStories() {
  const { tokens: t } = useHostTheme();

  return (
    <Stack gap={22} style={{ maxWidth: 980, margin: "0 auto" }}>
      <Stack gap={8}>
        <H1>STAR stories</H1>
        <Text tone="secondary">
          Three rehearsed arcs for Pair Software: same facts as your CV, framed
          so you always land on Situation, Task, Action, Result. Speak each
          story in under 90 seconds unless they dig in.
        </Text>
        <Row gap={8} wrap>
          <Pill>BPOSeats</Pill>
          <Pill>Automation + AI</Pill>
        </Row>
      </Stack>

      <Grid columns={3} gap={14}>
        <Stat value="3" label="Stories below" />
        <Stat value="STAR" label="Structure every answer" />
        <Stat value="90s" label="Default time box" />
      </Grid>

      <Table
        headers={["Story", "Use when they ask about"]}
        rows={[
          [
            "AutoDoc + MCP",
            "Removing repetitive work, onboarding, internal platforms, developer tooling",
          ],
          [
            "Multi-agent pipeline",
            "Agentic workflows, self-healing or triage systems, guardrails, observability",
          ],
          [
            "RAG over documents / APIs",
            "Classification, retrieval quality, evaluation before scaling autonomy",
          ],
        ]}
      />

      <Divider />

      <H2>Story 1: AutoDoc and MCP</H2>
      <Card>
        <CardHeader trailing={<Pill tone="info">Docs + people</Pill>}>
          AutoDoc and MCP onboarding
        </CardHeader>
        <CardBody>
          <Stack gap={14}>
            <Grid columns="1fr 1fr" gap={16}>
              <StarBlock label="Situation">
                API documentation and onboarding knowledge lived in Slack and
                tribal memory. Django and DRF microservices changed often; OpenAPI
                drifted from real behavior, and new engineers waited on seniors
                for the same explanations.
              </StarBlock>
              <StarBlock label="Task">
                Make accurate API knowledge and codebase orientation available
                without a manual rewrite every sprint, and integrate with how
                teams already used AI assistants.
              </StarBlock>
            </Grid>
            <Grid columns="1fr 1fr" gap={16}>
              <StarBlock label="Action">
                Built AutoDoc in layers: derive OpenAPI from routes, types, and
                docstrings; run a RAG + LLM pass to enrich specs and support
                natural language questions; ship an assistant-friendly surface.
                Extended with MCP so Claude and OpenAI could pull repo context to
                generate onboarding guides and explanations tied to real code.
              </StarBlock>
              <StarBlock label="Result">
                Fewer back-and-forth questions between frontend and backend,
                faster time to first meaningful contribution for new hires. If
                you mention a percentage improvement, pair it with how you
                measured it (e.g., survey, time to first PR, ticket volume).
              </StarBlock>
            </Grid>
            <div
              style={{
                borderTop: `1px solid ${t.stroke.tertiary}`,
                paddingTop: 12,
              }}
            >
              <Text size="small" weight="semibold">
                Say first (15 seconds)
              </Text>
              <Text size="small" tone="secondary">
                We had the classic docs debt problem at microservice speed. I
                automated the boring parts, code to spec to assistant context,
                so humans stopped repeating themselves.
              </Text>
            </div>
          </Stack>
        </CardBody>
      </Card>

      <H2>Story 2: Multi-agent content pipeline</H2>
      <Card>
        <CardHeader trailing={<Pill tone="info">Agents + ops</Pill>}>
          Researcher to Publisher
        </CardHeader>
        <CardBody>
          <Stack gap={14}>
            <Grid columns="1fr 1fr" gap={16}>
              <StarBlock label="Situation">
                Technical content went through a heavy manual chain: research,
                draft, edit, proof, publish, with inconsistent quality and long
                cycle times.
              </StarBlock>
              <StarBlock label="Task">
                Automate the pipeline end to end while keeping quality and cost
                predictable, not a black box that teams distrust.
              </StarBlock>
            </Grid>
            <Grid columns="1fr 1fr" gap={16}>
              <StarBlock label="Action">
                Designed a production multi-agent flow with explicit roles,
                Researcher, Writer, Proofreader, Publisher, structured handoffs,
                logging, and cost or performance monitoring from the first
                deploy. Humans stayed in the loop where decisions were
                consequential.
              </StarBlock>
              <StarBlock label="Result">
                Shorter content cycle and more consistent output; the
                architecture maps directly to bug triage, fix generation, test
                run, and PR for a self-healing system they described.
              </StarBlock>
            </Grid>
            <div
              style={{
                borderTop: `1px solid ${t.stroke.tertiary}`,
                paddingTop: 12,
              }}
            >
              <Text size="small" weight="semibold">
                Say first (15 seconds)
              </Text>
              <Text size="small" tone="secondary">
                I treat agent systems like services: contracts between steps,
                observability, and kill switches. This pipeline was my template
                for trustworthy automation.
              </Text>
            </div>
          </Stack>
        </CardBody>
      </Card>

      <H2>Story 3: RAG system over large corpora</H2>
      <Card>
        <CardHeader trailing={<Pill tone="info">Quality first</Pill>}>
          Mistral, embeddings, Weaviate
        </CardHeader>
        <CardBody>
          <Stack gap={14}>
            <Grid columns="1fr 1fr" gap={16}>
              <StarBlock label="Situation">
                The business needed semantic search and grounded answers over a
                large document corpus; naive chunking and generic prompts gave
                weak retrieval and hallucination risk.
              </StarBlock>
              <StarBlock label="Task">
                Improve retrieval accuracy and response consistency so downstream
                product and QA could trust the system.
              </StarBlock>
            </Grid>
            <Grid columns="1fr 1fr" gap={16}>
              <StarBlock label="Action">
                Implemented a RAG stack with Mistral 7B, HuggingFace embeddings,
                and Weaviate; tuned chunking and prompt templates; ran QA passes
                on model output and iterated on prompts and retrieval parameters.
              </StarBlock>
              <StarBlock label="Result">
                Better-grounded answers and higher trust in automation; the
                lesson you stress in interview: the first retrieval step sets the
                ceiling, so you evaluate before widening scope, same mindset as
                classifying issues before auto-fix.
              </StarBlock>
            </Grid>
            <div
              style={{
                borderTop: `1px solid ${t.stroke.tertiary}`,
                paddingTop: 12,
              }}
            >
              <Text size="small" weight="semibold">
                Say first (15 seconds)
              </Text>
              <Text size="small" tone="secondary">
                I did not optimize the prettiest demo; I optimized the retrieval
                boundary. Everything downstream, including any auto-fix agent,
                only works if step one is measured and solid.
              </Text>
            </div>
          </Stack>
        </CardBody>
      </Card>

      <Divider />

      <Stack gap={8}>
        <H2>60-second flow (if they stay high level)</H2>
        <Text tone="secondary" size="small">
          One sentence each, in order.
        </Text>
        <Text>
          I have shipped three kinds of automation they care about: docs and
          onboarding tied to real code through AutoDoc and MCP; multi-agent
          pipelines with logging and cost controls that mirror a self-healing bug
          loop; and RAG where I proved quality at the retrieval layer before
          expanding autonomy. I default to thin vertical slices with clear paths,
          tests, and observability, then add LLMs where they multiply leverage, not
          where they replace judgment.
        </Text>
      </Stack>
    </Stack>
  );
}
