// import Select from 'react-select';
import { SelectInput } from '../Styled/Styled';

const options = [
    { value: 'first-bank', label: 'First Bank' },
    { value: 'guaranty-trust-bank', label: 'Guaranty Trust Bank' },
    { value: 'polaris-bank', label: 'Polaris Bank' },
];

const SearchableSelect = () => {
    return (
        <SelectInput
            options={options}
            isSearchable={true}
        />
    );
};

export default SearchableSelect;