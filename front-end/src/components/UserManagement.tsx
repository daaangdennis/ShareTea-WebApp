import { useEffect, useState } from "react";
import SortButtons from "./SortButtons";
import Table, { LazyLoadingTable } from "./Table";
import { deleteUser, getUsers, updateUser } from "../apis/Dashboard";

const UserManagement = () => {
  const [usersSourceData, setUsersSourceData] = useState([
    {
      user_id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      role: "Customer",
    },
    {
      user_id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      role: "Customer",
    },
    {
      user_id: 3,
      name: "Mike Johnson",
      email: "mikejohnson@example.com",
      role: "Cashier",
    },
    {
      user_id: 4,
      name: "Sarah Brown",
      email: "sarahbrown@example.com",
      role: "Manager",
    },
    {
      user_id: 5,
      name: "Alice Martin",
      email: "alicemartin@example.com",
      role: "Cashier",
    },
  ]);

  useEffect(() => {
    getUsers(setUsersSourceData);
  }, []);
  useEffect(() => {
    setSortedUsers(usersSourceData);
  }, [usersSourceData]);

  const [sortedUsers, setSortedUsers] = useState(usersSourceData);
  const [sortDirection, setSortDirection] = useState<any>({
    user_id: "",
    name: "",
    email: "",
    role: "",
  });
  const [roles, setRoles] = useState(["manager", "cashier", "customer"]);
  const [editRow, setEditRow] = useState(NaN);
  const [editedRole, setEditedRole] = useState("");
  const usersColumns = [
    <div className="d-flex align-items-center">
      User ID
      <SortButtons
        column="user_id"
        sortedProducts={sortedUsers}
        setSortedProducts={setSortedUsers}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </div>,
    <div className="d-flex align-items-center">
      User Name
      <SortButtons
        column="name"
        sortedProducts={sortedUsers}
        setSortedProducts={setSortedUsers}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </div>,
    <div className="d-flex align-items-center">
      Email
      <SortButtons
        column="email"
        sortedProducts={sortedUsers}
        setSortedProducts={setSortedUsers}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </div>,
    <div className="d-flex align-items-center">
      Role
      <SortButtons
        column="role"
        sortedProducts={sortedUsers}
        setSortedProducts={setSortedUsers}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </div>,
    "",
  ];

  const usersData = sortedUsers.map((user, i) => {
    const isEditing = editRow === i;

    const handleEditClick = () => {
      if (!isEditing) {
        setEditRow(i);
        setEditedRole(user.role);
      } else {
        handleUpdateUser(user.user_id, editedRole);
        setEditRow(NaN);
      }
    };

    const handleCancelClick = () => {
      setEditRow(NaN);
    };

    return [
      user.user_id,
      user.name,
      user.email,
      isEditing ? (
        <select
          className="form-select"
          value={editedRole}
          onChange={(e) => setEditedRole(e.target.value)}
        >
          {roles.map((category: string, i: number) => (
            <option key={i} value={category}>
              {category}
            </option>
          ))}
        </select>
      ) : (
        user.role
      ),
      isEditing ? (
        <div className="d-flex justify-content-around">
          <button onClick={handleEditClick} className="btn btn-success btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-floppy-fill"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5v-13Z" />
              <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5V16Zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V0ZM9 1h2v4H9V1Z" />
            </svg>
          </button>
          <button
            onClick={handleCancelClick}
            className="btn btn-warning btn-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-around">
          <button onClick={handleEditClick} className="btn btn-info btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil-fill"
              viewBox="0 0 16 16"
            >
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
            </svg>
          </button>
          <button
            onClick={() => handleDeleteUser(user.user_id)}
            className="btn btn-danger btn-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash3-fill"
              viewBox="0 0 16 16"
            >
              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
            </svg>
          </button>
        </div>
      ),
    ];
  });

  const handleUpdateUser = (userId: number, newRole: string) => {
    updateUser(userId, newRole)
      .then(() => {
        getUsers(setUsersSourceData);
      })
      .catch(() => {});
  };
  const handleDeleteUser = (userId: number) => {
    deleteUser(userId)
      .then(() => {
        getUsers(setUsersSourceData);
      })
      .catch(() => {});
  };

  return (
    <div className="container">
      <LazyLoadingTable
        className="m-4"
        columns={usersColumns}
        data={usersData}
        rowLoad={[10, 20, 30, 50, 100]}
      />
    </div>
  );
};

export default UserManagement;
