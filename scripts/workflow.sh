#!/usr/bin/env bash
# workflow.sh — Run resume workflows from the command line
# Usage: npm run workflow [workflow-name]
#        npm run workflow:sync-all
#        npm run workflow:pdf
#        npm run workflow:check
#        npm run workflow:sync-personal
#        npm run workflow:sync-components

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

show_help() {
  echo ""
  echo "Available workflows:"
  echo ""
  echo "  sync-all         Full resume sync (components + PDF)"
  echo "  pdf              Convert resume.md to PDF"
  echo "  check            Dry-run: show pending changes"
  echo "  sync-personal    Sync name, title, email to components"
  echo "  sync-components  Sync experience + skills + hero"
  echo ""
  echo "Quick run:"
  echo "  npm run workflow <name>"
  echo "  npm run workflow:sync-all"
  echo ""
}

case "${1:-help}" in
  sync-all)
    echo "▶ Running: Full resume sync"
    cd "$ROOT" && npm run resume:sync-all
    ;;
  pdf)
    echo "▶ Running: Convert resume to PDF"
    cd "$ROOT" && npm run resume:build
    ;;
  check)
    echo "▶ Running: Check sync status"
    cd "$ROOT" && npm run resume:monitor
    ;;
  sync-personal)
    echo "▶ Running: Sync personal info"
    cd "$ROOT" && npm run resume:sync-personal
    ;;
  sync-components)
    echo "▶ Running: Sync components"
    cd "$ROOT" && npm run resume:sync-components
    ;;
  help|--help|-h|*)
    show_help
    ;;
esac
