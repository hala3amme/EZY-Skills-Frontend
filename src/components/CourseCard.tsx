import { Link } from 'react-router-dom';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  rating?: number;
  duration?: string;
  featured?: boolean;
}

export default function CourseCard({
  id,
  title,
  description,
  image,
  rating = 4.5,
  duration,
  featured = false,
}: CourseCardProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(rating));

  return (
    <div className={`bg-white rounded-[27px] shadow-[0px_4px_7px_0px_rgba(0,0,0,0.11)] overflow-hidden transition-transform hover:scale-[1.02] ${
      featured ? 'border-2 border-[#f98149]' : ''
    }`}>
      {/* Image Section */}
      <div className="h-[180px] bg-gradient-to-br from-[#003f7d] to-[#0056a8] flex items-center justify-center p-6">
        <img 
          src={image} 
          alt={title} 
          className="max-h-[120px] max-w-[200px] object-contain"
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-[#003f7d] font-poppins font-semibold text-[22px] mb-2">
          {title}
        </h3>
        <p className="text-[#5f6265] font-poppins text-[14px] leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {stars.map((filled, index) => (
            <svg
              key={index}
              className={`w-4 h-4 ${filled ? 'text-[#ffc107]' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-[#5f6265] text-[12px] ml-1">{rating}</span>
          {duration && (
            <>
              <span className="text-[#5f6265] text-[12px] mx-2">•</span>
              <span className="text-[#5f6265] text-[12px]">{duration}</span>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to={`/course/${id}`}
            className="flex-1 py-2 bg-[#003f7d] text-white text-center font-poppins text-[14px] font-medium rounded-lg hover:bg-[#002f5d] transition-colors"
          >
            Demo
          </Link>
          <button className="flex-1 py-2 border-2 border-[#f98149] text-[#f98149] font-poppins text-[14px] font-medium rounded-lg hover:bg-[#f98149] hover:text-white transition-colors">
            Download Curriculum
          </button>
        </div>
      </div>
    </div>
  );
}
