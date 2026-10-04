import { NavItem, setHeader } from './pages/common-components/header/header.ts';
import { getLoaderElement } from './pages/common-components/loader/loader.ts';
import { getErrorElement } from './pages/common-components/error-element/error-element.ts';
import { initHomePage } from './pages/home-page/home-page.ts';
import { initLibraryPage } from './pages/library-page/library-page.ts';

export const ROUTER: Router = {
  outlet: undefined,
  pages: [
    {
      pageName: 'home',
      activeNavItem: 'Home',
      initPage: () => initHomePage(),
    },
    {
      pageName: 'library',
      activeNavItem: 'Library',
      initPage: () => initLibraryPage(),
    },
  ],
};

export async function updatePage(params: UpdatePage) {
  const { pageName } = params;
  const page = ROUTER.pages.find((page) => page.pageName === pageName);
  if (!page) {
    console.error(`This page: "${pageName}" does not exist in router`);
    return;
  }

  setHeader({ activeNavItem: page.activeNavItem });

  const outlet = ROUTER.outlet;
  if (!outlet) {
    console.error('No outlet found');
    return;
  }
  outlet.innerHTML = '';
  outlet.append(getLoaderElement());

  let pageElement: HTMLElement | undefined;

  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    pageElement = await page.initPage();
  } catch (err) {
    pageElement = getErrorElement(err);
  } finally {
    outlet.innerHTML = '';
    outlet.append(pageElement!);
    window.scrollTo({ top: 0 });
  }
}

interface UpdatePage {
  pageName: PAGE_NAME;
}

interface Router {
  outlet: HTMLElement | undefined;
  pages: Page[];
}

interface Page {
  pageName: PAGE_NAME;
  activeNavItem: NavItem;
  initPage: () => Promise<HTMLElement>;
}

export type PAGE_NAME = 'home' | 'library';
