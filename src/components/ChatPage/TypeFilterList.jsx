import TypeFilterItem from './TypeFilterItem';

// 스스로 코드를 짜볼 것...
const TypeFilterList = ({ selectedTypes, onDelete }) => {
  const typeLabels = {
    SENSITIVE: '민감성',
    DRY: '건성',
    OILY: '지성',
    COMBINATION: '복합성',
  };
  const typeOrder = ['DRY', 'OILY', 'SENSITIVE', 'COMBINATION'];
  const sortedSelectedTypes = selectedTypes.sort(
    (a, b) => typeOrder.indexOf(a) - typeOrder.indexOf(b)
  );

  return (
    <div className="flex flex-wrap gap-2">
      {sortedSelectedTypes.map((type, index) => (
        <TypeFilterItem
          key={`${index}-${type}`}
          label={typeLabels[type]}
          type={type}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
export default TypeFilterList;
