import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useMe } from '../auth';
import { getAuthToken } from '../auth/tokenStorage';
import { getApiErrorMessage } from '../api';
import { courseService } from '../services';
import type { StudentCourse, TeacherEnrollment } from '../types/api';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, isLoading: isLoadingMe } = useMe();

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [actionEnrollmentId, setActionEnrollmentId] = useState<number | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'decline' | null>(null);

  const [studentCourses, setStudentCourses] = useState<StudentCourse[]>([]);
  const [teacherRequests, setTeacherRequests] = useState<TeacherEnrollment[]>([]);

  const role = user?.role ?? null;

  const title = useMemo(() => {
    if (role === 'teacher') return 'Dashboard';
    if (role === 'student') return 'Dashboard';
    return 'Dashboard';
  }, [role]);

  const loadData = async () => {
    if (!getAuthToken()) return;

    setIsLoadingData(true);
    setErrorMessage(null);
    setActionMessage(null);
    try {
      if (role === 'teacher') {
        const res = await courseService.teacherEnrollments({ status: 'pending' });
        setTeacherRequests(res.enrollments);
      } else if (role === 'student') {
        const res = await courseService.myCourses();
        setStudentCourses(res.courses);
      }
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleReviewEnrollment = async (enrollmentId: number, nextAction: 'approve' | 'decline') => {
    setErrorMessage(null);
    setActionMessage(null);
    setActionEnrollmentId(enrollmentId);
    setActionType(nextAction);

    try {
      const res =
        nextAction === 'approve'
          ? await courseService.approveEnrollment(enrollmentId)
          : await courseService.declineEnrollment(enrollmentId);

      setActionMessage(res.message);
      // Remove from pending list immediately.
      setTeacherRequests((prev) => prev.filter((e) => e.id !== enrollmentId));
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setActionEnrollmentId(null);
      setActionType(null);
    }
  };

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login', { replace: true });
      return;
    }
  }, [navigate]);

  useEffect(() => {
    // once /me resolves, load the appropriate dashboard data
    if (isLoadingMe) return;
    if (!user) return;
    void loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingMe, user?.id, role]);

  useEffect(() => {
    const onEnrollmentRequested = () => {
      if (role === 'teacher') void loadData();
    };
    window.addEventListener('enrollments:changed', onEnrollmentRequested);
    return () => window.removeEventListener('enrollments:changed', onEnrollmentRequested);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  return (
    <div className="min-h-screen bg-[#fdfdfd]">
      <Header variant="light" />

      <section className="pt-[120px] md:pt-[160px] lg:pt-[200px] pb-8 md:pb-12 px-4 md:px-8 lg:px-[82px]">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between gap-4">
            <h1 className="font-poppins font-bold text-[32px] md:text-[42px] lg:text-[52px]">
              <span className="text-[#003f7d]">{title}</span>
            </h1>

            <button
              onClick={() => void loadData()}
              disabled={isLoadingData || isLoadingMe}
              className="px-4 md:px-6 py-2 md:py-3 bg-[#003f7d] text-white font-poppins text-[12px] md:text-[14px] font-medium rounded-lg hover:bg-[#002f5d] transition-colors disabled:opacity-60"
            >
              {isLoadingData ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>

          {errorMessage && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="font-poppins text-[13px] md:text-[14px] text-red-700">{errorMessage}</p>
            </div>
          )}

          {!errorMessage && actionMessage && (
            <div className="mt-6 rounded-lg border border-[#f98149]/30 bg-[#fff5ef] px-4 py-3">
              <p className="font-poppins text-[13px] md:text-[14px] text-[#003f7d]">{actionMessage}</p>
            </div>
          )}
        </div>
      </section>

      <section className="pb-10 md:pb-14 lg:pb-20 px-4 md:px-8 lg:px-[82px]">
        <div className="max-w-[1920px] mx-auto">
          {(isLoadingMe || isLoadingData) && (
            <div className="rounded-lg border border-gray-200 bg-white px-4 py-6">
              <p className="font-poppins text-[13px] md:text-[14px] text-[#5f6265]">Loading…</p>
            </div>
          )}

          {!isLoadingMe && user && role === 'student' && !isLoadingData && (
            <>
              <h2 className="font-poppins font-semibold text-[20px] md:text-[26px] text-[#f98149] mb-4">
                My Courses
              </h2>

              {studentCourses.length === 0 ? (
                <div className="rounded-lg border border-gray-200 bg-white px-4 py-6">
                  <p className="font-poppins text-[13px] md:text-[14px] text-[#5f6265]">No courses yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                  {studentCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white rounded-[20px] md:rounded-[27px] shadow-[0px_4px_7px_0px_rgba(0,0,0,0.11)] overflow-hidden"
                    >
                      <div className="h-[140px] md:h-[160px] lg:h-[180px] bg-gradient-to-br from-[#003f7d] to-[#0056a8] flex items-center justify-center p-4 md:p-6">
                        <img
                          src={course.image_url ?? '/images/hero-image.png'}
                          alt={course.title}
                          className="max-h-[100px] md:max-h-[110px] lg:max-h-[120px] max-w-[140px] md:max-w-[160px] lg:max-w-[180px] object-contain"
                        />
                      </div>
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
                        <div className="flex flex-col gap-2">
                          <Link
                            to={`/course/${course.id}`}
                            className="w-full py-2 bg-[#003f7d] text-white text-center font-poppins text-[12px] md:text-[14px] font-medium rounded-lg hover:bg-[#002f5d] transition-colors"
                          >
                            Open
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {!isLoadingMe && user && role === 'teacher' && !isLoadingData && (
            <>
              <h2 className="font-poppins font-semibold text-[20px] md:text-[26px] text-[#f98149] mb-4">
                Enrollment Requests
              </h2>

              {teacherRequests.length === 0 ? (
                <div className="rounded-lg border border-gray-200 bg-white px-4 py-6">
                  <p className="font-poppins text-[13px] md:text-[14px] text-[#5f6265]">No pending requests.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {teacherRequests.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="rounded-[20px] md:rounded-[27px] bg-white shadow-[0px_4px_7px_0px_rgba(0,0,0,0.11)] px-4 md:px-6 py-4"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                          <p className="font-poppins font-semibold text-[#003f7d] text-[16px] md:text-[18px]">
                            {enrollment.student.name} requested enrollment
                          </p>
                          <p className="font-poppins text-[#5f6265] text-[13px] md:text-[14px]">
                            Course: {enrollment.course.title}
                          </p>
                          <p className="font-poppins text-[#5f6265] text-[12px] md:text-[13px]">
                            {enrollment.student.email}{enrollment.student.phone_number ? ` • ${enrollment.student.phone_number}` : ''}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="font-poppins text-[12px] md:text-[13px] text-[#f98149] font-semibold">
                            {enrollment.status.toUpperCase()}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => void handleReviewEnrollment(enrollment.id, 'approve')}
                              disabled={actionEnrollmentId === enrollment.id}
                              className="px-4 py-2 bg-[#003f7d] text-white font-poppins text-[12px] md:text-[13px] font-semibold rounded-lg hover:bg-[#002f5d] transition-colors disabled:opacity-60"
                            >
                              {actionEnrollmentId === enrollment.id && actionType === 'approve' ? 'Approving…' : 'Approve'}
                            </button>
                            <button
                              onClick={() => void handleReviewEnrollment(enrollment.id, 'decline')}
                              disabled={actionEnrollmentId === enrollment.id}
                              className="px-4 py-2 border-2 border-[#f98149] text-[#f98149] font-poppins text-[12px] md:text-[13px] font-semibold rounded-lg hover:bg-[#f98149] hover:text-white transition-colors disabled:opacity-60"
                            >
                              {actionEnrollmentId === enrollment.id && actionType === 'decline' ? 'Declining…' : 'Decline'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
