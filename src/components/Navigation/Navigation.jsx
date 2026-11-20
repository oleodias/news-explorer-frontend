import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import logoutIcon from '../../images/logout-white.svg';
import logoutDarkIcon from '../../images/logout-dark.svg';
import './Navigation.css';

function Navigation({
  theme,
  isLoggedIn,
  isMenuOpen,
  onLinkClick,
  onSignInClick,
  onSignOut,
}) {
  // O nome vem do contexto, e não de props: o Header não precisa saber
  // quem está logado só para repassar o nome.
  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser.name;

  // NavLink recebe uma função em className: o React Router informa se o
  // link é o da página atual, e a classe do sublinhado entra só nele.
  function getLinkClassName({ isActive }) {
    return `navigation__link ${isActive ? 'navigation__link_active' : ''}`;
  }

  function handleSignInClick() {
    onLinkClick();
    onSignInClick();
  }

  function handleSignOutClick() {
    onLinkClick();
    onSignOut();
  }

  return (
    <nav
      className={`navigation navigation_theme_${theme} ${
        isMenuOpen ? 'navigation_opened' : ''
      }`}
    >
      <ul className='navigation__list'>
        <li className='navigation__item'>
          <NavLink
            className={getLinkClassName}
            end
            to='/'
            onClick={onLinkClick}
          >
            Início
          </NavLink>
        </li>
        {isLoggedIn && (
          <li className='navigation__item'>
            <NavLink
              className={getLinkClassName}
              to='/saved-news'
              onClick={onLinkClick}
            >
              Artigos salvos
            </NavLink>
          </li>
        )}
        <li className='navigation__item'>
          {isLoggedIn ? (
            <button
              aria-label={`Sair da conta de ${userName}`}
              className='navigation__button'
              type='button'
              onClick={handleSignOutClick}
            >
              {userName}
              <img
                alt=''
                className='navigation__logout-icon'
                src={theme === 'dark' ? logoutDarkIcon : logoutIcon}
              />
            </button>
          ) : (
            <button
              className='navigation__button navigation__button_type_signin'
              type='button'
              onClick={handleSignInClick}
            >
              Entrar
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
