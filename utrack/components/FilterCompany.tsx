import React from 'react';

interface FilterCompanyProps {
    companies: string[];
    selectedCompany: string | null;
    onChange: (company: string | null) => void;
}

const FilterCompany: React.FC<FilterCompanyProps> = ({ companies, selectedCompany, onChange }) => {
    return (
        <select
        className="border px-2 py-2 rounded w-full max-w-sm focus:outline-none focus:border-indigo-400"
        value={selectedCompany || ''}
        onChange={e => onChange(e.target.value || null)}
        >
        <option value=''>Все компании</option>
        {companies.map(company => (
        <option key={company} value={company}>
            {company}
        </option>
        ))}
    </select>
    );
};

export default FilterCompany;
