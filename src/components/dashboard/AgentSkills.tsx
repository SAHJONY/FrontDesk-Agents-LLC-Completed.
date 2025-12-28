const AgentSkills = () => {
  const skills = [
    { name: "Draft Emails", icon: "✉️", desc: "Replies based on Vault knowledge" },
    { name: "Project Revenue", icon: "📈", desc: "Forecasts based on call volume" },
    { name: "Create Postings", icon: "📝", desc: "Writes job ads for your local market" }
  ];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Assign Routine Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <button key={skill.name} className="p-4 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-all text-left">
            <span className="text-2xl">{skill.icon}</span>
            <h4 className="font-semibold mt-2">{skill.name}</h4>
            <p className="text-xs text-slate-500">{skill.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
