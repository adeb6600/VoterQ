
import style from '../styles/style.scss';
import Helmet from 'react-helmet';
import Link from 'next/link'
import PropTypes from 'prop-types'
const Layout = ({ children }) => (
    <div>
        <style dangerouslySetInnerHTML={{ __html: style }} />

        <Helmet title="Home | Obtain your voters card with ease" />
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <figure class="image is-64x64 navbar-item">
                <img src="/static/img/icon.svg" alt="VoterQ"/>
              
                </figure>
               
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div className="navbar-menu">
                <div class="navbar-start">
                    <Link href="/">
                        <a class="navbar-item"> Home </a>
                    </Link>
                    <Link href="/register">
                        <a class="navbar-item"> Register </a>
                    </Link>
                    <Link href="/queue">
                        <a class="navbar-item"> Queue </a>
                    </Link>



                </div>

            </div>

        </nav>
        <section class="hero">

            <div class="hero-body">
                {children}
            </div>
        </section>

    </div>)



export default Layout