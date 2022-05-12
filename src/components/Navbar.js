import React from "react";
import { Link } from "gatsby";
import logo from "../img/linneas-lustgard-logo.jpg";
import facebook from "../img/social/facebook.svg";
import instagram from "../img/social/instagram.svg";


const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: "",
    };
  }

  toggleHamburger() {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: "is-active",
            })
          : this.setState({
              navBarActiveClass: "",
            });
      }
    );
  }

  render() {
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" title="Logo">
              <img src={logo} alt="Kaldi" style={{ width: "88px" }} />
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              role="menuitem"
              tabIndex={0}
              onKeyPress={() => this.toggleHamburger()}
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start has-text-centered">
              <Link className="navbar-item" to="/about">
                Om
              </Link>
              <Link className="navbar-item" to="/products">
                Behandlingar
              </Link>
              <Link className="navbar-item" to="/workshops">
                Workshops
              </Link>
              <Link className="navbar-item" to="/hlr">
                HLR-instruktör
              </Link>
              <Link className="navbar-item" to="/blog">
                Blogg
              </Link>
              <Link className="navbar-item" to="/events">
                Evenemang
              </Link>
              <Link className="navbar-item" to="/contact">
                Kontakt
              </Link>
              <Link className="navbar-item" to="/contact/examples">
                Form Examples
              </Link>
            </div>
            <div className="navbar-end has-text-centered">
              <a 
               className="navbar-item"
               target="_blank"
                rel="noopener noreferrer"
               title="instagram" href="https://www.instagram.com/linneas_lustgard">
                  <span className="icon">
                    <img
                      src={instagram}
                      alt="Instagram"
                    />
                  </span>
                </a>
              <a 
               className="navbar-item"
               target="_blank"
                rel="noopener noreferrer"
               title="facebook" href="https://www.facebook.com/linneaslustgard/">
                  <span className="icon">
                    <img
                      src={facebook}
                      alt="Facebook"
                    />
                  </span>
                </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;
