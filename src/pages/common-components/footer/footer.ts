import './footer.scss';
import {
  createDivElement,
  createSpanElement,
  createImgElement,
  createLinkElement,
  createHeadingElement,
} from '../../../lib/element.ts';
import { getLogoElement } from '../logo/logo.ts';

export function getFooterElement() {
  const footerElement = document.createElement('footer');
  footerElement.classList.add('footer');
  footerElement.append(getFooterContent(), getSubFooterElement());
  return footerElement;
}

function getFooterContent() {
  const logoSectionElement = getLogoSectionElement();
  const exploreSectionElement = getExploreSectionElement();
  const companySectionElement = getCompanySectionElement();
  const communitySectionElement = getCommunitySectionElement();

  return createDivElement({
    classList: ['footer-content'],
    children: [
      logoSectionElement,
      exploreSectionElement,
      companySectionElement,
      communitySectionElement,
    ],
  });
}

function getLogoSectionElement() {
  const logoSectionTextElement = createSpanElement({
    classList: ['logo-section-text'],
    textContent:
      'Take a short break and have fun. Hundreds of curated casual mini-games ' +
      'right in your web browser. No download required.',
  });

  return createDivElement({
    classList: ['section', 'logo-section'],
    children: [getLogoElement(), logoSectionTextElement],
  });
}

function getExploreSectionElement() {
  const exploreSectionItems = [
    {
      textContent: 'Home',
      href: '/home',
    },
    {
      textContent: 'Library',
      href: '#library',
    },
    {
      textContent: 'Categories',
      href: '/home',
    },
    {
      textContent: 'Tournaments',
      href: '/home',
    },
  ];
  const exploreSectionLinks = exploreSectionItems.map((item) =>
    createLinkElement({
      textContent: item.textContent,
      href: item.textContent,
    }),
  );

  const exploreSectionHeading = createHeadingElement({
    type: 'h5',
    textContent: 'Explore',
  });

  return createDivElement({
    classList: ['section', 'explore-section'],
    children: [exploreSectionHeading, ...exploreSectionLinks],
  });
}

function getCompanySectionElement() {
  const companySectionItems = ['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'];
  const companySectionLinks = companySectionItems.map((item) =>
    createLinkElement({
      textContent: item,
      href: `/home`,
    }),
  );

  const companySectionHeading = createHeadingElement({
    type: 'h5',
    textContent: 'Company',
  });

  return createDivElement({
    classList: ['section', 'company-section'],
    children: [companySectionHeading, ...companySectionLinks],
  });
}

function getCommunitySectionElement() {
  const communitySectionItems = ['share', 'chat', 'rss-feed'];
  const communitySectionLinks = communitySectionItems.map((item) =>
    createLinkElement({
      href: `/home`,
      children: [
        createImgElement({
          src: `icons/${item}.svg`,
          alt: `Icon "${item}"`,
        }),
      ],
    }),
  );
  const communitySectionLinksContainer = createDivElement({
    classList: ['icons-container'],
    children: communitySectionLinks,
  });

  const communitySectionHeading = createHeadingElement({
    type: 'h5',
    textContent: 'Community',
  });

  return createDivElement({
    classList: ['section', 'community-section'],
    children: [communitySectionHeading, communitySectionLinksContainer],
  });
}

function getSubFooterElement() {
  const allRightsElement = createSpanElement({
    classList: ['all-rights'],
    textContent: '© 2026 MiniGames. All rights reserved.',
  });

  const rssLogo = createImgElement({
    classList: ['rss-logo'],
    src: 'icons/rss-logo.svg',
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
    src: 'icons/gh-logo.svg',
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
