---
{"publish":true,"permalink":"/CLAUDE.md","created":"2025-07-06","modified":"2025-08-01","cssclasses":""}
---


# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is oldwinter's digital garden - a personal knowledge management system built with Obsidian. It contains thousands of interconnected notes organized using the ACCESS method (Atlas, Calendar, Cards, Extras, Sources, Spaces).

## Architecture and Structure

### Core Organization System - ACCESS Method

The repository follows a hybrid note-taking approach based on the ACCESS organizational system:

- **Atlas/**: Meta-organization layer containing:
  - `Bases/`: Database-like collections for different content types (AI products, apps, GitHub stars, etc.)
    - `PARA/`: Projects, Areas, Resources, Archive organization system
    - Various `.base` files for specialized content management (todos, workflows, plugins, etc.)
  - `Canvas/`: Visual mind maps and diagrams using Obsidian Canvas
    - `candy/`: Canvas enhancement features and demos
    - Organized into themed subdirectories (workflows, keyboard layouts, software rankings, etc.)
  - `Components/`: Reusable UI components and scripts
  - `Draws/`: Excalidraw diagrams and visual assets
  - `MOCs/`: Maps of Content for topic organization
  - `Categories/`: Categorical organization of content
  - `Lineages/`: Linear note progression and development
- **Calendar/**: Time-based organization (daily notes, periodic reviews)
- **Cards/**: Atomic notes and concepts (the main content layer)
- **Extras/**: Supplementary materials and resources
- **Sources/**: External content references and citations
- **Spaces/**: Project-based organization following PARA method
- **TaskNotes/**: Dedicated task and project management notes
- **🍀 花园导览/**: Garden tour guide with main topic overviews
- **📥 Inbox/**: Temporary holding area for new notes

### Key Architectural Principles

1. **Link-First Approach**: Heavy use of `[[wikilinks]]` for bi-directional linking
2. **Atomic Notes**: Each note represents a single concept or idea
3. **Progressive Summarization**: Notes are iteratively refined over time
4. **Hybrid Organization**: Combines folder structure with tag-based and link-based organization, supplemented by PARA methodology
5. **Local-First Storage**: All content stored as plain Markdown files
6. **Multi-Modal Integration**: Supports various content types including canvas diagrams, excalidraw drawings, and database-like structures

### Content Types and Patterns

- **MOC (Maps of Content)**: Files starting with `∑` symbol for topic overviews
- **Workflow Documentation**: Files starting with `»` for process documentation
- **Section Headers**: Files starting with `§` for major topic sections
- **Inbox Items**: Temporary files in `📥 Inbox/` for processing
- **Canvas Files**: `.canvas` files for visual mind mapping and complex diagrams
- **Base Files**: `.base` files for database-like collections and structured data
- **Task Notes**: Project and task management files in `TaskNotes/`
- **Lineage Files**: Linear progression notes showing development of ideas
- **Component Files**: `.components` files for reusable UI elements

## Development Workflow

### File Management

- **No Build System**: This is a plain Markdown repository - no compilation needed
- **No Testing Framework**: Content-focused repository without automated tests
- **No Linting**: Uses natural language, not code

### Publishing System

The repository is published as a digital garden website using:

- Main site: `https://garden.oldwinter.top`
- Backup site: `https://notes.oldwinter.top`
- Source repository: `https://github.com/oldwinter/knowledge-garden`

### File Naming Conventions

- Use descriptive, human-readable filenames
- Special prefixes for organization:
  - `∑` for MOC files
  - `»` for workflow documentation
  - `§` for section headers
  - `_` for folder README files
- Avoid special characters that might break links
- Use spaces in filenames (handled by Obsidian)

## Content Management Guidelines

### Creating New Notes

1. Start with atomic concepts
2. Use descriptive titles
3. Add relevant tags and metadata
4. Create bidirectional links to related concepts
5. Consider which folder best fits the content type

### Linking Strategy

- Use `[[wikilinks]]` for internal references
- Create context-rich link previews
- Build connection webs between related concepts
- Use backlinks panel for discovering connections

### Metadata and Properties

- Use YAML frontmatter for metadata
- Include creation and modification dates
- Add relevant tags for categorization
- Use properties for structured data

## Key Tools and Integrations

### Obsidian Plugins

This repository relies heavily on Obsidian plugins for functionality:

- **Dataview**: For dynamic content queries and databases
- **Canvas**: For visual mind mapping and complex diagrams
- **Excalidraw**: For diagrams and drawings
- **Templater**: For note templates and automation
- **Various Complements**: For auto-completion
- **Quick Switcher**: For rapid navigation
- **File Explorer**: Enhanced file management
- **Advanced Tables**: Enhanced table editing
- **DB Folder**: Database-like folder management for .base files
- **Advanced Slides**: Presentation creation from markdown

### External Integrations

- **GitHub**: For version control and collaboration
- **Newsletter**: Content distribution via newsletter
- **Web Publishing**: Automated publishing pipeline
- **PARA System**: Projects, Areas, Resources, Archive methodology integration
- **Task Management**: Integration with various task management workflows

## Common Operations

### Searching and Navigation

- Use global search for content discovery
- Leverage backlinks for relationship exploration
- Use graph view for visual navigation
- Utilize MOC files for structured browsing
- Navigate between canvas diagrams for visual context
- Use base files for database-like queries and views

### Content Creation Workflow

1. Capture ideas in `📥 Inbox/`
2. Process and categorize into appropriate folders
3. Create atomic notes with clear titles
4. Link to related concepts
5. Add to relevant MOC files
6. Create visual representations in Canvas when beneficial
7. Update base files for structured data tracking
8. Review and refine over time

### Maintenance Tasks

- Regular inbox processing
- Link cleanup and optimization
- MOC updates and reorganization
- Tag standardization
- Content review and refinement
- Base file maintenance and updates
- Canvas diagram organization
- Task note review and archival

## Best Practices

1. **Respect the Link Structure**: Maintain bidirectional links when moving or renaming files
2. **Use Consistent Naming**: Follow established naming conventions
3. **Atomic Note Principle**: Keep notes focused on single concepts
4. **Progressive Enhancement**: Build upon existing content rather than creating duplicates
5. **Context Preservation**: Maintain enough context for future understanding
6. **Multi-Modal Thinking**: Use canvas diagrams for complex relationships and base files for structured data
7. **PARA Integration**: Leverage Projects, Areas, Resources, Archive methodology for organization

## Special Considerations

- This is a personal knowledge base with Chinese and English content
- Contains personal opinions and incomplete thoughts
- Focuses on AI/AIGC, productivity tools, health, and knowledge management
- Uses emoji prefixes for visual organization
- Maintains high interconnectedness between notes
- Incorporates PARA methodology alongside ACCESS organization
- Utilizes advanced Obsidian features including canvas, dataview, and database-like structures

## Publishing and Sharing

The repository is open source and published as a digital garden. When working with content:

- Respect the personal nature of the content
- Maintain the existing organization system
- Preserve the link structure and metadata
- Consider the bilingual nature of the content

## 最后

使用简体中文交流和沟通
