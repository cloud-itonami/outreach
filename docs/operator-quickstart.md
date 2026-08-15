# Operator quickstart

**What you can verify from this repository in one minute, what you cannot, and
one divergence worth knowing before you touch production.**

This repository is a *migration seed*: 16 tracked files extracted verbatim from
`etzhayyim/root` at `60-apps/etzhayyim-project-outreach` (see `migration.edn`
for the source revision and tree hash). The outreach business logic — the
LangGraph research→draft loop, the DNC gate, the Resend sends — **is not in this
repository**. What is here is the edge facade and its Svelte appview.

Every command below marked ✅ was run against this tree. Commands marked
⚠ NOT WALKED say why, rather than being presented as if they had been; a
quickstart whose steps have never been taken is a page, not a runbook.

---

## 1. The check that needs nothing installed ✅

Node strips TypeScript annotations, and the facade uses only `Request` and
`Response`, which are globals. So the handler runs directly — no `npm install`,
no wrangler, no network. Walked on Node v26.3.0, where the
`--experimental-strip-types` flag below is a no-op (stripping is on by default
from Node 23); keep it anyway, because it is required on 22.6–22.x:

```bash
cd appview/outreach-otch0001

cat > /tmp/walk.mjs <<'EOF'
const app = (await import(process.argv[2])).default;
for (const [label, req] of [
  ["GET /health", new Request("https://outreach.etzhayyim.com/health")],
  ["GET /nope  ", new Request("https://outreach.etzhayyim.com/nope")],
  ["bad json   ", new Request("https://outreach.etzhayyim.com/xrpc/com.etzhayyim.apps.outreach.createSequence",
                              { method: "POST", body: "{not json" })],
]) {
  const res = await app.fetch(req, {});
  console.log(label, "->", res.status, await res.text());
}
EOF

node --experimental-strip-types /tmp/walk.mjs "$PWD/src/app.ts"
```

Expected — these are the actual outputs, not a sketch:

```
GET /health -> 200 {"ok":true,"actor":"did:web:outreach.etzhayyim.com","nanoid":"otch0001",...}
GET /nope   -> 404 {"error":"NotFound","message":"outreach not found"}
bad json    -> 400 {"error":"InvalidJson"}
```

The third line is the one worth having. It proves the malformed-body guard runs
**before** the upstream call, which is why this check needs no network at all.

A `MODULE_TYPELESS_PACKAGE_JSON` warning on stderr is expected and harmless —
`src/` has no `package.json`, so Node re-parses as ESM after detecting module
syntax.

---

## 2. ⚠ The file you just ran is not the file that deploys

Verified against this tree on 2026-08-15:

| | `src/app.ts` | `svelte/src/routes/xrpc/[...path]/+server.ts` |
|---|---|---|
| Reached by `wrangler deploy`? | **no** | **yes** |
| Imported by anything here? | no — nothing references it | yes, by SvelteKit routing |
| `/health` endpoint | yes | **no route serves `/health`** |
| Upstream | `dispatcher.etzhayyim.com/xrpc/<nsid>` | `mcp.etzhayyim.com` as an MCP `tools/call` |
| Upstream configured in `wrangler.jsonc`? | no `DISPATCHER_URL` var exists | yes, `AGENTGATEWAY_MCP_ROUTER_URL` |
| Malformed JSON body | `400 InvalidJson` | `.catch(() => ({}))` — **the tool is called with `{}`** |

How to confirm the first row yourself:

```bash
# main points at the SvelteKit build output, not at src/
grep '"main"' appview/outreach-otch0001/wrangler.jsonc
#     "main": "svelte/.svelte-kit/cloudflare/_worker.js",

# and no route serves /health. -c prints a count per file, so read the zeros:
grep -rc health appview/outreach-otch0001/svelte/src/ ; echo "exit=$?"
#   appview/outreach-otch0001/svelte/src/app.html:0
#   appview/outreach-otch0001/svelte/src/routes/+page.svelte:0
#   appview/outreach-otch0001/svelte/src/routes/xrpc/[...path]/+server.ts:0
#   exit=1
```

Three files, zero matches in each, exit 1. Both commands are shown with their
real output including the noise, because a step whose printed output does not
match what happens teaches the reader to stop looking.

Two consequences for an operator:

- **Do not health-check this service at `/health`.** In production that path
  falls through to the SvelteKit 404. The endpoint exists only in the file that
  is not deployed, which is a worse situation than not having one, because
  reading the source suggests it is there.
- **A malformed request to production does not fail.** It reaches the MCP router
  with empty arguments. Whether that is acceptable is a question for whoever owns
  the tool contract; it is recorded here because nothing else records it.

This divergence is not resolved by this document. Which of the two handlers is
authoritative is a decision for the app's owner, and guessing would be worse
than naming it.

---

## 3. What you cannot do from this repository

- **Start the outreach worker.** `CLAUDE.md` says
  `cd 40-engine/kotoba/crates/kotoba-kotodama/py && python -m kotodama.outreach_worker_main`.
  That path is in the old monorepo and **does not exist here** — `git ls-files`
  returns 17 entries (the 16 extracted files plus this document) and there is no
  `40-engine/`. The instruction was correct where it was written and travelled
  unchanged through the extraction.
- **Call any `/xrpc/com.etzhayyim.apps.outreach.*` method end to end.** Both
  handlers proxy; neither implements. You need the live MCP router (or dispatcher)
  and its credentials.
- **Build or deploy the appview** ⚠ NOT WALKED. `svelte/package.json` declares
  `vite build` with SvelteKit and `@sveltejs/adapter-cloudflare`, and there is no
  lockfile or `node_modules` here, so a build needs a network install. It was not
  run while writing this, and is therefore not claimed to work. If you do run it,
  go through the repo-wide resource governor rather than invoking the build
  directly:

  ```bash
  node <root>/scripts/resource-guard.mjs run build -- npm --prefix appview/outreach-otch0001/svelte run build
  ```

---

## 4. Where the actual behaviour lives

From `src/app.ts` and `CLAUDE.md`, and not verifiable from here:

| Thing | Where |
|---|---|
| Actor DID | `did:web:outreach.etzhayyim.com`, nanoid `otch0001` |
| LangGraph loop | `kotodama/outreach_worker_main.py` in the kotoba engine |
| BPMN | `00-contracts/bpmn/com/etzhayyim/outreach/` in `etzhayyim/root` |
| State tables | `vertex_outreach_{prospect,sequence,step,dnc}`, `edge_outreach_sent` |
| Sends | Resend; reply detection via `gmail.message` and `m365Ingest.email` |

**Prospect email, title and company are PII Tier 3** (`sensitivity_ord=3`,
ADR-0018), and `vertex_outreach_dnc` is checked before every send step. Neither
constraint is enforced by anything in this repository — both live in the worker.

---

## 5. Before treating this as etzhayyim-aligned

`MIGRATION-TODO.md` carries **7 unchecked constitutional invariants** that its own
text says MUST be remediated first (substrate boundary, payment rails, DID-bound
identity, Charter Rider §2(a)-(h)). The ad-pixel/GA4 item is closed and verified;
the rest are open. The automated scan found no violations, but that scan's own
note says the classification came from the app's domain pattern rather than from
detected violations — so "no findings" there means "not detected", not "clean".
