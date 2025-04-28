import TypeFilterItem from './TypeFilterItem';

const TypeFilterList = ({ selectedTypes, onDelete }) => {
  const typeLabels = {
    SENSITIVE: '민감성',
    DRY: '건성',
    OILY: '지성',
    COMBINED: '복합성',
  };
  const typeOrder = ['DRY', 'OILY', 'SENSITIVE', 'COMBINED'];
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
