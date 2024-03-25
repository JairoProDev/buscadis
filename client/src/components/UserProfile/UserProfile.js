import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./UserProfile.css"; // Importa tu archivo CSS

function UserProfile() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(currentUser?.firstName || "");
  const [lastName, setLastName] = useState(currentUser?.lastName || "");
  const [phoneNumber, setPhoneNumber] = useState(
    currentUser?.phoneNumber || ""
  );
  const [email, setEmail] = useState(currentUser?.email || "");
  const [profilePic, setProfilePic] = useState(currentUser?.profilePic || "");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.firstName || "");
      setLastName(currentUser.lastName || "");
      setPhoneNumber(currentUser.phoneNumber || "");
      setEmail(currentUser.email || "");
      setProfilePic(currentUser.profilePic || "");
    }
  }, [currentUser]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    // Aquí puedes agregar el código para actualizar la información del usuario en el servidor
    try {
      const response = await fetch(`/api/auth/users/${currentUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phoneNumber,
          email,
          profilePic,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el perfil");
      }

      const data = await response.json();
      setCurrentUser(data);
      setSuccess("Perfil actualizado con éxito");
    } catch (error) {
      setError(error.message);
    }

    setEditing(false);
  };

  const handleDelete = async () => {
    // Aquí puedes agregar el código para eliminar la cuenta del usuario
    const confirmed = window.confirm(
      "¿Estás seguro de que quieres eliminar tu cuenta?"
    );

    if (confirmed) {
      try {
        const response = await fetch(`/api/auth/users/${currentUser.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al eliminar la cuenta");
        }

        setCurrentUser(null);
        setSuccess("Cuenta eliminada con éxito");
      } catch (error) {
        setError(error.message);
      }
    }
  };
  // Esta es la función que se llama cuando haces clic en el botón de eliminación
  function deleteUser() {
    console.log("deleteUser function called");
    console.log("currentUser.id:", currentUser.id);

    const confirmed = window.confirm(
      "¿Estás seguro de que quieres eliminar tu cuenta?"
    );
    console.log("Confirmation:", confirmed);

    if (currentUser && currentUser.id && confirmed) {
      console.log(
        `Sending DELETE request to /api/auth/users/${currentUser.id}`
      );

      fetch(`/api/auth/users/${currentUser.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          console.log("Response:", response);
          return response.json();
        })
        .then((data) => {
          console.log("Data:", data);
          if (data.message === "User deleted successfully") {
            console.log("User deleted successfully");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
  return (
    <div className="user-profile">
      <h1>Perfil de usuario</h1>

      <img src={profilePic} alt="Foto de perfil" className="profile-pic" />

      {editing ? (
        <div>
          <label>
            Nombres:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label>
            Apellidos:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label>
            N° Celular:
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          <label>
            Correo electrónico:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Foto de perfil:
            <input
              type="file"
              onChange={(e) =>
                setProfilePic(URL.createObjectURL(e.target.files[0]))
              }
            />
          </label>
          <button onClick={handleSave}>Guardar cambios</button>
        </div>
      ) : (
        <div>
          <p>Nombres: {firstName}</p>
          <p>Apellidos: {lastName}</p>
          <p>N° Celular: {phoneNumber}</p>
          <p>Correo electrónico: {email}</p>
          <button onClick={handleEdit}>Editar perfil</button>
        </div>
      )}

      <button onClick={deleteUser}>Eliminar cuenta</button>
      <p>
        Para solicitar la eliminación de tu cuenta y los datos asociados, por
        favor{" "}
        <a
          href="http://localhost:3000/api/auth/users/${currentUser.id}/delete_request"
          target="_blank"
          rel="noopener noreferrer"
        >
          haz clic aquí
        </a>
        .
      </p>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
}

export default UserProfile;
