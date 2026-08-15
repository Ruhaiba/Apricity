function CodeEditor({
  code,
  setCode,
  language,
  setLanguage,
  onAnalyze,
  loading,
}) {
  return (
    <section className="editor-card">
      <div className="card-header">
        <div>
          <span className="section-label">YOUR CODE</span>
          <span className="section-description">
            Paste code or describe what you need
          </span>
        </div>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="language-select"
        >
          <option>Python</option>
          <option>JavaScript</option>
          <option>TypeScript</option>
          <option>Ruby</option>
          <option>PHP</option>
        </select>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="code-input"
        placeholder={`Paste your ${language} code here...`}
        spellCheck="false"
      />

      <div className="editor-footer">
        <span className="language-indicator">
          ● {language}
        </span>

        <button
          className="analyze-button"
          onClick={onAnalyze}
          disabled={loading || !code.trim()}
        >
          {loading ? "Analyzing..." : "✦ Analyze Code"}
        </button>
      </div>
    </section>
  );
}

export default CodeEditor;