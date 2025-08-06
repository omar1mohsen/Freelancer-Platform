
import React, { useMemo, useCallback } from 'react';
import {  Select, Button, Space, Tag, Input } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { useFreelancerStore } from '@/store/store';
import { SearchFavorite } from 'iconsax-reactjs';
import { IoSearch } from 'react-icons/io5';

const { Option } = Select;

const SearchFilters= () => {
  const t = useTranslations();

  const { filters, sortBy, searchTerm,freelancers,filteredFreelancers,setFilters, setSortBy, setSearchTerm,clearFilters } = useFreelancerStore();


  // generate filters options
  const filterOptions = useMemo(() => {
    const categories = [...new Set(freelancers.map(f => f.category).filter(Boolean))];
    const levels = [...new Set(freelancers.map(f => f.level))].sort();
    const locations = [...new Set(freelancers.map(f => f.location))].sort();
    
    return {
      categories,
      levels,
      locations,
      budgetRanges: [
        { value: '0-50', label: '$0 - $50', min: 0, max: 50 },
        { value: '50-100', label: '$50 - $100', min: 50, max: 100 },
        { value: '100+', label: '$100+', min: 100 }
      ],
      deliveryTimes: [
        { value: '1', label: '1 Day', days: 1 },
        { value: '3', label: '3 Days', days: 3 },
        { value: '5', label: '5 Days', days: 5 },
        { value: '7', label: '7 Days', days: 7 },
        { value: '14', label: '14 Days', days: 14 }
      ]
    };
  }, [freelancers]);


  const handleFilterChange = useCallback((filterType: string, value: string) => {
    setFilters({ [filterType]: value });
  }, [setFilters]);

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value as any);
  }, [setSortBy]);

  const handleClearFilters = useCallback(() => {
    clearFilters();
  }, [clearFilters]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    return Object.values(filters).filter(Boolean).length + (searchTerm ? 1 : 0);
  }, [filters, searchTerm]);

  // Get active filter tags
  const activeFilterTags = useMemo(() => {
    const tags = [];
    
    if (searchTerm) {
      tags.push({ key: 'search', label: `Search: "${searchTerm}"` });
    }
    
    if (filters.serviceOptions) {
      tags.push({ key: 'service', label: `Service: ${filters.serviceOptions}` });
    }
    
    if (filters.sellerDetails) {
      tags.push({ key: 'level', label: `Level: ${filters.sellerDetails.replace('level', '')}` });
    }
    
    if (filters.budget) {
      const budgetLabel = filterOptions.budgetRanges.find(b => b.value === filters.budget)?.label;
      tags.push({ key: 'budget', label: `Budget: ${budgetLabel}` });
    }
    
    if (filters.deliveryTime) {
      const deliveryLabel = filterOptions.deliveryTimes.find(d => d.value === filters.deliveryTime)?.label;
      tags.push({ key: 'delivery', label: `Delivery: ${deliveryLabel}` });
    }
    
    if (filters.location) {
      tags.push({ key: 'location', label: `Location: ${filters.location}` });
    }
    
    return tags;
  }, [filters, searchTerm, filterOptions]);

  return (
    <div className={`filters-wrapper`}>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">

        <Select
          placeholder={t('filters.serviceOptions', { default: 'Service Category' })}
          className="w-full"
          value={filters.serviceOptions || undefined}
          onChange={(value) => handleFilterChange('serviceOptions', value)}
          allowClear
          showSearch
        >
          {filterOptions.categories.map(category => (
            <Option key={category} value={category}>{category}</Option>
          ))}
        </Select>

        {/* Level Filter */}
        <Select
          placeholder={t('filters.sellerDetails', { default: 'Seller Level' })}
          className="w-full"
          value={filters.sellerDetails || undefined}
          onChange={(value) => handleFilterChange('sellerDetails', value)}
          allowClear
        >
          {filterOptions.levels.map(level => (
            <Option key={level} value={`level${level}`}>
              Level {level} ({freelancers.filter(f => f.level === level).length})
            </Option>
          ))}
        </Select>

        {/* Budget Filter */}
        <Select
          placeholder={t('filters.budget', { default: 'Budget Range' })}
          className="w-full"
          value={filters.budget || undefined}
          onChange={(value) => handleFilterChange('budget', value)}
          allowClear
        >
          {filterOptions.budgetRanges.map(range => (
            <Option key={range.value} value={range.value}>
              {range.label}
            </Option>
          ))}
        </Select>

        {/* Delivery Time Filter */}
        <Select
          placeholder={t('filters.deliveryTime', { default: 'Delivery Time' })}
          className="w-full"
          value={filters.deliveryTime || undefined}
          onChange={(value) => handleFilterChange('deliveryTime', value)}
          allowClear
        >
          {filterOptions.deliveryTimes.map(time => (
            <Option key={time.value} value={time.value}>
              {time.label}
            </Option>
          ))}
        </Select>
      </div>

      {/* Location and Sort Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch justify-between sm:items-center mb-4">
        <Input
            placeholder={t('filters.location', { default: 'Location' })}
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            allowClear
            className="md:max-w-[335px]"
            prefix={<IoSearch className=" text-gray-400" />}
        />

        <Select
          value={sortBy}
          onChange={handleSortChange}
          className="min-w-[180px]"
        >
          <Option value="mostRated">{t('common.mostRated', { default: 'Highest Rated' })}</Option>
          <Option value="lowestRated">{t('common.lowestRated', { default: 'Lowest Rated' })}</Option>
          <Option value="highestPrice">{t('common.highestPrice', { default: 'Highest Price' })}</Option>
          <Option value="lowestPrice">{t('common.lowestPrice', { default: 'Lowest Price' })}</Option>
          <Option value="newest">{t('common.newest', { default: 'Newest' })}</Option>
          <Option value="mostReviewed">{t('common.mostReviewed', { default: 'Most Reviews' })}</Option>
        </Select>
      </div>

      {/* Active Filters & Results Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {activeFilterTags.length > 0 && (
            <>
              <span className="text-sm text-gray-600 font-medium">Active filters:</span>
              {activeFilterTags.map(tag => (
                <Tag
                  key={tag.key}
                  closable
                  onClose={() => {
                    if (tag.key === 'search') {
                      setSearchTerm('');
                    } else {
                      const filterKey = tag.key === 'service' ? 'serviceOptions' :
                                      tag.key === 'level' ? 'sellerDetails' :
                                      tag.key === 'budget' ? 'budget' :
                                      tag.key === 'delivery' ? 'deliveryTime' :
                                      tag.key === 'location' ? 'location' : '';
                      if (filterKey) {
                        setFilters({ [filterKey]: '' });
                      }
                    }
                  }}
                  className="text-xs"
                >
                  {tag.label}
                </Tag>
              ))}
            </>
          )}
        </div>

        <Space>
          <span className="text-sm text-gray-600">
            {filteredFreelancers.length} of {freelancers.length} freelancers
          </span>
          
          {activeFiltersCount > 0 && (
            <Button 
              type="text" 
              size="small"
              icon={<ClearOutlined />}
              onClick={handleClearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              Clear all
            </Button>
          )}
        </Space>
      </div>
    </div>
  );
};

export default SearchFilters;