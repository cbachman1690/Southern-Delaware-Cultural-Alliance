
import React from 'react';
import type { Organization } from '../types';
import { CheckIcon } from './icons/CheckIcon';

interface OrganizationCardProps {
  organization: Organization;
  isSelected: boolean;
  onSelectionChange: (id: string, selected: boolean) => void;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({ organization, isSelected, onSelectionChange }) => {
  const { id, name, description, logoUrl } = organization;

  return (
    <label
      htmlFor={id}
      className={`flex items-center p-4 sm:p-6 border rounded-lg shadow-sm cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'bg-teal-50 border-teal-500 ring-2 ring-teal-500'
          : 'bg-white border-gray-200 hover:border-teal-400 hover:shadow-md'
      }`}
    >
      <img src={logoUrl} alt={`${name} logo`} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mr-4 sm:mr-6" />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      <div className="ml-4 flex-shrink-0">
        <input
          type="checkbox"
          id={id}
          checked={isSelected}
          onChange={(e) => onSelectionChange(id, e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md flex items-center justify-center border-2 transition-colors ${
            isSelected ? 'bg-teal-600 border-teal-600' : 'bg-gray-100 border-gray-300'
          }`}
        >
          {isSelected && <CheckIcon className="w-5 h-5 text-white" />}
        </div>
      </div>
    </label>
  );
};

export default OrganizationCard;
