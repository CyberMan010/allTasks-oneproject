const UserList = ({ users, typingUser = [] }) => {
  return (
    <div className="p-4">
      <h3 className="font-bold mb-2 text-blue-300">Active Users</h3>
      {users.map(user => (
        <div key={user.id} className="mb-2">
          <span className="text-sm text-blue-100">
            {user.name} 
            {Array.isArray(typingUser) && typingUser.includes(user.name) && (
              <span className="text-blue-400 italic"> (typing...)</span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default UserList;
