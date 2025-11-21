/**
 * HomeView - Landing page view
 */

import { View } from '../View.js';

export class HomeView extends View {
  constructor(containerId, dependencies = {}) {
    super(containerId);
    this.store = dependencies.store;
  }

  onMount() {
    this.render(`
      <div class="wrap">
        <h1>Welcome</h1>

        <section aria-labelledby="hero-title" class="hero">
          <h2 id="hero-title">Build with accessibility first</h2>
          <p>
            This starter shows semantic landmarks, skip links, focus styles, and a responsive grid/flex layout.
          </p>
          <p>
            <a class="button" href="#form">Try the accessible form</a>
          </p>
        </section>

        <section aria-labelledby="features-title" class="cards">
          <h2 id="features-title">Features</h2>
          <ul class="card-list">
            <li class="card">
              <h3>Semantic HTML</h3>
              <p>Proper landmarks and heading hierarchy with one H1 per page.</p>
            </li>
            <li class="card">
              <h3>Keyboard-first</h3>
              <p>Visible focus, logical tab order, and operable components.</p>
            </li>
            <li class="card">
              <h3>Responsive</h3>
              <p>Mobile-first Grid/Flex with breakpoints at 480/768/1024px.</p>
            </li>
          </ul>
        </section>

        <aside aria-labelledby="aside-title" class="sidebar">
          <h2 id="aside-title">Quick tips</h2>
          <details>
            <summary>What is a skip link?</summary>
            <p>
              A skip link lets keyboard users jump straight to the main content. It becomes visible on focus.
            </p>
          </details>
        </aside>
      </div>
    `);
  }
}
