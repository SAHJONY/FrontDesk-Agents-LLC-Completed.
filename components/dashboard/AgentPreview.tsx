// Inside the messages.map loop
<div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
  m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border text-gray-800'
}`}>
  {/* Split the content to style the sources differently */}
  {m.content.split('Sources Used:').map((part, index) => (
    index === 0 ? (
      <p key={index}>{part}</p>
    ) : (
      <div key={index} className="mt-2 pt-2 border-t border-gray-100 text-[10px] font-bold text-gray-400">
        SOURCE: <span className="text-indigo-500 uppercase">{part}</span>
      </div>
    )
  ))}
</div>
