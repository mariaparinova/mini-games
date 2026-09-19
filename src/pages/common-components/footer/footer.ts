import './footer.scss';
import {
  createDivElement,
  createSpanElement,
  createImgElement,
  createLinkElement,
} from '../../../lib/element.ts';

export function getFooterElement() {
  const subheaderElement = getSubFooterElement();

  const footerElement = document.createElement('footer');
  footerElement.classList.add('footer');
  footerElement.append(subheaderElement);
  return footerElement;
}

export function getSubFooterElement() {
  const allRightsElement = createSpanElement({
    classList: ['all-rights'],
    textContent: '© 2026 MiniGames. All rights reserved.',
  });

  const rssLogo = createImgElement({
    classList: ['rss-logo'],
    src: 'rss-logo.svg',
    alt: 'RSS Logo',
  });

  const rssTextElement = createSpanElement({
    classList: ['rss-text'],
    textContent: 'RS School',
  });

  const rssElement = createLinkElement({
    classList: ['rss'],
    children: [rssLogo, rssTextElement],
    href: 'https://rs.school/courses/short-track',
  });

  const ghLogo = createImgElement({
    classList: ['gh-logo'],
    src: 'gh-logo.svg',
    alt: 'GitHub Logo',
  });

  const studentNicknameElement = createSpanElement({
    classList: ['student-nickname'],
    textContent: '@mariaparinova',
  });

  const studentElement = createLinkElement({
    classList: ['student-data'],
    href: 'https://github.com/mariaparinova',
    children: [ghLogo, studentNicknameElement],
  });

  const designElement = createSpanElement({
    classList: ['design'],
    textContent: 'Designed with love',
  });

  return createDivElement({
    classList: ['sub-footer'],
    children: [allRightsElement, rssElement, studentElement, designElement],
  });
}
