const Message = ({ author, text, timestamp }) => (
    <div className={`mb-4 ${author === 'You' ? 'text-right' : 'text-left'}`}>
      <div className="font-bold text-sm text-blue-300">{author}</div>
      <div className={`inline-block p-3 rounded ${
        author === 'You' ? 'bg-blue-900/50' : 'bg-gray-900/50'
      }`}>
        <div className="text-blue-200">{text}</div>
        <div className="text-xs text-blue-300 mt-1">{timestamp}</div>
      </div>
    </div>
  );

export default Message;