# Operator quickstart

**What you can verify from this repository in one minute, what you cannot, and
one divergence worth knowing before you touch production.**

This repository is a *migration seed*: originally 16 tracked files extracted
verbatim from `etzhayyim/root` at `60-apps/etzhayyim-project-outreach` (see
`migration.edn` for the source revision and tree hash). The outreach business
logic — the LangGraph research→draft loop, the DNC gate, the Resend sends —
**is not in this repository**. What is here is the edge facade and its
appview UI.

**2026-09-05 update**: the appview UI was rewritten from SvelteKit
(`svelte/`, deleted) to ClojureScript + reagent on `appkit.core` +
`kotoba-ui.core` (top-level `src/cloud_itonami/outreach/*.cljs`, built by
shadow-cljs into `web/dist`, served via `wrangler.jsonc`'s `assets` binding).
That migration also **changed which handler `wrangler.jsonc`'s `main` points
at** — see §2, which this update does not soften: the divergence documented
below was real, the migration resolved it by deletion rather than by owner
decision, and the deleted handler is preserved-but-unwired rather than gone
so the choice can still be revisited.

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

cat > /tmp/walk.mjs <<'INNER_EOF'
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
INNER_EOF

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

## 2. ⚠ `src/app.ts` is now the file that deploys — it was not always the case

Verified against this tree on 2026-08-15, `src/app.ts` and the (now deleted)
SvelteKit route `svelte/src/routes/xrpc/[...path]/+server.ts` **diverged**:

| | `src/app.ts` | deleted SvelteKit route (preserved below) |
|---|---|---|
| Reached by `wrangler deploy` on 2026-08-15? | **no** | **yes** |
| Reached by `wrangler deploy` today (post 2026-09-05 migration)? | **yes** — `wrangler.jsonc` `main` now points here | **no** — file no longer exists in the deploy tree |
| `/health` endpoint | yes | no route served it |
| Upstream | `dispatcher.etzhayyim.com/xrpc/<nsid>` (or `env.DISPATCHER_URL`) | `mcp.etzhayyim.com` as an MCP `tools/call` (or `env.AGENTGATEWAY_MCP_ROUTER_URL`) |
| Upstream configured in `wrangler.jsonc` `vars` today? | **no** — no `DISPATCHER_URL` key exists, so production falls back to the hardcoded default | yes — `AGENTGATEWAY_MCP_ROUTER_URL` is still declared in `vars`, but nothing in the deployed code reads it anymore |
| Malformed JSON body | `400 InvalidJson` | `.catch(() => ({}))` — the tool was called with `{}` |

**What changed and how**: the 2026-09-05 Svelte→ClojureScript frontend
migration (commit that produced this file's current shape) deleted
`svelte/` wholesale — including this XRPC route, which was *not* frontend,
it was the production-authoritative backend handler per the row above — and
repointed `wrangler.jsonc`'s `main` at `src/app.ts`, the handler this
document had explicitly flagged as **not** reached by `wrangler deploy`.

**This was not a decision this document asked for lightly.** §2 (as originally
written, 2026-08-15) said: *"Which of the two handlers is authoritative is a
decision for the app's owner, and guessing would be worse than naming it."*
The migration resolved the divergence by deletion, not by a recorded owner
decision — there is no commit message, ADR, or note anywhere in this repo's
history explaining *why* `dispatcher.etzhayyim.com` (with no configured
`DISPATCHER_URL`/`DISPATCHER_INTERNAL_SECRET`) should now be authoritative
over `mcp.etzhayyim.com` (which *was* live and *was* configured).

The deleted route's exact source (byte-identical to what was live on
2026-08-15) is preserved, unwired, at
`appview/outreach-otch0001/src/xrpc-proxy.ts` — it will not run as-is (it
imports from `@sveltejs/kit`, which is gone from this repo's dependency
tree), but it is not lost. **Reviving it, keeping `src/app.ts` as
authoritative, or something else entirely remains an undecided product
question for the app's owner** — this document still does not decide it,
it now additionally records that the decision was made by omission rather
than by a name.

Two consequences for an operator, updated for the current tree:

- **`/health` is reachable today** (it was not on 2026-08-15) — but confirm
  this against a real `wrangler deploy`/`wrangler dev` before relying on it;
  §3 explains why that has still not been walked from this repository.
- **A malformed XRPC request now fails loudly** (`400 InvalidJson`) instead
  of silently reaching the MCP router with empty arguments. That is a
  behavior change in production request handling, not just in the frontend,
  and it happened as a side effect of a UI migration.

---

## 3. What you cannot do from this repository

- **Start the outreach worker.** `CLAUDE.md` says
  `cd 40-engine/kotoba/crates/kotoba-kotodama/py && python -m kotodama.outreach_worker_main`.
  That path is in the old monorepo and **does not exist here** — there is no
  `40-engine/`. The instruction was correct where it was written and travelled
  unchanged through the extraction.
- **Call any `/xrpc/com.etzhayyim.apps.outreach.*` method end to end.** Both
  handlers proxy; neither implements. You need the live MCP router (or
  dispatcher) and its credentials.
- **Build or deploy the appview** ⚠ NOT WALKED from this document (the
  migration commit's own message claims a successful
  `amu compile --target wasm32-browser app` run, but that is a claim from that commit,
  not something re-walked here). The build now needs `npm install` at the
  repo root (`deps.edn`'s `:cljs` alias + `package.json`'s `react`/`react-dom`),
  then shadow-cljs. Go through the repo-wide resource governor rather than
  invoking the build directly:

  ```bash
  node <root>/scripts/resource-guard.mjs run build -- amu compile --target wasm32-browser app
  ```

  `svelte/`, `vite build`, and `@sveltejs/adapter-cloudflare` no longer exist
  in this repository as of 2026-09-05 — do not follow older instructions that
  reference them.

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
