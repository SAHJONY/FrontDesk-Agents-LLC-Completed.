// app/industries/page.tsx (lines 8-11, using the 'construction' path as a generic example)
import Image from 'next/image';

const IndustryCard = ({ industryKey, title, description }) => {
  const imagePath = `/premium/industries/${industryKey}.jpg`; 
  
  return (
    <div className="relative overflow-hidden rounded-xl shadow-2xl group cursor-pointer transform hover:scale-[1.02] transition duration-500">
      <Image
        src={imagePath}
        alt={`${title} industry`}
        width={1600}
        height={900}
        className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition duration-500 flex items-end p-6">
        <div>
          <h3 className="text-3xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-200 text-base">{description}</p>
        </div>
      </div>
    </div>
  );
};
