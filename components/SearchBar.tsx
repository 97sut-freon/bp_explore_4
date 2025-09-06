import React, { useState, useMemo } from 'react';
import SearchIcon from './icons/SearchIcon';

export interface SearchTerms {
  idTerm: string;
  contactTerm: string;
  orgTerm: string;
  titleTerm: string;
}

type CacheStatus = 'idle' | 'syncing' | 'ready' | 'failed';

interface SearchBarProps {
  onSearch: (terms: SearchTerms) => void;
  isLoading: boolean;
  orgCacheStatus: CacheStatus;
  contactCacheStatus: CacheStatus;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading, orgCacheStatus, contactCacheStatus }) => {
  const [idTerm, setIdTerm] = useState('');
  const [contactTerm, setContactTerm] = useState('');
  const [orgTerm, setOrgTerm] = useState('');
  const [titleTerm, setTitleTerm] = useState('');

  const activeInput = useMemo(() => {
    if (idTerm) return 'id';
    if (contactTerm) return 'contact';
    if (orgTerm) return 'org';
    if (titleTerm) return 'title';
    return 'none';
  }, [idTerm, contactTerm, orgTerm, titleTerm]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const terms: SearchTerms = {
        idTerm: idTerm.trim(),
        contactTerm: contactTerm.trim(),
        orgTerm: orgTerm.trim(),
        titleTerm: titleTerm.trim(),
    };
    if ((terms.idTerm || terms.contactTerm || terms.orgTerm || terms.titleTerm) && !isLoading) {
      onSearch(terms);
    }
  };

  const isSearchDisabled = isLoading || activeInput === 'none';

  const isOrgSearchDisabled = isLoading || orgCacheStatus !== 'ready' || (activeInput !== 'org' && activeInput !== 'none');
  const getOrgSearchTooltip = () => {
    if (orgCacheStatus === 'syncing') return 'Organisation data syncing, please wait...';
    if (orgCacheStatus === 'failed') return 'Organisation data failed to load. Search is disabled.';
    return '';
  }

  const isContactAndTitleSearchDisabled = isLoading || contactCacheStatus !== 'ready' || (activeInput !== 'contact' && activeInput !== 'title' && activeInput !== 'none');
  const getContactAndTitleSearchTooltip = () => {
    if (contactCacheStatus === 'syncing') return 'Project & Event data syncing, please wait...';
    if (contactCacheStatus === 'failed') return 'Project & Event data failed to load. Search is disabled.';
    return '';
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            {/* ID Search */}
            <div className="flex flex-col">
                <label htmlFor="id-search" className="mb-1 font-semibold text-gray-700">Search by ID</label>
                <input
                  id="id-search"
                  type="text"
                  value={idTerm}
                  onChange={(e) => { setIdTerm(e.target.value); setContactTerm(''); setOrgTerm(''); setTitleTerm(''); }}
                  placeholder="e.g., 52740"
                  disabled={isLoading || (activeInput !== 'id' && activeInput !== 'none')}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
            </div>

            {/* Contact Name Search */}
            <div className="flex flex-col">
                <label htmlFor="contact-search" className="mb-1 font-semibold text-gray-700">Search by Contact Name</label>
                <input
                  id="contact-search"
                  type="text"
                  value={contactTerm}
                  onChange={(e) => { setContactTerm(e.target.value); setIdTerm(''); setOrgTerm(''); setTitleTerm(''); }}
                  placeholder="e.g., Detlev Zander"
                  disabled={isContactAndTitleSearchDisabled}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  title={getContactAndTitleSearchTooltip()}
                />
            </div>
            
            {/* Organisation Name Search */}
            <div className="flex flex-col relative">
                <label htmlFor="org-search" className="mb-1 font-semibold text-gray-700">Search by Organisation Name</label>
                <input
                  id="org-search"
                  type="text"
                  value={orgTerm}
                  onChange={(e) => { setOrgTerm(e.target.value); setIdTerm(''); setContactTerm(''); setTitleTerm(''); }}
                  placeholder="e.g., CARE Deutschland"
                  disabled={isOrgSearchDisabled}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  title={getOrgSearchTooltip()}
                />
            </div>

            {/* Project/Event Name Search */}
            <div className="flex flex-col relative">
                <label htmlFor="title-search" className="mb-1 font-semibold text-gray-700">Search by Project/Event Name</label>
                <input
                  id="title-search"
                  type="text"
                  value={titleTerm}
                  onChange={(e) => { setTitleTerm(e.target.value); setIdTerm(''); setContactTerm(''); setOrgTerm(''); }}
                  placeholder="e.g., Brunnenbau in Äthiopien"
                  disabled={isContactAndTitleSearchDisabled}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  title={getContactAndTitleSearchTooltip()}
                />
            </div>
        </div>
        <div className="mt-6 text-center">
             <button
                type="submit"
                disabled={isSearchDisabled}
                className="bg-brand-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
            >
                <SearchIcon className="w-5 h-5" />
                Search
            </button>
        </div>
    </form>
  );
};

export default SearchBar;