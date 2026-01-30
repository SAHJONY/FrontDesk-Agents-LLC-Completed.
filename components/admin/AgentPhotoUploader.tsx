import AgentPhotoUploader from '@/components/admin/AgentPhotoUploader';

// Inside your agent card or modal:
<AgentPhotoUploader 
  agentId={agent.id} 
  currentPhoto={agent.avatar_url} 
  onUploadSuccess={(url) => {
    // Refresh your UI or local state here
    console.log("New image live at:", url);
  }} 
/>
