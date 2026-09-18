import './styles.scss';
import { getHomePageElement } from './pages/home-page/home-page.ts';

const app = document.querySelector<HTMLDivElement>('#app')!;
app.appendChild(getHomePageElement());
