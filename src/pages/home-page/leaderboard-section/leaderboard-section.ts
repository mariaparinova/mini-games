import './leaderboard-section.scss';
import { createDivElement, createHeadingElement, createSpanElement } from '../../../lib/element.ts';

const players = {
  data: [
    {
      rank: 1,
      playerName: 'Alex_Pro99',
      gamesPlayed: 142,
      totalScore: 94250,
      streakDays: 12,
      favoriteGameSlug: 'heartopia',
      favoriteGameName: 'Heartopia',
    },
    {
      rank: 2,
      playerName: 'CozyGamer_x',
      gamesPlayed: 118,
      totalScore: 81400,
      streakDays: 8,
      favoriteGameSlug: 'cat-mail-co',
      favoriteGameName: 'Cat Mail Co.',
    },
    {
      rank: 3,
      playerName: 'MatchMaster',
      gamesPlayed: 98,
      totalScore: 72110,
      streakDays: 5,
      favoriteGameSlug: 'tiny-glade',
      favoriteGameName: 'Tiny Glade',
    },
    {
      rank: 4,
      playerName: 'BubblePop',
      gamesPlayed: 87,
      totalScore: 65900,
      streakDays: 3,
      favoriteGameSlug: 'whisper-of-the-house',
      favoriteGameName: 'Whisper of the House',
    },
    {
      rank: 5,
      playerName: 'SudokuGod',
      gamesPlayed: 74,
      totalScore: 59320,
      streakDays: 2,
      favoriteGameSlug: 'cat-chess',
      favoriteGameName: 'Cat Chess',
    },
  ],
  meta: {
    totalItems: 5,
    description: 'Top Players This Week',
  },
};

const tHeadItems = ['rank', 'player', 'games played', 'total score', 'streak', 'favorite game'];

export function leaderboardSection() {
  const heading = createHeadingElement({
    type: 'h2',
    textContent: 'Top Players This Week ',
    classList: ['heading', 'decorated'],
  });
  const tableContainer = createDivElement({
    classList: ['leaderboard-table-container'],
    children: [createLeaderboardSectionTable()],
  });

  return createDivElement({
    classList: ['leaderboard-section'],
    children: [heading, tableContainer],
  });
}

function createLeaderboardSectionTable() {
  const tableHeadElements = tHeadItems.map((item) => {
    const th = document.createElement('th');
    th.append(
      createHeadingElement({
        type: 'h4',
        textContent: item,
        classList: [item.replace(' ', '-')],
      }),
    );
    return th;
  });

  const tableRow = document.createElement('tr');
  tableRow.append(...tableHeadElements);

  const tableHead = document.createElement('thead');
  tableHead.classList.add('leaderboard-table-head');
  tableHead.append(tableRow);

  const tableRows = players.data.map((player, i) => {
    const row = document.createElement('tr');

    const values = [
      `#${player.rank}`,
      player.playerName,
      player.gamesPlayed,
      player.totalScore,
      `🔥 ${player.streakDays} days`,
      player.favoriteGameName,
    ];

    const cells = values.map((val, index) => {
      const td = document.createElement('td');
      td.classList.add(tHeadItems[index].replace(' ', '-'));

      if (val === player.playerName) {
        td.append(createNameElement(player.playerName, i));
        return td;
      }

      if (val === player.favoriteGameName) {
        td.append(createFavoriteGameName(player.favoriteGameName));
        return td;
      }

      if (val === player.totalScore) {
        td.textContent = val.toLocaleString('en-US');
        return td;
      }

      td.textContent = `${val}`;
      return td;
    });

    row.append(...cells);
    return row;
  });

  const tableBody = document.createElement('tbody');
  tableBody.append(...tableRows);
  tableRows[0].children[0].classList.add('first');

  const table = document.createElement('table');
  table.classList.add('leaderboard-table');
  table.append(tableHead, tableBody);

  return table;
}

function createNameElement(playerName: string, index: number) {
  const initials = playerName.match(/[A-Z]/g) || [];
  const initialIcon = createSpanElement({
    classList: ['initials', `initials-${index + 1}`],
    textContent: initials.join(''),
  });
  const nameElement = createSpanElement({
    textContent: playerName,
  });

  return createDivElement({
    classList: ['player-name'],
    children: [initialIcon, nameElement],
  });
}

function createFavoriteGameName(name: string) {
  return createSpanElement({
    classList: ['text'],
    textContent: name,
  });
}
