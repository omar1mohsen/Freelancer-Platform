
import React from 'react';
import {
  LinkedinFilled,
  FacebookFilled,
  TwitterOutlined,
  InstagramFilled,
  YoutubeFilled,
} from '@ant-design/icons';
import { useTranslations } from 'next-intl';

const Footer: React.FC = () => {
  const t = useTranslations('footer');

  const categories = [
    'categories.appDevelopment',
    'categories.programming',
    'categories.uiDesign',
    'categories.videoAnimation',
    'categories.writing',
    'categories.musicAudio',
    'categories.digitalMarketing',
    'categories.aiServices',
    'categories.consulting',
    'categories.blog',
    'categories.automation',
    'categories.mechanic',
    'categories.photography',
  ];

  const forClients = [
    'yourAccount',
    'careers',
    'pressNews',
    'partnerships',
    'intellectualProperty',
    'test',
  ];

  const company = [
    'contact',
    'inviteFriend',
    'privacyPolicy',
    'termsOfService',
    'upphotoGuides',
    'helpSupport',
  ];

  const forFreelancers = [
    'trustSafety',
    'buyingOnUpPhoto',
    'sellingOnUpPhoto',
  ];

  const businessSolutions = ['events', 'communityStandards', 'podcast'];

  const socialIcons = [
    { icon: <LinkedinFilled />, label: 'LinkedIn' },
    { icon: <FacebookFilled />, label: 'Facebook' },
    { icon: <TwitterOutlined />, label: 'Twitter' },
    { icon: <InstagramFilled />, label: 'Instagram' },
    { icon: <YoutubeFilled />, label: 'YouTube' },
  ];

  const renderLinks = (list: string[]) => (
    <ul className="space-y-2">
      {list.map((key) => (
        <li key={key}>
          <a href="#" className="text-gray-600 text-sm hover:text-green-500 transition-colors">
            {t(key)}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="bg-gray-100 mt-16 py-12">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">
              {t('categories.title')}
            </h3>
            {renderLinks(categories)}
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">{t('forClients')}</h3>
            {renderLinks(forClients)}
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">{t('company')}</h3>
            {renderLinks(company)}

            <h3 className="text-base font-semibold text-gray-800 mt-6 mb-4">
              {t('forFreelancers')}
            </h3>
            {renderLinks(forFreelancers)}
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">{t('businessSolutions')}</h3>
            {renderLinks(businessSolutions)}
          </div>
        </div>

        <div className="border-t border-gray-300 mt-12 max-md:text-center pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-2">{t('socialMedia')}</h4>
            <div className="flex gap-4">
              {socialIcons.map((item, i) => (
                <span
                  key={i}
                  className="text-xl text-gray-600 hover:text-green-500 cursor-pointer transition-colors"
                  title={item.label}
                >
                  {item.icon}
                </span>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-600">{t('copyright')}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
