import { Link } from 'react-router-dom';
import githubIcon from '../../images/github.svg';
import linkedinIcon from '../../images/linkedin.svg';
import { CURRENT_YEAR } from '../../utils/constants.js';
import './Footer.css';

function Footer() {
  // Links externos abrem em nova guia (pedido do checklist); rel evita que
  // a página aberta tenha acesso a esta pela window.opener.
  return (
    <footer className='footer'>
      <p className='footer__copyright'>
        © {CURRENT_YEAR} Leonardo Dias Caumo, desenvolvido com a News API
      </p>
      <nav className='footer__nav'>
        <ul className='footer__links'>
          <li>
            <Link className='footer__link' to='/'>
              Início
            </Link>
          </li>
          <li>
            <a
              className='footer__link'
              href='https://tripleten.com'
              rel='noopener noreferrer'
              target='_blank'
            >
              TripleTen
            </a>
          </li>
        </ul>
        <ul className='footer__social'>
          <li>
            <a
              className='footer__social-link'
              href='https://github.com/oleodias'
              rel='noopener noreferrer'
              target='_blank'
            >
              <img
                alt='GitHub de Leonardo Dias Caumo'
                className='footer__icon'
                src={githubIcon}
              />
            </a>
          </li>
          <li>
            <a
              className='footer__social-link'
              href='https://www.linkedin.com/in/leonardodiascaumo'
              rel='noopener noreferrer'
              target='_blank'
            >
              <img
                alt='LinkedIn de Leonardo Dias Caumo'
                className='footer__icon'
                src={linkedinIcon}
              />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
