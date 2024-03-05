import React, {
  useState,
  useEffect,
  useCallback,
  useTransition,
  useRef,
} from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import UserList from "../../components/UserList";

const URL = "https://crudcrud.com/api/c73d7a37aa8443738f7f00457777cbdf/users";

const User = () => {
  const inputRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [isFetching, setFetching] = useTransition();

  const fetchUsers = useCallback(async () => {
    try {
      setFetching(async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setUsers(data);
      });
    } catch (error) {
      console.error("Fetching todos failed: ", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = async () => {
    if (!newUserName) {
      inputRef.current.focus();
      return;
    }

    try {
      await fetch(URL, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: "POST",
        body: JSON.stringify({
          name: newUserName,
          done: false,
        }),
      });
      setNewUserName("");
      fetchUsers();
    } catch (error) {
      console.error("Adding new user failed: ", error);
    }
  };

  const handleUpdateUser = async (id, newName) => {
    try {
      await fetch(`${URL}/${id}`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: "PUT",
        body: JSON.stringify({
          name: newName,
          done: true,
        }),
      });
      fetchUsers();
    } catch (error) {
      console.error("Updating user failed: ", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });
      fetchUsers();
    } catch (error) {
      console.error("Deleting user failed: ", error);
    }
  };

  return (
    <div className="container mx-auto max-w-xl px-4 mt-4 mb-4">
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <Input
          ref={inputRef}
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Enter new user's name"
        />
        <Button onClick={handleAddUser}>Add User</Button>
      </div>
      {isFetching ? (
        <Loader />
      ) : (
        <UserList
          data={users}
          onUpdate={handleUpdateUser}
          onDelete={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default User;
