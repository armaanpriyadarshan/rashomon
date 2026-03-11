# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is Rashomon

A daily app where an AI learns how a specific person reasons. The user answers a few short questions each day. The AI tries to predict their answers. Over days and weeks, it builds a personal model of how the user thinks — their biases, values, decision-making patterns. The user watches the AI get better at predicting them and receives increasingly specific insights about their own reasoning.

Named after Akutagawa/Kurosawa — multiple subjective accounts of the same event, each shaped by the observer's psychology.

## Daily User Experience

User opens the app once a day. They see their streak count and the AI's running accuracy (e.g. "Day 34 — Rashomon has predicted you correctly 58% of the time").

They get one universal scenario (same for all users, enables population comparisons) plus 2-3 personalized follow-ups targeting where the AI's model of that user is most uncertain.

Each scenario is 2-4 sentences with 2-4 answer choices. Types: probability/base-rate, framing effects, moral judgment, strategic dilemmas (prisoner's dilemma variants), prediction questions (guess what most people picked yesterday).

Before answering, user can optionally see the AI's prediction. Whether they look is logged. If they change their answer after looking, that's also logged.

After answering: they see their pick, the AI's prediction, and global distribution. Starting ~day 7, they get a daily insight about their reasoning that gets more specific over time.

## The Model

Three components:

**Component 1 — Probabilistic Program**: Maintains an explicit, interpretable theory of how the user reasons. Represents the user as parameters with probability distributions (base-rate trust, framing sensitivity, cooperation level, intentions-vs-outcomes weighting). Starts as a population-level prior, updated via Bayesian inference each answer. Written in [memo](https://github.com/kach/memo). Produces the human-readable daily insights.

**Component 2 — Small Transformer** (4 layers, 4 heads, 128 dim): Sees raw history of scenario-answer pairs as a sequence, predicts next pick. No explicit theory — catches patterns the program misses: streaks, mood drift, reactions to being predicted, day-of-week effects, gradual value shifts. Pre-trained on synthetic data, fine-tuned nightly on real user data.

**Component 3 — Question Generator**: Uses program synthesis to create scenarios. Each night, finds where each user's model has highest uncertainty (widest parameter distributions), synthesizes scenarios where different hypotheses predict different answers, maximizing expected information gain. Universal daily question maximizes average info gain across all users. Personal follow-ups target individual uncertainties.

**Ensemble**: Probabilistic program predicts with a confidence score. Above threshold → use it. Below → use transformer. Threshold recalibrated nightly based on previous day's component accuracy.

## Wake-Sleep Cycle

**Wake** (user plays): Answers update Bayesian posterior over personal reasoning parameters. Everything logged.

**Sleep** (nightly, no user): Population-level prior hyperparameters refit via empirical Bayes across all posteriors. Transformer fine-tuned on day's new sequences. Ensemble threshold recalibrated. Tomorrow's questions generated.

**Monthly**: Poorly-predicted users analyzed. New seed programs encoding their patterns written and remixed via LLM into thousands of synthetic profiles. Transformer retrains on expanded dataset. Question generation space expands.

## Scenario Generation

Parameterized generator programs take parameters (base rate extremity, moral ambiguity, stake level) and output concrete scenarios with choices. Hand-written seed generators cover core types. LLM remixes seeds to produce new generators (following BARC paper methodology). Question selection picks parameters maximizing information gain about uncertain reasoning parameters.

## Data Collected Per User Per Day

User id, day number, streak count, scenario id, scenario type, answer, time to answer (ms), whether they viewed AI prediction, AI prediction, which component predicted (program/transformer), program confidence score, whether they changed answer after viewing prediction.

## Two-Player Mode (secondary)

Two users who both play can compare reasoning profiles, see agreements/disagreements, and try to predict each other's answers competing against the AI. Asynchronous — both answered the same universal daily scenario.

## Project Goals

1. Build a product people want to use daily that teaches them about their own reasoning.
2. Generate a novel dataset of per-person reasoning parameter trajectories, theory-of-mind traces, and active-learning traces.
3. Test whether combining probabilistic programs and transformers for modeling specific humans produces the same complementarity the BARC paper found for grid transformations.
4. Build a reusable human-modeling module — a system that learns how a specific person reasons from minimal interaction, useful for any AI system that needs to understand individual humans.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — Run ESLint
- `npm start` — Start production server

## Architecture

Next.js 16 app using the App Router with TypeScript, Tailwind CSS v4, and React 19. Uses `@/*` path alias mapped to the project root. Font: JetBrains Mono via `next/font/google`.

All routes live under `app/` using Next.js file-based routing conventions (`page.tsx`, `layout.tsx`).

## Design

Minimalist, parchment background (#faf8e1), dark foreground (#241e20), understated typography. JetBrains Mono extralight with wide tracking. The aesthetic is lethargic and quiet — nothing demands attention. Japanese woodblock print style background scene with mountains, water, and sun.
