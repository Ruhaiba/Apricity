function AnalysisResult({ result, loading }) {
  if (loading) {
    return (
      <section className="result-card loading-card">
        <div className="loading-icon">✦</div>
        <h2>Apricity is analyzing...</h2>
        <p>
          Detecting language, understanding intent, and preparing a solution.
        </p>
      </section>
    );
  }

  if (!result) {
    return (
      <section className="result-card empty-result">
        <div className="empty-icon">◇</div>
        <h2>Apricity's Analysis</h2>
        <p>
          Your analysis will appear here once you submit your code.
        </p>
      </section>
    );
  }

  return (
    <section className="result-card">
      <div className="result-header">
        <div>
          <span className="section-label">
            APRICITY'S ANALYSIS
          </span>

          <span className="section-description">
            Classification and recommended solution
          </span>
        </div>

        <div className="badges">
          <span className="badge language-badge">
            {result.language}
          </span>

          <span className="badge intent-badge">
            {result.intent}
          </span>
        </div>
      </div>

      <div className="result-section">
        <h3>Suggested Solution</h3>

        <pre className="solution-code">
          <code>{result.code}</code>
        </pre>
      </div>

      <div className="result-section">
        <h3>What Changed</h3>

        <ul className="changes-list">
          {result.changes.map((change, index) => (
            <li key={index}>{change}</li>
          ))}
        </ul>
      </div>

      <div className="verification">
        <span className="verification-icon">✓</span>

        <div>
          <strong>{result.verification}</strong>
          <p>
            Solution passed the verification workflow.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AnalysisResult;