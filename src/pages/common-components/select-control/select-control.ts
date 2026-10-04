import './select-control.scss';

export function getSelectControl(params: SelectControlParams) {
  const { name, id, options, onChange } = params;

  const optionElements = options.map((option) => {
    const { name, value } = option;

    const optionElement = document.createElement('option');
    optionElement.classList.add('option');
    optionElement.value = value;
    optionElement.textContent = name;
    return optionElement;
  });

  const selectElement = document.createElement('select');
  selectElement.classList.add('select');
  selectElement.name = name;
  selectElement.id = id;
  selectElement.addEventListener('change', onChange);
  selectElement.append(...optionElements);

  return selectElement;
}

export type Sort = 'rating-asc' | 'rating-desc' | 'name-asc' | 'name-desc';

interface SelectControlParams {
  name: string;
  id: string;
  options: { name: string; value: Sort }[];
  onChange: (event: Event) => void;
}
