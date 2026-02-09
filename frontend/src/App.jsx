import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    api
      .get("/members")
      .then((response) => setMembers(response.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1>Gym Members</h1>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            {member.name} - {member.alphabetName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
