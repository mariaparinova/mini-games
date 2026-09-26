import './styles.scss';
import {
  getHeaderElement,
  type NavItem,
  setHeader,
} from './pages/common-components/header/header.ts';
import { getFooterElement } from './pages/common-components/footer/footer.ts';
import { getHomePageElement } from './pages/home-page/home-page.ts';
import { createDivElement } from './lib/element.ts';

init();

function addLayout({ app }: { app: HTMLDivElement }) {
  const header = getHeaderElement({
    activeItem: 'Home',
  });
  const footer = getFooterElement();
  const main = document.createElement('main');
  main.classList.add('main');
  main.append(getHomePageElement());

  const pageElement = createDivElement({
    classList: ['page'],
    children: [header, main, footer],
  });

  app.append(pageElement);
}

function init() {
  const app = document.querySelector<HTMLDivElement>('#app');

  if (!app) {
    console.error('App element not found');
    return;
  }

  addLayout({ app });
  updatePage({
    activeNavItem: 'Home',
    pageContent: getHomePageElement(),
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

export function updatePage(params: UpdatePage) {
  const { activeNavItem, pageContent } = params;
  const currentActiveItems = document.body.querySelectorAll('header .active');

  if (!currentActiveItems.length) {
    console.warn('No active items found');
    return;
  }

  if (currentActiveItems[0].textContent === activeNavItem) {
    return;
  }

  setHeader({ activeNavItem });

  const mainElement = document.body.querySelector('main');
  if (!mainElement) {
    console.warn('No page content found');
    return;
  }

  mainElement.innerHTML = '';
  mainElement.append(pageContent);

  window.scrollTo({ top: 0 });
}

interface UpdatePage {
  activeNavItem: NavItem;
  pageContent: HTMLElement;
}
