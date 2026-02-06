import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { courseService } from '../services';
import { getApiErrorMessage } from '../api';
import type { CourseSummary, PaginatedResponse } from '../types/api';

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesResponse, setCoursesResponse] = useState<PaginatedResponse<CourseSummary> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'opened', label: 'Opened' },
    { id: 'coming-soon', label: 'Coming Soon' },
    { id: 'archived', label: 'Archived' },
  ];

  useEffect(() => {
    let isCancelled = false;

    const handle = window.setTimeout(async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        // Note: the API supports `search`, `tag`, and `page`.
        // The current UI tabs don't map 1:1 to API filters yet, so we leave them as UI-only.
        const response = await courseService.listCourses({
          search: searchQuery.trim() ? searchQuery.trim() : undefined,
          page: currentPage,
        });
        if (!isCancelled) setCoursesResponse(response);
      } catch (error) {
        if (!isCancelled) setErrorMessage(getApiErrorMessage(error));
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }, 250);

    return () => {
      isCancelled = true;
      window.clearTimeout(handle);
    };
  }, [searchQuery, currentPage, reloadKey]);

  const paginatedCourses = coursesResponse?.data ?? [];

  const totalPages = useMemo(() => {
    if (!coursesResponse) return 1;
    return Math.max(1, coursesResponse.meta.last_page);
  }, [coursesResponse]);

  const visiblePageNumbers = useMemo(() => {
    const maxButtons = 7;
    const last = totalPages;
    const current = currentPage;

    if (last <= maxButtons) {
      return Array.from({ length: last }, (_, i) => i + 1);
    }

    const half = Math.floor(maxButtons / 2);
    const start = Math.max(1, Math.min(current - half, last - maxButtons + 1));
    const end = Math.min(last, start + maxButtons - 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  return (
    <div className="min-h-screen bg-[#fdfdfd]">
      <Header variant="light" />

      {/* Hero Section */}
      <section className="pt-[120px] md:pt-[160px] lg:pt-[200px] pb-8 md:pb-12 px-4 md:px-8 lg:px-[82px]">
        <div className="max-w-[1920px] mx-auto text-center">
          <h1 className="font-poppins font-bold text-[32px] md:text-[42px] lg:text-[52px] mb-4">
            <span className="text-[#003f7d]">Courses</span>{' '}
            <span className="text-[#f98149]">List</span>
          </h1>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-4 md:py-6 lg:py-8 px-4 md:px-8 lg:px-[82px]">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0 mb-6 md:mb-8">
            {/* Search */}
            <div className="relative w-full lg:w-[350px] order-1">
              <input
                type="text"
                placeholder="Search for Courses Here..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 md:py-3 border border-gray-200 rounded-lg font-poppins text-[14px] md:text-[16px] focus:outline-none focus:border-[#f98149]"
              />
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 md:gap-2 overflow-x-auto w-full lg:w-auto order-3 lg:order-2 pb-2 lg:pb-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 md:px-6 py-2 font-poppins text-[13px] md:text-[16px] font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-transparent text-[#f98149] border-b-2 border-[#f98149]'
                      : 'text-[#8a948c] hover:text-[#f98149]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 order-2 lg:order-3">
              <span className="text-[#8a948c] font-poppins text-[12px] md:text-[14px]">Sort by</span>
              <select className="px-3 md:px-4 py-2 border border-gray-200 rounded-lg font-poppins text-[12px] md:text-[14px] focus:outline-none focus:border-[#f98149]">
                <option>Popular Class</option>
                <option>Newest</option>
                <option>Rating</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-4 md:py-6 lg:py-8 px-4 md:px-8 lg:px-[82px]">
        <div className="max-w-[1920px] mx-auto">
          {errorMessage && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 flex items-center justify-between gap-4">
              <p className="font-poppins text-[13px] md:text-[14px] text-red-700">{errorMessage}</p>
              <button
                onClick={() => setReloadKey((k) => k + 1)}
                className="shrink-0 px-4 py-2 bg-[#003f7d] text-white font-poppins text-[12px] md:text-[14px] font-medium rounded-lg hover:bg-[#002f5d] transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {isLoading &&
              Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-[20px] md:rounded-[27px] shadow-[0px_4px_7px_0px_rgba(0,0,0,0.11)] overflow-hidden"
                >
                  <div className="h-[140px] md:h-[160px] lg:h-[180px] bg-gray-200 animate-pulse" />
                  <div className="p-4 md:p-5 lg:p-6 space-y-3">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                    <div className="h-9 bg-gray-200 rounded animate-pulse w-full mt-2" />
                  </div>
                </div>
              ))}

            {!isLoading &&
              paginatedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-[20px] md:rounded-[27px] shadow-[0px_4px_7px_0px_rgba(0,0,0,0.11)] overflow-hidden transition-transform hover:scale-[1.02]"
              >
                {/* Image Section */}
                <div className="h-[140px] md:h-[160px] lg:h-[180px] bg-gradient-to-br from-[#003f7d] to-[#0056a8] flex items-center justify-center p-4 md:p-6">
                  <img
                    src={course.image_url ?? '/images/hero-image.png'}
                    alt={course.title}
                    className="max-h-[100px] md:max-h-[110px] lg:max-h-[120px] max-w-[140px] md:max-w-[160px] lg:max-w-[180px] object-contain"
                  />
                </div>

                {/* Content Section */}
                <div className="p-4 md:p-5 lg:p-6">
                  <h3 className="text-[#003f7d] font-poppins font-semibold text-[18px] md:text-[20px] lg:text-[22px] mb-2">
                    {course.title}
                  </h3>
                  <p className="text-[#5f6265] font-poppins text-[12px] md:text-[13px] lg:text-[14px] leading-relaxed mb-3 md:mb-4 line-clamp-3">
                    {course.description ?? ''}
                  </p>

                  <div className="flex items-center justify-between gap-2 mb-3 md:mb-4">
                    <span className="text-[#5f6265] font-poppins text-[11px] md:text-[12px]">
                      Teacher: {course.teacher.name}
                    </span>
                    <span className="text-[#5f6265] font-poppins text-[11px] md:text-[12px]">
                      {course.tags.length ? course.tags[0] : ''}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Link
                      to={`/course/${course.id}`}
                      className="w-full py-2 bg-[#003f7d] text-white text-center font-poppins text-[12px] md:text-[14px] font-medium rounded-lg hover:bg-[#002f5d] transition-colors"
                    >
                      Demo
                    </Link>
                    {course.curriculum_url ? (
                      <a
                        href={course.curriculum_url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2 border-2 border-[#f98149] text-[#f98149] font-poppins text-[12px] md:text-[14px] font-medium rounded-lg hover:bg-[#f98149] hover:text-white transition-colors text-center"
                      >
                        Download Curriculum
                      </a>
                    ) : (
                      <button
                        disabled
                        className="w-full py-2 border-2 border-gray-200 text-gray-400 font-poppins text-[12px] md:text-[14px] font-medium rounded-lg cursor-not-allowed"
                      >
                        Download Curriculum
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8 md:mt-10 lg:mt-12">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-lg font-poppins text-[14px] md:text-[16px] font-medium transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-[#003f7d] border border-gray-200 hover:border-[#f98149]'
                }`}
              >
                ‹
              </button>

              {visiblePageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-lg font-poppins text-[14px] md:text-[16px] font-medium transition-colors ${
                    currentPage === pageNumber
                      ? 'bg-[#f98149] text-white'
                      : 'bg-white text-[#003f7d] border border-gray-200 hover:border-[#f98149]'
                  }`}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-lg font-poppins text-[14px] md:text-[16px] font-medium transition-colors ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-[#003f7d] border border-gray-200 hover:border-[#f98149]'
                }`}
              >
                ›
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
