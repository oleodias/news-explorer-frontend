import authorPhoto from '../../images/author.jpg';
import './About.css';

function About() {
  return (
    <section className='about'>
      <img
        alt='Leonardo Dias Caumo, autor do projeto'
        className='about__photo'
        src={authorPhoto}
      />
      <div className='about__content'>
        <h2 className='about__title'>Sobre o autor</h2>
        <p className='about__text'>
          Olá, eu sou o Leonardo Dias Caumo, desenvolvedor web. No dia a dia,
          crio automações que eliminam tarefas manuais e repetitivas, como
          relatórios, consultas a banco de dados, rotinas fiscais, envio de
          comunicações e integração entre sistemas, e desenvolvo sites e
          aplicações sob medida para clientes, do layout responsivo ao servidor
          no ar.
        </p>
        <p className='about__text'>
          Trabalho com HTML, CSS, JavaScript, React, Node.js, Express e MongoDB,
          e nas automações uso n8n, Python e SQL (Oracle). Na TripleTen,
          desenvolvi mais de dez projetos revisados por profissionais do
          mercado, incluindo este. Se você tem um processo que consome horas da
          sua equipe ou uma ideia que precisa sair do papel, posso ajudar.
        </p>
      </div>
    </section>
  );
}

export default About;
