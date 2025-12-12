import Link from 'next/link';
import { ArrowDownTrayIcon, DocumentArrowDownIcon, CloudArrowDownIcon } from '@heroicons/react/24/outline';

export default function DownloadCenterPage() {
  const downloads = [
    {
      title: 'API Documentation',
      description: 'Complete API reference and integration guides',
      icon: DocumentArrowDownIcon,
      size: '2.5 MB',
      format: 'PDF',
      href: '#'
    },
    {
      title: 'Client Libraries',
      description: 'SDK packages for popular programming languages',
      icon: CloudArrowDownIcon,
      size: '15 MB',
      format: 'ZIP',
      href: '#'
    },
    {
      title: 'System Reports',
      description: 'Monthly performance and analytics reports',
      icon: ArrowDownTrayIcon,
      size: '5.2 MB',
      format: 'PDF',
      href: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Download Center</h1>
          <p className="text-gray-600">Access documentation, reports, and resources</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {downloads.map((download, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <download.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase">{download.format}</span>
                  <p className="text-sm text-gray-600">{download.size}</p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{download.title}</h3>
              <p className="text-gray-600 mb-4">{download.description}</p>
              
              <Link
                href={download.href}
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
                Download
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
