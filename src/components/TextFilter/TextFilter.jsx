import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTextFilter, selectTextFilter } from "../../redux/filtersSlice";

export default function TextFilter() {
  const id = useId();
  const dispatch = useDispatch();
  // отримуємо поточне значення filter через useSelector (із filtersSlice)
  // selectTextFilter записуємо в filtersSlice як окрему змінну, яку експортуємо.
  //    По факту це щоб не дублювати код (state) => state.filters.text всюди де він нам потрібен
  const filter = useSelector(selectTextFilter);

  return (
    <div>
      <label htmlFor={id}>
        <b>Filter by text</b>
      </label>
      {/* це стандартний контрольований елемент */}
      <input
        type="text"
        id={id}
        value={filter}
        onChange={(e) => dispatch(changeTextFilter(e.target.value))}
      />
    </div>
  );
}
