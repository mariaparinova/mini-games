import './select-control.scss';

export function getSelectControl(params: SelectControlParams) {
  const { name, id, options } = params;

  const optionElements = options.map((option) => {
    const { name, type } = option;

    const optionElement = document.createElement('option');
    optionElement.classList.add('option');
    optionElement.value = type;
    optionElement.textContent = name;
    return optionElement;
  });

  const selectElement = document.createElement('select');
  selectElement.classList.add('select');
  selectElement.name = name;
  selectElement.id = id;
  selectElement.append(...optionElements);

  return selectElement;
}

type SortType = 'rating_asc' | 'rating_desc' | 'name_asc' | 'name_desc';

interface SelectControlParams {
  name: string;
  id: string;
  options: { name: string; type: SortType }[];
  onChange: (event: Event) => void;
}
