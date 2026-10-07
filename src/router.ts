import { NavItem, setHeader } from './pages/common-components/header/header.ts';
import { getLoaderElement } from './pages/common-components/loader/loader.ts';
import { getErrorElement } from './pages/common-components/error-element/error-element.ts';
import { initHomePage } from './pages/home-page/home-page.ts';
import { initLibraryPage } from './pages/library-page/library-page.ts';
import { initNotFoundPage } from './pages/not-found-page/not-found-page.ts';

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
    {
      pageName: 'not-found',
      activeNavItem: '',
      initPage: () => initNotFoundPage(),
    },
  ],
};

export async function updatePage({ pageName }: { pageName: PageName }): Promise<void> {
  const page = ROUTER.pages.find((page) => page.pageName === pageName) || ROUTER.pages.at(-1)!;

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
    pageElement = await page.initPage();
  } catch (err) {
    pageElement = getErrorElement(err);
  } finally {
    outlet.innerHTML = '';
    outlet.append(pageElement!);
    window.scrollTo({ top: 0 });
  }
}

interface Router {
  outlet: HTMLElement | undefined;
  pages: Page[];
}

interface Page {
  pageName: PageName;
  activeNavItem: NavItem;
  initPage: () => Promise<HTMLElement>;
}

export type PageName = 'home' | 'library' | 'not-found';

export function getPageNameFromLocation(): PageName {
  const base = import.meta.env.BASE_URL;
  let path = location.pathname;

  if (base !== '/' && path.startsWith(base)) {
    path = path.slice(base.length - 1);
  }

  const normalizedPath = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;

  if (normalizedPath === '/' || normalizedPath === '/home') {
    return 'home';
  } else if (normalizedPath === '/library') {
    return 'library';
  } else {
    return 'not-found';
  }
}

export async function navigate(path: string) {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const normalizedPath =
    cleanPath === '' || cleanPath === '/'
      ? base
      : `${base.endsWith('/') ? base : `${base}/`}${cleanPath}`;

  history.pushState({}, '', normalizedPath);
  await updatePage({ pageName: getPageNameFromLocation() });
}
