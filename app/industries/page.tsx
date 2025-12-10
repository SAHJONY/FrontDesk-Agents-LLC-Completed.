const IndustryCard = ({ industryKey, title, description }) => {
  // Example path for Construction
  const imagePath = `/premium/industries/${industryKey}.jpg`; 
  
  return (
    <div className="relative overflow-hidden rounded-xl shadow-2xl group cursor-pointer transform hover:scale-[1.02] transition duration-500">
      {/* Image as background */}
      <Image
        src={imagePath}
        alt={`${title} industry`}
        width={1600}
        height={900}
        className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
      />
      
      {/* Overlay and Text Content */}
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition duration-500 flex items-end p-6">
        <div>
          <h3 className="text-3xl font-bold text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-200 text-base">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

// Example usage in the Industries page:
const IndustriesPage = () => (
  <div className="grid md:grid-cols-3 gap-8 p-10">
    <IndustryCard 
      industryKey="construction" 
      title="Construction" 
      description="Automating site coordination and client inquiry routing."
    />
    <IndustryCard 
      industryKey="healthcare" 
      title="Healthcare" 
      description="Managing appointment scheduling and urgent triage calls."
    />
    {/* ... other cards using the 'medical', 'law', 'logistics' keys */}
  </div>
);
