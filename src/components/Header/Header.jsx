import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.jsx';
import menuIcon from '../../images/menu.svg';
import menuDarkIcon from '../../images/menu-dark.svg';
import closeIcon from '../../images/close.svg';
import closeDarkIcon from '../../images/close-dark.svg';
import './Header.css';

// theme: 'light' = textos brancos sobre a foto da página principal;
// 'dark' = fundo branco e textos escuros, na página de artigos salvos.
function Header({ theme, isLoggedIn, userName, onSignInClick, onSignOut }) {
  // O menu só existe no celular: no desktop e no tablet a navegação aparece
  // inteira e este estado não tem efeito visível.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Com o menu aberto, o cabeçalho ganha fundo próprio (escuro na página
  // principal, branco na de salvos), então os ícones seguem esse fundo.
  const isDark = theme === 'dark';
  const menuButtonIcon = isMenuOpen
    ? isDark
      ? closeDarkIcon
      : closeIcon
    : isDark
      ? menuDarkIcon
      : menuIcon;

  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleMenuClose() {
    setIsMenuOpen(false);
  }

  return (
    <header
      className={`header header_theme_${theme} ${
        isMenuOpen ? 'header_menu-open' : ''
      }`}
    >
      <div className='header__bar'>
        <Link className='header__logo' to='/' onClick={handleMenuClose}>
          NewsExplorer
        </Link>
        <button
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Fechar o menu' : 'Abrir o menu'}
          className='header__menu-button'
          type='button'
          onClick={handleMenuToggle}
        >
          <img alt='' className='header__menu-icon' src={menuButtonIcon} />
        </button>
      </div>
      <Navigation
        isLoggedIn={isLoggedIn}
        isMenuOpen={isMenuOpen}
        theme={theme}
        userName={userName}
        onLinkClick={handleMenuClose}
        onSignInClick={onSignInClick}
        onSignOut={onSignOut}
      />
      {isMenuOpen && (
        // Fundo escurecido atrás do menu: clicar nele fecha o menu.
        <div className='header__overlay' onClick={handleMenuClose} />
      )}
    </header>
  );
}

export default Header;
