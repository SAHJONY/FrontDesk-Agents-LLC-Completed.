import TableOfContents from '../_components/TableOfContents';

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-extrabold mb-8">Privacy Policy</h1>
      
      <TableOfContents />

      <section id="introduction" className="mb-10">
        <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
        <p className="text-slate-600">Welcome to FrontDesk Agents LLC...</p>
      </section>
    </div>
  );
}
