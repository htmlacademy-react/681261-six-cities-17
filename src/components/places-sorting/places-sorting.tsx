import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentSort } from '../../store/selectors/offers.ts';
import { setCurrentSort } from '../../store/slices/offer.ts';
import { SortOption } from '../../constant.ts';

const sortOptions: SortOption[] = [
  SortOption.Popular,
  SortOption.LowToHigh,
  SortOption.HighToLow,
  SortOption.TopRated,
];

export default function PlacesSorting(): JSX.Element {
  const dispatch = useDispatch();
  const currentSort = useSelector(getCurrentSort);

  const dropdownRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionSelect = (option: SortOption) => {
    dispatch(setCurrentSort(option));
    setIsOpen(false);
  };

  const handleClickOutsideDropdown = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleKeyDownOnDocument = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideDropdown);
    document.addEventListener('keydown', handleKeyDownOnDocument);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDropdown);
      document.removeEventListener('keydown', handleKeyDownOnDocument);
    };
  }, []);

  return (
    <form className="places__sorting" action="#" method="get" ref={dropdownRef}>
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleDropdownToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleDropdownToggle();
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
              onClick={() => handleOptionSelect(option)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOptionSelect(option);
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
