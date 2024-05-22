import React from "react";
import { Link } from "react-router-dom";
import "./TextPage.css";
function TextPage() {
  return (
    <main className="container">
      <div className="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary">
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="px-0"
        >
          <h1 className="display-4 fst-italic">
            Modernizing&nbsp;
            <strong style={{ color: "#05f5a5" }}>
              the home buying experience
            </strong>
          </h1>
          <p className="lead my-3">
            Real estate purchases as they are today, have a very high
            transaction cost and none of the parties involved in a deal are
            happy. Whether you are a lender or a brokerage, a home buyer or an
            insurance agent, a seller or a title company – the time consuming
            and costly process leaves most parties wishing there was a better
            way.{" "}
            <Link
              to="https://bhumio.com/company"
              className="text-body-emphasis fw-bold"
            >
              Continue reading...
            </Link>
          </p>
          <hr />
          <p>
            <Link
              to="https://app.bhumio.com/get-started"
              target="_blank"
              className="dynamic-button"
            >
              Get Started <span>&#8594;</span>
            </Link>
            <Link
              to="https://calendly.com/bhumio"
              target="_blank"
              className="dynamic-button"
            >
              <i className="fa fa-calendar"></i> Schedule a Demo
            </Link>
          </p>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-md-6">
          <div
            id="hero"
            className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
          >
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary-emphasis">
                Bhumio For
              </strong>
              <h3 className="mb-0">Real State Agents</h3>
              <div className="mb-1 text-body-secondary">May 22</div>
              <p className="card-text mb-auto">
                Manage the entire home sale process using a single dashboard.
                Save time and money while closing deals faster with our real
                estate technology platform.
              </p>
              <Link
                to="https://bhumio.com/product"
                style={{ padding: "10px 0px" }}
                className="icon-link gap-1 icon-link-hover stretched-link"
              >
                Continue reading &rarr;
              </Link>
              <img
                className="card-img-right flex-auto d-none d-md-block"
                src="https://images.pexels.com/photos/3646913/pexels-photo-3646913.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Card image cap"
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div
            id="hero"
            className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
          >
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary-emphasis">
                Bhumio For
              </strong>
              <h3 className="mb-0">Brokerages</h3>
              <div className="mb-1 text-body-secondary">May 22</div>
              <p className="card-text mb-auto">
                Our technology boosts profitability for your organization and
                agents, and benefits your clients. Say goodbye to outdated and
                complicated tools and widgets.
              </p>
              <Link
                style={{ padding: "10px 0px" }}
                to="https://bhumio.com/product"
                className="icon-link gap-1 icon-link-hover stretched-link"
              >
                Continue reading &rarr;
              </Link>
              <img
                className="card-img-right flex-auto d-none d-md-block"
                src="https://images.pexels.com/photos/5256816/pexels-photo-5256816.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Card image cap"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row g-5">
        <div className="col-md-8">
          <h3 className="pb-4 mb-4 fst-italic border-bottom">Culture</h3>

          <article className="blog-post">
            <h2 className="display-5 link-body-emphasis mb-1">
              Always put customers first
            </h2>
            <p className="blog-post-meta">May 22, 2024 by</p>

            <p>
              <em>Take Ownership</em> — Don't complain, assign blame, instead
              find solutions as if you own the company.
            </p>
            <p>
              <em>Solve Customer's Problem</em> — They are the gods and pay for
              everything we have, worship them.
            </p>
            <p>
              <em>Create Exceptional Products </em>— Create magical stuff that
              you will be proud of forever.
            </p>
            <hr />
            <p>
              Like every company out there we have certain traits that define us
              and also act as our guiding principles to help us whenever we have
              difficulty in making decisions. These can be broadly grouped into
              the following and what each one means is further broken down,
              making a total of 9 guiding principles.
            </p>
          </article>

          <article className="blog-post">
            <h2 className="display-5 link-body-emphasis mb-1">We are Bhumio</h2>
            <p>
              Today, people can buy an awesome car (second biggest purchase of
              their life) with a few clicks. It is built to their specs and
              delivered to their door steps in a few weeks. Even our food (3rd
              largest expense in the developed world) is delivered to our homes,
              saving us time (and money). And yet, the average transaction cost
              of a US home purchase (largest lifetime expense) is about 10% and
              it takes upto 60 days before the deal is closed. This is
              unacceptable.
              <hr />
              <p style={{ padding: "0px 20px" }}>
                <strong>
                  &ldquo;&ldquo;&ldquo;
                  <em>
                    We want to modernize the way people buy, sell and own real
                    estate by 2030.
                  </em>{" "}
                  &rdquo;&rdquo;&rdquo;
                </strong>
              </p>
            </p>
          </article>
          <article className="blog-post">
            <h2 className="display-5 link-body-emphasis mb-1">Our Team</h2>
            <p>
              At our company, we are proud to have a team of highly skilled
              professionals who are experts in their fields. Our professionals
              are dedicated to delivering quality service, and they strive to
              stay up-to-date with all the latest industry trends. Get to Know
              Our Highly Skilled Team of Professionals!
            </p>
          </article>
        </div>

        <div className="col-md-4">
          <div className="position-sticky" style={{ top: "2rem" }}>
            <div className="p-4 mb-3 bg-body-tertiary rounded">
              <h4 className="fst-italic">About Me</h4>
              <p className="mb-0">
                Exemplary Front-End Developer with 2.5 years of mastery in HTML,
                CSS, and JavaScript, specializing in ReactJs. Proficient in
                C/C++ and Python, mastering data structures and algorithms with
                50+ challenges conquered. Artfully crafts visually stunning,
                responsive web apps, contributing to the success of 10+ projects
                using ReactJs. Enhanced campaign performance by 25% with Adobe
                Campaign Classic and bolstered email engagement by 30% with
                STENSUL templates.
              </p>
            </div>

            <div className="p-4">
              <h4 className="fst-italic">Elsewhere</h4>
              <ol className="list-unstyled">
                <li>
                  <Link to="https://github.com/Rahulyadav0296">Github</Link>
                </li>
                <li>
                  <Link to="https://www.linkedin.com/in/rahul-kumar-yadav-956609204/">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link to="https://x.com/RahulYa93729679">Twitter</Link>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default TextPage;
