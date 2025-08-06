import ImageWithFallback from "@/components/UiComponents/ImageWithFallback";
import { Freelancer } from "@/types";
import { useTranslations } from "next-intl";

interface FreelancerCardProps{
    freelancer:Freelancer
}

const FreelancerCard: React.FC<FreelancerCardProps> = ({ freelancer }) => {
  const t = useTranslations('common');

  return (
    <div
      className="rounded-xl border border-solid shadow-sm border-primary/20 overflow-hidden "
    >
      <div className="h-[280px] overflow-hidden">
        <ImageWithFallback
            width={500}
            height={500}
            alt={freelancer.name}
            src={freelancer.profileImage}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="py-4 px-4">
        <div className="flex items-center mb-3">
          <ImageWithFallback
            width={40}
            height={40}
            src={freelancer.profileImage}
            alt={freelancer.name}
            className="size-10 rounded-full me-2"
          />
          <span className="font-semibold text-base line-clamp-1">{freelancer.name}</span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            {t('level')} {freelancer.level}
          </span>
          <div className="text-xs text-yellow-400">
            {/* Hardcoded stars, can replace with star icon logic */}
            ★★★☆☆
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-3 line-clamp-1">
          {freelancer.role}
        </div>

        <div className="flex items-center mb-3">
          <div className="text-yellow-400 text-base">
            {'★'.repeat(Math.round(freelancer.rating))}
            {'☆'.repeat(5 - Math.round(freelancer.rating))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {freelancer.rating} ({freelancer.reviewCount})
          </span>
        </div>

        <div className="text-green-500 font-semibold text-base mb-4">
          {t('from')} {freelancer.price} {freelancer.currency}
        </div>

        <button
          type="button"
          className="w-full app-btn"
        >
          {t('seeMore')}
        </button>
      </div>
    </div>
  );
};

export default FreelancerCard;
