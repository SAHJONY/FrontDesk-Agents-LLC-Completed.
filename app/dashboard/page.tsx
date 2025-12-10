// Within a Feature section, after the text description
const CommandCenterFeature = () => {
  const imageSrc = '/premium/command-center-dark.jpg';
  
  return (
    <div className="py-20 bg-gray-900">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div>
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Total Control, Unprecedented Visibility.
          </h2>
          <p className="text-gray-400 text-lg mb-6">
            Access your AI Agent Command Center to view real-time call logs, monitor performance metrics, and adjust scripts instantly.
          </p>
          <ul className="text-gray-300 space-y-3">
            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Live Call Transcripts</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> ROI Tracking per Agent</li>
            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Drag-and-Drop Script Editor</li>
          </ul>
        </div>
        
        {/* Image Preview */}
        <div className="shadow-2xl rounded-xl overflow-hidden border border-gray-700">
          <Image
            src={imageSrc}
            alt="Command center dark"
            width={1600}
            height={900}
            className="w-full h-auto"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
};
