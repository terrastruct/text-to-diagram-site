export default function SoftwareSchema() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Text to Diagram Tools Comparison",
    "description": "Comprehensive comparison of popular text-to-diagram tools for developers",
    "itemListElement": [
      {
        "@type": "SoftwareApplication",
        "position": 1,
        "name": "D2",
        "description": "Modern text-to-diagram language with simple, understandable syntax",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": ["Windows", "macOS", "Linux"],
        "url": "https://d2lang.com",
        "creator": {
          "@type": "Organization",
          "name": "Terrastruct"
        },
        "license": "https://opensource.org/licenses/MPL-2.0",
        "programmingLanguage": "Go"
      },
      {
        "@type": "SoftwareApplication",
        "position": 2,
        "name": "Mermaid",
        "description": "JavaScript-based diagramming and charting tool that renders markdown-inspired text definitions",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": ["Windows", "macOS", "Linux"],
        "url": "https://mermaid.js.org",
        "license": "https://opensource.org/licenses/MIT",
        "programmingLanguage": "JavaScript"
      },
      {
        "@type": "SoftwareApplication",
        "position": 3,
        "name": "PlantUML",
        "description": "Tool to draw UML diagrams using simple textual description",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": ["Windows", "macOS", "Linux"],
        "url": "https://plantuml.com",
        "license": "https://opensource.org/licenses/GPL-3.0",
        "programmingLanguage": "Java"
      },
      {
        "@type": "SoftwareApplication",
        "position": 4,
        "name": "Graphviz",
        "description": "Graph visualization software with DOT language for describing graphs",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": ["Windows", "macOS", "Linux"],
        "url": "https://graphviz.org",
        "license": "https://opensource.org/licenses/CPL-1.0",
        "programmingLanguage": "C"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
    />
  );
}