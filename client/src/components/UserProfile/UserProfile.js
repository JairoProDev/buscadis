import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function UserProfile() {
  const { currentUser } = useContext(AuthContext);

  // Esta es la función que se llama cuando haces clic en el botón de eliminación
  function deleteUser() {
    console.log("deleteUser function called");
    console.log('currentUser.id:', currentUser.id);

    const confirmed = window.confirm("¿Estás seguro de que quieres eliminar tu cuenta?");
    console.log('Confirmation:', confirmed);

    if (currentUser && currentUser.id && confirmed) {
        console.log(`Sending DELETE request to /api/auth/users/${currentUser.id}`);

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
    <div>
      <h1>Perfil de usuario</h1>
      {/* Aquí puedes agregar más contenido para el perfil del usuario */}
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
    </div>
  );
}

export default UserProfile;
