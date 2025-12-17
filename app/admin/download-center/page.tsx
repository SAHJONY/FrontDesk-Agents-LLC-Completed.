"use client";

import React from "react";
import {
  ArrowDownTrayIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

/* =========================
   Tipos
========================= */

interface DownloadDocument {
  id: string;
  title: string;
  description: string;
  fileType: string;
  url: string;
  updatedAt: string;
}

interface DocumentItemProps {
  doc: DownloadDocument;
}

/* =========================
   Datos (mock / replaceable)
========================= */

const documents: DownloadDocument[] = [
  {
    id: "1",
    title: "FrontDesk Agents – Service Agreement",
    description: "Official service agreement and terms of use.",
    fileType: "PDF",
    url: "/docs/service-agreement.pdf",
    updatedAt: "2025-01-05",
  },
  {
    id: "2",
    title: "CEO Activation Playbook",
    description: "Internal activation and control procedures.",
    fileType: "PDF",
    url: "/docs/activation-playbook.pdf",
    updatedAt: "2025-01-10",
  },
];

/* =========================
   Componentes
========================= */

const DocumentItem: React.FC<DocumentItemProps> = ({ doc }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
    <div className="flex items-start gap-4">
      <DocumentTextIcon className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-0.5" />

      <div>
        <h3 className="font-medium text-gray-900">{doc.title}</h3>
        <p className="text-sm text-gray-500">{doc.description}</p>
        <p className="text-xs text-gray-400 mt-1">
          {doc.fileType} · Updated {doc.updatedAt}
        </p>
      </div>
    </div>

    <a
      href={doc.url}
      download
      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
    >
      <ArrowDownTrayIcon className="h-4 w-4" />
      Download
    </a>
  </div>
);

/* =========================
   Page
========================= */

export default function DownloadCenterPage() {
  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">
          Download Center
        </h1>

        <div className="space-y-4">
          {documents.map((doc) => (
            <DocumentItem key={doc.id} doc={doc} />
          ))}
        </div>
      </div>
    </div>
  );
}
