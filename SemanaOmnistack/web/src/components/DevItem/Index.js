import React from 'react';

import './style.css';

function DevItem({ dev, handleEditDev, handleDeleteDev }) {

  async function deleteDev(id, handleDeleteDev) {
    await handleDeleteDev(id);
  }

    return (
        <li className="dev-item">
            <header>
              <img src={dev.avatar_url} alt={dev.name}/>
              <div className="user-info">
                <strong>{dev.name}</strong>
                <span>{dev.techs.join(', ')}</span>
              </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no GitHub</a>
            <div className="settings">
            <button onClick={(e) => deleteDev(dev._id, handleDeleteDev)}><img id="deleteButton" src="trashCanIcon.png" alt=""/></button>
            </div>
          </li>
    );
}

export default DevItem;