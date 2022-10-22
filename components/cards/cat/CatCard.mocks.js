import { ICatCard, ICatCard2 } from './CatCard';

Object.assign(ICatCard, {
  tag: 'Felines',
  title: `What's new in Cats`,
  body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis molestiae non nemo doloribus. Doloremque, nihil! At ea atque quidem!',
  author: 'Alex',
  time: '2h ago',
});

Object.assign(ICatCard2, {
  tag: 'XXX Felines',
  title: `XXX What's new in Cats`,
  body: 'XXX Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi perferendis molestiae non nemo doloribus. Doloremque, nihil! At ea atque quidem!',
  author: 'XXX Alex',
  time: 'XXX 2h ago',
});

const base = ICatCard;
const base2 = ICatCard2;

export const mockCatCardProps = {
  base,
  base2,
};
