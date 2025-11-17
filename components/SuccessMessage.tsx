
import React from 'react';
import type { Organization } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface SuccessMessageProps {
  email: string;
  organizations: Organization[];
  onReset: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ email, organizations, onReset }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <CheckCircleIcon className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="mt-6 text-3xl font-bold text-gray-900">Subscription Confirmed!</h2>
        <p className="mt-2 text-md text-gray-600">
          Thank you! A confirmation has been sent to <span className="font-semibold text-teal-700">{email}</span>.
        </p>
        <div className="mt-6 text-left bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-800">You have subscribed to:</h3>
          <ul className="mt-2 space-y-2">
            {organizations.map(org => (
              <li key={org.id} className="text-sm text-gray-600 flex items-center">
                <img src={org.logoUrl} alt={org.name} className="w-6 h-6 rounded-full mr-3"/>
                {org.name}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={onReset}
          className="mt-8 w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
        >
          Subscribe another email
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
