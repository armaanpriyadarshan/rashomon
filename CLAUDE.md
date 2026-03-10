# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is Rashomon

A two-player reasoning game about the limits of understanding other minds. Two players answer the same questions — probability puzzles, causal dilemmas, pattern judgments — the kind where reasonable people diverge in ways that reveal how they think. An AI observes both players and builds a model of each player's reasoning. In the second round, players try to predict each other's answers, competing against the AI's predictions. The reveal shows who understood whom better: the humans or the machine.

At the end, the AI produces a reasoning portrait for each player — not self-reported personality, but an inferred description of how they actually weighted evidence, where their intuitions diverged from probability theory, and what kind of thinker they are when not performing.

Named after Kurosawa: the same event witnessed by different minds yields irreconcilably different accounts, not from dishonesty but because perception is a model, never a mirror.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — Run ESLint
- `npm start` — Start production server

## Architecture

Next.js 16 app using the App Router with TypeScript, Tailwind CSS v4, and React 19. Uses `@/*` path alias mapped to the project root. Font: JetBrains Mono via `next/font/google`.

All routes live under `app/` using Next.js file-based routing conventions (`page.tsx`, `layout.tsx`).

## Design

Minimalist, dark (black background), understated typography. JetBrains Mono extralight with wide tracking. The aesthetic is lethargic and quiet — nothing demands attention.
