'use client';

import React, { useEffect, useState } from 'react';
import { mockFreelancers } from '@/data';
import { useFreelancerStore } from '@/store/store';
import FreelancerCard from '@/components/sharedComponents/cards/FreelancerCard';
import { useTranslations } from 'next-intl';
import LoaderPage from '@/components/UiComponents/Loader/LoaderPage';
import SearchFilters from '@/components/pagesComponents/home/SearchFilters';

import "@/styles/pages/home.scss"
import AppSkeleton from '@/components/UiComponents/Loader/AppSkeleton';

export default function Page() {
  const t = useTranslations('common');
  const { filteredFreelancers, setFreelancers,isLoading:sortLoading } = useFreelancerStore();
  const [isLoading,setIsLoading] = useState(true);

  useEffect(()=>{
    setTimeout(() => {
      setIsLoading(false)
    }, 300);
  },[])

  useEffect(() => {
    setFreelancers(mockFreelancers);
  }, [setFreelancers]);

  if(isLoading) return <LoaderPage />

  return (
      <main className="container py-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            {t('results')}
          </h2>

          <SearchFilters />

          <section className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {filteredFreelancers.length} Result{filteredFreelancers.length !== 1 ? 's' : ''}
            </h3>

            {sortLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
                {[...Array(6)].map((value,index)=><AppSkeleton key={`skeleton_${index}`} width='100%' height='540px'/>)}
              </div>
            ): filteredFreelancers.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
                {filteredFreelancers.map((freelancer) => (
                  <div key={freelancer.id} className="w-full">
                    <FreelancerCard freelancer={freelancer} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white text-center py-12 px-6 rounded-lg shadow-sm">
                <h4 className="text-lg text-gray-600 mb-2">No freelancers found</h4>
                <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
              </div>
            )}
          </section>
      </main>
  );
}
