function ResultsPage({ data, userProfile }) {
  if (!userProfile) return <p className="text-red-500">No profile data available. Please go back and submit the form.</p>;

  const { pathways, recommendations } = data;
  const primaryPathId = recommendations.primary_path.toLowerCase().replace(' ', '_').replace(/\(.*\)/, '');
  const fallbackPath = pathways.find(p => p.id === primaryPathId) || pathways[0];

  // Matching logic based on user goals
  const getBestPath = () => {
    const salaryTarget = parseInt(userProfile.goals.salary_target.replace(/\D/g, '')) || 100000;
    const prefersRemote = userProfile.goals.work_preference.toLowerCase().includes('remote') || userProfile.goals.work_preference.toLowerCase().includes('hybrid');
    const openToTech = userProfile.goals.career_pivot.toLowerCase().includes('tech') || userProfile.goals.career_pivot.toLowerCase().includes('it');

    if (salaryTarget >= 100000 && prefersRemote && openToTech) {
      return pathways.find(p => p.id === 'tech_track') || fallbackPath;
    } else if (userProfile.goals.career_pivot.toLowerCase().includes('construction')) {
      return pathways.find(p => p.id === 'construction_track') || fallbackPath;
    }
    return fallbackPath;
  };

  const bestPath = getBestPath();
  const alternativePaths = pathways.filter(p => p.id !== bestPath.id);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Recommended Career Path: {bestPath.focus}</h2>
      <p className="mb-6"><strong>Rationale:</strong> {recommendations.rationale}</p>
      
      <h3 className="text-xl font-semibold mb-4">Path Comparison</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">Path</th>
              <th className="border p-2 text-left">Salary Range (CA)</th>
              <th className="border p-2 text-left">Remote Availability</th>
              <th className="border p-2 text-left">Total Cost</th>
              <th className="border p-2 text-left">Duration</th>
            </tr>
          </thead>
          <tbody>
            {pathways.map(path => (
              <tr key={path.id} className={path.id === bestPath.id ? 'bg-blue-50' : ''}>
                <td className="border p-2">{path.focus}</td>
                <td className="border p-2">${path.outcomes.salary_ca.range[0].toLocaleString()} - ${path.outcomes.salary_ca.range[1].toLocaleString()} (Median: ${path.outcomes.salary_ca.median.toLocaleString()})</td>
                <td className="border p-2">{path.outcomes.remote_availability}</td>
                <td className="border p-2">${path.total_cost[0].toLocaleString()} - ${path.total_cost[1].toLocaleString()}</td>
                <td className="border p-2">{path.timeline.total_duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <h3 className="text-xl font-semibold mt-6 mb-4">Timeline for Recommended Path</h3>
      <ol className="list-decimal pl-6 space-y-2">
        {bestPath.timeline.breakdown.map((step, idx) => {
          const key = Object.keys(step)[0];
          return <li key={idx} className="text-gray-700">{key}: {step[key]}</li>;
        })}
      </ol>
      
      <h3 className="text-xl font-semibold mt-6 mb-4">Alternative Paths</h3>
      <ul className="list-disc pl-6 space-y-2">
        {alternativePaths.map(path => (
          <li key={path.id}>
            <strong>{path.focus}</strong>: {recommendations.alternative.split(';').find(alt => alt.trim().toLowerCase().includes(path.id.split('_')[0])) || 'Flexible option'}
          </li>
        ))}
      </ul>
      
      <h3 className="text-xl font-semibold mt-6 mb-4">Next Steps</h3>
      <ul className="list-disc pl-6 space-y-2">
        {recommendations.steps.map((step, idx) => (
          <li key={idx}>{step.action}</li>
        ))}
      </ul>
    </div>
  );
}

export default ResultsPage;
