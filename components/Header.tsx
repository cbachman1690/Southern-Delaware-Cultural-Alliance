
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="inline-flex items-center justify-center bg-teal-100 text-teal-700 rounded-full p-3 mb-4">
        <SparklesIcon className="w-8 h-8" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
        A Year of Culture in Southern Delaware!
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
        Our organization is part of a vibrant tapestry of cultural offerings.
        Opt-in below to get updates from our sister organizations and stay connected to the fantastic arts and culture in our community.
      </p>
    </header>
  );
};

export default Header;
