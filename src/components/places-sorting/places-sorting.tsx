import { useState, useRef, useEffect } from 'react';
import { SortOption } from '../../types.ts';

type PlacesSortingProps = {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions: SortOption[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

export default function PlacesSorting({ currentSort, onSortChange }: PlacesSortingProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLFormElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: SortOption) => {
    onSortChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <form className="places__sorting" action="#" method="get" ref={dropdownRef}>
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={toggleDropdown}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDropdown();
          }
        }}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {sortOptions.map((option) => (
            <li
              key={option}
              className={`places__option ${option === currentSort ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => handleOptionClick(option)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOptionClick(option);
                }
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
