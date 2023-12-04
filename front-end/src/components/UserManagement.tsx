import { useEffect, useState } from "react";
import SortButtons from "./SortButtons";
import Table, { LazyLoadingTable } from "./Table";
import { addUser, deleteUser, getUsers, updateUser } from "../apis/Dashboard";
import { useAuth0 } from "@auth0/auth0-react";

const UserManagement = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [usersSourceData, setUsersSourceData] = useState([
    {
      user_id: 1,
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@example.com",
      phone: "",
      SSN: "",
      address: "",
      role: "Customer",
      picture: "",
    },
    {
      user_id: 2,
      first_name: "Jane",
      last_name: "Smith",
      email: "janesmith@example.com",
      phone: "",
      SSN: "",
      address: "",
      role: "Customer",
      picture: "",
    },
    {
      user_id: 3,
      first_name: "Mike",
      last_name: "Johnson",
      email: "mikejohnson@example.com",
      phone: "",
      SSN: "",
      address: "",
      role: "Cashier",
      picture: "",
    },
    {
      user_id: 4,
      first_name: "Sarah",
      last_name: "Brown",
      email: "sarahbrown@example.com",
      phone: "",
      SSN: "",
      address: "",
      role: "Manager",
      picture: "",
    },
    {
      user_id: 5,
      first_name: "Alice",
      last_name: "Martin",
      email: "alicemartin@example.com",
      phone: "",
      SSN: "",
      address: "",
      role: "Cashier",
      picture: "",
    },
  ]);

  useEffect(() => {
    getUsers(setUsersSourceData, getAccessTokenSilently);
  }, []);
  useEffect(() => {
    setSortedUsers(usersSourceData);
  }, [usersSourceData]);

  const [sortedUsers, setSortedUsers] = useState(usersSourceData);
  const [sortDirection, setSortDirection] = useState<any>({
    user_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    SSN: "",
    address: "",
    role: "",
    picture: "",
  });
  const [roles, setRoles] = useState([
    "manager",
    "cashier",
    "customer",
    "admin",
    "Not selected",
  ]);
  const [editRow, setEditRow] = useState(NaN);
  const [editedRole, setEditedRole] = useState("");
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
  const [editedSSN, setEditedSSN] = useState("");
  const [editedPicture, setEditedPicture] = useState("");

  const [InputEmail, setInputEmail] = useState("");
  const [InputRole, setInputRole] = useState("");
  const [InputFirstName, setInputFirstName] = useState("");
  const [InputLastName, setInputLastName] = useState("");
  const [InputPhone, setInputPhone] = useState("");
  const [InputSSN, setInputSSN] = useState("");
  const [InputAddress, setInputAddress] = useState("");
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
      First Name
      <SortButtons
        column="name"
        sortedProducts={sortedUsers}
        setSortedProducts={setSortedUsers}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </div>,
    <div className="d-flex align-items-center">
      Last Name
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
      Phone
      <SortButtons
        column="phone"
        sortedProducts={sortedUsers}
        setSortedProducts={setSortedUsers}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </div>,
    <div className="d-flex align-items-center">
      SSN
      <SortButtons
        column="SSN"
        sortedProducts={sortedUsers}
        setSortedProducts={setSortedUsers}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </div>,
    <div className="d-flex align-items-center">
      Address
      <SortButtons
        column="address"
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
    <div className="d-flex align-items-center">
      Picture
      <SortButtons
        column="picture"
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
        setEditedFirstName(user.first_name);
        setEditedLastName(user.last_name);
        setEditedEmail(user.email);
        setEditedPhone(user.phone);
        setEditedSSN(user.SSN);
        setEditedAddress(user.address);
        setEditedPicture(user.picture);
      } else {
        handleUpdateUser(
          user.user_id,
          editedRole,
          editedFirstName,
          editedLastName,
          editedEmail,
          editedPhone,
          editedAddress,
          editedSSN,
          editedPicture
        );
        setEditRow(NaN);
      }
    };

    const handleCancelClick = () => {
      setEditRow(NaN);
    };

    return [
      user.user_id,
      isEditing ? (
        <input
          className="form-control"
          value={editedFirstName}
          onChange={(e) => setEditedFirstName(e.target.value)}
          type="text"
        />
      ) : (
        user.first_name
      ),
      isEditing ? (
        <input
          className="form-control"
          value={editedLastName}
          onChange={(e) => setEditedLastName(e.target.value)}
          type="text"
        />
      ) : (
        user.last_name
      ),
      isEditing ? (
        <input
          className="form-control"
          value={editedEmail}
          onChange={(e) => setEditedEmail(e.target.value)}
          type="text"
        />
      ) : (
        user.email
      ),
      isEditing ? (
        <input
          className="form-control"
          value={editedPhone}
          onChange={(e) => setEditedPhone(e.target.value)}
          type="text"
        />
      ) : (
        user.phone
      ),
      isEditing ? (
        <input
          className="form-control"
          value={editedSSN}
          onChange={(e) => setEditedSSN(e.target.value)}
          type="text"
        />
      ) : (
        user.SSN
      ),
      isEditing ? (
        <input
          className="form-control"
          value={editedAddress}
          onChange={(e) => setEditedAddress(e.target.value)}
          type="text"
        />
      ) : (
        user.address
      ),
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
        <input
          className="form-control"
          value={editedPicture}
          onChange={(e) => setEditedPicture(e.target.value)}
          type="url"
        />
      ) : (
        <div
          style={{
            maxWidth: "250px",
            maxHeight: "350px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={user.picture}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "0.25rem",
              border: "1px solid #dee2e6",
            }}
            alt="missing picture"
          />
        </div>
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

  const handleUpdateUser = (
    userId: number,
    newRole?: string,
    newFirstName?: string,
    newLastName?: string,
    newEmail?: string,
    newPhone?: string,
    newAddress?: string,
    newSSN?: string,
    newPicture?: string
  ) => {
    updateUser(
      getAccessTokenSilently,
      userId,
      newRole,
      newFirstName,
      newLastName,
      newEmail,
      newPhone,
      newAddress,
      newSSN,
      newPicture
    )
      .then(() => {
        getUsers(setUsersSourceData, getAccessTokenSilently);
      })
      .catch(() => {});
  };
  const handleDeleteUser = (userId: number) => {
    deleteUser(getAccessTokenSilently, userId)
      .then(() => {
        getUsers(setUsersSourceData, getAccessTokenSilently);
      })
      .catch(() => {});
  };

  const handleAddUser = (
    email: string,
    role: string,
    firstName?: string,
    lastName?: string,
    phone?: string,
    address?: string,
    SSN?: string,
    picture?: string
  ) => {
    addUser(
      getAccessTokenSilently,
      email,
      role,
      firstName,
      lastName,
      phone,
      address,
      SSN,
      picture
    )
      .then(() => {
        getUsers(setUsersSourceData, getAccessTokenSilently);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };
  const handleClear = () => {
    setInputEmail("");
    setInputRole("");
    setInputAddress("");
    setInputSSN("");
    setInputFirstName("");
    setInputLastName("");
    setInputPhone("");
  };

  return (
    <div>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-12 mb-3">
            <div className="form-group">
              <label htmlFor="inputEmail">Email:</label>
              <input
                id="inputEmail"
                className="form-control"
                value={InputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                type="email"
                placeholder="example@mail.com"
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-12 mb-3">
            <div className="form-group">
              <label htmlFor="inputRole">Role:</label>
              <select
                id="inputRole"
                className="form-select"
                value={InputRole || "Not selected"}
                onChange={(e) => setInputRole(e.target.value)}
              >
                {roles?.map((role, i) => (
                  <option key={i} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-12 mb-3">
            <div className="form-group">
              <label htmlFor="inputFirstName">First Name:</label>
              <input
                id="inputFirstName"
                className="form-control"
                value={InputFirstName}
                onChange={(e) => setInputFirstName(e.target.value)}
                type="text"
                placeholder="First Name"
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-12 mb-3">
            <div className="form-group">
              <label htmlFor="inputLastName">Last Name:</label>
              <input
                id="inputLastName"
                className="form-control"
                value={InputLastName}
                onChange={(e) => setInputLastName(e.target.value)}
                type="text"
                placeholder="Last Name"
              />
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-12 mb-3">
            <div className="form-group">
              <label htmlFor="inputPhone">Phone:</label>
              <input
                id="inputPhone"
                className="form-control"
                value={InputPhone}
                onChange={(e) => setInputPhone(e.target.value)}
                type="tel"
                placeholder="Phone Number"
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-12 mb-3">
            <div className="form-group">
              <label htmlFor="inputSSN">Social Security Number (SSN):</label>
              <input
                id="inputSSN"
                className="form-control"
                value={InputSSN}
                onChange={(e) => setInputSSN(e.target.value)}
                type="text"
                placeholder="SSN"
              />
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-12 col-sm-12 mb-3">
            <div className="form-group">
              <label htmlFor="inputAddress">Address:</label>
              <input
                id="inputAddress"
                className="form-control"
                value={InputAddress}
                onChange={(e) => setInputAddress(e.target.value)}
                type="text"
                placeholder="Address"
              />
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-3">
          <div className="col-md-12 col-sm-12">
            <div
              className="d-flex justify-content-center"
              style={{ gap: "10px" }}
            >
              <button
                className="btn"
                style={{ backgroundColor: "#cf152d", color: "white" }}
                onClick={() => {
                  if (InputEmail && InputRole != "Not selected") {
                    handleAddUser(
                      InputEmail,
                      InputRole,
                      InputFirstName,
                      InputLastName,
                      InputPhone,
                      InputAddress,
                      InputSSN,
                      undefined
                    );
                  }
                }}
              >
                Add User
              </button>
              <button className="btn btn-secondary" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

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
