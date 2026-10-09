import './styles.scss';
import { getHeaderElement } from './pages/common-components/header/header.ts';
import { getFooterElement } from './pages/common-components/footer/footer.ts';
import { createDivElement } from './lib/element.ts';
import { getPageNameFromLocation, ROUTER, updatePage } from './router.ts';

init();

function addLayout({ app }: { app: HTMLDivElement }) {
  const header = getHeaderElement({
    activeItem: 'Home',
  });
  const footer = getFooterElement();
  const main = document.createElement('main');
  main.classList.add('main');

  const pageElement = createDivElement({
    classList: ['page'],
    children: [header, main, footer],
  });

  app.append(pageElement);
}

function init() {
  let app = document.querySelector<HTMLDivElement>('#app');
  if (!app) {
    app = createDivElement({ id: 'app' });
    document.body.append(app);
  }
  addLayout({ app });

  const outlet = document.querySelector('main.main') as HTMLElement;
  if (!outlet) {
    console.error('Outlet element not found');
    return;
  }
  ROUTER.outlet = outlet;

  window.addEventListener('popstate', () => {
    void updatePage({ pageName: getPageNameFromLocation() });
  });

  void updatePage({
    pageName: getPageNameFromLocation(),
  });

  document.body.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const href = target.getAttribute('href');

    if (!href) {
      return;
    }

    if (!href.includes('http')) {
      event.preventDefault();
      return;
    }
  });
}
