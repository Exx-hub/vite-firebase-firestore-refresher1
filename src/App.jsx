import { useEffect, useState } from "react";
import "./App.css";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase/firebase-config";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const usersCollectionReference = collection(db, "users");

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    await addDoc(usersCollectionReference, { name, age });

    setName("");
    setAge(0);
  };

  // READ
  const getUsers = async () => {
    const data = await getDocs(usersCollectionReference);

    // console.log(data.docs[0].data()); -- parse object returned to get the values of the document

    // run .data() function on every document in the collection and save each object in a new array
    const parsedData = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    setUsers(parsedData);
  };

  // UPDATE
  const handleUpdate = async (id, age) => {
    console.log(id, age);

    const newData = { age: age + 1 };

    const userDoc = doc(db, "users", id);

    await updateDoc(userDoc, newData);

    console.log("document has been updated");
  };

  // DELETE
  const handleDelete = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);

    console.log("document has been deleted");
  };

  return (
    <>
      <h1>Welcome back to firebase</h1>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <h1>{user.name}</h1>
            <p>{user.age}</p>
            <button onClick={() => handleUpdate(user.id, user.age)}>Happy Birthday</button>
            <button onClick={() => handleDelete(user.id)}>RIP</button>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleCreate}
        style={{ display: "flex", flexDirection: "column", marginTop: "40px" }}
      >
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(+e.target.value)}
          placeholder="Enter age"
        />
        <button>Create User</button>
      </form>
    </>
  );
}

export default App;
