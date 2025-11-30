
import React, { useState, useCallback, useMemo } from 'react';
import { ORGANIZATIONS } from './constants';
import type { Organization } from './types';
import Header from './components/Header';
import OrganizationCard from './components/OrganizationCard';
import EmailForm from './components/EmailForm';
import SuccessMessage from './components/SuccessMessage';

type Selections = Record<string, boolean>;

const App: React.FC = () => {
  const [selections, setSelections] = useState<Selections>(
    ORGANIZATIONS.reduce((acc, org) => ({ ...acc, [org.id]: false }), {})
  );
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSelectionChange = useCallback((orgId: string, isSelected: boolean) => {
    setSelections(prev => ({ ...prev, [orgId]: isSelected }));
  }, []);

  const allSelected = useMemo(
    () => ORGANIZATIONS.every(org => selections[org.id]),
    [selections]
  );

  const handleToggleAll = useCallback(() => {
    const newSelections = ORGANIZATIONS.reduce(
      (acc, org) => ({ ...acc, [org.id]: !allSelected }),
      {}
    );
    setSelections(newSelections);
  }, [allSelected]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim()) {
      setError('Please enter your first name.');
      return;
    }
    if (!lastName.trim()) {
      setError('Please enter your last name.');
      return;
    }
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const selectedOrgs = Object.keys(selections).filter(id => selections[id]);
    if (selectedOrgs.length === 0) {
      setError('Please select at least one organization to subscribe to.');
      return;
    }

    setFormState('submitting');
    
    // Simulate API call
    console.log('Submitting data:', {
      firstName,
      lastName,
      email,
      subscriptions: selectedOrgs,
    });

    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };
  
  const handleReset = () => {
    setSelections(ORGANIZATIONS.reduce((acc, org) => ({ ...acc, [org.id]: false }), {}));
    setFirstName('');
    setLastName('');
    setEmail('');
    setFormState('idle');
    setError(null);
  };

  const selectedOrganizations = ORGANIZATIONS.filter(org => selections[org.id]);

  if (formState === 'success') {
    return (
        <SuccessMessage 
          firstName={firstName}
          email={email}
          organizations={selectedOrganizations}
          onReset={handleReset}
        />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <Header />
        <form onSubmit={handleSubmit}>
          <div className="mt-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h2 className="text-2xl font-semibold text-gray-700">Opt-In Ballot</h2>
              <button
                type="button"
                onClick={handleToggleAll}
                className="mt-2 sm:mt-0 text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors focus:outline-none focus:underline"
              >
                {allSelected ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <p className="text-gray-600 mb-8">
              Please select the organizations from which you would like to receive communications.
            </p>
            <div className="grid grid-cols-1 gap-6">
              {ORGANIZATIONS.map(org => (
                <OrganizationCard
                  key={org.id}
                  organization={org}
                  isSelected={selections[org.id]}
                  onSelectionChange={handleSelectionChange}
                />
              ))}
            </div>
          </div>

          <EmailForm
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            isSubmitting={formState === 'submitting'}
            error={error}
          />
        </form>
      </main>
      <footer className="text-center py-6 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Southern Delaware Cultural Alliance. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
