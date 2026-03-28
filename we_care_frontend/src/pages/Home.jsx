import "../styles/home.css";
import "../styles/glass.css";
import { useOutletContext } from "react-router-dom";
import LeafDecor from "../components/LeafDecor";

const Home = () => {

  const { openChat } = useOutletContext();

  return (
    <>
      <section className="hero-section">
        <div className="bg-shape glow-top-left"></div>
        <div className="bg-shape glow-right-green"></div>
        <div className="bg-shape blur-center-blue"></div>
        <div className="bg-shape blur-right-blue"></div>
        <div className="bg-shape glow-center-green"></div>
        <div className="bg-shape blur-center-blue2"></div>
        <div className="bg-shape blur-center-blue3"></div>

        <div className="hero-glass-background"></div>

        <div className="hero-content">
          <div className="hero-top-row">
            <div className="hero-left-column">
              <div className="glass-card hero-glass-card">
                <h1 className="hero-title">
                  <span className="line-1">Right doctor.</span>
                  <span className="line-2">Right place.</span>
                  <span className="line-3">Right care.</span>
                </h1>
              </div>

              <div className="hero-copy-block">
                <p className="hero-description">
                  Smart symptom insights with trusted doctors, locations, and
                  appointment details.
                </p>

                <button className="hero-button" onClick={openChat}>CHECK SYMPTOMS</button>
              </div>
            </div>

            <div className="hero-image-oval">
              <div className="hero-image-inner">
                <span className="hero-image-text">Image</span>
              </div>
            </div>
          </div>

          <div className="hero-small-cards">
            <div className="glass-card small-glass-card">
              <h2>10,000+</h2>
              <p>Doctors</p>
            </div>

            <div className="glass-card small-glass-card">
              <h2>2,000+</h2>
              <p>Hospitals</p>
            </div>

            <div className="glass-card small-glass-card">
              <h2>8</h2>
              <p>Divisions</p>
            </div>
          </div>

          <p className="hero-bottom-note">Your path to the right care...</p>
        </div>
      </section>


      <section className="path-section">
        <div className="path-image-placeholder">
          <span>Image</span>
        </div>

        <div className="path-card-wrapper">
          <div className="path-leaf-top">
            <LeafDecor />
          </div>

          <div className="path-leaf-bottom">
            <LeafDecor />
          </div>

          <div className="path-glass-card">
            <h2 className="path-title">Find Hospitals Near You</h2>

            <p className="path-text">
              Browse doctors by specialty and location. Click below to find the right one for you.
            </p>

            <button className="path-button">Browse Doctors</button>
          </div>
        </div>
      </section>

      
      <section className="path-section path-section-reverse">
        <div className="path-image-placeholder">
          <span>Image</span>
        </div>

        <div className="path-card-wrapper">
          <div className="path-leaf-top">
            <LeafDecor />
          </div>

          <div className="path-leaf-bottom">
            <LeafDecor />
          </div>

          <div className="path-glass-card">
            <h2 className="path-title">Not Sure Where to Start?</h2>

            <p className="path-text">
              Enter your symptoms and we’ll guide you to the right specialist.
            </p>

            <button className="path-button">Get Guidance</button>
          </div>
        </div>
      </section>

      
      <section className="path-section">
        <div className="path-image-placeholder">
          <span>Image</span>
        </div>

        <div className="path-card-wrapper">
          <div className="path-leaf-top">
            <LeafDecor />
          </div>

          <div className="path-leaf-bottom">
            <LeafDecor />
          </div>

          <div className="path-glass-card">
            <h2 className="path-title">Care, Close to You</h2>

            <p className="path-text">
              Find hospitals and diagnostic centers around you with ease.
            </p>

            <button className="path-button">Learn More</button>
          </div>
        </div>
      </section>
            <section className="why-section">
        <div className="why-bg-orb why-bg-orb-1"></div>
        <div className="why-bg-orb why-bg-orb-2"></div>

        <h2 className="why-title">Why Choose WeCare</h2>

        <div className="why-cards">
          <div className="glass-card why-card">
            <div className="why-icon">✓</div>
            <h3>Verified Doctors</h3>
            <p>
              Connect with trusted professionals through clear profiles and reliable
              healthcare information.
            </p>
          </div>

          <div className="glass-card why-card">
            <div className="why-icon">+</div>
            <h3>Easy Access</h3>
            <p>
              Search symptoms, compare options, and move through care choices with a
              simple experience.
            </p>
          </div>

          <div className="glass-card why-card">
            <div className="why-icon">★</div>
            <h3>Confident Decisions</h3>
            <p>
              Explore doctors, locations, and support tools that help you choose the
              right path.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-bg-orb cta-bg-orb-1"></div>
        <div className="cta-bg-orb cta-bg-orb-2"></div>

        <div className="glass-card cta-card">
          <p className="cta-tag">Start your care journey</p>
          <h2 className="cta-title">Find clarity, comfort, and the care you deserve.</h2>
          <p className="cta-text">
            Explore symptoms, discover doctors, and take the next step with confidence.
          </p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>
      <section className="about-section">
        <div className="about-grid">

          <div className="about-block">
            <h3>WeCare</h3>
            <p>Your trusted platform for finding doctors, exploring care options, and booking appointments with ease.</p>
          </div>

          <div className="about-block">
            <h4>Quick Links</h4>
            <ul>
              <li>Symptoms</li>
              <li>Doctors</li>
              <li>Hospitals</li>
              
            </ul>
          </div>

          <div className="about-block-contact">
            <h4>Contact</h4>
            <ul>
              <li>Email: support@wecare.com</li>
              <li>Phone: +880 1234-567890</li>
              <li>Location: Dhaka, Bangladesh</li>
            </ul>
          </div>

          <div className="about-block">
            <h4>Hours</h4>
            <ul>
              <li>Sun - Thurs: 9:00 AM - 8:00 PM</li>
              <li>Sat: 10:00 AM - 6:00 PM</li>
              <li>Fri: Closed</li>
            </ul>
          </div>

        </div>

        <div className="about-bottom">
          © 2026 WeCare. All rights reserved.
        </div>
      </section>

    </>
  );
};

export default Home;