import Icon from './common/Icon';

export default function Card({ image, title, rating, reviewCount, price }) {
  const formatted = price.toLocaleString();
  return (
    <div>
      <article className='g-4 flex flex-col rounded-[18px] bg-amber-500 px-17 py-16'>
        <h3>{title}</h3>
        <div>
          <Icon icon='Star' className='size-20 text-[#FFC23D]' />
          <div>
            <span>{rating}</span>
            <span>({reviewCount})</span>
          </div>
          <p>
            ₩ {formatted} <span>/ 인</span>
          </p>
        </div>
      </article>
    </div>
  );
}
