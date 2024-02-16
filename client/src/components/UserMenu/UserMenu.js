import React from 'react';
import NavItem from '../NavItem/NavItem'; // Asegúrate de que esta ruta es correcta

function UserMenu({ setFilter }) {
    return (
        <div className="header-right">
            <NavItem
                icon="account_circle"
                link="/perfil"
                label="Mi Perfil"
                setFilter={setFilter}
            />
            <NavItem
                icon="notifications_none"
                link="/notificaciones"
                label="Notificaciones"
                setFilter={setFilter}
            />
            <NavItem
                icon="message"
                link="/mensajes"
                label="Mensajes"
                setFilter={setFilter}
            />
            <NavItem
                icon="settings"
                link="/configuracion"
                label="Configuración"
                setFilter={setFilter}
            />
            <NavItem
                icon="campaign"
                link="/anunciar"
                label="Anunciar"
                setFilter={setFilter}
            />
        </div>
    );
}

export default UserMenu;