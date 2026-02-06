import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { courseService } from '../services';
import { getApiErrorMessage } from '../api';
import { getAuthToken } from '../auth/tokenStorage';
import type { CourseDetail } from '../types/api';

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [expandedSection, setExpandedSection] = useState<number | null>(0);
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const courseId = useMemo(() => {
    const n = Number(id);
    return Number.isFinite(n) ? n : null;
  }, [id]);

  const isAuthenticated = Boolean(getAuthToken());

  const projectColors = ['#FFE4D6', '#D6F5E3', '#FFF3D6', '#D6E4FF', '#F5D6FF', '#D6FFF5', '#FFD6D6', '#E8D6FF'];

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      if (!courseId) {
        setErrorMessage('Invalid course id.');
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);
      setActionMessage(null);

      try {
        const publicCourse = await courseService.getCourse(courseId);
        if (!isCancelled) setCourse(publicCourse);

        // Optional: try to fetch unlocked content when authenticated.
        if (getAuthToken()) {
          try {
            const contentCourse = await courseService.getCourseContent(courseId);
            if (!isCancelled) setCourse(contentCourse);
          } catch {
            // Ignore if not authorized; keep the public course response.
          }
        }
      } catch (error) {
        if (!isCancelled) setErrorMessage(getApiErrorMessage(error));
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    void load();
    return () => {
      isCancelled = true;
    };
  }, [courseId]);

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const handleEnroll = async () => {
    if (!courseId) return;

    setActionMessage(null);
    if (!getAuthToken()) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    setIsEnrolling(true);
    try {
      const res = await courseService.enrollInCourse(courseId);
      setActionMessage(res.message);
      // After enrolling, attempt to refresh unlocked content (if approved later, the content endpoint will reflect it).
      try {
        const refreshed = await courseService.getCourseContent(courseId);
        setCourse(refreshed);
      } catch {
        // ignore
      }
    } catch (error) {
      setActionMessage(getApiErrorMessage(error));
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd]">
      {/* Hero Section with Background */}
      <div className="relative">
        <div className="absolute inset-0 h-[400px] md:h-[600px] lg:h-[835px]">
          <img
            src="/images/course-hero-bg.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <Header variant="dark" />

        {/* Hero Content */}
        <div className="relative pt-[120px] md:pt-[160px] lg:pt-[200px] pb-[80px] md:pb-[120px] lg:pb-[150px] px-4 md:px-8 lg:px-[82px]">
          <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-12">
            <div className="w-[150px] md:w-[200px] lg:w-[281px] h-[150px] md:h-[200px] lg:h-[298px] flex-shrink-0">
              <img
                src={course?.image_url ?? '/images/hero-image.png'}
                alt={course?.title ?? 'Course'}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="font-poppins font-bold text-[36px] md:text-[60px] lg:text-[103px] leading-[80%] md:leading-[72%] text-white">
                <span className="text-[#ff8b36]">{course?.title ?? (isLoading ? 'Loading…' : '')}</span>
              </h1>
              {course?.teacher?.name && (
                <p className="mt-4 font-poppins text-[14px] md:text-[18px] lg:text-[22px] text-white/90">
                  Taught by {course.teacher.name}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative px-4 md:px-8 lg:px-[82px] -mt-[40px] md:-mt-[70px] lg:-mt-[100px]">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {(errorMessage || actionMessage) && (
            <div className="lg:col-span-12">
              {errorMessage && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                  <p className="font-poppins text-[13px] md:text-[14px] text-red-700">{errorMessage}</p>
                </div>
              )}
              {!errorMessage && actionMessage && (
                <div className="rounded-lg border border-[#f98149]/30 bg-[#fff5ef] px-4 py-3">
                  <p className="font-poppins text-[13px] md:text-[14px] text-[#003f7d]">{actionMessage}</p>
                </div>
              )}
            </div>
          )}

          {/* Left Column - About & Objectives */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            {/* About The Course */}
            <section className="mb-8 md:mb-12">
              <h2 className="font-poppins font-semibold text-[28px] md:text-[36px] lg:text-[44px] text-[#f98149] tracking-[0.5px] mb-4 md:mb-6">
                About The Course
              </h2>
              <p className="font-montserrat font-semibold text-[16px] md:text-[22px] lg:text-[28px] leading-[1.3] md:leading-[34.5px] text-[#191919] tracking-[0.5px]">
                {isLoading && !course ? 'Loading…' : (course?.description ?? '')}
              </p>
            </section>

            {/* Objectives */}
            <section className="mb-8 md:mb-12">
              <h2 className="font-poppins font-semibold text-[28px] md:text-[36px] lg:text-[44px] text-[#f98149] tracking-[0.5px] mb-4 md:mb-6">
                Objectives
              </h2>
              <ul className="space-y-4 md:space-y-6">
                {(course?.objectives ?? []).map((objective, index) => (
                  <li key={index} className="flex items-start gap-3 md:gap-4">
                    <div className="w-[28px] md:w-[33px] lg:w-[39px] h-[28px] md:h-[33px] lg:h-[39px] flex-shrink-0 mt-1">
                      <svg viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="19.5" cy="19.5" r="19.5" fill="#003f7d" />
                        <path d="M16 19.5L18.5 22L24 16.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="font-montserrat font-semibold text-[14px] md:text-[20px] lg:text-[28px] leading-[1.3] md:leading-[34.5px] text-[#191919] tracking-[0.5px]">
                      {objective.objective}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column - Course Content */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="bg-white rounded-[30px] md:rounded-[40px] lg:rounded-[54px] shadow-[0px_4px_7px_0px_rgba(0,0,0,0.11)] p-6 md:p-8 lg:p-12">
              <h2 className="font-poppins font-semibold text-[28px] md:text-[36px] lg:text-[44px] text-[#f98149] tracking-[0.5px] mb-6 md:mb-8 text-center">
                Course Content
              </h2>

              <div className="space-y-3 md:space-y-4">
                {(course?.videos ?? []).map((video, index) => (
                  <div key={index} className="border-b border-gray-200 pb-3 md:pb-4">
                    <button
                      onClick={() => toggleSection(index)}
                      className="w-full flex items-center justify-between py-2"
                    >
                      <h3 className="font-poppins font-semibold text-[18px] md:text-[24px] lg:text-[31px] text-[#003f7d] tracking-[0.5px] text-left">
                        {String(video.serial_number).padStart(2, '0')} {video.title}
                      </h3>
                      <svg
                        className={`w-[24px] md:w-[30px] lg:w-[38px] h-[24px] md:h-[30px] lg:h-[38px] transition-transform flex-shrink-0 ${expandedSection === index ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#003f7d"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedSection === index && (
                      <p className="font-poppins font-medium text-[13px] md:text-[16px] lg:text-[19px] text-[#5f6265] tracking-[0.5px] mt-2 pb-3 md:pb-4">
                        {video.description ?? ''}
                        {video.is_locked ? (
                          <span className="block mt-2 text-[#f98149]">Locked</span>
                        ) : (
                          video.video_url && (
                            <a
                              href={video.video_url}
                              target="_blank"
                              rel="noreferrer"
                              className="block mt-2 text-[#003f7d] underline"
                            >
                              Watch video
                            </a>
                          )
                        )}
                      </p>
                    )}
                  </div>
                ))}

                {!isLoading && course && course.videos.length === 0 && (
                  <p className="font-poppins text-[13px] md:text-[14px] text-[#5f6265] text-center">
                    No videos available yet.
                  </p>
                )}

                {isLoading && !course && (
                  <p className="font-poppins text-[13px] md:text-[14px] text-[#5f6265] text-center">
                    Loading course content…
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-[82px]">
        <div className="max-w-[1920px] mx-auto">
          <div className="border-b-3 border-gray-200 pb-3 md:pb-4 mb-8 md:mb-12">
            <h2 className="font-poppins font-semibold text-[28px] md:text-[36px] lg:text-[44px] text-[#f98149] tracking-[0.5px]">
              Course Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {(course?.projects ?? []).map((project, index) => (
              <div
                key={index}
                className={`bg-white rounded-[20px] md:rounded-[27px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.19)] p-4 md:p-6 ${
                  index === 0 ? 'sm:row-span-2' : ''
                }`}
              >
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <div
                    className="w-[50px] md:w-[60px] lg:w-[74px] h-[50px] md:h-[60px] lg:h-[74px] rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: projectColors[index % projectColors.length] }}
                  >
                    <svg className="w-6 h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 text-[#003f7d]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <h3 className="font-poppins font-semibold text-[16px] md:text-[22px] lg:text-[29px] leading-[1.1] md:leading-[83%] text-[#003f7d] tracking-[0.5px]">
                    {project.title}
                  </h3>
                </div>
                {project.description && (
                  <p className="font-poppins font-medium text-[13px] md:text-[16px] lg:text-[19px] text-[#5f5d5d] leading-[1.3] md:leading-[1.245] tracking-[0.5px]">
                    {project.description}
                  </p>
                )}

                {project.project_url && (
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-3 font-poppins text-[12px] md:text-[14px] text-[#003f7d] underline"
                  >
                    Open project
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-10 lg:py-12 px-4 md:px-8 lg:px-[82px]">
        <div className="max-w-[1920px] mx-auto">
          <div className="relative bg-[#003f7d] rounded-[24px] md:rounded-[36px] lg:rounded-[46px] overflow-hidden">
            <img
              src="/images/cta-pattern.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-30"
            />
            <div className="relative flex flex-col lg:flex-row items-center justify-between p-6 md:p-8 lg:p-12 gap-6 lg:gap-8">
              <div className="text-center lg:text-left">
                <h2 className="font-poppins font-semibold text-[28px] md:text-[40px] lg:text-[60px] leading-[90%] md:leading-[80%] text-white tracking-[0.1px]">
                  Wanna check more<br />
                  about the course?
                </h2>
              </div>
              <div className="flex flex-col gap-3 md:gap-4 w-full lg:w-auto">
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  {course?.demo_url ? (
                    <a
                      href={course.demo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 md:px-10 lg:px-12 py-3 md:py-4 border-2 md:border-3 border-[#f98149] text-white font-inter font-semibold text-[18px] md:text-[24px] lg:text-[30px] rounded-[16px] md:rounded-[20px] lg:rounded-[24px] hover:bg-[#f98149] transition-colors text-center"
                    >
                      Demo
                    </a>
                  ) : (
                    <button
                      disabled
                      className="px-6 md:px-10 lg:px-12 py-3 md:py-4 border-2 md:border-3 border-white/30 text-white/60 font-inter font-semibold text-[18px] md:text-[24px] lg:text-[30px] rounded-[16px] md:rounded-[20px] lg:rounded-[24px] cursor-not-allowed"
                    >
                      Demo
                    </button>
                  )}

                  <button
                    onClick={handleEnroll}
                    disabled={isEnrolling || !courseId}
                    className="px-6 md:px-10 lg:px-12 py-3 md:py-4 border-2 md:border-3 border-[#f98149] text-white font-inter font-semibold text-[18px] md:text-[24px] lg:text-[30px] rounded-[16px] md:rounded-[20px] lg:rounded-[24px] hover:bg-[#f98149] transition-colors disabled:opacity-60"
                  >
                    {isEnrolling ? 'Enrolling…' : isAuthenticated ? 'Enroll Now' : 'Log in to Enroll'}
                  </button>
                </div>
                {course?.curriculum_url ? (
                  <a
                    href={course.curriculum_url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 md:px-10 lg:px-12 py-3 md:py-5 bg-[#f98149] text-white font-inter font-semibold text-[18px] md:text-[24px] lg:text-[31px] rounded-[20px] md:rounded-[26px] lg:rounded-[31px] hover:bg-[#e6733d] transition-colors text-center"
                  >
                    Download Curriculam
                  </a>
                ) : (
                  <button
                    disabled
                    className="px-6 md:px-10 lg:px-12 py-3 md:py-5 bg-white/20 text-white/60 font-inter font-semibold text-[18px] md:text-[24px] lg:text-[31px] rounded-[20px] md:rounded-[26px] lg:rounded-[31px] cursor-not-allowed"
                  >
                    Download Curriculam
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-[82px]">
        <div className="max-w-[1920px] mx-auto">
          <div className="border-b-3 border-gray-200 pb-3 md:pb-4 mb-8 md:mb-12">
            <h2 className="font-poppins font-semibold text-[28px] md:text-[36px] lg:text-[44px] text-[#f98149] tracking-[0.5px]">
              Tools & Platforms
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-6 md:gap-8">
            {(course?.tools ?? []).map((tool, index) => (
              <div
                key={index}
                className="w-[100px] md:w-[150px] lg:w-[216px] h-[100px] md:h-[150px] lg:h-[216px] rounded-full bg-gray-100 flex items-center justify-center"
              >
                <div className="text-center px-4">
                  <p className="font-poppins font-semibold text-[#003f7d] text-[14px] md:text-[18px] lg:text-[22px]">
                    {tool.name}
                  </p>
                  {tool.url && (
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-2 font-poppins text-[12px] md:text-[14px] text-[#f98149] underline"
                    >
                      Visit
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
