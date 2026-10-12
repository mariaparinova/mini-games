import { createDivElement, createImgElement, createSpanElement } from '../../../lib/element.ts';
import { getProfileInitials, getUserName, userData } from '../../../user/user.ts';

export const DEFAULT_USER_NAME = 'User';

export function createUserPhotoElement(): HTMLDivElement {
  const { userName, avatarUrl } = userData;

  const avatarContainer = createDivElement({
    classList: ['user-avatar'],
  });

  const renderInitials = () => {
    let initials: string | null = null;

    avatarContainer.replaceChildren();

    if (userName) {
      initials = getProfileInitials(userName);
    }

    if (initials) {
      const initialsElement = createSpanElement({
        classList: ['avatar-initials'],
        textContent: initials,
      });

      avatarContainer.append(initialsElement);
    } else {
      const initialsElement = createSpanElement({
        classList: ['avatar-initials'],
        textContent: DEFAULT_USER_NAME,
      });

      avatarContainer.append(initialsElement);
    }
  };

  const cleanAvatarUrl = avatarUrl?.trim();
  if (cleanAvatarUrl) {
    const img = createImgElement({
      classList: ['avatar-img'],
      src: cleanAvatarUrl,
      alt: 'User avatar',
    });
    img.addEventListener('error', () => {
      renderInitials();
    });
    avatarContainer.append(img);
  } else {
    renderInitials();
  }

  return avatarContainer;
}

export function getUserProfileElement(): HTMLDivElement {
  const photoElement = createUserPhotoElement();

  const nameElement = createSpanElement({
    classList: ['profile-name'],
    textContent: getUserName(),
  });

  return createDivElement({
    classList: ['user-profile'],
    children: [photoElement, nameElement],
  });
}
